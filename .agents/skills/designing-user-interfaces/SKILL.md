---
name: designing-user-interfaces
description: Provides design intelligence for building professional UI/UX. Use when the user asks to build a landing page, design a dashboard, create UI components, or apply styling best practices.
---

# UI UX Pro Max - Design Intelligence

## When to use this skill
- When designing new UI components, landing pages, or dashboards.
- When choosing color palettes, typography, or styling themes.
- When reviewing code for UX issues or implementing accessibility requirements.

## Workflow

- [ ] **1. Requirements Gathering**
    - Identify the product type, industry, style keywords, and tech stack from the user's request.
- [ ] **2. Generate Design System**
    - Define the core design system including color palettes, typography pairings, style patterns (e.g., Minimal, Glassmorphism), and interaction effects.
- [ ] **3. Implement the UI**
    - Apply the generated design system rules to structure and style the frontend code.
- [ ] **4. Validation & Pre-Delivery Check**
    - Evaluate constraints, focusing on Accessibility (contrast, focus states), Touch/Interaction (cursor pointers, hover feedback), and Layout responsiveness.

## Instructions
- **Visual Quality & Icons**: Use scalable SVG icons (e.g., Lucide, Heroicons) rather than emojis. Do not guess brand logos.
- **Interaction & Hover**: Add `cursor-pointer` to all interactive elements. Ensure hover transitions are smooth (150-300ms) and utilize color/opacity changes rather than layout-breaking scale transforms.
- **Dark/Light Themes**: Test color contrast. In light mode, ensure glass/transparent layers use sufficient opacity (e.g. `bg-white/80`) and text contrast reaches at least 4.5:1. 
- **Layout**: Float navbars with correct edge spacing. Use standard container max-widths and prevent mobile horizontal scrolling. Protect against "content jumping" for async data.
- **Accessibility (a11y)**: All images must have alt text, inputs need labels, and interactive states must support keyboard navigation.

## Resources
- [UI UX Pro Max GitHub Repository](https://github.com/nextlevelbuilder/ui-ux-pro-max-skill.git)
