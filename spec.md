# CyberFit Gym

## Current State
New project. No existing code.

## Requested Changes (Diff)

### Add
- Full single-page scrolling cyberpunk gym website
- Fixed navigation bar with logo, gym name, menu links, and glowing Join Now button
- Hero section with futuristic background, main heading, subheading, animated CTA button, and stats bar
- About section with two-column layout (image + text)
- Facilities section with grid of glowing hover cards (6 facilities)
- Membership plans section with two pricing cards (Regular ₹500/mo, Premium ₹1500/mo)
- Member counter system with animated counting effect; counter increments when form is submitted
- Gallery section with grid of gym placeholder images and neon hover effects
- Testimonials section with glowing cards and placeholder member photos
- Join Membership form (Name, Phone, Email, Plan selection) with success confirmation
- Contact section with address, phone, WhatsApp, email, map placeholder, and contact form
- Footer with logo, tagline, quick links, contact info, social icons, copyright
- Backend canister to persist member count (increment on membership form submit, read current count)
- Cyberpunk dark theme: black/dark-purple background, neon blue/pink/green accents, glowing grid lines, animated particles
- Futuristic fonts, glowing buttons, scroll-triggered fade-in animations, hover effects
- Fully responsive with hamburger menu on mobile

### Modify
- Nothing (new project)

### Remove
- Nothing

## Implementation Plan
1. Generate hero background image (futuristic gym, dark cyberpunk)
2. Generate about section gym interior image
3. Generate gallery images (6 gym/workout placeholder images)
4. Generate Motoko backend with `getMemberCount` and `incrementMemberCount` functions
5. Build full React frontend with all 11 sections, cyberpunk design system, animations, and backend integration
6. Deploy
