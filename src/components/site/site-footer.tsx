import Link from "next/link";

export function SiteFooter() {
  return (
    <footer className="border-t">
      <div className="mx-auto w-full max-w-6xl px-4 py-10 text-sm text-muted-foreground sm:px-6 lg:px-8">
        <div className="grid gap-8 md:grid-cols-3">
          <div className="space-y-2">
            <div className="font-medium text-foreground">ERC‑681</div>
            <p>
              Community hub for wallet adoption, developer tooling, and
              scan/tap-to-pay on Ethereum.
            </p>
          </div>
          <div className="space-y-2">
            <div className="font-medium text-foreground">Pages</div>
            <div className="flex flex-col gap-1">
              <Link href="/spec" className="hover:text-foreground">
                Spec highlights
              </Link>
              <Link href="/adoption" className="hover:text-foreground">
                Wallet adoption
              </Link>
              <Link href="/builder" className="hover:text-foreground">
                Link & QR builder
              </Link>
            </div>
          </div>
          <div className="space-y-2">
            <div className="font-medium text-foreground">Contribute</div>
            <p>
              Fix a wallet parser, add a test vector, or update the support
              matrix via PRs on GitHub.
            </p>
          </div>
        </div>
        <div className="mt-8 flex flex-col gap-2 border-t pt-6 sm:flex-row sm:items-center sm:justify-between">
          <span>© {new Date().getFullYear()} ERC‑681 community</span>
          <span>
            Maintained in{" "}
            <a
              className="hover:text-foreground"
              href="https://github.com/zhangzhongnan928/erc681org"
              target="_blank"
              rel="noreferrer"
            >
              github.com/zhangzhongnan928/erc681org
            </a>
          </span>
        </div>
      </div>
    </footer>
  );
}


