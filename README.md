# Christ's Heart Ministries International — Website

Client: Christine Masika
Church: Christ's Heart Ministries International (Founded 2007, 80+ branches)
Leadership: Apostle Isaiah & Rev. Deborah Mbuga

## Status
- [x] Requirements gathered
- [ ] Design approved
- [x] Development started
- [ ] Testing complete
- [ ] Deployed (GitHub Pages planned)
- [ ] Handed off to client

## Tech Stack
- **Frontend:** React 18 + TypeScript + Vite
- **Styling:** CSS (purple primary branding)
- **Maps:** Leaflet + React-Leaflet (interactive branch map)
- **Routing:** React Router v7
- **Icons:** Lucide React
- **Deployment:** GitHub Pages (static build in `christheart/`)

## Setup

```bash
cd christheart/frontend
pi          # pnpm install
pd          # pnpm dev
pb          # pnpm build
```

## Project Structure

```
christheart/
├── frontend/          # React + Vite source code
├── assets/            # Built/compiled assets
├── add/               # Image assets (branch photos)
├── events/            # Event subpages (november-blessing, etc.)
├── index.html         # Static entry point (GitHub Pages)
├── 404.html           # 404 fallback
├── PLAN.MD            # Full project requirements
├── branches_data.md   # Branch locations & contact info
└── eventsDatabase.md  # Events data
```

## Key Features
- Homepage with hero, vision, mission, featured events
- Branches listing with interactive Leaflet map (20 Uganda branches)
- Branch detail pages (pastor info, testimonials, gallery, map)
- Events section (November Blessing, Youth Camp, Men of Action)
- Download Sermons page
- Floating "Give" button (Tithe, Offertory, Partnership, Seed)
- Contact form
- Admin panel (planned — content management via CMS/Supabase)

## Branding
- Primary: Purple
- Accents: White, Gold, Light Gray
- Responsive: Desktop, Tablet, Mobile
