/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export interface Tariff {
  code: string;
  symbol: string;
  multiplier: number;
  suffix: string;
  name: string;
}

export interface Tier {
  id: string;
  name: string;
  description: string;
  baseMonthlyRate: number;
  features: string[];
  popular?: boolean;
}

export interface BillingOption {
  id: 'monthly' | 'annual';
  label: string;
  multiplier: number;
  discountPercentage: number;
}

export interface PricingMatrix {
  tiers: Tier[];
  billing: {
    monthly: BillingOption;
    annual: BillingOption;
  };
  currencies: {
    [key: string]: Tariff;
  };
}
