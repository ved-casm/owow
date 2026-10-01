import type { Metadata } from "next";
import LegalPage from "@/components/Legal";
import { TERMS } from "@/lib/legal/terms";

export const metadata: Metadata = {
  title: "Terms and Conditions - O’WOW",
  description: "Terms and Conditions for owowlabs.ai and owowtalents.com.",
};

export default function TermsPage() {
  return <LegalPage {...TERMS} />;
}
