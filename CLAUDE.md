# Master Prompt: UK Specialty Training & Portfolio Platform

*Working document to seed a new Claude project. Combines what was scoped in a prior research conversation with new additions from this conversation.*

## Context

UK specialty training positions are increasingly competitive, and applicants are starting portfolio-building earlier than ever. Trainees are scored against self-assessment matrices that differ by specialty and change annually, and the MSRA exam now sits at the centre of most CT1/ST1 recruitment — different specialties weight MSRA vs. portfolio self-assessment differently, and this changes year to year. This complexity is itself the opportunity: a well-maintained, insider-built tool can own the confusion that generic competitors get wrong or let go stale.

Target user: foundation doctors and medical students building toward specialty training applications. Builder context: non-technical, working with a cofounder, building with Claude Code, background in medicine, clinical AI, and medical devices, targeting recurring subscription revenue.

## Core Product: Three Layers

### Layer 1 — Portfolio & Specialty Scoring Engine

- User selects their target specialty pathway and inputs their current portfolio (audits, publications, teaching, presentations, courses, etc.)
- The tool scores the portfolio against that specialty's current self-assessment matrix and shows likely competitiveness
- Two-tier coverage model:
  - **Verified precise scoring** for a starter set of high-priority specialties
  - **AI-indicative estimates** with links to official matrices for all other specialties from day one
- Ten priority specialties identified as covering the majority of UK applicants: GP, IMT, Core Psychiatry, CST, Anaesthetics/ACCS, Paediatrics, O&G, Emergency Medicine, Clinical Radiology, Ophthalmology
- **Auto-monitoring system**: scheduled scraping of official recruitment pages to detect scoring/matrix changes, AI-assisted classification of what changed, human-in-the-loop confirmation, and a user-facing changelog — this is both the maintenance burden and the competitive moat
- **Real-world portfolio-building pattern (from Natania, IMT applicant)**: the bulk of portfolio points tend to come from publications and presentations, which are often best built during med school — before a student even understands their portfolio value (Natania's own strongest points came from med-school work she hadn't originally logged for this purpose). Remaining points typically come from QIPs, teaching evidence, and other F1/F2 activity. Prizes are a scored section but weighted less heavily than QIPs/presentations/publications. CPD points aren't directly asked about on IMT applications, though conferences are still worth listing and discussing at interview. This suggests the scoring tool should nudge medical students (not just F1/F2s) toward logging early wins, since points earned early are often under-recognised until later

### Layer 2 — Opportunity Radar & Marketplace ("Indeed for portfolio gaps")

- The scoring engine identifies specific gaps in a user's portfolio (e.g. missing audits) and surfaces concrete, deadline-driven ways to fill them
- **New marketplace layer (this conversation):** hospitals, GP practices, and doctors post jobs directly — "I need help with an audit" / "I need support on a research paper" — the same way a job would be posted on Indeed
- Applicants (trainees/students) apply to these postings
- **AI-driven matching:** rather than the poster having to review every applicant, an AI agent shortlists candidates — e.g. sorting applicants into a top three — reducing the poster's workload, since many doctors posting a job won't have time or inclination to screen everyone themselves
- The poster can then choose to interview from the shortlist if they want (e.g. likely for research paper support, where fit matters more), or accept the AI's top pick directly for lower-stakes tasks
- This is the incentive loop that drives supply-side adoption: it works like a light-touch staffing/host-agency model without literally being one — organisations get help sourced quickly, applicants get portfolio-building opportunities
- **Scaling plan:** start in one city, build relationships with hospitals and GP practices there, prove the loop works, then expand city by city

**Validation and refinements from a junior doctor conversation (Natania, IMT applicant, ex-Imperial):**
- Confirms the core pain point directly from her own experience: finding QIP and audit opportunities is genuinely hard, especially across large hospital networks (Imperial spanned six-plus hospitals during med school) — opportunities are largely informal and depend on who you know
- **QIPs (Quality Improvement Projects), not just audits, may be the higher-value target for this layer.** Every F1 and F2 is required to do at least one; maximum portfolio points require full involvement across every stage of a two-cycle QIP, which is a strong incentive for F1/F2s to lead and design their own rather than just participate — this is a natural, recurring demand source for the marketplace
- **Local matching (hospital/trust level, not just city level) is preferred by both sides**: students want convenience, and QIP/audit leads find it easier to supervise someone local — this also reduces the nepotism problem by making opportunities visible to everyone rather than just those with existing connections
- **Primary specialty scope for this layer**: internal medicine and surgery (most common med student rotations), with paediatrics, O&G, and radiology also relevant given their tight portfolio requirements. Scope isn't limited to audits/QIPs — presentations and other portfolio evidence fit too, and specialty-commitment evidence is relevant regardless of the applicant's target specialty
- **Suggested pilot site: Chelsea and Westminster Hospital** — an active health tech pilot site, and Natania has a contact doing IMT there who could help map how audits/QIPs are currently registered and advertised internally
- Natania herself is a live example of the demand side: she's about to run her own QIP at East Surrey and is already finding it hard to recruit medical students without a platform like this

### Layer 2b — Peer & AI Interview Practice Network (new, from Natania conversation)

- Second validated pain point: IMT interview prep is heavily dependent on who you know. Natania had to personally ask around to find people who'd done IMT interviews before to practise with — access to experienced peers is unequal and largely nepotism-driven, same underlying problem as the QIP/audit matching gap
- **Proposed peer network**: consent-based opt-in, built from the platform's existing user base (e.g. anyone who registers a QIP/opportunity through the platform can opt in). Doctors who've already done the interview help others prepare
- **Existing reference model: MediBuddy** — a case-based practice tool where one person plays patient/examiner and the other answers. Natania shared screenshots and confirmed her login is still active as a reference. Limitation: it requires two people available at the same time
- **User's preferred direction**: an AI-driven, solo version that removes the need for a practice partner — referencing **PassMed's AI OSCE practice tool** as the model to aim for. This would sit alongside (not necessarily replace) the human peer-matching option
- **Confidentiality constraint**: IMT candidates sign a confidentiality agreement about specific interview cases they encounter — any practice content (human peer-led or AI-generated) must use generic/simulated cases, not real interview content reconstructed from someone's actual interview
- MediBuddy's format already handles this appropriately (generic cases) and is a reasonable template to build from

### Layer 3 — Competitions, Awards & Deanery Likelihood

Two additional features suggested by a doctor the user spoke with, given how much specialty pathways can shift:

- **Essay/competition/abstract discovery** (competitor reference: **Prizology**) — surfacing essay competitions, abstract submission opportunities, and similar for medical students. User believes this can be executed better than the existing competitor.
- **Foundation training deanery likelihood estimator** (competitor reference: **Magnolia**) — helping applicants estimate their likelihood of getting into specific deaneries when applying for foundation training.

Both are framed as additional layers on top of the core scoring/marketplace product, not separate products.

## Known Competitors / Reference Points

- **DocFolio** — portfolio tracking, self-assessment scoring, PDF export (thin incumbent in the core scoring space)
- **Prizology** — essay competitions/abstract submissions for medical students
- **Magnolia** — foundation training deanery likelihood estimates
- **MediBuddy** — case-based interview practice tool (patient/examiner role-play), reference model for Layer 2b's human peer-practice format
- **PassMed** — has an AI-driven OSCE practice tool; reference model for Layer 2b's solo/AI practice direction
- **MedMap** (medmap.uk) — cofounder-suggested reference to sanity-check the platform's own data/positioning against; site is JS-rendered and its "Pathfinder" page returned a 404 at last check, so its actual feature set hasn't been directly verified yet — worth a manual look before treating it as a confirmed data source

## Technical Notes: AI Shortlisting Engine

- Marketplace is free for medical students to use at launch. No liability concern from AI "choosing" a candidate — the AI shortlists, the poster (hospital/GP practice) makes the actual selection, same as they would have done anyway when looking for help.
- AI model choice for the shortlisting/matching task: this is a lightweight structured-matching task (rank applicants against posting criteria, summarise fit), not a frontier-reasoning task, so it doesn't need Claude/OpenAI-tier models or spend.
  - Cheapest sensible options at early-stage volume: a low-cost hosted model (e.g. Claude Haiku, GPT-4o-mini) or an open-source model via a cheap inference provider (Together AI, Groq, Fireworks, OpenRouter — e.g. Llama 3.1 8B, Qwen)
  - Fully self-hosting an open-source model (own GPU/infra) is very likely premature at launch volume — revisit only once match volume is genuinely high (hundreds/day)

### Shortlisting pipeline sketch

1. **Posting intake** — hospital/GP practice submits a job (task type: audit help, research support, etc.), required skills/availability, and any must-haves
2. **Applicant profile** — pulled from the user's existing portfolio data already in the platform (specialty interest, current audits/publications, availability) — no separate application form needed
3. **Matching prompt** — structured prompt sent to the chosen model: posting requirements + list of applicant profiles → returns a ranked shortlist (e.g. top 3) with a one-line rationale per candidate
4. **Poster decision** — poster sees the shortlist, picks who to interview or directly accept; AI never makes the final call
5. **Feedback loop (future)** — track which shortlisted candidates get chosen/complete the work, to tune matching criteria over time

## Open Questions for Next Steps

- How the marketplace layer interacts with medico-legal/academic integrity boundaries (e.g. GMC positions on AI-assisted reflective writing) — the scoring/portfolio side already needs to stay clear of this; the marketplace layer introduces new questions around supervision, authorship, and credit for audits/research done through job postings
- Liability and quality control for work sourced through the marketplace (who's accountable if a piece of work is done badly)
- Which city/trust to launch in first — Chelsea and Westminster is a live candidate given its health tech pilot status and an existing contact there — and how to approach initial hospital/GP practice outreach
- Pricing/monetisation split between the scoring tool (likely subscription) and the marketplace (likely take-rate or listing fee)
- How AI shortlisting criteria are set and communicated to posters
- Whether Layer 2b (interview practice) launches with human peer-matching only, AI-only, or both from day one — AI removes the "needs a partner available at the same time" friction but is more build effort up front

## Pending inputs (not yet received)

- Introductions to IMT/F1/F2 contacts at Chelsea and Westminster and other local trusts — for understanding how audits/QIPs are currently registered and advertised, ahead of a possible pilot
- A proper look at MedMap's actual feature set once its site can be navigated (currently JS-rendered, direct fetch didn't return content)

## Resolved since this doc was written

- **IMT self-assessment scoring matrix — resolved directly from the official source, no need for Natania's breakdown.** The exact per-domain point bands (postgraduate degrees & qualifications: max 4, presentations/posters: max 6, publications: max 8, teaching experience: max 5, training in teaching: max 3, quality improvement: max 4 — totalling 30, +5 bonus for IMT/ACCS-IM-only applicants = 35) are published at [imtrecruitment.org.uk/recruitment-process/applying/application-scoring](https://www.imtrecruitment.org.uk/recruitment-process/applying/application-scoring) and are now implemented in `src/lib/data/imt-portfolio-categories.ts`, live at `/portfolio/imt`. General lesson: check the specialty's own official recruitment site for its scoring matrix before treating it as a missing input — most publish theirs directly.

## Known upcoming change — IMT 2027 (not yet live, do not apply to current matrix)

Per [imtrecruitment.org.uk/news/imt-2027-website-update-in-the-autumn](https://imtrecruitment.org.uk/news/imt-2027-website-update-in-the-autumn) (checked 2026-07-29), the cycle applying autumn 2026 for August 2027 start will change:
- Publications max drops 8 → 6 (rescale: 8→6, 6→5, 5→4, 3→2, 1 unchanged)
- Presentations/posters max rises 6 → 8 (rescale: 6→8, 4→6, 3→4, 2 unchanged)
- Abstracts/letters no longer count as "other publication" — only under the lowest publications band, and only if not already claimed as a presentation
- **The +5 IMT-only bonus is being removed** — 2027 max is 30, not 35
- Full detail expected autumn 2026; otherwise "largely unchanged"

**Do not update `src/lib/data/imt-portfolio-categories.ts` for this until it's actually live** — the 2026 matrix in this repo is still correct for the current cycle. This is exactly the kind of change the master prompt's "auto-monitoring system" (Layer 1) is meant to catch automatically going forward — see the chat for how to set that up with a scheduled agent.

## CST and Paediatrics verified scoring added (from `UK_Specialty_Training_Data_v3_CST_OG_Radiology_Ophth_Paeds_Prioritisation.md`)

- **CST**: full official 2025/26 portfolio matrix from NHS England, `src/lib/data/cst-portfolio-categories.ts`, live at `/portfolio/cst`. Structurally different from IMT — portfolio is scored *live at interview* on 2 assessor-chosen domains (not candidate's choice), not pre-summed into a shortlisting number. No official score distribution is published, so there's deliberately no likelihood tool for CST, and the scorer shows bands (A-E) rather than a fabricated total.
- **Paediatrics**: full official 2026-27 ST1 shortlisting glossary from RCPCH, `src/lib/data/paediatrics-portfolio-categories.ts`, live at `/portfolio/paediatrics`. 5 domains, 30 pts + 1 research bonus. The shortlisting score is explicitly a *gate only* — doesn't carry to final rank, which comes from a separate 2-station interview. No likelihood tool here either, for the same reason.
- **Explicitly not built**: the RCSI Ireland CST intake data (real numbers, wrong jurisdiction — source doc says never present as UK data). Kept out of the UI entirely to avoid conflating datasets.
- **Inter-deanery transfer (IDT) data — added to `/specialties` after user pushback**, `src/lib/data/inter-deanery-transfers.ts`. Initially left out on the reasoning that it measures mid-career deanery transfers, not initial ST1 recruitment — a different question. User's view: that's a labelling problem, not a reason to omit it, so it's now shown in its own clearly-labelled section (O&G and Radiology have real signal; Ophthalmology explicitly doesn't, and the UI says why) rather than folded into the main competition-ratio table.
- `SCORING_COVERAGE` in `src/lib/data/all-specialty-ratios.ts` now has three tiers, not two: `verified_scoring_and_likelihood` (IMT only), `verified_scoring` (CST, Paediatrics), `indicative` (everything else). Home page and onboarding routing both read from this.

## Medical Training (Prioritisation) Act 2026 — now live in the IMT likelihood tool

Royal Assent 6 March 2026, in force for every 2026 recruitment round, every specialty except ST1 Public Health. Full mechanics in `src/lib/data/prioritisation.ts`. Short version: applicants split into a priority group (UK/Ireland+ qualification, qualifying immigration status, completed/on the UK Foundation Programme) and a non-priority group; the entire priority group is offered posts in rank order before the non-priority group gets any consideration at all, regardless of score. Rank itself isn't affected — only offer order.

`/imt-likelihood` now asks for priority-status inputs (only shown for 2026+ application years, since the Act doesn't apply retroactively) — **deliberately not persisted to Supabase**, same as score/region, to avoid taking on data-retention obligations for sensitive immigration/citizenship data before there's a real product need to store it. Non-priority applicants get their "any offer" band capped at "moderate" rather than a fabricated precise downward adjustment, since published data doesn't support quantifying exactly how much the priority queue displaces them.

**This same mechanic needs to reach every other specialty's likelihood model once those exist** — right now it only has somewhere to plug into for IMT, since that's the only specialty with a real percentile/likelihood engine.

`/imt-likelihood` also has a manual Priority/Not Priority toggle above the granular questions (user request) — it overrides the computed value until explicitly cleared, for people who already know their status and don't want to answer three questions to see it.

## Magic-link sign-in was broken — fixed via a click-to-confirm page (2026-07-31)

**Root cause, confirmed via Supabase auth logs**: many university/NHS email systems run Microsoft Defender "Safe Links" (or similar), which auto-visits every link in an inbound email to scan for malware. Since Supabase's magic-link `ConfirmationURL` is single-use, the scanner's visit consumes the token before the real user clicks — `get_logs` showed many different IPs hitting `/verify` within seconds, mostly getting "One-time token not found," with only the occasional attempt (whichever hit first) actually succeeding. This is a known, documented Supabase limitation, not a bug in our code — see [the "Email prefetching" section of their Auth email docs](https://supabase.com/docs/guides/auth/auth-email-templates#email-prefetching).

**Fix**: `/auth/confirm` (`src/app/auth/confirm/`) now requires an explicit button click before calling `verifyOtp` — the page loads and shows a "Confirm sign-in" button without consuming anything, so a scanner's silent GET can't burn the token. Only a real click calls `supabase.auth.verifyOtp({ token_hash, type: 'email' })`.

**This requires a one-time manual step in the Supabase Dashboard that nothing here can do automatically** (no MCP tool manages email templates): go to Authentication → Emails → Magic Link, and replace the template body with:

```html
<h2>Sign in to Shortlisted</h2>
<p>Click below to confirm and sign in. This link is single-use and expires shortly.</p>
<p><a href="{{ .SiteURL }}/auth/confirm?token_hash={{ .TokenHash }}&type=email">Sign in to Shortlisted</a></p>
```

Also confirm Authentication → URL Configuration → Site URL matches the app's real origin (`http://localhost:3010` for local dev; update to the production domain once deployed) — `{{ .SiteURL }}` in the template resolves from that setting.

Until the template is changed, magic links will keep using the old GoTrue-direct-link flow and keep failing under email prescanning — the code fix alone isn't sufficient without this dashboard step.

The old `/auth/callback` PKCE-code-exchange route (`src/app/auth/callback/route.ts`) is now unused by the email flow but left in place — harmless, and would only matter if a PKCE-code-based link were ever sent again.

## Histopathology verified scorer added; Neurosurgery/OMFS blocked on source access (2026-08-10)

- **Histopathology**: full official 2026 self-assessment scoring guidance found directly on medical.hee.nhs.uk (10 domains, max 71 — see `src/lib/data/histopathology-portfolio-categories.ts`, live at `/portfolio/histopathology`). Same structural shape as CST/Paediatrics — self-assessment shortlists to evidence verification, but final rank is interview-only, so no likelihood tool.
- **Neurosurgery and OMFS were NOT built as verified scorers, despite the user asking for all three** — their exact self-assessment point tables couldn't be retrieved:
  - Neurosurgery's matrix lives in a Yorkshire & Humber Deanery PDF (`yorksandhumberdeanery.nhs.uk`) that's behind a BunkerWeb JS bot-check; the URL also turned out to be a dead link (redirects to the site homepage) independent of the bot-check.
  - OMFS's matrix lives on the Severn/South West deanery site; the `severndeanery.nhs.uk` → `southwest.pgmdeducation.nhs.uk` redirect is live but the target page 404s (site was restructured, old URL not remapped).
  - Confirmed instead, from third-party mirrors (`specialty-applications.co.uk`, `smartst.co.uk`, `mednext.uk`) and cross-referenced against NHS England's own person-specification pages: the exact **domain names/questions** for both (Neurosurgery: 21 self-assessment fields; OMFS: ~15, verbatim descriptors in this session's transcript), plus **structural facts** — weightings, appointability thresholds, timelines — now in `SELECTION_MECHANISMS` in `src/lib/data/all-specialty-ratios.ts`. What's missing is only the **point value per band**, which no source publishes outside the two inaccessible official documents.
  - Deliberately did not fabricate point values to ship a "verified" scorer anyway — would misrepresent real numbers to applicants making career decisions. Both are marked `tier: "indicative"` in `SECONDARY_SPECIALTIES`.
  - **To unblock**: ask the user for the PDF/page content directly (they offered to fetch it via ChatGPT/Gemini, which may have different network access), or retry those two URLs periodically in case the dead links get fixed.

## MyPlan-style deadline planner, competition-ratio chart, and Sources section added (2026-08-10)

- **`/plan`** (`src/app/plan/`): pick any of the 16 specialties in `src/lib/data/specialty-timelines.ts`, see a merged, countdown-sorted, month-grouped timeline. Timeline dates were gathered by fetching every specialty's page on `smartst.co.uk` (a competitor site) rather than 16 separate official-source fetches — justified by extremely high cross-consistency (all 16 independently confirm the same national application window, 22 Oct–19 Nov 2026, and Aug 2027 start), but treat as a secondary source if extending this file; re-verify against each specialty's own recruitment page if precision matters more than coverage.
  - `src/lib/deadlines.ts` has the free-text date parser (`parseStageDate`) — handles both "11 Jan – 12 Feb 2027" style ranges (takes the first full date found) and month-only strings like "Aug 2027" (defaults to the 1st — needed because most specialties' "Post starts" stage has no published exact day; the parser silently drops any stage it can't parse at all, so a stage written without at least a month+year will vanish from the plan with no error).
- **Competition-ratio chart** (`src/components/CompetitionRatioChart.tsx`, on `/specialties`): horizontal sqrt-scaled bars (linear would flatten everything under the 73–167:1 outliers). **Learned the hard way: don't use Framer Motion to animate a percentage-string `width` from an `initial` unitless `0`** — it resolves against a stale pixel snapshot and renders every bar ~100x too short (confirmed by reading rendered inline styles, not just eyeballing). Fixed by dropping the animation entirely (plain inline `style={{width: '${pct}%'}}`, no enter transition). If re-adding a grow-in animation later, animate `transform: scaleX()` instead of `width`, or use `initial={{width: '0%'}}` and verify actual rendered widths programmatically before trusting it visually — a screenshot alone won't catch this class of bug reliably in this environment (screenshots were intermittently blank during this session for unrelated reasons; `getComputedStyle` / reading `style.width` directly is the reliable check).
- **Sources**: `src/components/Sources.tsx` (reusable link-list block) + `src/lib/data/sources.ts` (central registry, re-exporting each data file's own `*_SCORING_SOURCE_URL` so it can't drift). Added to the bottom of every portfolio scorer page and as a dedicated section on `/specialties`, plus a new standalone `/sources` page aggregating everything. Matches the pattern on smartst.co.uk (dedicated per-page Sources block with real links) that the user specifically asked to match.

## Full redesign: dark Linear-style UI → warm-paper editorial light theme (2026-08-11)

User rejected the original dark theme outright after seeing it next to smartst.co.uk and four style-guide references (Steep, Monad, Getharvest, Notion — all light, warm-paper canvas, regular-weight serif headings, one disciplined accent color, large radii, minimal shadow). Rebuilt around that shared vocabulary rather than copying any one reference literally: warm paper canvas, `Source Serif 4` for headings only (h1 + the `/specialties` h2 section headers — deliberately *not* applied to card-title-level text, matching every reference's "reserve the serif" rule), Inter for everything else, one primary blue accent, a rare peach/coral accent card reserved for score-total displays (`ScoreBreakdown`, CST's sticky footer).

**How the re-theme was done with minimal per-file edits**: ~350 of the ~400 color-class usages across the app are semantic tokens (`text-mist`, `bg-carbon`, `border-graphite`, etc.) — redefining their *values* in `globals.css`'s `@theme` block flipped almost the whole app automatically, no component edits needed. Two tokens had role collisions that couldn't be solved by value alone and needed a specific resolution (documented in the `globals.css` comment): `void` is both the page canvas *and* button text-on-accent-fill (works because it's now a light warm-paper color, which reads fine as light text on both the blue primary button and the dark `bone` pill fill); `bone` was flipped from "light pill fill" to "dark ink fill" specifically so it kept working with `text-void` unchanged. Anything using a literal dark-mode-only trick (`bg-white/[0.02]`, `bg-white/5`, `border-white/[0.08]` for subtle fills/inputs on a dark surface) needed a real find-and-replace to `bg-black/[...]` equivalents — these don't auto-flip via token remap since they reference the raw `white` keyword, not a theme token.

**Chart bug found and fixed while verifying the redesign**: `CompetitionRatioChart.tsx`'s bars rendered at 0 width. Root cause (confirmed via `getComputedStyle`, not by eyeballing a screenshot): a percentage-`width` bar div was nested inside an `absolute inset-y-0 left-0` *wrapper* div that had no explicit `right`/`width` — an absolutely-positioned box with only `left` set sizes to shrink-to-fit its content, and a shrink-to-fit box containing a percentage-width child resolves that percentage against zero (a genuine CSS spec gotcha, not a browser bug). Fixed by removing the wrapper and positioning each bar directly (`absolute left-0 top-1/2 -translate-y-1/2 w-[X%]`) against the outer `relative` row, which has a real resolved width. This is a **different bug** from the Framer-Motion-width issue noted in the entry above (that one was already fixed by the time this session started) — general lesson holds either way: any time a percentage `width` is involved, read the actual computed/rendered width before trusting a screenshot.
  - Correction to the note above: in *this* session, `getComputedStyle`/`window.innerWidth` read back as `0` through `javascript_tool` on this specific browser tool at one point (a tool-session quirk, not a real layout bug — confirmed because the very same page screenshotted correctly seconds later). So neither method is unconditionally reliable here; when they disagree, prefer whichever one a fresh reload + fresh check agrees with, and don't trust a single reading either way.
  - Also swapped the 2024/2025 bar paint order (2025's bar now paints first as the base, 2024 second as a shorter/thinner inner segment) — previously 2025 (always the wider, taller bar, since every specialty got more competitive) fully occluded 2024, defeating the point of showing both years.

**Not yet re-themed for capability parity, only for not being visibly broken**: the marketplace pages, onboarding wizard, profile/login/auth forms, and About/Contact were swept for the same literal dark-mode-only class patterns (`bg-white/[0.0x]`, `bg-white/5`) so nothing renders invisibly, and inherit the new look via token remap — but weren't individually walked through and screenshot-checked the way the home/specialties/plan/histopathology-scorer pages were this session. Worth a pass before shipping if they're on the near-term roadmap.
