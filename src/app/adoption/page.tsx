import type { Metadata } from "next";
import Link from "next/link";

import {
  VERIFIED_WALLET_SUPPORT,
  WALLET_RESEARCH_QUEUE,
  type CapabilityStatus,
  type EvidenceGrade,
} from "@/data/wallet-support";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

export const metadata: Metadata = {
  title: "Wallet adoption",
  description:
    "An evidence-graded audit of ERC-681 support in mobile crypto wallets.",
};

const CAPABILITY_LABELS: Record<CapabilityStatus, string> = {
  confirmed: "Confirmed",
  limited: "Limited",
  "not-supported": "Rejected",
  "not-documented": "Not documented",
};

const GRADE_LABELS: Record<EvidenceGrade, string> = {
  "code-confirmed": "Code verified",
  "official-claim": "Official claim",
  scoped: "Scoped support",
  "no-public-evidence": "Open research",
};

function CapabilityBadge({ value }: { value: CapabilityStatus }) {
  if (value === "confirmed") {
    return (
      <Badge className="whitespace-nowrap bg-emerald-600 hover:bg-emerald-600">
        {CAPABILITY_LABELS[value]}
      </Badge>
    );
  }

  if (value === "limited") {
    return <Badge variant="secondary">{CAPABILITY_LABELS[value]}</Badge>;
  }

  if (value === "not-supported") {
    return <Badge variant="destructive">{CAPABILITY_LABELS[value]}</Badge>;
  }

  return <Badge variant="outline">{CAPABILITY_LABELS[value]}</Badge>;
}

function EvidenceBadge({ grade }: { grade: EvidenceGrade }) {
  return (
    <Badge variant={grade === "code-confirmed" ? "default" : "outline"}>
      {GRADE_LABELS[grade]}
    </Badge>
  );
}

function EvidenceLinks({
  evidence,
}: {
  evidence: { label: string; href: string }[];
}) {
  return (
    <div className="mt-2 flex flex-wrap gap-x-3 gap-y-1">
      {evidence.map((item) => (
        <a
          key={item.href}
          href={item.href}
          target="_blank"
          rel="noreferrer"
          className="text-xs text-muted-foreground underline-offset-4 hover:underline"
        >
          {item.label}
        </a>
      ))}
    </div>
  );
}

export default function AdoptionPage() {
  return (
    <div className="space-y-8">
      <div className="space-y-3">
        <h1 className="text-3xl font-semibold tracking-tight">
          Wallet adoption
        </h1>
        <p className="max-w-3xl text-muted-foreground">
          This is an evidence audit, not a popularity ranking. “Not documented”
          means the reviewed official sources did not establish ERC‑681 support;
          it does not mean the wallet is incompatible. Capability claims below
          are linked to official documentation, releases, or commit-pinned source.
        </p>
        <div className="flex flex-wrap gap-2 text-sm">
          <Badge variant="outline">
            {VERIFIED_WALLET_SUPPORT.length} evidence-backed or scoped
          </Badge>
          <Badge variant="outline">
            {WALLET_RESEARCH_QUEUE.length} tracked for follow-up
          </Badge>
          <Badge variant="outline">Last full review: 24 July 2026</Badge>
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>How to read the audit</CardTitle>
        </CardHeader>
        <CardContent className="grid gap-4 text-sm text-muted-foreground md:grid-cols-2">
          <div>
            <div className="mb-2 font-medium text-foreground">
              Evidence grades
            </div>
            <ul className="list-disc space-y-1 pl-5">
              <li>
                <span className="font-medium text-foreground">
                  Code verified:
                </span>{" "}
                current official source or tests show the behavior.
              </li>
              <li>
                <span className="font-medium text-foreground">
                  Official claim:
                </span>{" "}
                the wallet provider states support, but public code or
                conformance tests were not available.
              </li>
              <li>
                <span className="font-medium text-foreground">
                  Scoped support:
                </span>{" "}
                an ethereum: shape is accepted, but not the full payment
                request being measured.
              </li>
            </ul>
          </div>
          <div>
            <div className="mb-2 font-medium text-foreground">
              Capability labels
            </div>
            <ul className="list-disc space-y-1 pl-5">
              <li>
                <span className="font-medium text-foreground">Confirmed</span>{" "}
                is supported by the linked evidence.
              </li>
              <li>
                <span className="font-medium text-foreground">Limited</span>{" "}
                covers only part of the standard or only some platforms.
              </li>
              <li>
                <span className="font-medium text-foreground">Rejected</span>{" "}
                is reserved for an explicit current code path or test.
              </li>
              <li>
                <span className="font-medium text-foreground">
                  Not documented
                </span>{" "}
                stays unknown until reproducible evidence exists.
              </li>
            </ul>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-col gap-2 md:flex-row md:items-center md:justify-between">
          <CardTitle>Evidence-backed capability matrix</CardTitle>
          <Button asChild variant="outline" size="sm">
            <Link href="/builder">Try the builder</Link>
          </Button>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Wallet</TableHead>
                  <TableHead>Evidence</TableHead>
                  <TableHead>Scheme</TableHead>
                  <TableHead>Native</TableHead>
                  <TableHead>ERC‑20</TableHead>
                  <TableHead>Other calls</TableHead>
                  <TableHead>@chainId</TableHead>
                  <TableHead>QR entry</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {VERIFIED_WALLET_SUPPORT.map((row) => (
                  <TableRow key={row.wallet}>
                    <TableCell className="min-w-64 align-top">
                      <div className="font-medium">{row.wallet}</div>
                      <div className="mt-1 text-xs text-muted-foreground">
                        {row.platforms.join(", ")} · reviewed {row.reviewedAt}
                      </div>
                      <p className="mt-2 max-w-xl text-xs leading-relaxed text-muted-foreground">
                        {row.notes}
                      </p>
                      <EvidenceLinks evidence={row.evidence} />
                    </TableCell>
                    <TableCell className="align-top">
                      <EvidenceBadge grade={row.evidenceGrade} />
                    </TableCell>
                    <TableCell className="align-top">
                      <CapabilityBadge value={row.schemeParsing} />
                    </TableCell>
                    <TableCell className="align-top">
                      <CapabilityBadge value={row.nativeTransfer} />
                    </TableCell>
                    <TableCell className="align-top">
                      <CapabilityBadge value={row.erc20Transfer} />
                    </TableCell>
                    <TableCell className="align-top">
                      <CapabilityBadge value={row.otherContractCalls} />
                    </TableCell>
                    <TableCell className="align-top">
                      <CapabilityBadge value={row.chainIdHandling} />
                    </TableCell>
                    <TableCell className="align-top">
                      <CapabilityBadge value={row.qrScan} />
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Tracked wallets without conclusive public evidence</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="max-w-3xl text-sm text-muted-foreground">
            These are active mobile-wallet research targets. Their presence here
            is not a negative compatibility result. Each weekly pass starts from
            this queue and promotes a wallet only when official documentation,
            release notes, source, or a reproducible versioned test supports the
            claim.
          </p>
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Wallet</TableHead>
                  <TableHead>Platforms</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Official starting points</TableHead>
                  <TableHead>Evidence review</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {WALLET_RESEARCH_QUEUE.map((row) => (
                  <TableRow key={row.wallet}>
                    <TableCell className="font-medium">{row.wallet}</TableCell>
                    <TableCell className="text-muted-foreground">
                      {row.platforms.join(", ")}
                    </TableCell>
                    <TableCell>
                      <EvidenceBadge grade={row.evidenceGrade} />
                    </TableCell>
                    <TableCell className="min-w-56">
                      <EvidenceLinks evidence={row.evidence} />
                    </TableCell>
                    <TableCell className="whitespace-nowrap text-muted-foreground">
                      {row.reviewedAt ?? "Pending"}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Contributing reproducible updates</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3 text-muted-foreground">
          <p>
            Please open a PR updating{" "}
            <span className="font-mono text-foreground">
              src/data/wallet-support.ts
            </span>{" "}
            and include:
          </p>
          <ul className="list-disc space-y-1 pl-5">
            <li>Wallet version, OS version, and installation source</li>
            <li>
              Exact native, ERC‑20 transfer, scientific-notation, and @chainId
              test URIs
            </li>
            <li>Expected versus observed fields before confirmation</li>
            <li>
              An official source permalink or a reproducible test report; absence
              of search results is not proof of non-support
            </li>
          </ul>
        </CardContent>
      </Card>
    </div>
  );
}
