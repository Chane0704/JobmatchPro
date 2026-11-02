// JobMatch Pro - License Key Verification & Feature Gating
// Supports your personal master lifetime key and Lemon Squeezy / Dodo Payments / Gumroad API endpoints.

const LicenseManager = {
  // Configuration
  config: {
    // Set provider to 'production' or 'mock'
    provider: 'production', 
    apiEndpoint: 'https://api.example.com/v1/licenses/validate',
    productId: 'jobmatch_pro_lifetime'
  },

  // Exclusive Master Lifetime Keys (Reserved for you)
  MASTER_KEYS: [
    'ANISH-PRO-LIFETIME-VIP',
    'ANISH-2026-UNLIMITED'
  ],

  /**
   * Validates a license key.
   * @param {string} rawKey 
   * @returns {Promise<{valid: boolean, message: string, license?: object}>}
   */
  async validateLicenseKey(rawKey) {
    const key = (rawKey || '').trim().toUpperCase();

    if (!key) {
      return { valid: false, message: 'Please enter a license key.' };
    }

    // 1. Check Exclusive Master Developer Keys
    if (this.MASTER_KEYS.includes(key)) {
      await new Promise(r => setTimeout(r, 350));
      return {
        valid: true,
        message: 'Master Pro License Unlocked — Unlimited Scans Active!',
        license: {
          key,
          type: 'Developer Master Lifetime VIP',
          activatedAt: new Date().toISOString()
        }
      };
    }

    // 2. Real Payment Provider Webhook / API Hook (Lemon Squeezy / Dodo Payments / Custom)
    // Only query external server if a real endpoint is configured
    if (this.config.provider === 'production' && !this.config.apiEndpoint.includes('example.com')) {
      try {
        const response = await fetch(this.config.apiEndpoint, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
          },
          body: JSON.stringify({
            license_key: key,
            product_id: this.config.productId
          })
        });

        if (!response.ok) {
          return { valid: false, message: `Server error: HTTP ${response.status}. Please check your key.` };
        }

        const data = await response.json();
        const isValid = data.valid === true || data.status === 'active' || data.success === true;

        if (isValid) {
          return {
            valid: true,
            message: 'Pro license verified and activated!',
            license: data
          };
        } else {
          return {
            valid: false,
            message: data.error || data.message || 'Invalid or expired license key.'
          };
        }
      } catch (err) {
        console.warn('Network license verification failed:', err);
        return {
          valid: false,
          message: 'Could not reach license verification server. Check your internet connection.'
        };
      }
    }

    // 3. Reject unauthorized / random keys
    await new Promise(r => setTimeout(r, 400));
    return {
      valid: false,
      message: 'Invalid license key. Please check your purchase confirmation or upgrade to Pro.'
    };
  }
};
