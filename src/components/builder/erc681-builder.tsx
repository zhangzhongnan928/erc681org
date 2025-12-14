"use client";

import { useEffect, useMemo, useState } from "react";
import { Copy, ExternalLink, RefreshCw } from "lucide-react";
import Image from "next/image";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";

import { buildErc681Uri, toScientificAtomic } from "@/lib/erc681";
import { toQrDataUrl } from "@/lib/qr";

function Field({ label, hint, children }: { label: string; hint?: string; children: React.ReactNode }) {
  return (
    <div className="space-y-2">
      <div className="flex items-baseline justify-between gap-4">
        <Label className="text-sm">{label}</Label>
        {hint ? <span className="text-xs text-muted-foreground">{hint}</span> : null}
      </div>
      {children}
    </div>
  );
}

async function copy(text: string) {
  await navigator.clipboard.writeText(text);
}

export function Erc681Builder() {
  const [payPrefix, setPayPrefix] = useState(false);
  const [chainId, setChainId] = useState<string>("1");

  // Native
  const [nativeTo, setNativeTo] = useState<string>("");
  const [nativeAmountEth, setNativeAmountEth] = useState<string>(""); // nominal ETH

  // ERC-20 transfer
  const [tokenContract, setTokenContract] = useState<string>("");
  const [tokenTo, setTokenTo] = useState<string>("");
  const [tokenDecimals, setTokenDecimals] = useState<string>("18");
  const [tokenAmountNominal, setTokenAmountNominal] = useState<string>("");

  const [active, setActive] = useState<"native" | "erc20">("native");
  const [qrDataUrl, setQrDataUrl] = useState<string>("");
  const [copied, setCopied] = useState(false);

  const parsedChainId = useMemo(() => {
    const n = Number(chainId);
    if (!Number.isFinite(n) || n <= 0) return undefined;
    return Math.trunc(n);
  }, [chainId]);

  const nativeValue = useMemo(() => {
    if (!nativeAmountEth.trim()) return "";
    return toScientificAtomic(nativeAmountEth, 18);
  }, [nativeAmountEth]);

  const tokenValue = useMemo(() => {
    const d = Number(tokenDecimals);
    if (!tokenAmountNominal.trim() || !Number.isFinite(d) || d < 0) return "";
    return toScientificAtomic(tokenAmountNominal, d);
  }, [tokenAmountNominal, tokenDecimals]);

  const uri = useMemo(() => {
    try {
      if (active === "native") {
        if (!nativeTo.trim()) return "";
        return buildErc681Uri(
          {
            kind: "native",
            to: nativeTo.trim(),
            chainId: parsedChainId,
            value: nativeValue || undefined,
          },
          { payPrefix },
        );
      }

      if (!tokenContract.trim() || !tokenTo.trim() || !tokenValue) return "";
      return buildErc681Uri(
        {
          kind: "erc20-transfer",
          tokenContract: tokenContract.trim(),
          to: tokenTo.trim(),
          chainId: parsedChainId,
          amount: tokenValue,
        },
        { payPrefix },
      );
    } catch {
      return "";
    }
  }, [
    active,
    nativeTo,
    parsedChainId,
    nativeValue,
    payPrefix,
    tokenContract,
    tokenTo,
    tokenValue,
  ]);

  useEffect(() => {
    let cancelled = false;
    (async () => {
      if (!uri) {
        setQrDataUrl("");
        return;
      }
      const next = await toQrDataUrl(uri);
      if (!cancelled) setQrDataUrl(next);
    })();
    return () => {
      cancelled = true;
    };
  }, [uri]);

  return (
    <div className="grid gap-6 lg:grid-cols-2">
      <Card>
        <CardHeader>
          <CardTitle>Inputs</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="flex flex-wrap items-center gap-2">
            <Button
              type="button"
              variant={payPrefix ? "default" : "outline"}
              size="sm"
              onClick={() => setPayPrefix((v) => !v)}
            >
              pay- prefix
            </Button>
            <Badge variant="secondary">
              Wallet behavior differs — test on target wallets
            </Badge>
          </div>

          <Field label="chainId" hint="Optional (@chainId)">
            <Input
              inputMode="numeric"
              placeholder="1"
              value={chainId}
              onChange={(e) => setChainId(e.target.value)}
            />
          </Field>

          <Tabs value={active} onValueChange={(v) => setActive(v as typeof active)}>
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="native">Native</TabsTrigger>
              <TabsTrigger value="erc20">ERC‑20 transfer</TabsTrigger>
            </TabsList>

            <TabsContent value="native" className="space-y-5">
              <Field
                label="to"
                hint="0x… address or ENS name"
              >
                <Input
                  placeholder="0xabc… or vitalik.eth"
                  value={nativeTo}
                  onChange={(e) => setNativeTo(e.target.value)}
                />
              </Field>
              <Field label="amount (ETH)" hint="We’ll encode as scientific wei (e18)">
                <Input
                  inputMode="decimal"
                  placeholder="2.014"
                  value={nativeAmountEth}
                  onChange={(e) => setNativeAmountEth(e.target.value)}
                />
              </Field>
              <div className="rounded-md border bg-muted/30 p-3 text-sm">
                <div className="text-muted-foreground">Encoded value (wei)</div>
                <div className="font-mono text-xs">{nativeValue || "—"}</div>
              </div>
            </TabsContent>

            <TabsContent value="erc20" className="space-y-5">
              <Field label="token contract" hint="ERC-20 contract address">
                <Input
                  placeholder="0xTokenContract…"
                  value={tokenContract}
                  onChange={(e) => setTokenContract(e.target.value)}
                />
              </Field>
              <Field label="to" hint="Beneficiary address">
                <Input
                  placeholder="0xRecipient…"
                  value={tokenTo}
                  onChange={(e) => setTokenTo(e.target.value)}
                />
              </Field>
              <Field label="decimals" hint="Usually 6 (USDC) or 18 (ETH-style)">
                <Input
                  inputMode="numeric"
                  placeholder="18"
                  value={tokenDecimals}
                  onChange={(e) => setTokenDecimals(e.target.value)}
                />
              </Field>
              <Field label="amount (nominal)" hint="We’ll encode as scientific atomic (e{decimals})">
                <Input
                  inputMode="decimal"
                  placeholder="1.5"
                  value={tokenAmountNominal}
                  onChange={(e) => setTokenAmountNominal(e.target.value)}
                />
              </Field>
              <div className="rounded-md border bg-muted/30 p-3 text-sm">
                <div className="text-muted-foreground">Encoded uint256 (atomic)</div>
                <div className="font-mono text-xs">{tokenValue || "—"}</div>
              </div>
            </TabsContent>
          </Tabs>

          <div className="flex flex-wrap gap-2">
            <Button
              type="button"
              variant="outline"
              onClick={() => {
                setNativeTo("");
                setNativeAmountEth("");
                setTokenContract("");
                setTokenTo("");
                setTokenAmountNominal("");
                setTokenDecimals("18");
                setQrDataUrl("");
              }}
            >
              <RefreshCw className="mr-2 h-4 w-4" />
              Reset
            </Button>
            <Button
              type="button"
              disabled={!uri}
              onClick={async () => {
                if (!uri) return;
                await copy(uri);
                setCopied(true);
                window.setTimeout(() => setCopied(false), 1200);
              }}
            >
              <Copy className="mr-2 h-4 w-4" />
              {copied ? "Copied" : "Copy URI"}
            </Button>
            <Button
              type="button"
              variant="secondary"
              disabled={!uri}
              asChild
            >
              <a href={uri || "#"} target="_blank" rel="noreferrer">
                Open URI <ExternalLink className="ml-2 h-4 w-4" />
              </a>
            </Button>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Output</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <Field label="ERC‑681 URI">
            <Textarea
              value={uri}
              readOnly
              placeholder="Fill inputs to generate…"
              className="min-h-28 font-mono text-xs"
            />
          </Field>
          <div className="rounded-lg border bg-muted/20 p-4">
            <div className="mb-3 text-sm font-medium">QR Code</div>
            {qrDataUrl ? (
              <Image
                src={qrDataUrl}
                alt="ERC-681 QR code"
                width={320}
                height={320}
                className="h-auto w-full max-w-xs rounded-md bg-white p-3"
              />
            ) : (
              <div className="text-sm text-muted-foreground">
                Provide required fields to generate a QR code.
              </div>
            )}
          </div>
          <div className="text-sm text-muted-foreground">
            Tip: for in‑person payments, use native transfers for the most consistent wallet support.
            Token transfers and contract calls can break depending on the wallet and chain.
          </div>
        </CardContent>
      </Card>
    </div>
  );
}


