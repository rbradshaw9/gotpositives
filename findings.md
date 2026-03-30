# Findings

## Research & Discoveries
- Need to investigate the best library or approach for background audio playback in a Next.js PWA (e.g., using the Media Session API, or a specialized audio library like standard HTML5 Audio with appropriate media tags). Next.js PWA background audio requires careful testing on iOS and Android.
- Need to map out Stripe webhook events required for subscription states (e.g., `customer.subscription.created`, `customer.subscription.updated`, `customer.subscription.deleted`, `invoice.payment_succeeded`, `invoice.payment_failed`).
- Need to determine Castos private RSS feed consumption pattern within the app versus Mux for video.

## Constraints
- Server-side access decisions only (Next.js middleware). No relying on client-state for access gating.
- Audio player is #1 priority and must work flawlessly on mobile.
- Content must be presented seamlessly without a feeling of "falling behind" (rhythm vs dates).
