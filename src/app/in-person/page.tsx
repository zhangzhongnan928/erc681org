import type { Metadata } from "next";
import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";

export const metadata: Metadata = {
  title: "In-person payments",
  description: "Why ERC-681 matters for QR/NFC in-person payments, and what blocks adoption.",
};

export default function InPersonPage() {
  return (
    <div className="space-y-8">
      <div className="space-y-2">
        <h1 className="text-3xl font-semibold tracking-tight">In‑person payments</h1>
        <p className="max-w-prose text-muted-foreground">
          ERC‑681’s most compelling UX is physical-world payments: a static QR code
          or NFC tag that opens a wallet with a pre-filled transaction.
        </p>
        <div className="flex flex-wrap gap-2">
          <Button asChild variant="outline" size="sm">
            <Link href="/builder">Generate a QR</Link>
          </Button>
          <Button asChild variant="outline" size="sm">
            <Link href="/adoption">Check wallet support</Link>
          </Button>
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>The ideal flow (what we want)</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3 text-muted-foreground">
          <ol className="list-decimal space-y-1 pl-5">
            <li>Merchant enters amount</li>
            <li>User scans QR or taps NFC</li>
            <li>Wallet opens with a pre-filled transaction request</li>
            <li>User confirms (authenticated) and sends</li>
          </ol>
          <p>
            This is conceptually similar to <span className="font-medium text-foreground">mailto:</span>{" "}
            or <span className="font-medium text-foreground">tel:</span> deep links — and it’s why
            ERC‑681 is worth reviving.
          </p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>What works today (most reliably)</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4 text-muted-foreground">
          <p>
            The safest cross-wallet baseline is a <span className="font-medium text-foreground">native transfer</span>{" "}
            with optional <span className="font-mono">value=…</span> (wei) and optional{" "}
            <span className="font-mono">@chainId</span>.
          </p>
          <pre className="overflow-x-auto rounded-lg border bg-muted/20 p-4 text-xs">
            <code>{`ethereum:0xYourMerchantAddress@1?value=0.01e18`}</code>
          </pre>
          <p className="text-sm">
            中文：面对面支付建议优先用「原生币转账」做 MVP（最少 ABI 风险、最多钱包能跑通）。
          </p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>What breaks (and why)</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4 text-muted-foreground">
          <p>
            ERC‑20 transfers and general contract calls are where adoption fragments. A link like:
          </p>
          <pre className="overflow-x-auto rounded-lg border bg-muted/20 p-4 text-xs">
            <code>{`ethereum:0xToken/transfer?address=0xRecipient&uint256=1e6`}</code>
          </pre>
          <p>
            …requires the wallet to safely construct calldata and present a clear signing UI.
            Without a standard ABI discovery mechanism, wallets often avoid this to reduce blind-signing risk.
          </p>
          <Separator />
          <p>
            Practical consequence: even if the URI scheme launches the wallet, advanced parameters may be ignored
            or misinterpreted. That’s why the{" "}
            <Link className="underline-offset-4 hover:underline" href="/adoption">
              adoption matrix
            </Link>{" "}
            matters.
          </p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Reference implementation: ER681‑Terminal</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3 text-muted-foreground">
          <p>
            <a
              href="https://github.com/zhangzhongnan928/ER681-Terminal"
              target="_blank"
              rel="noreferrer"
              className="font-medium text-foreground underline-offset-4 hover:underline"
            >
              ER681‑Terminal
            </a>{" "}
            is an open-source ERC‑20 payment terminal (native Android and iOS apps plus reusable,
            keyless read-only SDKs) built on exactly this flow: the cashier enters an amount, the
            terminal presents a canonical ERC‑681 QR code, and payment is observed via read-only
            JSON‑RPC.
          </p>
          <ul className="list-disc space-y-1 pl-5">
            <li>Unique one-time receiver per invoice, derived locally with CREATE2</li>
            <li>ERC‑20 <span className="font-mono">transfer</span> QR payments only — no arbitrary contract calls</li>
            <li>Settlement restricted to a single whitelisted vault method, signed by a device-local operator wallet</li>
          </ul>
          <p className="text-sm">
            It’s a working demonstration that the “scan → confirm → done” model is buildable today
            with a strict safety boundary.
          </p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>NFC: why it’s underused (but powerful)</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3 text-muted-foreground">
          <p>
            An NFC tag can store a URI in an NDEF record. In theory, encoding an{" "}
            <span className="font-mono">ethereum:…</span> URI enables “tap-to-open wallet”.
          </p>
          <p>
            In practice, the UX depends on OS behavior + which wallets register URL handlers,
            and many wallets don’t advertise NFC-first payment flows yet.
          </p>
          <p>
            If you’re building POS/NFC flows, focus on:
          </p>
          <ul className="list-disc space-y-1 pl-5">
            <li>Native transfers first (broad compatibility)</li>
            <li>Explicit chainId handling</li>
            <li>Clear signing UX and anti-phishing protections</li>
            <li>Fallback paths (e.g., WalletConnect) for complex actions</li>
          </ul>
        </CardContent>
      </Card>
    </div>
  );
}


