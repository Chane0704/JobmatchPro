// JobMatch Pro - Background Service Worker (Manifest V3)

chrome.runtime.onInstalled.addListener((details) => {
  // Set default values on fresh install
  chrome.storage.local.get(['scansCount', 'isPro', 'resumeText', 'licenseKey', 'jobSearchesUsed'], (data) => {
    const defaults = {};
    if (typeof data.scansCount === 'undefined') defaults.scansCount = 0;
    if (typeof data.isPro === 'undefined') defaults.isPro = false;
    if (typeof data.resumeText === 'undefined') defaults.resumeText = '';
    if (typeof data.licenseKey === 'undefined') defaults.licenseKey = '';
    if (typeof data.jobSearchesUsed === 'undefined') defaults.jobSearchesUsed = 0;

    chrome.storage.local.set(defaults, () => {
      updateBadge(defaults.isPro || data.isPro, defaults.scansCount ?? data.scansCount ?? 0);
    });
  });

  // Create context menu for quick scanning
  if (typeof chrome.contextMenus !== 'undefined' && chrome.contextMenus.create) {
    try {
      chrome.contextMenus.create({
        id: 'jobmatch-scan-selection',
        title: 'Scan selected text with JobMatch Pro',
        contexts: ['selection']
      });
    } catch (e) {
      console.warn('Context menu creation warning:', e);
    }
  }
});

// Handle context menu click
if (typeof chrome.contextMenus !== 'undefined' && chrome.contextMenus.onClicked) {
  chrome.contextMenus.onClicked.addListener((info, tab) => {
    if (info.menuItemId === 'jobmatch-scan-selection' && tab?.id) {
      chrome.storage.local.set({ lastScannedText: info.selectionText }, () => {
        if (chrome.action && chrome.action.openPopup) {
          chrome.action.openPopup().catch(() => {
            // Fallback for browsers that do not support openPopup
          });
        }
      });
    }
  });
}

// Update extension icon badge
function updateBadge(isPro, count) {
  if (isPro) {
    chrome.action.setBadgeText({ text: 'PRO' });
    chrome.action.setBadgeBackgroundColor({ color: '#10B981' }); // Emerald green
  } else {
    const remaining = Math.max(0, 3 - (count || 0));
    chrome.action.setBadgeText({ text: remaining > 0 ? `${remaining}` : '0' });
    chrome.action.setBadgeBackgroundColor({ color: remaining > 0 ? '#6366F1' : '#EF4444' });
  }
}

// Listen for messages from popup or content script
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.action === 'UPDATE_BADGE') {
    updateBadge(request.isPro, request.count);
    sendResponse({ status: 'ok' });
  } else if (request.action === 'GET_STATUS') {
    chrome.storage.local.get(['isPro', 'scansCount'], (data) => {
      sendResponse(data);
    });
    return true;
  }
  return true;
});
