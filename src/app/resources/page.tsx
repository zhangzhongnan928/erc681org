import type { Metadata } from "next";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export const metadata: Metadata = {
  title: "Resources",
  description: "Canonical spec, discussion threads, and research notes for ERC-681 adoption.",
};

const resources = [
  {
    title: "ERC-681: URL Format for Transaction Requests (canonical spec)",
    href: "https://eips.ethereum.org/EIPS/eip-681",
    why: "Primary source: the EIP text that defines syntax and semantics.",
  },
  {
    title: "Ethereum Magicians discussion thread",
    href: "https://ethereum-magicians.org/t/erc-681-representing-various-transactions-as-urls/650",
    why: "Long-running community thread about adoption, ambiguities, and wallet behavior.",
  },
  {
    title: "MetaMask mobile issue: wrong value on ERC-20 token transactions",
    href: "https://github.com/MetaMask/metamask-mobile/issues/1549",
    why: "Concrete example of UX risk when wallets partially implement ERC-681 parsing.",
  },
  {
    title: "D’CENT developer guide (EIP-681 transaction/payment request)",
    href: "https://dev-docs.dcentwallet.com/dynamic-link/eip-681-transaction-payment-request",
    why: "Example of a wallet documenting robust EIP-681 support.",
  },
];

export default function ResourcesPage() {
  return (
    <div className="space-y-8">
      <div className="space-y-2">
        <h1 className="text-3xl font-semibold tracking-tight">Resources</h1>
        <p className="max-w-prose text-muted-foreground">
          Canonical spec + community discussions + evidence links referenced across the site.
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Links</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <ul className="space-y-3">
            {resources.map((r) => (
              <li key={r.href} className="space-y-1">
                <a
                  href={r.href}
                  target="_blank"
                  rel="noreferrer"
                  className="font-medium underline-offset-4 hover:underline"
                >
                  {r.title}
                </a>
                <div className="text-sm text-muted-foreground">{r.why}</div>
              </li>
            ))}
          </ul>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Local research inputs</CardTitle>
        </CardHeader>
        <CardContent className="space-y-2 text-muted-foreground">
          <p>
            This repo’s content was initially based on two research notes:
          </p>
          <ul className="list-disc space-y-1 pl-5">
            <li>
              <span className="font-mono text-foreground">
                ERC-681 Adoption in Mobile Crypto Wallets.pdf
              </span>
            </li>
            <li>
              <span className="font-mono text-foreground">
                ERC-681 Adoption and Wallet Support.md
              </span>
            </li>
          </ul>
          <p className="text-sm">
            We don’t treat either as authoritative; the goal is to keep the support matrix evidence-driven.
          </p>
        </CardContent>
      </Card>
    </div>
  );
}


