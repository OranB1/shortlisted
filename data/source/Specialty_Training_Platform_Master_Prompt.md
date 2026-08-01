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

- Portfolio sections breakdown from Natania — to confirm exact IMT scoring categories and where prizes sit relative to QIPs/presentations
- Introductions to IMT/F1/F2 contacts at Chelsea and Westminster and other local trusts — for understanding how audits/QIPs are currently registered and advertised, ahead of a possible pilot
- A proper look at MedMap's actual feature set once its site can be navigated (currently JS-rendered, direct fetch didn't return content)
