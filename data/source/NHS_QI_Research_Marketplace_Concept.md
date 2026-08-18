# NHS QI & Research Opportunity Marketplace

*Onboarding, matching and marketplace concept — written by the cofounder, ChatGPT-assisted, ahead of the 2026-08-17 call with Jemma Kelly (C&W QI team). This is the source document behind the structured-matching build (see `CLAUDE.md`, "Pivot: marketplace-first, portfolio scoring demoted").*

**Core concept.** A two-sided clinical-project marketplace in which NHS clinicians and Trusts can advertise quality-improvement and research opportunities, while medical students create structured profiles that allow projects and applicants to be matched using transparent criteria.

## 1. Use structured onboarding rather than CV upload

Rather than relying primarily on uploaded CVs, both students and project supervisors should describe skills and requirements using the same structured vocabulary. This creates the data needed for useful matching and makes applications easier to compare.

| Category | Examples |
|---|---|
| Stage | Year 1–6 / intercalating / FY1 etc. |
| Medical school | Bristol, Imperial, UCL etc. |
| Location | London / Bristol / remote |
| Clinical interests | Endocrinology, surgery, cardiology etc. |
| QI experience | None / assisted / led QIP |
| Research experience | None / data collection / analysis / manuscript |
| Statistics | Basic / SPSS / R / Stata / Python |
| Data skills | Excel / REDCap / EPR extraction |
| Literature | Search / systematic review / meta-analysis |
| Outputs | Poster / abstract / publication |
| Governance | Audit/QI training / GCP etc. |
| Availability | <2h, 2–5h, 5–10h/week |

**Example student profile**

Medical Student — Year 4 · Endocrinology · QI experience · Excel · Literature review · Poster experience
Availability: 3–5 hours/week
Interests: Endocrinology · Diabetes · General Medicine

## 2. Doctor / QI onboarding should mirror the student profile

When a clinician selects "Post a Project", use a short guided workflow rather than a large free-text box.

**Step 1 — About the project**
- Project title: Improving inpatient insulin prescribing
- Trust: Imperial College Healthcare NHS Trust
- Department: Endocrinology
- Project type: Quality Improvement / Clinical Audit / Research / Systematic Review / Case Report

**Step 2 — What will the student actually do?**
Allow supervisors to select activities such as data collection, Excel/data management, literature review, statistical analysis, patient recruitment, manuscript writing, poster/abstract preparation and presentation.
- Estimated commitment: 3–5 hours/week
- Project duration: 3 months
- Location: St Mary's Hospital / Hybrid

## 3. Separate required from preferred criteria

This is an important UX distinction. It prevents supervisors from accidentally turning every desirable attribute into a barrier to entry.

- **Required:** Year 3+; able to attend the relevant hospital.
- **Preferred:** Previous QI experience; Excel; interest in endocrinology; previous poster presentation.

The interface should actively discourage clinicians from making every criterion mandatory.

## 4. Add a simple experience-level classification

- **Beginner** — No previous research/QI experience required. Training provided.
- **Some experience** — Previous involvement in a QI/research project desirable.
- **Experienced** — Student should already be comfortable working relatively independently.

Students could filter specifically for "Beginner friendly" projects, which may also help reduce inequalities in access to early research and QI experience.

## 5. Calculate an explainable match score

Initially, matching should be deterministic and transparent rather than relying on opaque AI ranking. Hard requirements can determine eligibility, while preferred criteria contribute to a weighted score.

| Criterion | Example weight |
|---|---|
| Specialty interest | 15% |
| Relevant skills | 30% |
| Previous experience | 20% |
| Availability | 20% |
| Location | 15% |

**Example listing:** Improving inpatient insulin prescribing — Endocrinology · QI · 3 months · Hybrid — 92% match.
✓ Year 3+ ✓ Excel ✓ Interested in endocrinology ✓ Available 3–5h/week ○ Previous QI experience preferred

## 6. Give doctors a ranked applicant view

Instead of receiving many unstructured emails and CVs, clinicians should see applicants in a comparable dashboard.

| Student | Match | Year | QI | Skills / availability |
|---|---|---|---|---|
| Student A | 96% | 4 | ✓ | Excel, SPSS · 5h |
| Student B | 91% | 5 | ✓ | Excel · 3h |
| Student C | 84% | 3 | — | Excel · 5h |
| Student D | 78% | 4 | ✓ | 2h |

Actions could include: Shortlist · Reject · Message · Invite to project.

## 7. Make applying deliberately lightweight

Avoid requiring a full cover letter for every QIP. A short application could ask why the student is interested (for example, maximum 100 words) and which item from their profile is most relevant. The structured profile does the rest, allowing applications to take under a minute.

## 8. Build an experience ladder

- **Level 1 — Beginner:** Data collection / literature searching / basic audit
- **Level 2 — Contributor:** Data analysis / QI cycle / poster
- **Level 3 — Advanced:** Statistics / systematic review / manuscript
- **Level 4 — Lead:** Lead QIP / coordinate students / first-author manuscript

This changes the platform from simply distributing projects into a system that helps students progressively develop clinical-academic experience.

## 9. Let clinicians verify skills after completion

At project completion, the supervising doctor could verify the student's actual contribution: data collection, Excel/data management, QI methodology, statistical analysis, poster preparation, manuscript writing, etc. The profile would therefore accumulate verified experience rather than relying entirely on self-report.

Example: Excel — verified on 4 projects · QI methodology — verified on 3 projects · Statistical analysis — verified on 2 projects · Manuscript writing — verified on 1 project.

## 10. Design for three user types

- Student
- Clinician / Project Supervisor
- Trust / Organisation Administrator

The Trust administrator could approve clinicians, moderate projects, view student involvement and eventually generate reports. This supports a stronger institutional proposition: a managed platform for NHS Trusts to advertise, allocate and track student participation in quality-improvement and research projects.

## Recommended MVP

Clinician posts project → chooses required/preferred skills → student creates structured profile → projects are ranked by compatibility → one-click application → clinician sees ranked applicants → project is assigned → clinician verifies skills at completion.

This is enough to test whether the core marketplace works without initially building sophisticated AI matching.

## Potential long-term flywheel

More projects → students complete projects → verified skills accumulate → matching improves → doctors receive better applicants → more doctors post projects → Trusts gain measurable QI/student-engagement data.

The longer-term opportunity is therefore larger than a website listing QIPs: it could become infrastructure for allocating, tracking and verifying student participation in NHS improvement and research work.

## Suggested next design step

Map the exact onboarding flows screen-by-screen: approximately 6–8 screens for a medical student joining the platform and 6–8 screens for a clinician posting their first QIP. This will expose which data fields are truly necessary for matching and which can be omitted from the MVP.

---

**Build status (2026-08-17):** sections 1–7 are implemented (`src/lib/data/marketplace-options.ts`, `src/lib/marketplace.ts`, onboarding wizard, post form, ranked applicant dashboard in `/marketplace/mine`). Sections 8–9 (experience ladder, post-completion skill verification) and real AI-driven shortlisting are deliberately not built yet — see `CLAUDE.md`.
