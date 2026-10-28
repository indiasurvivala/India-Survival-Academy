# India Survival Academy — Frontend Web Application

A complete, production-ready, premium frontend website for **India Survival Academy** (an outdoor and wilderness survival training academy).

Built with a cinematic wilderness aesthetic inspired by rugged forests and mountain terrain, featuring restrained gold accents, deep forest greens, robust typography, accessible interactive components, and strict non-fabrication of business data.

---

## 🌲 Technology Stack

- **Framework:** React 18 with TypeScript (Strict mode)
- **Build Tool:** Vite 5
- **Styling:** Tailwind CSS with custom wilderness palette
- **Routing:** React Router DOM v6
- **Icons:** Lucide React
- **Animations:** Framer Motion (respects `prefers-reduced-motion`)
- **Fonts:** Google Fonts (*Cinzel* for editorial serif headings, *Plus Jakarta Sans* for clean, modern body typography)

---

## 📂 Project Structure

```text
├── public/
│   ├── favicon.svg                           # Academy shield SVG favicon
│   ├── robots.txt                            # Search engine crawler directives
│   └── images/
│       └── india-survival-academy-logo.png   # Preferred location for academy logo
├── src/
│   ├── assets/                               # Static graphics and icons
│   ├── components/
│   │   ├── common/
│   │   │   ├── Badge.tsx                     # Category and status pills
│   │   │   ├── Button.tsx                    # Primary, secondary, and outline CTAs
│   │   │   ├── Lightbox.tsx                  # Accessible full-screen photo modal
│   │   │   ├── Logo.tsx                      # Academy emblem loader + vector fallback
│   │   │   └── SectionHeading.tsx            # Editorial headings with kicker divider
│   │   ├── courses/
│   │   │   ├── CourseCard.tsx                # Course display card with dual CTAs
│   │   │   └── CourseModal.tsx               # Reusable course detail modal
│   │   ├── forms/
│   │   │   └── EnquiryForm.tsx               # Validated client-side enquiry form
│   │   ├── home/
│   │   │   ├── AcademyIntro.tsx              # Mission and 4 pillars of training
│   │   │   ├── ActivitiesGrid.tsx            # 6 illustrative survival themes
│   │   │   ├── BatchesSection.tsx            # Upcoming batch schedule tracker
│   │   │   ├── FeaturedCourses.tsx           # 24h, 48h, 72h course cards
│   │   │   ├── FinalCTA.tsx                  # Atmospheric enrollment invitation
│   │   │   ├── GalleryPreview.tsx            # Photo grid with lightbox trigger
│   │   │   ├── Hero.tsx                      # Cinematic hero with dark vignette
│   │   │   ├── FAQSection.tsx                # Accordion starter questions
│   │   │   ├── RajasthanLocations.tsx        # Kumbhalgarh and candidate venues
│   │   │   └── WhyChoose.tsx                 # Defensible wilderness learning values
│   │   ├── layout/
│   │   │   ├── Footer.tsx                    # Dynamic copyright, quick links, registry
│   │   │   ├── Layout.tsx                    # Shell with Navbar, Outlet, and Footer
│   │   │   ├── Navbar.tsx                    # Desktop navigation & mobile drawer
│   │   │   └── ScrollToTop.tsx               # Scroll reset and back-to-top button
│   │   └── locations/
│   │       └── LocationCard.tsx              # Candidate destination card
│   ├── data/
│   │   ├── activities.ts                     # 6 core outdoor learning disciplines
│   │   ├── batches.ts                        # Batch schedule and candidate basecamps
│   │   ├── courses.ts                        # 24h, 48h, 72h course configurations
│   │   ├── faqs.ts                           # Categorized FAQs and honest policies
│   │   ├── gallery.ts                        # Photographic archive & captions
│   │   ├── locations.ts                      # Rajasthan candidate destinations
│   │   ├── navigation.ts                     # Main and footer link hierarchies
│   │   ├── resources.ts                      # Educational checklists & field guides
│   │   └── siteConfig.ts                     # Brand names, headlines, contact notes
│   ├── hooks/
│   │   ├── useDocumentTitle.ts               # Dynamic SEO titles and meta descriptions
│   │   └── useScrollPosition.ts              # Scroll tracking for header transitions
│   ├── pages/
│   │   ├── About.tsx                         # Origins, philosophy, and ethics
│   │   ├── Activities.tsx                    # In-depth field modules breakdown
│   │   ├── Batches.tsx                       # Batch status and calendar updates
│   │   ├── Contact.tsx                       # Communication desk & enquiry form
│   │   ├── Courses.tsx                       # Curriculum comparison & duration filter
│   │   ├── Enroll.tsx                        # 3-step admission process & registration
│   │   ├── FAQ.tsx                           # Searchable and categorized FAQ
│   │   ├── Gallery.tsx                       # Filterable photo gallery with lightbox
│   │   ├── Home.tsx                          # Full landing page assembly
│   │   ├── NotFound.tsx                      # Custom 404 "Off Trail" page
│   │   └── Resources.tsx                     # 10 Essentials, LNT, & heat guides
│   ├── types/
│   │   └── index.ts                          # Strict TypeScript interfaces
│   ├── utils/
│   │   └── validation.ts                     # Form input validation logic
│   ├── App.tsx                               # Router configuration
│   ├── index.css                             # Tailwind directives & design tokens
│   └── main.tsx                              # React DOM root entry
├── index.html                                # Semantic HTML, Google Fonts, and SEO
├── package.json                              # Project dependencies & scripts
├── postcss.config.js                         # PostCSS Tailwind plugin setup
├── tailwind.config.js                        # Custom colors, typography, patterns
├── tsconfig.json                             # TypeScript compiler configuration
└── tsconfig.node.json                        # Node tooling TypeScript configuration
```

---

## 🚀 Installation & Local Development

### 1. Prerequisites
Ensure you have **Node.js** (version 18 or higher) and **npm** installed on your system.

### 2. Install Dependencies
Open your terminal in the project root directory and run:
```bash
npm install
```

### 3. Start Development Server
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) in your browser.

### 4. Build for Production
```bash
npm run build
```
This runs TypeScript type checking (`tsc`) followed by the Vite production bundle build (`vite build`) outputting optimized assets to the `dist/` directory.

### 5. Preview Production Build Locally
```bash
npm run preview
```

---

## 🛠️ Manual Editing Guide (No Coding Complexities)

All website content has been decoupled from the presentation components into clean, typed data files in `src/data/`. Any team member can easily edit them in VS Code:

### 1. How to Edit Courses
Open [`src/data/courses.ts`](file:///src/data/courses.ts):
- Change `title`, `duration`, or `durationHours`.
- Update `shortDescription` and `fullDescription`.
- Add or edit items in the `learningThemes` array.
- Update `venueStatus` or replace `image` URL.

### 2. How to Edit Locations in Rajasthan
Open [`src/data/locations.ts`](file:///src/data/locations.ts):
- Add or modify candidate destinations.
- Set `isPreferred: true` on whichever destination should receive primary visual emphasis (currently set to **Kumbhalgarh Wildlife Sanctuary**).
- Update the `permissionsNote` to keep statutory compliance transparent.

### 3. How to Edit Batch Dates & Status
Open [`src/data/batches.ts`](file:///src/data/batches.ts):
- When official dates are determined, change `'Schedule to be announced'` to the actual dates.
- Update `venueStatus` from candidate status to confirmed basecamp.

### 4. How to Edit FAQs
Open [`src/data/faqs.ts`](file:///src/data/faqs.ts):
- Add new question-and-answer pairs or update existing answers.
- Assign appropriate categories (`'Courses'`, `'Preparation & Gear'`, `'Venues & Permissions'`, `'Enquiry & Safety'`).

### 5. How to Edit Brand Name, Headlines & Contact Details
Open [`src/data/siteConfig.ts`](file:///src/data/siteConfig.ts):
- Update `academyName`, `heroHeadline`, and `heroSupportingText`.
- Update `contactNote` when official telephone lines and email addresses are launched.

---

## 🖼️ Using Your Own Images

All static images can be placed in `public/images/` and referenced cleanly via `/images/<filename>`.

### 1. Logo
- **Path:** `public/images/india-survival-academy-logo.png` (configured in `src/data/siteConfig.ts`)
- **Display:** Handled via `<Logo />` using `object-contain` with built-in high-fidelity vector SVG fallback.

### 2. Hero Background
- **Path:** `public/images/hero-jungle.jpg` (configured in `src/data/siteConfig.ts`)
- **Display:** Handled in `Hero.tsx` using `object-cover` with graceful fallback to `heroFallbackImage`.

### 3. Course Cards
- **Paths:** Configured in `src/data/courses.ts`:
  - `24h-survival-challenge` -> `/images/course-24h-survival.jpg`
  - `48h-wilderness-challenge` -> `/images/course-48h-wilderness.jpg`
  - `72h-expedition-challenge` -> `/images/course-72h-expedition.jpg`
- **Display:** Handled in `CourseCard.tsx` and `CourseModal.tsx` using `object-cover` with automatic `fallbackImage` fallback if file is not yet present.

### 4. Locations in Rajasthan
- **Paths:** Configured in `src/data/locations.ts`:
  - `kumbhalgarh` -> `/images/kumbhalgarh-wildlife.png`
  - `mount-abu` -> `/images/mount-abu-wildlife.jpg`
  - `sariska` -> `/images/sariska-wildlife.jpg`
  - `jaisalmer-thar` -> `/images/jaisalmer-thar-desert.jpg`
- **Display:** Handled in `LocationCard.tsx` using `object-cover` with automatic `fallbackImage` fallback.

### 5. Wilderness Gallery
- **Paths:** Configured in `src/data/gallery.ts`:
  - Items configured to `/images/gallery-*.jpg` and `/images/kumbhalgarh-wildlife.png`.
- **Display:** Handled in `GalleryPreview.tsx`, `Gallery.tsx`, and `Lightbox.tsx` using `object-cover` in grid and `object-contain` in lightbox modal with automatic fallbacks.

---

## 📝 Enquiry Form & Email Delivery Architecture

- The website includes a full-featured Vercel Serverless API (`/api/enquiry`) backed by **Resend**.
- When an enquiry is submitted, all details are dispatched **only to INDIASURVIVALA@GMAIL.COM**.
- In accordance with academy policy, **no confirmation email is sent to the visitor**.
- For full environment variables configuration, spam honeypot details, and Resend setup, see [`EMAIL_SETUP.md`](file:///EMAIL_SETUP.md).

---

## ⚖️ Truth in Advertising & Compliance

- **No Fabricated Data:** The project does not invent course fees, registration deadlines, seat counts, fake reviews, or certifications.
- **Sanctuary Clearances:** Protected forests, wildlife sanctuaries, and tiger reserves are clearly labeled as **suggested candidate destinations**. Camping and survival training within them strictly require formal statutory approvals from the State Forest Department and local authorities.
