// src/lib/adapters/rewardful.ts
// ============================================================
// Adapter: Rewardful API → ReferralDashboardData
// 
// When live credentials are ready, getReferralDashboardData()
// should call the Rewardful API and pass the result here.
// The ReferralCenter UI requires zero changes.
// ============================================================

import type { ReferralDashboardData } from '@/types/referral'

interface RewardfulAffiliate {
  id: string
  token: string                  // the referral link token
  state: 'active' | 'inactive' | 'pending'
  campaign?: {
    url: string                  // base campaign URL
  }
  // Stats fields (may vary — verify against live response)
  visitors?: number
  leads?: number
  conversions?: number
  commission_stats?: {
    earned?: number
    paid?: number
  }
}

/**
 * Maps a raw Rewardful affiliate object to our internal ReferralDashboardData.
 * Call this once the live API response is available.
 *
 * @param affiliate - Raw affiliate object from Rewardful API
 * @param recruiterOverride - Override commissions if available separately
 * @param lastPayoutDate - From payout history, if fetched
 * @returns ReferralDashboardData ready for the UI
 */
export function mapRewardfulAffiliateToUI(
  affiliate: RewardfulAffiliate,
  recruiterOverride: number = 0,
  lastPayoutDate: string | null = null,
): ReferralDashboardData {
  const campaignBase = affiliate.campaign?.url ?? 'https://gotpositives.com'
  const referralLink = `${campaignBase}?via=${affiliate.token}`

  const affiliateStatusMap: Record<string, ReferralDashboardData['affiliateStatus']> = {
    active:   'active',
    pending:  'pending',
    inactive: 'not_joined',
  }

  return {
    referralLink,
    clicks: affiliate.visitors ?? 0,
    leads: affiliate.leads ?? 0,
    paidConversions: affiliate.conversions ?? 0,
    commissionsEarned: affiliate.commission_stats?.earned ?? 0,
    commissionsPaid: affiliate.commission_stats?.paid ?? 0,
    recruiterOverrideEarned: recruiterOverride,
    payoutStatus: 'pending_setup', // determine from payout method presence once live
    lastPayoutDate,
    affiliateStatus: affiliateStatusMap[affiliate.state] ?? 'not_joined',
    faqItems: getDefaultFaqItems(),
  }
}

function getDefaultFaqItems(): ReferralDashboardData['faqItems'] {
  return [
    {
      question: 'How does the referral program work?',
      answer: 'When someone clicks your unique referral link and subscribes, you earn a commission on their first payment and recurring renewals.',
    },
    {
      question: 'How much do I earn per referral?',
      answer: "You earn 20% commission on every referred member's subscription — monthly or annual. Commissions are recurring as long as they stay subscribed.",
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
  ]
}
