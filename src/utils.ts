/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

type Subscriber = (currency: string, billing: 'monthly' | 'annual') => void;

class PricingChannel {
  private currency = 'USD';
  private billing: 'monthly' | 'annual' = 'monthly';
  private subscribers = new Set<Subscriber>();

  constructor() {
    // Initial sync
  }

  getCurrency() {
    return this.currency;
  }

  getBilling() {
    return this.billing;
  }

  update(currency: string, billing: 'monthly' | 'annual') {
    this.currency = currency;
    this.billing = billing;
    this.subscribers.forEach((sub) => {
      try {
        sub(currency, billing);
      } catch (err) {
        console.error('Error updating pricing subscriber:', err);
      }
    });
  }

  subscribe(sub: Subscriber) {
    this.subscribers.add(sub);
    // Run immediately for initial synchronization
    sub(this.currency, this.billing);
    return () => {
      this.subscribers.delete(sub);
    };
  }
}

// Single channel instance ensuring state isolation
export const globalPricingChannel = new PricingChannel();
