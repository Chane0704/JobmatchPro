// JobMatch Pro - Popup UI Controller & ATS Match Engine
// Manages views, storage, job extraction, skill matching, and license gating.

document.addEventListener('DOMContentLoaded', async () => {
  // App State
  let state = {
    resumeText: '',
    scansCount: 0,
    jobSearchesUsed: 0,
    isPro: false,
    licenseKey: '',
    customApiKey: '',
    detectedJob: {
      title: 'Detecting job...',
      company: 'Checking active tab',
      text: ''
    },
    lastAnalysis: null
  };

  // DOM Elements - Navigation & Header
  const headerProPill = document.getElementById('header-pro-pill');
  const navSettingsBtn = document.getElementById('nav-settings-btn');
  const navTabPro = document.getElementById('nav-tab-pro');
  const tabButtons = document.querySelectorAll('.tab-btn');
  const viewPanels = document.querySelectorAll('.view-panel');

  // DOM Elements - Scanner Tab
  const noResumeAlert = document.getElementById('no-resume-alert');
  const alertAddResumeBtn = document.getElementById('alert-add-resume-btn');
  const detectedJobTitle = document.getElementById('detected-job-title');
  const detectedJobCompany = document.getElementById('detected-job-company');
  const refreshJobBtn = document.getElementById('refresh-job-btn');
  const toggleManualJobBtn = document.getElementById('toggle-manual-job-btn');
  const manualJobContainer = document.getElementById('manual-job-container');
  const manualJobInput = document.getElementById('manual-job-input');
  const useManualJobBtn = document.getElementById('use-manual-job-btn');
  const scanNowBtn = document.getElementById('scan-now-btn');
  const scanBtnLabel = document.getElementById('scan-btn-label');
  const scanResultsContainer = document.getElementById('scan-results-container');
  const findSimilarJobsMainBtn = document.getElementById('find-similar-jobs-main-btn');
  const findSimilarBtnText = document.getElementById('find-similar-btn-text');
  const findSimilarQuotaBadge = document.getElementById('find-similar-quota-badge');
  const jobSearchQuotaText = document.getElementById('job-search-quota-text');
  const jobSearchUpgradeBtn = document.getElementById('job-search-upgrade-btn');

  // DOM Elements - Results Card
  const scoreCircleProgress = document.getElementById('score-circle-progress');
  const scorePercentageText = document.getElementById('score-percentage-text');
  const scoreStatusBadge = document.getElementById('score-status-badge');
  const scoreSummaryDesc = document.getElementById('score-summary-desc');
  const missingKeywordsList = document.getElementById('missing-keywords-list');
  const missingCountBadge = document.getElementById('missing-count-badge');
  const matchedKeywordsList = document.getElementById('matched-keywords-list');
  const matchedCountBadge = document.getElementById('matched-count-badge');
  const suggestedBulletsList = document.getElementById('suggested-bullets-list');
  const exportReportBtn = document.getElementById('export-report-btn');
  const copyAiPromptBtn = document.getElementById('copy-ai-prompt-btn');
  const viewUpdatedResumeBtn = document.getElementById('view-updated-resume-btn');
  const resumeUpdatedBanner = document.getElementById('resume-updated-banner');

  // DOM Elements - Resume Tab
  const resumeInput = document.getElementById('resume-input');
  const saveResumeBtn = document.getElementById('save-resume-btn');
  const loadSampleResumeBtn = document.getElementById('load-sample-resume-btn');
  const resumeSkillsCount = document.getElementById('resume-skills-count');

  // DOM Elements - Pro & License
  const licenseKeyInput = document.getElementById('license-key-input');
  const activateKeyBtn = document.getElementById('activate-key-btn');
  const licenseActivationStatus = document.getElementById('license-activation-status');
  const deactivateKeyBtn = document.getElementById('deactivate-key-btn');

  // DOM Elements - Settings Tab
  const settingsLicenseStatus = document.getElementById('settings-license-status');
  const settingsKeyDisplay = document.getElementById('settings-key-display');
  const proChangeKeySection = document.getElementById('pro-change-key-section');
  const settingsChangeKeyInput = document.getElementById('settings-change-key-input');
  const settingsUpdateKeyBtn = document.getElementById('settings-update-key-btn');
  const settingsChangeKeyStatus = document.getElementById('settings-change-key-status');
  const settingsUpgradeLinkBtn = document.getElementById('settings-upgrade-link-btn');
  const customAiKeyInput = document.getElementById('custom-ai-key-input');
  const saveAiKeyBtn = document.getElementById('save-ai-key-btn');
  const clearDataBtn = document.getElementById('clear-data-btn');

  // Toast
  const appToast = document.getElementById('app-toast');
  const toastMessage = document.getElementById('toast-message');

  // -------------------------------------------------------------
  // 1. Initial State Loading from chrome.storage.local
  // -------------------------------------------------------------
  async function loadState() {
    return new Promise((resolve) => {
      chrome.storage.local.get(
        [
          'resumeText', 'scansCount', 'jobSearchesUsed', 'isPro', 'licenseKey', 'customApiKey',
          'lastScannedJob', 'manualJobText', 'lastAnalysis', 'activeTabId'
        ],
        (data) => {
          state.resumeText = data.resumeText || '';
          state.scansCount = typeof data.scansCount === 'number' ? data.scansCount : 0;
          state.jobSearchesUsed = typeof data.jobSearchesUsed === 'number' ? data.jobSearchesUsed : 0;
          state.isPro = !!data.isPro;
          state.licenseKey = data.licenseKey || '';
          state.customApiKey = data.customApiKey || '';
          
          // Restore manual job input text if previously entered
          if (data.manualJobText && manualJobInput) {
            manualJobInput.value = data.manualJobText;
            if (manualJobContainer) manualJobContainer.classList.add('open');
          }

          // Restore last loaded or scanned job
          if (data.lastScannedJob && data.lastScannedJob.text) {
            state.detectedJob = data.lastScannedJob;
            if (detectedJobTitle) detectedJobTitle.textContent = state.detectedJob.title;
            if (detectedJobCompany) detectedJobCompany.textContent = state.detectedJob.company;
          }

          // Restore last analysis results (scores, pills, bullets)
          if (data.lastAnalysis) {
            state.lastAnalysis = data.lastAnalysis;
            displayResults(data.lastAnalysis);
          }

          // Restore active tab (if pro, don't land on tab-pro)
          if (data.activeTabId) {
            if (state.isPro && data.activeTabId === 'tab-pro') {
              switchTab('tab-scan');
            } else {
              switchTab(data.activeTabId);
            }
          }

          updateUIFromState();
          resolve();
        }
      );
    });
  }

  function updateUIFromState() {
    // Header Pro Badge
    if (headerProPill) {
      if (state.isPro) {
        headerProPill.className = 'pro-badge active';
        headerProPill.textContent = 'PRO ACTIVE';
        headerProPill.title = 'JobMatch Pro Lifetime Unlocked';
      } else {
        const remaining = Math.max(0, 3 - state.scansCount);
        headerProPill.className = 'pro-badge free';
        headerProPill.textContent = `FREE: ${remaining} left`;
        headerProPill.title = 'Click to upgrade to Pro for unlimited scans';
      }
    }

    // Scan Button Label
    if (scanBtnLabel) {
      if (state.isPro) {
        scanBtnLabel.textContent = 'Scan & Match Resume (Unlimited Pro)';
      } else {
        const remaining = Math.max(0, 3 - state.scansCount);
        scanBtnLabel.textContent = `Scan & Match (${remaining}/3 Free Scans)`;
      }
    }

    // Find Similar Jobs Quota Badge (Scanner Dashboard)
    if (findSimilarQuotaBadge) {
      if (state.isPro) {
        findSimilarQuotaBadge.textContent = 'UNLIMITED PRO';
        findSimilarQuotaBadge.style.background = 'rgba(16, 185, 129, 0.2)';
        findSimilarQuotaBadge.style.color = '#34D399';
      } else {
        const remainingSearches = Math.max(0, 1 - state.jobSearchesUsed);
        if (remainingSearches > 0) {
          findSimilarQuotaBadge.textContent = '1 FREE SEARCH';
          findSimilarQuotaBadge.style.background = 'rgba(99, 102, 241, 0.25)';
          findSimilarQuotaBadge.style.color = '#A5B4FC';
        } else {
          findSimilarQuotaBadge.textContent = 'PRO ONLY 🔒';
          findSimilarQuotaBadge.style.background = 'rgba(239, 68, 68, 0.2)';
          findSimilarQuotaBadge.style.color = '#F87171';
        }
      }
    }

    // Job Search Tab Quota Status
    if (jobSearchQuotaText) {
      if (state.isPro) {
        jobSearchQuotaText.textContent = 'Pro Active: Unlimited job board searches';
        jobSearchQuotaText.style.color = '#34D399';
        if (jobSearchUpgradeBtn) jobSearchUpgradeBtn.style.display = 'none';
      } else {
        const remainingSearches = Math.max(0, 1 - state.jobSearchesUsed);
        if (remainingSearches > 0) {
          jobSearchQuotaText.textContent = '1 Free Search available (Test LinkedIn, Indeed or Google)';
          jobSearchQuotaText.style.color = '#A5B4FC';
          if (jobSearchUpgradeBtn) jobSearchUpgradeBtn.style.display = 'none';
        } else {
          jobSearchQuotaText.textContent = 'Free search limit reached (1/1). Upgrade for unlimited searches.';
          jobSearchQuotaText.style.color = '#F87171';
          if (jobSearchUpgradeBtn) jobSearchUpgradeBtn.style.display = 'inline-block';
        }
      }
    }

    // Resume field
    if (resumeInput) resumeInput.value = state.resumeText;
    checkResumeState();

    // Tab Navigation: Hide "Upgrade / Pro" for Pro active customers
    if (navTabPro) {
      navTabPro.style.display = state.isPro ? 'none' : '';
    }

    // Safety: If Pro customer is on tab-pro, switch to Scanner
    const currentActivePanel = document.querySelector('.view-panel.active');
    if (state.isPro && currentActivePanel && currentActivePanel.id === 'tab-pro') {
      switchTab('tab-scan');
    }

    // Settings displays
    if (settingsLicenseStatus) {
      if (state.isPro) {
        settingsLicenseStatus.textContent = 'Pro Lifetime Active (Unlimited)';
        settingsLicenseStatus.style.color = '#10B981';
        if (settingsKeyDisplay) settingsKeyDisplay.textContent = `Key: ${state.licenseKey || 'PRO-MOCK-ACTIVE'}`;
        if (proChangeKeySection) proChangeKeySection.style.display = 'block';
        if (settingsUpgradeLinkBtn) settingsUpgradeLinkBtn.style.display = 'none';
        if (deactivateKeyBtn) deactivateKeyBtn.style.display = 'inline-block';
      } else {
        const remaining = Math.max(0, 3 - state.scansCount);
        settingsLicenseStatus.textContent = `Free Tier (${state.scansCount}/3 scans used)`;
        settingsLicenseStatus.style.color = '#F59E0B';
        if (settingsKeyDisplay) settingsKeyDisplay.textContent = 'No active license key';
        if (proChangeKeySection) proChangeKeySection.style.display = 'none';
        if (settingsUpgradeLinkBtn) settingsUpgradeLinkBtn.style.display = 'inline-block';
        if (deactivateKeyBtn) deactivateKeyBtn.style.display = 'none';
      }
    }

    if (state.customApiKey && customAiKeyInput) {
      customAiKeyInput.value = state.customApiKey;
    }
  }

  function checkResumeState() {
    if (!state.resumeText || state.resumeText.trim().length < 40) {
      if (noResumeAlert) noResumeAlert.style.display = 'block';
      if (resumeSkillsCount) resumeSkillsCount.textContent = '0 skills identified in your saved resume.';
    } else {
      if (noResumeAlert) noResumeAlert.style.display = 'none';
      const extractedSkills = extractSkillsFromText(state.resumeText);
      if (resumeSkillsCount) resumeSkillsCount.textContent = `${extractedSkills.length} skills recognized (e.g. ${extractedSkills.slice(0, 5).join(', ')}...)`;
    }
  }

  // -------------------------------------------------------------
  // 2. Tab Navigation
  // -------------------------------------------------------------
  function switchTab(tabId) {
    tabButtons.forEach(btn => {
      btn.classList.toggle('active', btn.dataset.tab === tabId);
    });
    viewPanels.forEach(panel => {
      panel.classList.toggle('active', panel.id === tabId);
    });
    chrome.storage.local.set({ activeTabId: tabId });
  }

  tabButtons.forEach(btn => {
    btn.addEventListener('click', () => switchTab(btn.dataset.tab));
  });

  if (headerProPill) {
    headerProPill.addEventListener('click', () => {
      if (state.isPro) {
        switchTab('tab-settings');
      } else {
        switchTab('tab-pro');
      }
    });
  }
  navSettingsBtn.addEventListener('click', () => switchTab('tab-settings'));
  alertAddResumeBtn.addEventListener('click', () => switchTab('tab-resume'));

  // -------------------------------------------------------------
  // 3. Toast Notifications
  // -------------------------------------------------------------
  let toastTimer = null;
  function showToast(message, type = 'success') {
    clearTimeout(toastTimer);
    toastMessage.textContent = message;
    appToast.className = `toast show toast-${type}`;
    toastTimer = setTimeout(() => {
      appToast.className = 'toast';
    }, 2800);
  }

  // -------------------------------------------------------------
  // 4. Job Extraction from Active Browser Tab
  // -------------------------------------------------------------
  async function fetchJobFromActiveTab() {
    detectedJobTitle.textContent = 'Scanning active page...';
    detectedJobCompany.textContent = 'Please wait';

    try {
      const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
      if (!tab || !tab.id) {
        showManualJobFallback('No active tab detected.');
        return;
      }

      // If on chrome:// or edge:// pages, content scripts cannot run
      if (tab.url.startsWith('chrome://') || tab.url.startsWith('edge://') || tab.url.startsWith('about:')) {
        showManualJobFallback('Browser system page. Open a job on LinkedIn, Indeed, or Greenhouse.');
        return;
      }

      // Try sending message to content script
      chrome.tabs.sendMessage(tab.id, { action: 'EXTRACT_JOB_DETAILS' }, async (response) => {
        // If content script wasn't injected yet, inject programmatically and retry
        if (chrome.runtime.lastError || !response) {
          try {
            await chrome.scripting.executeScript({
              target: { tabId: tab.id },
              files: ['content.js']
            });

            // Retry after injection
            chrome.tabs.sendMessage(tab.id, { action: 'EXTRACT_JOB_DETAILS' }, (retryResponse) => {
              if (retryResponse && retryResponse.success) {
                applyJobDetails(retryResponse);
              } else {
                showManualJobFallback(retryResponse?.error || 'No job description found on this page.');
              }
            });
          } catch (e) {
            showManualJobFallback('Could not inject scraper. Paste job text manually.');
          }
          return;
        }

        if (response && response.success) {
          applyJobDetails(response);
        } else {
          showManualJobFallback(response?.error || 'No job description found.');
        }
      });
    } catch (err) {
      showManualJobFallback('Unable to access page. You can paste the job text below.');
    }
  }

  function applyJobDetails(details) {
    state.detectedJob = {
      title: details.title || 'Job Posting',
      company: details.company || 'Company',
      text: details.text || ''
    };
    detectedJobTitle.textContent = state.detectedJob.title;
    detectedJobCompany.textContent = state.detectedJob.company;
    chrome.storage.local.set({ lastScannedJob: state.detectedJob });
  }

  function showManualJobFallback(reason) {
    if (state.detectedJob && state.detectedJob.text && state.detectedJob.text.length > 50) {
      // Preserve previously loaded job
      return;
    }
    detectedJobTitle.textContent = 'Job Not Auto-Detected';
    detectedJobCompany.textContent = reason;
  }

  refreshJobBtn.addEventListener('click', fetchJobFromActiveTab);

  // Auto-save manual input on typing so it's never lost if user clicks out
  manualJobInput.addEventListener('input', () => {
    chrome.storage.local.set({ manualJobText: manualJobInput.value });
  });

  // Manual job toggle & usage
  toggleManualJobBtn.addEventListener('click', () => {
    manualJobContainer.classList.toggle('open');
  });

  useManualJobBtn.addEventListener('click', () => {
    const manualText = manualJobInput.value.trim();
    if (!manualText) {
      showToast('Please paste job description text first', 'error');
      return;
    }
    state.detectedJob = {
      title: 'Manual Job Description',
      company: 'Custom Input',
      text: manualText
    };
    detectedJobTitle.textContent = state.detectedJob.title;
    detectedJobCompany.textContent = state.detectedJob.company;
    manualJobContainer.classList.remove('open');
    chrome.storage.local.set({
      lastScannedJob: state.detectedJob,
      manualJobText: manualText
    });
    showToast('Job text loaded! Ready to scan.');
  });

  // -------------------------------------------------------------
  // 5. ATS Keyword Matching Algorithm
  // -------------------------------------------------------------
  function extractSkillsFromText(text) {
    if (!text) return [];
    const normalizedText = ` ${text.toLowerCase()} `;
    const foundSkills = new Set();

    SKILLS_DATABASE.forEach(skill => {
      // Check canonical name
      const nameRegex = new RegExp(`\\b${escapeRegex(skill.name.toLowerCase())}\\b`, 'i');
      if (nameRegex.test(normalizedText)) {
        foundSkills.add(skill.name);
        return;
      }

      // Check aliases/synonyms
      if (skill.aliases) {
        for (const alias of skill.aliases) {
          const aliasRegex = new RegExp(`\\b${escapeRegex(alias.toLowerCase())}\\b`, 'i');
          if (aliasRegex.test(normalizedText)) {
            foundSkills.add(skill.name);
            return;
          }
        }
      }
    });

    return Array.from(foundSkills);
  }

  function escapeRegex(string) {
    return string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  }

  /**
   * Evaluates resume against job description and produces score and keywords.
   */
  function runAtsMatch(resumeText, jobText) {
    const jobSkills = extractSkillsFromText(jobText);
    const resumeSkills = extractSkillsFromText(resumeText);

    // If job description contains very few recognizable tech keywords, extract common capitalized acronyms/tech tokens
    if (jobSkills.length < 3) {
      const extraTokens = extractHeuristicKeywords(jobText);
      extraTokens.forEach(token => {
        if (!jobSkills.includes(token)) jobSkills.push(token);
      });
    }

    const matched = [];
    const missing = [];

    const resumeLower = resumeText.toLowerCase();

    jobSkills.forEach(skill => {
      const inExtracted = resumeSkills.includes(skill);
      const inDirectText = new RegExp(`\\b${escapeRegex(skill.toLowerCase())}\\b`, 'i').test(resumeLower);

      if (inExtracted || inDirectText) {
        matched.push(skill);
      } else {
        missing.push(skill);
      }
    });

    // Score Calculation
    let score = 0;
    if (jobSkills.length > 0) {
      score = Math.round((matched.length / jobSkills.length) * 100);
    } else {
      // Fallback word overlap
      score = computeWordOverlapScore(resumeText, jobText);
    }

    // Generate 3 Tailored Resume Bullets using the Google X-Y-Z formula
    const suggestedBullets = generateSuggestedBullets(missing, matched, state.detectedJob.title);

    return {
      score: Math.min(100, Math.max(10, score)),
      matched,
      missing,
      suggestedBullets
    };
  }

  function extractHeuristicKeywords(text) {
    const stopWords = new Set([
      'About', 'Company', 'Requirements', 'Responsibilities', 'Benefits', 'Salary', 'Location',
      'Experience', 'Years', 'Qualifications', 'Position', 'Candidate', 'Work', 'Team', 'Please',
      'Apply', 'Student', 'School', 'College', 'University', 'Education', 'Degree', 'Member',
      'Connection', 'Follow', 'Following', 'Preferences', 'Settings', 'Tracker', 'Message',
      'Profile', 'Activity', 'Notifications', 'Network', 'Jobs', 'Home', 'Feed', 'Search',
      'Filter', 'Posts', 'Comments', 'Likes', 'Share', 'Send', 'Contact', 'India', 'United',
      'States', 'America', 'London', 'California', 'City', 'State', 'Thane', 'Mumbai', 'Delhi',
      'Bangalore', 'Remote', 'Hybrid', 'Full-time', 'Part-time', 'Contract', 'Internship',
      'Description', 'Overview', 'Details', 'Summary', 'Posted', 'Applicants', 'Easy', 'Save',
      'View', 'More', 'Less', 'Start', 'Photo', 'Video', 'Article', 'Write', 'Recommended',
      'Singhania', 'Sulochanadevi', 'Anish', 'Apshinge'
    ]);

    const matches = text.match(/\b[A-Z][a-zA-Z0-9+#.-]{1,14}\b/g) || [];
    const set = new Set();
    matches.forEach(m => {
      // Must not be in stopWords, must be a tech acronym or symbol (e.g. AWS, GCP, CI/CD, C++, .NET)
      const isTechSymbol = /[\+#\.]/.test(m);
      const isAcronym = /^[A-Z0-9]{2,6}$/.test(m);
      if (!stopWords.has(m) && (isTechSymbol || isAcronym)) {
        set.add(m);
      }
    });
    return Array.from(set).slice(0, 5);
  }

  /**
   * Intelligently inserts a missing keyword into the best section of the user's resume.
   */
  function insertSkillIntoResume(skill) {
    if (!state.resumeText || !skill) return;

    // Look up category for the skill
    const foundMeta = SKILLS_DATABASE.find(s => s.name.toLowerCase() === skill.toLowerCase());
    const category = foundMeta ? foundMeta.category : 'General';

    let resume = state.resumeText;
    let inserted = false;

    // Target category keywords
    const categoryKeywords = {
      'Frontend': ['frontend', 'front-end', 'ui/ux', 'web technologies'],
      'Backend': ['backend', 'back-end', 'server', 'microservices'],
      'Languages': ['languages', 'programming', 'coding'],
      'Database': ['database', 'databases', 'storage', 'data stores'],
      'DevOps': ['cloud', 'devops', 'infrastructure', 'ci/cd', 'tools'],
      'AI/Data': ['ai', 'machine learning', 'data science', 'analytics'],
      'Testing': ['testing', 'qa', 'quality assurance'],
      'Practices': ['practices', 'methodologies', 'principles']
    };

    const targetKws = categoryKeywords[category] || ['skills', 'technologies'];
    const lines = resume.split('\n');
    let categoryLineIndex = -1;
    let generalSkillsLineIndex = -1;

    for (let i = 0; i < lines.length; i++) {
      const lineLower = lines[i].toLowerCase();

      for (const kw of targetKws) {
        if (lineLower.includes(kw) && (lineLower.includes(':') || lineLower.startsWith('-') || lineLower.startsWith('*'))) {
          categoryLineIndex = i;
          break;
        }
      }
      if (categoryLineIndex !== -1) break;

      if (lineLower.includes('skills:') || lineLower.includes('technologies:') || lineLower.includes('technical skills') || lineLower.includes('core skills')) {
        generalSkillsLineIndex = i;
      }
    }

    if (categoryLineIndex !== -1) {
      const line = lines[categoryLineIndex].trimEnd();
      lines[categoryLineIndex] = line.endsWith(',') || line.endsWith(':') ? `${line} ${skill}` : `${line}, ${skill}`;
      resume = lines.join('\n');
      inserted = true;
    } else if (generalSkillsLineIndex !== -1) {
      const line = lines[generalSkillsLineIndex].trimEnd();
      lines[generalSkillsLineIndex] = line.endsWith(',') || line.endsWith(':') ? `${line} ${skill}` : `${line}, ${skill}`;
      resume = lines.join('\n');
      inserted = true;
    } else {
      resume = `${resume.trim()}\n\nCORE TECHNICAL SKILLS:\n- ${category}: ${skill}`;
      inserted = true;
    }

    if (inserted) {
      state.resumeText = resume;
      chrome.storage.local.set({ resumeText: resume }, () => {
        resumeInput.value = resume;
        checkResumeState();

        if (state.detectedJob && state.detectedJob.text) {
          const updatedAnalysis = runAtsMatch(state.resumeText, state.detectedJob.text);
          state.lastAnalysis = updatedAnalysis;
          displayResults(updatedAnalysis);
          chrome.storage.local.set({
            lastAnalysis: updatedAnalysis,
            lastScannedJob: state.detectedJob
          });

          if (resumeUpdatedBanner) resumeUpdatedBanner.style.display = 'block';
          showToast(`✓ Added "${skill}" to resume! ATS score is now ${updatedAnalysis.score}%`);
        }
      });
    }
  }

  /**
   * Intelligently inserts a tailored bullet point into the Experience section of the user's resume.
   */
  function insertBulletIntoResume(bulletText) {
    if (!state.resumeText || !bulletText) return;

    let resume = state.resumeText;
    const lines = resume.split('\n');
    let experienceIndex = -1;

    for (let i = 0; i < lines.length; i++) {
      const lower = lines[i].toLowerCase();
      if (lower.includes('experience') || lower.includes('employment') || lower.includes('work history')) {
        experienceIndex = i;
        break;
      }
    }

    if (experienceIndex !== -1) {
      let insertAt = experienceIndex + 1;
      while (insertAt < lines.length && lines[insertAt].trim() === '') {
        insertAt++;
      }
      if (insertAt < lines.length) {
        insertAt++;
      }
      lines.splice(insertAt, 0, `- ${bulletText}`);
      resume = lines.join('\n');
    } else {
      resume = `${resume.trim()}\n\nPROFESSIONAL EXPERIENCE:\n- ${bulletText}`;
    }

    state.resumeText = resume;
    chrome.storage.local.set({ resumeText: resume }, () => {
      resumeInput.value = resume;
      checkResumeState();

      if (state.detectedJob && state.detectedJob.text) {
        const updatedAnalysis = runAtsMatch(state.resumeText, state.detectedJob.text);
        state.lastAnalysis = updatedAnalysis;
        displayResults(updatedAnalysis);
        chrome.storage.local.set({
          lastAnalysis: updatedAnalysis,
          lastScannedJob: state.detectedJob
        });

        if (resumeUpdatedBanner) resumeUpdatedBanner.style.display = 'block';
        showToast(`✓ Tailored bullet point added to your resume under Experience!`);
      }
    });
  }

  function computeWordOverlapScore(resumeText, jobText) {
    const getWords = (str) => new Set((str.toLowerCase().match(/\b[a-z]{4,}\b/g) || []));
    const resumeWords = getWords(resumeText);
    const jobWords = getWords(jobText);
    if (jobWords.size === 0) return 50;

    let overlap = 0;
    jobWords.forEach(w => {
      if (resumeWords.has(w)) overlap++;
    });
    return Math.round((overlap / jobWords.size) * 100);
  }

  function generateSuggestedBullets(missing, matched, jobTitle) {
    const cleanTitle = jobTitle.replace(/(Senior|Junior|Lead|Staff|Principal|\(.*\))/gi, '').trim() || 'Software Engineer';
    const missing1 = missing[0] || 'Cloud Architecture';
    const missing2 = missing[1] || 'Automated CI/CD';
    const missing3 = missing[2] || 'Performance Optimization';
    const anchorSkill = matched[0] || 'modern frameworks';

    return [
      `Architected high-throughput workflows integrating ${missing1} with ${anchorSkill}, reducing latency by 32% and enhancing production reliability.`,
      `Spearheaded ${missing2} initiatives across Agile sprints, eliminating deployment bottlenecks and saving 8+ engineering hours per release cycle.`,
      `Spearheaded application security and scalability using ${missing3}, ensuring 99.9% uptime and compliance with industry best practices.`
    ];
  }

  // -------------------------------------------------------------
  // 6. Scan Execution & Feature Gating Flow
  // -------------------------------------------------------------
  scanNowBtn.addEventListener('click', async () => {
    // Check 1: Resume Profile presence
    if (!state.resumeText || state.resumeText.trim().length < 40) {
      showToast('Please add and save your resume first', 'error');
      switchTab('tab-resume');
      return;
    }

    // Check 2: Job description presence
    if (!state.detectedJob.text || state.detectedJob.text.trim().length < 50) {
      showToast('No job description found. Paste it manually or highlight text.', 'error');
      manualJobContainer.classList.add('open');
      return;
    }

    // Check 3: Free Tier Limit (3 free scans)
    if (!state.isPro && state.scansCount >= 3) {
      showToast('You have used all 3 free scans. Upgrade to Pro for unlimited scans!', 'error');
      switchTab('tab-pro');
      return;
    }

    // Execute Scan
    scanNowBtn.disabled = true;
    scanBtnLabel.textContent = 'Analyzing ATS Keywords...';

    // Increment scan counter if not pro
    if (!state.isPro) {
      state.scansCount += 1;
      await new Promise(r => {
        chrome.storage.local.set({ scansCount: state.scansCount }, r);
      });
      // Notify background worker to update icon badge
      chrome.runtime.sendMessage({ action: 'UPDATE_BADGE', isPro: false, count: state.scansCount });
    }

    // Run matching
    setTimeout(async () => {
      try {
        const results = runAtsMatch(state.resumeText, state.detectedJob.text);
        state.lastAnalysis = results;
        displayResults(results);
        chrome.storage.local.set({
          lastAnalysis: results,
          lastScannedJob: state.detectedJob
        });
        showToast('Scan complete!');
      } catch (err) {
        console.error('Scan error:', err);
        showToast('Error during scan: ' + err.message, 'error');
      } finally {
        scanNowBtn.disabled = false;
        updateUIFromState();
      }
    }, 350);
  });

  function displayResults(results) {
    if (!results) return;

    const resultsContainer = document.getElementById('scan-results-container') || scanResultsContainer;
    if (resultsContainer) resultsContainer.style.display = 'block';

    // 1. Radial Score Animation
    const circumference = 213.6;
    const offset = circumference - (results.score / 100) * circumference;
    
    const circleProgress = document.getElementById('score-circle-progress') || scoreCircleProgress;
    const percentageText = document.getElementById('score-percentage-text') || scorePercentageText;
    if (circleProgress) circleProgress.style.strokeDashoffset = offset;
    if (percentageText) percentageText.textContent = `${results.score}%`;

    // Status & Color
    let color = '#EF4444'; // Red
    let status = 'Needs Optimization';
    let summary = `Your resume matches ${results.matched.length} requirements. Adding the missing keywords below will significantly increase your ATS score.`;

    if (results.score >= 70) {
      color = '#10B981'; // Green
      status = 'Strong Match';
      summary = `Excellent alignment! You possess ${results.matched.length} key qualifications requested by ${state.detectedJob.company}.`;
    } else if (results.score >= 45) {
      color = '#F59E0B'; // Amber
      status = 'Good Match';
      summary = `Solid foundation. Bridging ${results.missing.slice(0, 3).join(', ')} will position you in the top 10% of applicants.`;
    }

    if (circleProgress) circleProgress.style.stroke = color;
    
    const statusBadge = document.getElementById('score-status-badge') || scoreStatusBadge;
    if (statusBadge) {
      statusBadge.textContent = status;
      statusBadge.style.background = `${color}20`;
      statusBadge.style.color = color;
      statusBadge.style.borderColor = `${color}50`;
    }

    const summaryDesc = document.getElementById('score-summary-desc') || scoreSummaryDesc;
    if (summaryDesc) summaryDesc.textContent = summary;

    // 2. Missing Keywords Pills
    const missingListEl = document.getElementById('missing-keywords-list') || missingKeywordsList;
    const missingBadgeEl = document.getElementById('missing-count-badge') || missingCountBadge;
    if (missingListEl) missingListEl.innerHTML = '';
    if (missingBadgeEl) missingBadgeEl.textContent = `${results.missing.length} missing`;
    if (results.missing.length === 0) {
      if (missingListEl) missingListEl.innerHTML = '<span class="pill-empty-note">🎉 All detected keywords match your resume!</span>';
    } else if (missingListEl) {
      results.missing.forEach(skill => {
        const pill = document.createElement('div');
        pill.className = 'pill pill-missing';
        pill.innerHTML = `
          <span class="pill-add-action" title="Click to auto-insert into resume">+ ${skill}</span>
          <span class="pill-copy-icon" title="Copy keyword for your own AI">📋</span>
        `;

        // Click on "+ skill" auto-inserts into resume
        pill.querySelector('.pill-add-action').addEventListener('click', (e) => {
          e.stopPropagation();
          insertSkillIntoResume(skill);
        });

        // Click on copy icon copies keyword
        pill.querySelector('.pill-copy-icon').addEventListener('click', (e) => {
          e.stopPropagation();
          navigator.clipboard.writeText(skill);
          showToast(`Copied "${skill}" to clipboard`);
        });

        // Click on pill body also auto-inserts
        pill.addEventListener('click', () => {
          insertSkillIntoResume(skill);
        });

        missingListEl.appendChild(pill);
      });
    }

    // 3. Matched Keywords Pills
    const matchedListEl = document.getElementById('matched-keywords-list') || matchedKeywordsList;
    const matchedBadgeEl = document.getElementById('matched-count-badge') || matchedCountBadge;
    if (matchedListEl) matchedListEl.innerHTML = '';
    if (matchedBadgeEl) matchedBadgeEl.textContent = `${results.matched.length} matched`;
    if (results.matched.length === 0) {
      if (matchedListEl) matchedListEl.innerHTML = '<span class="pill-empty-note">None detected yet.</span>';
    } else if (matchedListEl) {
      results.matched.forEach(skill => {
        const pill = document.createElement('div');
        pill.className = 'pill pill-matched';
        pill.innerHTML = `✓ ${skill}`;
        matchedListEl.appendChild(pill);
      });
    }

    // 4. Suggested Bullets
    const bulletsListEl = document.getElementById('suggested-bullets-list') || suggestedBulletsList;
    if (bulletsListEl) {
      bulletsListEl.innerHTML = '';
      results.suggestedBullets.forEach((bulletText) => {
        const card = document.createElement('div');
        card.className = 'bullet-card';
        card.innerHTML = `
          <div class="bullet-text">${bulletText}</div>
          <div class="bullet-actions">
            <button class="bullet-add-btn" title="Insert directly into your resume experience">
              <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3"><polyline points="20 6 9 17 4 12"></polyline></svg>
              + Add to Resume
            </button>
            <button class="bullet-copy-btn" title="Copy bullet point for ChatGPT / Claude">
              <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path></svg>
              Copy
            </button>
          </div>
        `;

        card.querySelector('.bullet-add-btn').addEventListener('click', () => {
          insertBulletIntoResume(bulletText);
        });

        card.querySelector('.bullet-copy-btn').addEventListener('click', () => {
          navigator.clipboard.writeText(bulletText);
          showToast('Bullet copied! Ready to paste into ChatGPT or Claude.');
        });

        bulletsListEl.appendChild(card);
      });
    }

    // Scroll smoothly to results
    scanResultsContainer.scrollIntoView({ behavior: 'smooth' });
  }

  // Copy AI Prompt for ChatGPT / Claude
  if (copyAiPromptBtn) {
    copyAiPromptBtn.addEventListener('click', () => {
      if (!state.lastAnalysis) return;

      const missingList = state.lastAnalysis.missing.length > 0
        ? state.lastAnalysis.missing.join(', ')
        : 'None (Resume is well-matched)';

      const prompt = `I am applying for the role of "${state.detectedJob.title}" at "${state.detectedJob.company}".

=== TARGET JOB REQUIREMENTS ===
${state.detectedJob.text}

=== MY CURRENT RESUME ===
${state.resumeText}

=== MISSING ATS KEYWORDS IDENTIFIED ===
${missingList}

=== INSTRUCTIONS FOR AI RESUME REWRITE ===
1. Optimize my resume to pass ATS filters for this exact job description.
2. Naturally integrate the missing keywords listed above into my Skills and Professional Experience sections.
3. Formulate key achievement bullets using the Google X-Y-Z formula: "Accomplished [X] as measured by [Y] by doing [Z]".
4. Keep all my factual job history, dates, and background accurate while maximizing ATS keyword match density.
5. Provide the complete revised resume ready for export.`;

      navigator.clipboard.writeText(prompt);
      showToast('🤖 AI Prompt copied! Paste into ChatGPT or Claude.');
    });
  }

  // View updated resume button
  if (viewUpdatedResumeBtn) {
    viewUpdatedResumeBtn.addEventListener('click', () => {
      switchTab('tab-resume');
    });
  }

  // Export Full Report to Clipboard
  exportReportBtn.addEventListener('click', () => {
    if (!state.lastAnalysis) return;

    const report = `
=== JobMatch Pro ATS Analysis ===
Role: ${state.detectedJob.title}
Company: ${state.detectedJob.company}
Match Score: ${state.lastAnalysis.score}%

MATCHED SKILLS (${state.lastAnalysis.matched.length}):
${state.lastAnalysis.matched.map(s => `- ${s}`).join('\n') || 'None'}

MISSING SKILLS TO ADD (${state.lastAnalysis.missing.length}):
${state.lastAnalysis.missing.map(s => `- ${s}`).join('\n') || 'None'}

SUGGESTED RESUME BULLET POINTS:
${state.lastAnalysis.suggestedBullets.map(b => `* ${b}`).join('\n')}

Generated with JobMatch Pro
`.trim();

    navigator.clipboard.writeText(report);
    showToast('Full ATS report copied to clipboard!');
  });

  // -------------------------------------------------------------
  // 7. Resume Management Tab
  // -------------------------------------------------------------
  saveResumeBtn.addEventListener('click', () => {
    const text = resumeInput.value.trim();
    if (!text) {
      showToast('Please paste resume text before saving', 'error');
      return;
    }

    state.resumeText = text;
    chrome.storage.local.set({ resumeText: text }, () => {
      checkResumeState();
      showToast('Resume profile saved successfully!');
    });
  });

  loadSampleResumeBtn.addEventListener('click', () => {
    resumeInput.value = SAMPLE_RESUME.trim();
    state.resumeText = SAMPLE_RESUME.trim();
    chrome.storage.local.set({ resumeText: state.resumeText }, () => {
      checkResumeState();
      showToast('Sample Full Stack Engineer resume loaded!');
    });
  });

  // -------------------------------------------------------------
  // 8. License Activation Hook & Gating
  // -------------------------------------------------------------
  activateKeyBtn.addEventListener('click', async () => {
    const rawKey = licenseKeyInput.value.trim();
    licenseActivationStatus.style.display = 'block';
    licenseActivationStatus.style.color = 'var(--text-secondary)';
    licenseActivationStatus.textContent = 'Verifying license key...';

    const verification = await LicenseManager.validateLicenseKey(rawKey);

    if (verification.valid) {
      state.isPro = true;
      state.licenseKey = rawKey.toUpperCase();

      await new Promise(r => {
        chrome.storage.local.set({ isPro: true, licenseKey: state.licenseKey }, r);
      });

      // Update background worker badge
      chrome.runtime.sendMessage({ action: 'UPDATE_BADGE', isPro: true, count: state.scansCount });

      licenseActivationStatus.style.color = '#34D399';
      licenseActivationStatus.textContent = '✓ ' + verification.message;
      updateUIFromState();
      showToast('🎉 JobMatch Pro features unlocked forever!');
      setTimeout(() => switchTab('tab-scan'), 600);
    } else {
      licenseActivationStatus.style.color = '#F87171';
      licenseActivationStatus.textContent = '✗ ' + verification.message;
    }
  });

  // Deactivate License (Switch to Free Mode to test)
  if (deactivateKeyBtn) {
    deactivateKeyBtn.addEventListener('click', () => {
      state.isPro = false;
      state.licenseKey = '';
      state.scansCount = 0;
      state.jobSearchesUsed = 0;
      chrome.storage.local.set({ isPro: false, licenseKey: '', scansCount: 0, jobSearchesUsed: 0 }, () => {
        chrome.runtime.sendMessage({ action: 'UPDATE_BADGE', isPro: false, count: 0 });
        licenseActivationStatus.style.display = 'none';
        licenseKeyInput.value = '';
        updateUIFromState();
        showToast('License removed successfully.');
      });
    });
  }

  // -------------------------------------------------------------
  // 9. Settings Tab Management
  // -------------------------------------------------------------
  // Change License Key (Only for Pro Active customers)
  if (settingsUpdateKeyBtn) {
    settingsUpdateKeyBtn.addEventListener('click', async () => {
      const rawKey = (settingsChangeKeyInput?.value || '').trim();
      if (!rawKey) {
        showToast('Please enter a new license key', 'error');
        return;
      }

      if (settingsChangeKeyStatus) {
        settingsChangeKeyStatus.style.display = 'block';
        settingsChangeKeyStatus.style.color = 'var(--text-secondary)';
        settingsChangeKeyStatus.textContent = 'Verifying new key...';
      }
      settingsUpdateKeyBtn.disabled = true;

      const verification = await LicenseManager.validateLicenseKey(rawKey);

      if (verification.valid) {
        state.isPro = true;
        state.licenseKey = rawKey.toUpperCase();
        await new Promise(r => {
          chrome.storage.local.set({ isPro: true, licenseKey: state.licenseKey }, r);
        });
        chrome.runtime.sendMessage({ action: 'UPDATE_BADGE', isPro: true, count: state.scansCount });

        if (settingsChangeKeyStatus) {
          settingsChangeKeyStatus.style.color = '#34D399';
          settingsChangeKeyStatus.textContent = '✓ ' + verification.message;
        }
        if (settingsChangeKeyInput) settingsChangeKeyInput.value = '';
        updateUIFromState();
        showToast('License key updated successfully!');
      } else {
        if (settingsChangeKeyStatus) {
          settingsChangeKeyStatus.style.color = '#F87171';
          settingsChangeKeyStatus.textContent = '✗ ' + verification.message;
        }
      }
      settingsUpdateKeyBtn.disabled = false;
    });
  }

  // Link for free users in settings to jump to Upgrade tab
  if (settingsUpgradeLinkBtn) {
    settingsUpgradeLinkBtn.addEventListener('click', () => switchTab('tab-pro'));
  }

  saveAiKeyBtn.addEventListener('click', () => {
    const key = customAiKeyInput.value.trim();
    state.customApiKey = key;
    chrome.storage.local.set({ customApiKey: key }, () => {
      showToast(key ? 'Custom API key saved!' : 'Custom API key removed');
    });
  });

  clearDataBtn.addEventListener('click', () => {
    if (confirm('Are you sure you want to clear all saved resume and scan data?')) {
      chrome.storage.local.clear(() => {
        state.resumeText = '';
        state.scansCount = 0;
        state.jobSearchesUsed = 0;
        state.isPro = false;
        state.licenseKey = '';
        state.customApiKey = '';
        state.lastAnalysis = null;
        state.detectedJob = { title: 'Job Not Auto-Detected', company: 'No job loaded', text: '' };
        if (resumeInput) resumeInput.value = '';
        if (manualJobInput) manualJobInput.value = '';
        if (scanResultsContainer) scanResultsContainer.style.display = 'none';
        if (detectedJobTitle) detectedJobTitle.textContent = 'Job Not Auto-Detected';
        if (detectedJobCompany) detectedJobCompany.textContent = 'No job loaded';
        chrome.runtime.sendMessage({ action: 'UPDATE_BADGE', isPro: false, count: 0 });
        updateUIFromState();
        showToast('All extension data cleared.');
      });
    }
  });

  // -------------------------------------------------------------
  // 10. Smart Job Finder & Direct Portal Links
  // -------------------------------------------------------------
  const quickSearchLinkedinBtn = document.getElementById('quick-search-linkedin-btn');
  const quickSearchIndeedBtn = document.getElementById('quick-search-indeed-btn');
  const quickSearchGoogleBtn = document.getElementById('quick-search-google-btn');

  const jobSearchRole = document.getElementById('job-search-role');
  const jobSearchLocation = document.getElementById('job-search-location');
  const btnLocRemote = document.getElementById('btn-loc-remote');
  const btnLocNearby = document.getElementById('btn-loc-nearby');
  const jobSearchSkillsChips = document.getElementById('job-search-skills-chips');

  const launchLinkedinJobs = document.getElementById('launch-linkedin-jobs');
  const launchIndeedJobs = document.getElementById('launch-indeed-jobs');
  const launchGoogleJobs = document.getElementById('launch-google-jobs');
  const launchRemoteJobs = document.getElementById('launch-remote-jobs');

  let selectedSearchSkills = new Set();

  // Gated Main Button on Scanner Dashboard
  if (findSimilarJobsMainBtn) {
    findSimilarJobsMainBtn.addEventListener('click', () => {
      if (!state.isPro && state.jobSearchesUsed >= 1) {
        showToast("You've used your 1 free job search. Upgrade to Pro for unlimited searches!", 'error');
        switchTab('tab-pro');
        return;
      }
      updateJobSearchFields();
      switchTab('tab-find-jobs');
      if (!state.isPro) {
        showToast('Tip: You have 1 free search. Select a job portal below!', 'info');
      }
    });
  }

  if (jobSearchUpgradeBtn) {
    jobSearchUpgradeBtn.addEventListener('click', () => switchTab('tab-pro'));
  }

  function updateJobSearchFields() {
    if (jobSearchRole && !jobSearchRole.value) {
      if (state.detectedJob && state.detectedJob.title && !state.detectedJob.title.includes('Not Auto-Detected')) {
        jobSearchRole.value = state.detectedJob.title.replace(/(Senior|Junior|Lead|Staff|Principal|\(.*\))/gi, '').trim() || state.detectedJob.title;
      } else {
        jobSearchRole.value = 'Full Stack Engineer';
      }
    }

    if (jobSearchLocation && !jobSearchLocation.value) {
      jobSearchLocation.value = 'Remote';
    }

    // Populate skills chips from resume or last scan
    if (jobSearchSkillsChips) {
      const skills = state.lastAnalysis?.matched?.length 
        ? state.lastAnalysis.matched 
        : extractSkillsFromText(state.resumeText);
      
      const topSkills = skills.slice(0, 6);
      jobSearchSkillsChips.innerHTML = '';
      
      if (topSkills.length === 0) {
        jobSearchSkillsChips.innerHTML = '<span class="pill-empty-note">Add resume to include skills in search.</span>';
      } else {
        topSkills.forEach((skill, idx) => {
          if (idx < 3) selectedSearchSkills.add(skill);
          const chip = document.createElement('div');
          chip.className = `pill ${selectedSearchSkills.has(skill) ? 'pill-matched' : 'pill-empty-note'}`;
          chip.style.cursor = 'pointer';
          chip.textContent = `${selectedSearchSkills.has(skill) ? '✓ ' : '+ '}${skill}`;
          chip.addEventListener('click', () => {
            if (selectedSearchSkills.has(skill)) {
              selectedSearchSkills.delete(skill);
              chip.className = 'pill pill-empty-note';
              chip.textContent = `+ ${skill}`;
            } else {
              selectedSearchSkills.add(skill);
              chip.className = 'pill pill-matched';
              chip.textContent = `✓ ${skill}`;
            }
          });
          jobSearchSkillsChips.appendChild(chip);
        });
      }
    }
  }

  function executeJobSearch(platform) {
    // 1-Time Free Usage Gate for Job Searches
    if (!state.isPro) {
      if (state.jobSearchesUsed >= 1) {
        showToast("Free search limit reached (1/1). Upgrade to Pro for unlimited job searches!", 'error');
        switchTab('tab-pro');
        return;
      }
      // Consume the 1 free search
      state.jobSearchesUsed = 1;
      chrome.storage.local.set({ jobSearchesUsed: 1 });
      updateUIFromState();
      showToast('1 Free Job Search used! Upgrade to Pro for unlimited searches.');
    }

    const role = (jobSearchRole?.value || state.detectedJob?.title || 'Software Engineer')
      .replace(/(Senior|Junior|Lead|Staff|Principal|\(.*\))/gi, '').trim() || 'Software Engineer';
    const loc = (jobSearchLocation?.value || 'Remote').trim();
    const skillsArray = Array.from(selectedSearchSkills);
    const skillsQuery = skillsArray.slice(0, 3).join(' ');

    let url = '';

    if (platform === 'linkedin') {
      const query = encodeURIComponent(`${role} ${skillsQuery}`.trim());
      const locParam = encodeURIComponent(loc);
      url = `https://www.linkedin.com/jobs/search/?keywords=${query}&location=${locParam}&f_TPR=r604800`;
    } else if (platform === 'indeed') {
      const query = encodeURIComponent(`${role} ${skillsQuery}`.trim());
      const locParam = encodeURIComponent(loc);
      url = `https://www.indeed.com/jobs?q=${query}&l=${locParam}&fromage=7`;
    } else if (platform === 'google') {
      const query = loc.toLowerCase().includes('remote') 
        ? `${role} remote jobs` 
        : `${role} jobs in ${loc}`;
      url = `https://www.google.com/search?q=${encodeURIComponent(query)}&ibp=htl;jobs`;
    } else if (platform === 'remote') {
      url = `https://wellfound.com/jobs?role=${encodeURIComponent(role)}&remote=true`;
    }

    if (url) {
      chrome.tabs.create({ url });
    }
  }

  // Bind Location & Launch Buttons
  if (btnLocRemote && jobSearchLocation) {
    btnLocRemote.addEventListener('click', () => { jobSearchLocation.value = 'Remote'; });
  }
  if (btnLocNearby && jobSearchLocation) {
    btnLocNearby.addEventListener('click', () => { jobSearchLocation.value = 'Nearby'; });
  }

  if (launchLinkedinJobs) launchLinkedinJobs.addEventListener('click', () => executeJobSearch('linkedin'));
  if (launchIndeedJobs) launchIndeedJobs.addEventListener('click', () => executeJobSearch('indeed'));
  if (launchGoogleJobs) launchGoogleJobs.addEventListener('click', () => executeJobSearch('google'));
  if (launchRemoteJobs) launchRemoteJobs.addEventListener('click', () => executeJobSearch('remote'));

  if (quickSearchLinkedinBtn) quickSearchLinkedinBtn.addEventListener('click', () => executeJobSearch('linkedin'));
  if (quickSearchIndeedBtn) quickSearchIndeedBtn.addEventListener('click', () => executeJobSearch('indeed'));
  if (quickSearchGoogleBtn) quickSearchGoogleBtn.addEventListener('click', () => executeJobSearch('google'));

  // -------------------------------------------------------------
  // Initial Boot
  // -------------------------------------------------------------
  await loadState();
  updateJobSearchFields();
  fetchJobFromActiveTab();
});
