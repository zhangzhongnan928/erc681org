import Link from "next/link";
import { ArrowRight, Shield, Smartphone, Zap } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function Home() {
  return (
    <div className="space-y-14">
      <section className="relative overflow-hidden rounded-2xl border bg-gradient-to-b from-muted/50 to-background p-8 sm:p-12">
        <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_top,rgba(99,102,241,0.18),transparent_55%),radial-gradient(circle_at_bottom,rgba(16,185,129,0.12),transparent_50%)]" />
        <div className="grid gap-10 lg:grid-cols-2 lg:gap-16">
          <div className="space-y-6">
            <div className="text-sm font-medium text-muted-foreground">
              Ethereum transaction request URIs · QR codes · NFC
            </div>
            <h1 className="text-balance text-4xl font-semibold tracking-tight sm:text-5xl">
              Make <span className="text-foreground">ethereum:</span> links work —
              everywhere.
            </h1>
            <p className="max-w-prose text-pretty text-lg text-muted-foreground">
              ERC‑681 defines a standard URI format for payment requests and
              contract interactions. This site documents real wallet behavior,
              tracks adoption, and ships tooling to unlock scan/tap-to-pay in
              person.
            </p>
            <div className="flex flex-col gap-3 sm:flex-row">
              <Button asChild size="lg">
                <Link href="/builder">
                  Build a link / QR <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
              <Button asChild size="lg" variant="outline">
                <Link href="/adoption">View wallet support</Link>
              </Button>
            </div>
            <p className="text-sm text-muted-foreground">
              中文读者：我们会用中英双语推进 adoption；欢迎 wallet 团队一起对齐实现与
              测试向量。
            </p>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-base">
                  <Smartphone className="h-4 w-4" /> Mobile-first adoption
                </CardTitle>
              </CardHeader>
              <CardContent className="text-sm text-muted-foreground">
                Wallets often parse only <span className="font-medium">address</span> +{" "}
                <span className="font-medium">value</span>, ignoring token / contract calls.
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-base">
                  <Shield className="h-4 w-4" /> Safety & ABI context
                </CardTitle>
              </CardHeader>
              <CardContent className="text-sm text-muted-foreground">
                Without ABI discovery, arbitrary contract calls become blind-signing.
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-base">
                  <Zap className="h-4 w-4" /> In‑person payments
                </CardTitle>
              </CardHeader>
              <CardContent className="text-sm text-muted-foreground">
                QR/NFC deep links can enable “scan or tap → confirm → done” flows.
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle className="text-base">Get involved</CardTitle>
              </CardHeader>
              <CardContent className="text-sm text-muted-foreground">
                Add evidence links, update support levels, and contribute test vectors.
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      <section className="grid gap-4 md:grid-cols-3">
        <Card className="md:col-span-2">
          <CardHeader>
            <CardTitle>What is ERC‑681?</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3 text-muted-foreground">
            <p>
              ERC‑681 standardizes{" "}
              <span className="font-medium text-foreground">ethereum:</span> URLs for
              transaction requests — native transfers and ABI-specified calls — so that
              a QR code or link can launch a wallet with a pre-filled transaction.
            </p>
            <div className="flex flex-col gap-2 sm:flex-row">
              <Button asChild variant="outline">
                <Link href="/spec">Read spec highlights</Link>
              </Button>
              <Button asChild variant="outline">
                <Link href="/in-person">Explore in‑person flows</Link>
              </Button>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Quick examples</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3 text-sm text-muted-foreground">
            <div>
              <div className="font-medium text-foreground">Native transfer</div>
              <div className="rounded-md border bg-muted/40 p-2 font-mono text-xs">
                ethereum:0x…?value=2.014e18
              </div>
            </div>
            <div>
              <div className="font-medium text-foreground">ERC‑20 transfer</div>
              <div className="rounded-md border bg-muted/40 p-2 font-mono text-xs">
                ethereum:0xToken/transfer?address=0x…&amp;uint256=1e6
              </div>
            </div>
          </CardContent>
        </Card>
      </section>
    </div>
  );
}
