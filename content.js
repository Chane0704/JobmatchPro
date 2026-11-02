// JobMatch Pro - Content Script Scraper for Job Postings
// Extracts job title, company name, and raw description text across major job boards.

(function () {
  /**
   * Helper to find text by trying multiple CSS selectors in order.
   */
  function queryText(selectors, root = document) {
    for (const selector of selectors) {
      const el = root.querySelector(selector);
      if (el && el.innerText && el.innerText.trim().length > 0) {
        return el.innerText.trim();
      }
    }
    return '';
  }

  /**
   * Extracts details specifically from LinkedIn job view.
   */
  function extractLinkedIn() {
    const titleSelectors = [
      '.job-details-jobs-unified-top-card__job-title',
      '.jobs-unified-top-card__job-title',
      '.jobs-details__main-content h1',
      '.job-details-jobs-unified-top-card__job-title-link',
      '.topcard__title',
      '.top-card-layout__title',
      'h1.t-24',
      'h1[class*="job-title"]',
      'h1'
    ];

    const companySelectors = [
      '.job-details-jobs-unified-top-card__company-name',
      '.jobs-unified-top-card__company-name',
      '.job-details-jobs-unified-top-card__primary-description a',
      '.jobs-details__main-content a[href*="/company/"]',
      'a.ember-view[href*="/company/"]',
      '.topcard__org-name-link',
      '.top-card-layout__first-subline a',
      '.jobs-unified-top-card__subtitle-primary-grouping a',
      'a[class*="topcard__org-name-link"]'
    ];

    const descSelectors = [
      '#job-details',
      '.jobs-description-content__text',
      '.jobs-box__html-content',
      '.jobs-description__content',
      'article.jobs-description__container',
      '.show-more-less-html__markup',
      '.description__text',
      '[data-job-description]'
    ];

    const title = queryText(titleSelectors);
    const company = queryText(companySelectors);
    const text = queryText(descSelectors);

    if (text && text.length > 50) {
      return { title: title || 'LinkedIn Job', company: company || 'Company', text };
    }
    return null;
  }

  /**
   * Extracts details specifically from Indeed job posting.
   */
  function extractIndeed() {
    const titleSelectors = [
      '.jobsearch-JobInfoHeader-title',
      'h1[data-testid="jobsearch-JobInfoHeader-title"]',
      'h1.jobsearch-JobInfoHeader-title',
      'h1'
    ];

    const companySelectors = [
      '[data-company-name="true"]',
      '[data-testid="inlineHeader-companyName"]',
      '.jobsearch-InlineCompanyRating-companyHeader',
      '.jobsearch-CompanyInfoContainer'
    ];

    const descSelectors = [
      '#jobDescriptionText',
      '.jobsearch-JobComponent-description',
      '#jobDescriptionSection'
    ];

    const title = queryText(titleSelectors);
    const company = queryText(companySelectors);
    const text = queryText(descSelectors);

    if (text && text.length > 50) {
      return { title: title || 'Indeed Job', company: company || 'Company', text };
    }
    return null;
  }

  /**
   * Extracts details specifically from Greenhouse job boards.
   */
  function extractGreenhouse() {
    const titleSelectors = ['.app-title', 'h1.app-title', 'h1'];
    const companySelectors = ['.company-name', 'span.company-name'];
    const descSelectors = ['#content', '#app-body', '.content'];

    const title = queryText(titleSelectors);
    const company = queryText(companySelectors);
    const text = queryText(descSelectors);

    if (text && text.length > 50) {
      return { title: title || 'Greenhouse Job', company: company || 'Company', text };
    }
    return null;
  }

  /**
   * Fallback extractor for Lever, Workday, or highlighted text on any webpage.
   */
  function extractGenericFallback() {
    // If user highlighted text on the page, prioritize it!
    const selection = window.getSelection() ? window.getSelection().toString().trim() : '';
    if (selection && selection.length > 40) {
      const pageTitle = document.title || 'Selected Job Description';
      return {
        title: pageTitle.split('-')[0].split('|')[0].trim() || 'Selected Job Posting',
        company: 'Web Posting',
        text: selection
      };
    }

    // Lever support
    const leverDesc = queryText(['.posting-requirements', '.posting-page', '.section.page-centered']);
    if (leverDesc && leverDesc.length > 50) {
      const leverTitle = queryText(['.posting-headline h2', 'h2']);
      return { title: leverTitle || 'Job Posting', company: 'Company', text: leverDesc };
    }

    // Main article/body fallback
    const mainEl = document.querySelector('main, article, [role="main"]');
    if (mainEl && mainEl.innerText && mainEl.innerText.length > 100) {
      return {
        title: queryText(['h1']) || document.title || 'Job Posting',
        company: 'Company',
        text: mainEl.innerText.trim()
      };
    }

    return null;
  }

  /**
   * Master extraction function dispatching by hostname and fallback.
   */
  function extractJobDetails() {
    const host = window.location.hostname;
    const pathname = window.location.pathname;

    // Check highlighted text first (priority across any page)
    const selection = window.getSelection() ? window.getSelection().toString().trim() : '';
    if (selection && selection.length > 40) {
      const pageTitle = document.title || 'Selected Job Description';
      return {
        title: pageTitle.split('-')[0].split('|')[0].trim() || 'Selected Job Posting',
        company: 'Page Selection',
        text: selection
      };
    }

    let data = null;

    if (host.includes('linkedin.com')) {
      data = extractLinkedIn();
      
      // If no job posting container was found on LinkedIn
      if (!data) {
        if (pathname.startsWith('/feed') || pathname.startsWith('/in/') || pathname.startsWith('/mynetwork') || pathname.startsWith('/notifications')) {
          return {
            error: "You are on your LinkedIn Feed or Profile. Open a specific job posting to scan it, or highlight any job text."
          };
        }
        if (pathname === '/jobs/' || pathname === '/jobs' || pathname.startsWith('/jobs/tracker') || pathname.startsWith('/jobs/preferences')) {
          return {
            error: "You are on the LinkedIn Jobs landing page. Please click on a specific job opening to view and scan it!"
          };
        }
        return {
          error: "No active job posting found on this LinkedIn page. Click on a job opening from the list or highlight the job description."
        };
      }
    } else if (host.includes('indeed.com')) {
      data = extractIndeed();
    } else if (host.includes('greenhouse.io')) {
      data = extractGreenhouse();
    }

    // If specific site scraper failed or user is on another job page, try generic fallback
    if (!data) {
      data = extractGenericFallback();
    }

    return data;
  }

  // Listen for message from popup.js
  chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    if (request.action === 'EXTRACT_JOB_DETAILS') {
      const details = extractJobDetails();

      if (details && details.text) {
        sendResponse({
          success: true,
          title: details.title,
          company: details.company,
          text: details.text
        });
      } else {
        sendResponse({
          success: false,
          error: details?.error || 'No supported job description found on this page. Highlight the job text or open a job posting on LinkedIn, Indeed, or Greenhouse.'
        });
      }
    }
    // Return true to keep message channel open for async response
    return true;
  });
})();
