import type { Metadata } from "next";
import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";

export const metadata: Metadata = {
  title: "Spec highlights",
  description: "Key ERC-681 syntax, semantics, and examples.",
};

export default function SpecPage() {
  return (
    <div className="space-y-8">
      <div className="space-y-2">
        <h1 className="text-3xl font-semibold tracking-tight">ERC‑681 spec highlights</h1>
        <p className="max-w-prose text-muted-foreground">
          ERC‑681 defines a standard way to express payment requests and ABI-specified
          contract interactions as{" "}
          <span className="font-medium text-foreground">ethereum:</span> URIs.
          This page is a “working engineer’s” summary; the canonical reference is the
          EIP text.
        </p>
        <div className="flex flex-wrap gap-2">
          <Button asChild variant="outline" size="sm">
            <a href="https://eips.ethereum.org/EIPS/eip-681" target="_blank" rel="noreferrer">
              Read the canonical EIP
            </a>
          </Button>
          <Button asChild variant="outline" size="sm">
            <Link href="/builder">Try the builder</Link>
          </Button>
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Syntax (ABNF)</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-muted-foreground">
            At a high level, an ERC‑681 request looks like:
          </p>
          <pre className="overflow-x-auto rounded-lg border bg-muted/20 p-4 text-xs">
            <code>{`request                 = schema_prefix target_address [ "@" chain_id ] [ "/" function_name ] [ "?" parameters ]
schema_prefix           = "ethereum" ":" [ "pay-" ]
target_address          = ethereum_address
chain_id                = 1*DIGIT
function_name           = STRING
ethereum_address        = ( "0x" 40*HEXDIG ) / ENS_NAME
parameters              = parameter *( "&" parameter )
parameter               = key "=" value
key                     = "value" / "gas" / "gasLimit" / "gasPrice" / TYPE
value                   = number / ethereum_address / STRING`}</code>
          </pre>
          <p className="text-muted-foreground">
            Key points:
          </p>
          <ul className="list-disc space-y-1 pl-5 text-muted-foreground">
            <li>
              <span className="font-medium text-foreground">target_address</span>{" "}
              is mandatory — beneficiary for native payments, or contract address for calls.
            </li>
            <li>
              <span className="font-medium text-foreground">@chainId</span>{" "}
              is optional and uses decimal chain IDs.
            </li>
            <li>
              If <span className="font-medium text-foreground">/function</span>{" "}
              is omitted, the URI requests a native transfer.
            </li>
            <li>
              Values are in <span className="font-medium text-foreground">atomic units</span>{" "}
              (wei for ETH). Scientific notation is encouraged.
            </li>
          </ul>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Semantics & examples</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <div className="text-sm font-medium">Native payment (ETH)</div>
            <pre className="overflow-x-auto rounded-lg border bg-muted/20 p-4 text-xs">
              <code>{`ethereum:0xfb6916095ca1df60bb79Ce92ce3ea74c37c5d359?value=2.014e18`}</code>
            </pre>
            <p className="text-sm text-muted-foreground">
              Here, <span className="font-mono">value</span> is in wei (atomic units).
            </p>
          </div>

          <Separator />

          <div className="space-y-2">
            <div className="text-sm font-medium">ERC‑20 transfer</div>
            <pre className="overflow-x-auto rounded-lg border bg-muted/20 p-4 text-xs">
              <code>{`ethereum:0x89205a3a3b2a69de6dbf7f01ed13b2108b2c43e7/transfer?address=0x8e23ee67d1332ad560396262c48ffbb01f93d052&uint256=1`}</code>
            </pre>
            <p className="text-sm text-muted-foreground">
              The target address is the token contract; the function is{" "}
              <span className="font-mono">transfer</span>; parameters are typed
              keys (e.g. <span className="font-mono">address</span>,{" "}
              <span className="font-mono">uint256</span>).
            </p>
          </div>

          <Separator />

          <div className="space-y-2">
            <div className="text-sm font-medium">ENS names</div>
            <p className="text-sm text-muted-foreground">
              ERC‑681 allows ENS names as addresses. Resolution is the payer’s job;
              hexadecimal addresses must take precedence over ENS lookups.
            </p>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Why contract calls often fail in wallets</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3 text-muted-foreground">
          <p>
            ERC‑681 encodes the <span className="font-medium text-foreground">function name</span>{" "}
            and <span className="font-medium text-foreground">typed parameter keys</span>, but wallets
            still need ABI context to build calldata safely for arbitrary calls.
          </p>
          <p>
            In practice, many wallets restrict support to native transfers and a small
            set of well-known token operations. See the{" "}
            <Link className="underline-offset-4 hover:underline" href="/adoption">
              adoption matrix
            </Link>{" "}
            and the discussion on Ethereum Magicians.
          </p>
        </CardContent>
      </Card>
    </div>
  );
}


