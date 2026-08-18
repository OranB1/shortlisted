import type { Metadata } from "next";
import DemoWalkthrough from "./DemoWalkthrough";

export const metadata: Metadata = {
  title: "Hitch demo — Post an opportunity as a doctor",
  description:
    "See exactly what it looks like for a consultant or QI lead to post a QIP, audit, or research opportunity on Hitch — no account needed.",
};

export default function DemoPage() {
  return <DemoWalkthrough />;
}
