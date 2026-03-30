// src/lib/mock-data/referral.ts
// Mock data adapter for the Referral Center UI.
// Swap getReferralDashboardData() implementation for live Rewardful API call
// when credentials are ready — the UI components require no changes.

import type { ReferralDashboardData } from '@/types/referral'

export function getMockReferralData(memberName?: string): ReferralDashboardData {
  return {
    referralLink: `https://gotpositives.com/?via=${memberName?.toLowerCase().replace(/\s+/g, '') ?? 'youralias'}`,
    clicks: 47,
    leads: 12,
    paidConversions: 3,
    commissionsEarned: 147.00,
    commissionsPaid: 98.00,
    recruiterOverrideEarned: 14.70,
    payoutStatus: 'configured',
    lastPayoutDate: '2026-02-28',
    affiliateStatus: 'active',
    faqItems: [
      {
        question: 'How does the referral program work?',
        answer: 'When someone clicks your unique referral link and subscribes, you earn a commission on their first payment and recurring renewals.',
      },
      {
        question: 'How much do I earn per referral?',
        answer: 'You earn 20% commission on every referred member\'s subscription — monthly or annual. Commissions are recurring as long as they stay subscribed.',
      },
      {
        question: 'When do I get paid?',
        answer: 'Commissions are paid out monthly via PayPal or bank transfer once your balance reaches the $50 minimum.',
      },
      {
        question: 'What is the recruiter override?',
        answer: 'If you recruited another affiliate to the program, you earn an additional 10% override on their commissions — a two-tier structure.',
      },
      {
        question: 'How do I set up my payout method?',
        answer: 'Click "Manage Affiliate Account" to access your full affiliate dashboard where you can configure your payout method.',
      },
    ],
  }
}
