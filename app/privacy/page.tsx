import type { Metadata } from "next";
import LegalPage from "@/components/Legal";
import { PRIVACY } from "@/lib/legal/privacy";

export const metadata: Metadata = {
  title: "Privacy Policy - O’WOW",
  description: "How OWOW Talents Inc. collects, uses, and protects personal information.",
};

export default function PrivacyPage() {
  return <LegalPage {...PRIVACY} />;
}
