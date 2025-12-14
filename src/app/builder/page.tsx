import type { Metadata } from "next";
import { Erc681Builder } from "@/components/builder/erc681-builder";

export const metadata: Metadata = {
  title: "Builder",
  description: "Generate ERC-681 ethereum: links and QR codes for payments.",
};

export default function BuilderPage() {
  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <h1 className="text-3xl font-semibold tracking-tight">Link & QR Builder</h1>
        <p className="max-w-prose text-muted-foreground">
          Generate ERC‑681 payment request URIs for native transfers and ERC‑20
          transfers. Reality check: wallet support is inconsistent — use the
          adoption table to pick the safest format.
        </p>
      </div>
      <Erc681Builder />
    </div>
  );
}


