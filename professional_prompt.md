# Professional Prompt: Deep Studio Multi-Service Website Creation

Copy the text below to use with any AI coding model to recreate or extend this website.

---

```markdown
Role: Premium Web Developer & SEO Specialist
Task: Create a modern, responsive, and SEO-optimized website for "Deep Studio" based in Deriapur, West Bengal.

## 1. Business & Niche Context
Deep Studio is a multi-service business catering to two distinct local needs:
1. Creative Studio: Professional event photography & videography (specializing in marriage, birthdays, etc.) alongside high-capacity document services (high-speed B&W and color photostats, Xerox copies, scans, laminations, and passport photos).
2. Vehicle Rentals: Rugged Mahindra Bolero SUV rentals (with professional local drivers) for outstation tours, local errands, and wedding guest transportation in Deriapur, West Bengal.

## 2. Core SEO Strategy
To rank highly for specific local search queries, the website must use a multi-page architecture with separate target landing pages containing optimized keywords, headings, title tags, and meta descriptions:
- Homepage (index.html): Portal overview summarizing both services.
- Photography & Photostats Page (photography.html): Target keywords: "marriage photography Deriapur", "birthday photoshoot West Bengal", "photostat shop Deriapur", "Xerox copy printing".
- Bolero Car Rental Page (car-rental.html): Target keywords: "bolero car renting in Deriapur West Bengal", "SUV rental Deriapur", "wedding car booking Deriapur".
- About Us Page (about.html): Local brand story and map.
- Contact Page (contact.html): Direct booking numbers, WhatsApp links, and forms.

## 3. Design Aesthetics & Visual Guidelines
- Theme: Implement a full light-and-dark theme system with an extremely attractive, custom-designed toggle button.
  - Light Mode: Creamy off-white background (#f8fafc), white cards (#ffffff), dark slate text (#0f172a) for readability, amber/gold accent (#d97706).
  - Dark Mode: Premium deep indigo-black background (#090d16), charcoal cards (#111726), bright white text (#f8fafc), glowing gold accent (#fbbf24).
- Theme Toggle Style: A pill-shaped toggle button with a sliding knob. Moving to the left displays a golden sun icon (Light Mode); sliding to the right activates a moon icon (Dark Mode) with smooth CSS transform transitions.
- Typography: Use premium Google Fonts (e.g., 'Outfit' for headings, 'Plus Jakarta Sans' for body text) with fallback sans-serif rules. No default browser fonts.
- Layouts: Modern grid structures, flexboxes, and subtle glassmorphism cards with smooth hover lift effects and glowing borders.

## 4. Key Interactive Components
1. Header Navbar: Sticky on scroll with a blurred backdrop (backdrop-filter: blur) and animated mobile hamburger toggle.
2. Review Carousel: A smooth auto-sliding review carousel highlighting mock testimonials from clients referencing weddings, photocopy quality, and safe Bolero driving in West Bengal.
3. FAQ Accordion: A list of clean accordion items. Clicking a header expands its max-height with a slide-down transition and rotates a chevron icon.
4. Lightbox Gallery: A photography grid showing wedding/birthday photos. Clicking an image opens a modal backdrop displaying the full-size image with a close button.
5. Inquiries Form: Forms for photography bookings and car rental requests. Submit actions should trigger loading spinners and clear submission popups.

## 5. File Structure to Generate
- index.html (Home page overview)
- photography.html (Photography packages, Xerox pricing table, portfolio lightbox, booking form)
- car-rental.html (Mahindra Bolero features, tour packages, booking form)
- about.html (History, leadership team profiles, and google maps embed)
- contact.html (Addresses, telephones, WhatsApp links, general inquiry form, google map)
- styles.css (Universal stylesheet containing variable mappings, layout setups, responsive breakpoints, transitions)
- script.js (Interactive logic for sticky navbar, theme switching with localStorage, FAQs, carousels, lightbox, forms)
```
