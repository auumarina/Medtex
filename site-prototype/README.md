# MedTehMaks site prototype

This folder contains a local B2C homepage prototype for MedTehMaks.

Files:

- `index.html` — homepage structure and copy
- `category-oxygen.html` — category page prototype
- `category-nebulizers.html` — category page for nebulizers
- `category-recirculators.html` — category page for recirculators
- `category-monitoring.html` — category page for home monitoring devices
- `category-home-care.html` — category page for home care and rehabilitation
- `selection-help.html` — conversion page for assisted product selection
- `delivery-payment.html` — service page for purchase conditions
- `warranty-support.html` — trust page for warranty and documents
- `contacts-company.html` — contact and trust page for B2C communication paths
- `for-clinics.html` — B2B landing page for clinics, cabinets and medical centers (separate B2B branch)
- `site-config.js` — single editable config for contacts, messengers, core trust metrics, and B2B data (separate B2B contacts, ЭДО, НДС)
- `site.js` — shared client layer for scenario routing, forms, and business-data hydration across the prototype
- `b2b.js` — B2B data hydration layer for the clinics page (separate B2B phones, emails, ЭДО, thresholds)
- `landing-oxygen-home.html` — Yandex Direct landing page prototype
- `landing-nebulizer-kid.html` — narrow landing page for child nebulizer queries
- `landing-recirculator-home.html` — narrow landing page for home recirculator queries
- `landing-pulseoximeter-home.html` — narrow landing page for home pulse oximeter queries
- `landing-med-bed-home.html` — narrow landing page for home medical bed queries
- `product-oxygen-5l.html` — product page prototype
- `product-nebulizer-family.html` — nebulizer product page prototype
- `product-recirculator-quiet-home.html` — home recirculator product page prototype
- `product-pulseoximeter-home-pulse.html` — home pulse oximeter product page prototype
- `product-bed-home-support.html` — home-care bed product page prototype
- `styles.css` — visual system and layout

Purpose:

- move from research to a tangible selling-site concept
- show the correct B2C positioning
- demonstrate a homepage structure suitable for Yandex Direct traffic
- provide a usable base for further implementation in any stack

Current focus:

- strong first-screen offer
- visible consultation path
- category-based navigation
- help-with-selection logic
- trust, delivery, warranty, and reviews
- separate service pages for B2C trust and pre-purchase questions
- comparison blocks inside categories for faster B2C decision-making
- stronger selection-page logic with next-step explanation and FAQ
- interactive scenario selector for faster routing into the right B2C branch
- working lead-form demo with validation, success state, and local lead storage
- centralized business-data layer for phone, email, messengers, and key trust metrics across all pages
- business config extracted into a separate editable file for faster switch from placeholders to real company data
- demo product catalog layer for central prices, statuses, and titles on key cards and product pages
- expanded demo catalog hydration across main categories and ad landing pages
- ad landing page logic
- category-page logic
- product-card logic
- multiple B2C traffic-entry pages

Next logical steps:

1. Replace placeholder contacts and content with real business data
2. Add real product photos, prices, and business trust assets
3. Expand category pages with more real product cards and comparison blocks
4. Convert the prototype into the target stack with forms, analytics, and CRM lead capture

## B2B branch (clinics and medical centers)

`for-clinics.html` is a separate B2B landing page modeled on competitor research (Armed, Dobrota). It covers:

- target segments: private clinics, dental, cosmetology, diagnostics, rehab, state procurement (44-ФЗ / 223-ФЗ)
- full supply cycle: selection, logistics, documents, commissioning, service
- B2B categories: medical equipment, medical furniture, oxygen, recirculators, lab equipment, consumables
- documents and reporting: ЭДО, invoices/acts/УПД, НДС, registration certificates, "Честный знак" marking
- logistics for legal entities: transport companies, self-pickup with power of attorney, free delivery threshold, crating and insurance
- tenders and procurement: 44-ФЗ / 223-ФЗ participation, commercial quotes, wholesale prices
- B2B quote request form (organization, INN, contact, task)
- separate B2B contacts (manager phone, b2b@ email, accounting email)
- B2B FAQ

B2B data is centralized in `site-config.js` under `b2bData` and hydrated by `b2b.js`. Entry points to the B2B branch are integrated into the header nav, the homepage (dedicated teaser block), and the footer of all pages.
