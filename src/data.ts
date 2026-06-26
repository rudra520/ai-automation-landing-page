/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { PricingMatrix } from './types';

export const PRICING_MATRIX: PricingMatrix = {
  tiers: [
    {
      id: 'starter',
      name: 'Starter Tier',
      description: 'Ideal for early-stage developers and tiny experimental projects.',
      baseMonthlyRate: 15, // USD base per month
      features: [
        'Up to 3 active developer sandboxes',
        'Direct serverless API routing endpoints',
        '5,000 requests per hour limit',
        'Shared runtime cluster execution',
        'Standard Discord support community access'
      ],
      popular: false
    },
    {
      id: 'professional',
      name: 'Professional Tier',
      description: 'A perfect sweet-spot for production deployments and growing companies.',
      baseMonthlyRate: 49, // USD base per month
      features: [
        'Unlimited sandboxes & endpoints',
        'Custom domain bindings & SSL certs',
        '100,000 requests per hour ceiling',
        'Dedicated serverless runtime instances',
        'Direct 1-on-1 team email support channel',
        'Comprehensive historical telemetry graphs'
      ],
      popular: true
    },
    {
      id: 'enterprise',
      name: 'Enterprise Tier',
      description: 'Engineered for dedicated infrastructure, scale, and compliance.',
      baseMonthlyRate: 125, // USD base per month
      features: [
        'Multi-region high-availability failover',
        'Dedicated bare-metal container execution',
        'No query rate-limits or payload constraints',
        '24/7/365 pager support with strict SLAs',
        'SAML, OIDC & SSO identity providers',
        'Custom integrations with private virtual clouds'
      ],
      popular: false
    }
  ],
  billing: {
    monthly: {
      id: 'monthly',
      label: 'Monthly',
      multiplier: 1.0,
      discountPercentage: 0
    },
    annual: {
      id: 'annual',
      label: 'Annual Plan',
      multiplier: 0.8, // Flat 20% discount applied to the base rate
      discountPercentage: 20
    }
  },
  currencies: {
    USD: {
      code: 'USD',
      symbol: '$',
      multiplier: 1.0,
      suffix: 'USD',
      name: 'United States Dollar'
    },
    EUR: {
      code: 'EUR',
      symbol: '€',
      multiplier: 0.92,
      suffix: 'EUR',
      name: 'Euro'
    },
    INR: {
      code: 'INR',
      symbol: '₹',
      multiplier: 83.5,
      suffix: 'INR',
      name: 'Indian Rupee'
    }
  }
};
