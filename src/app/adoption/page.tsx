import type { Metadata } from "next";
import Link from "next/link";

import { WALLET_SUPPORT, type SupportLevel } from "@/data/wallet-support";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";

export const metadata: Metadata = {
  title: "Wallet adoption",
  description:
    "A conservative, evidence-linked matrix of ERC-681 support in mobile wallets.",
};

function SupportBadge({ v }: { v: SupportLevel }) {
  if (v === "yes") return <Badge className="bg-emerald-600 hover:bg-emerald-600">Yes</Badge>;
  if (v === "partial") return <Badge variant="secondary">Partial</Badge>;
  return <Badge variant="outline">No</Badge>;
}

export default function AdoptionPage() {
  return (
    <div className="space-y-8">
      <div className="space-y-2">
        <h1 className="text-3xl font-semibold tracking-tight">Wallet adoption</h1>
        <p className="max-w-prose text-muted-foreground">
          Support is not binary. Most wallets handle only the simplest ERC‑681
          case (native transfers) and avoid arbitrary contract calls due to ABI
          safety concerns. This table is intentionally conservative and includes
          evidence links.
        </p>
      </div>

      <Card>
        <CardHeader className="flex flex-col gap-2 md:flex-row md:items-center md:justify-between">
          <CardTitle>Support matrix (mobile-first)</CardTitle>
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
                  <TableHead>Platforms</TableHead>
                  <TableHead>Scheme</TableHead>
                  <TableHead>Native</TableHead>
                  <TableHead>ERC‑20</TableHead>
                  <TableHead>Contract calls</TableHead>
                  <TableHead>@chainId</TableHead>
                  <TableHead>QR</TableHead>
                  <TableHead>NFC</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {WALLET_SUPPORT.map((row) => (
                  <TableRow key={row.wallet}>
                    <TableCell className="min-w-44">
                      <div className="font-medium">{row.wallet}</div>
                      <div className="mt-1 flex flex-wrap gap-1">
                        {row.evidence.slice(0, 2).map((e) => (
                          <a
                            key={e.href}
                            href={e.href}
                            target="_blank"
                            rel="noreferrer"
                            className="text-xs text-muted-foreground underline-offset-4 hover:underline"
                          >
                            {e.label}
                          </a>
                        ))}
                      </div>
                    </TableCell>
                    <TableCell className="min-w-28 text-muted-foreground">
                      {row.platforms.join(", ")}
                    </TableCell>
                    <TableCell>
                      <SupportBadge v={row.schemeParsing} />
                    </TableCell>
                    <TableCell>
                      <SupportBadge v={row.nativeTransfer} />
                    </TableCell>
                    <TableCell>
                      <SupportBadge v={row.erc20Transfer} />
                    </TableCell>
                    <TableCell>
                      <SupportBadge v={row.arbitraryContractCall} />
                    </TableCell>
                    <TableCell>
                      <SupportBadge v={row.chainIdHandling} />
                    </TableCell>
                    <TableCell>
                      <SupportBadge v={row.qrScan} />
                    </TableCell>
                    <TableCell>
                      <SupportBadge v={row.nfcTap} />
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
          <CardTitle>Contributing updates</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3 text-muted-foreground">
          <p>
            If you’re a wallet team or you’ve tested a new release, please open a PR
            updating <span className="font-mono text-foreground">src/data/wallet-support.ts</span>{" "}
            and include:
          </p>
          <ul className="list-disc space-y-1 pl-5">
            <li>Wallet version + OS version</li>
            <li>Test URIs (native + ERC‑20 transfer + chainId)</li>
            <li>Evidence link (issue tracker / release note / reproducible report)</li>
          </ul>
        </CardContent>
      </Card>
    </div>
  );
}


