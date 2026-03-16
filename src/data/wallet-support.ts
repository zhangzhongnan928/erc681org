export type SupportLevel = "no" | "partial" | "yes";

export type WalletSupportRow = {
  wallet: string;
  platforms: string[];
  supportedChains: string;
  // Core scheme parsing (ethereum:) and amount/value handling
  schemeParsing: SupportLevel;
  nativeTransfer: SupportLevel;
  erc20Transfer: SupportLevel;
  arbitraryContractCall: SupportLevel;
  chainIdHandling: SupportLevel;
  qrScan: SupportLevel;
  nfcTap: SupportLevel;
  notes: string;
  evidence: { label: string; href: string }[];
};

// This dataset is intentionally conservative and evidence-linked.
// Update via PRs when behavior changes (wallet releases regress frequently).
//
// qrScan levels:
//   "yes"     = scans QR codes containing `ethereum:` URIs and parses them as ERC-681 transactions
//   "partial" = scans QR codes but only for address-only or amount-only flows (no full ERC-681 parsing)
//   "no"      = no QR scanning for `ethereum:` URIs; QR used only for WalletConnect pairing or address display
export const WALLET_SUPPORT: WalletSupportRow[] = [
  {
    wallet: "MetaMask Mobile",
    platforms: ["iOS", "Android"],
    supportedChains:
      "Ethereum mainnet + user-added EVM networks (Base, OP, Arbitrum, Polygon, BSC, etc.)",
    schemeParsing: "partial",
    nativeTransfer: "yes",
    erc20Transfer: "partial",
    arbitraryContractCall: "no",
    chainIdHandling: "partial",
    qrScan: "yes",
    nfcTap: "no",
    notes:
      "Works for basic native transfers. Contract calls via ERC-681 are widely reported as unreliable due to missing ABI context; community pushes alternatives (deep links/WalletConnect).",
    evidence: [
      {
        label: "EIP-681 (spec)",
        href: "https://eips.ethereum.org/EIPS/eip-681",
      },
      {
        label: "MetaMask issue: wrong value on ERC-20 (mobile)",
        href: "https://github.com/MetaMask/metamask-mobile/issues/1549",
      },
      {
        label: "Magicians thread (adoption + pain points)",
        href: "https://ethereum-magicians.org/t/erc-681-representing-various-transactions-as-urls/650",
      },
    ],
  },
  {
    wallet: "Rainbow",
    platforms: ["iOS", "Android"],
    supportedChains: "Ethereum + multiple L2s/sidechains",
    schemeParsing: "partial",
    nativeTransfer: "yes",
    erc20Transfer: "no",
    arbitraryContractCall: "no",
    chainIdHandling: "partial",
    qrScan: "yes",
    nfcTap: "no",
    notes:
      "Generally supports address/amount QR flows for native transfers; complex contract calls are not handled via ERC-681; WalletConnect preferred for dApp interactions.",
    evidence: [
      {
        label: "Magicians thread (discussion)",
        href: "https://ethereum-magicians.org/t/erc-681-representing-various-transactions-as-urls/650",
      },
    ],
  },
  {
    wallet: "Trust Wallet",
    platforms: ["iOS", "Android"],
    supportedChains: "Multi-chain (Ethereum, BSC, Polygon, Avalanche, etc.)",
    schemeParsing: "partial",
    nativeTransfer: "partial",
    erc20Transfer: "partial",
    arbitraryContractCall: "no",
    chainIdHandling: "partial",
    qrScan: "yes",
    nfcTap: "no",
    notes:
      "Historically inconsistent parsing of Ethereum `value=` and `@chainId` across networks; some flows required wallet-specific wrappers/parameters.",
    evidence: [
      {
        label: "StackOverflow: iOS TrustWallet deep link provider injection note",
        href: "https://stackoverflow.com/questions/77149302/trustwallet-not-injecting-ethereum-provider-with-deeplinking-into-mobile-ios-tru",
      },
      {
        label: "Magicians thread (discussion)",
        href: "https://ethereum-magicians.org/t/erc-681-representing-various-transactions-as-urls/650",
      },
    ],
  },
  {
    wallet: "Coinbase Wallet",
    platforms: ["iOS", "Android"],
    supportedChains: "Ethereum mainnet + user-added EVM networks",
    schemeParsing: "partial",
    nativeTransfer: "yes",
    erc20Transfer: "partial",
    arbitraryContractCall: "no",
    chainIdHandling: "partial",
    qrScan: "yes",
    nfcTap: "no",
    notes:
      "Can generate/scan EIP-681-style token transfer QR codes in some flows, but still limited for arbitrary contract calls; ecosystem often favors WalletConnect/SDK flows.",
    evidence: [
      {
        label: "Coinbase: three ways to integrate Coinbase Wallet",
        href: "https://www.coinbase.com/developer-platform/discover/dev-foundations/three-ways-to-integrate-coinbase-wallet",
      },
      {
        label: "Magicians thread (discussion)",
        href: "https://ethereum-magicians.org/t/erc-681-representing-various-transactions-as-urls/650",
      },
    ],
  },
  {
    wallet: "imToken",
    platforms: ["iOS", "Android"],
    supportedChains: "EVM chains (Ethereum, BSC, Polygon, Arbitrum, etc.)",
    schemeParsing: "yes",
    nativeTransfer: "yes",
    erc20Transfer: "yes",
    arbitraryContractCall: "no",
    chainIdHandling: "yes",
    qrScan: "yes",
    nfcTap: "partial",
    notes:
      "One of the stronger implementers for transfers; supports `ethereum:pay-` and token-transfer style flows. Still not a general ABI-based contract-call solution.",
    evidence: [
      {
        label: "Magicians thread (discussion)",
        href: "https://ethereum-magicians.org/t/erc-681-representing-various-transactions-as-urls/650",
      },
    ],
  },
  {
    wallet: "D'CENT",
    platforms: ["iOS", "Android"],
    supportedChains: "EVM networks (Ethereum, Polygon, BSC, Avalanche C, etc.)",
    schemeParsing: "yes",
    nativeTransfer: "yes",
    erc20Transfer: "yes",
    arbitraryContractCall: "partial",
    chainIdHandling: "yes",
    qrScan: "yes",
    nfcTap: "partial",
    notes:
      "Explicit EIP-681 support and good UX for payment requests; supports common token operations like transfer/approve in URI form.",
    evidence: [
      {
        label: "D'CENT EIP-681 guide",
        href: "https://dev-docs.dcentwallet.com/dynamic-link/eip-681-transaction-payment-request",
      },
      {
        label: "EIP-681 spec",
        href: "https://eips.ethereum.org/EIPS/eip-681",
      },
    ],
  },
  // ── Week of 2026-03-16 research: 10 additional wallets ──
  // Methodology: searched each wallet's GitHub repo/codebase for "681", "ethereum:",
  // and "erc-681"; checked developer docs and deeplink documentation; cross-referenced
  // with r/ethdev community reports. Absence of evidence is documented via repo search
  // links where source code is publicly available.
  {
    wallet: "Phantom",
    platforms: ["iOS", "Android", "Desktop (Chrome/Firefox/Brave extension)"],
    supportedChains: "Ethereum, Solana, Polygon, Base, Bitcoin",
    schemeParsing: "no",
    nativeTransfer: "no",
    erc20Transfer: "no",
    arbitraryContractCall: "no",
    chainIdHandling: "no",
    qrScan: "no",
    nfcTap: "no",
    notes:
      "QR scanning is for address display/receive only, not ethereum: URI parsing. Primarily Solana-focused; Ethereum support added later. Deeplink docs show solana: and phantom: schemes only, no ethereum: handler.",
    evidence: [
      {
        label: "Phantom deeplinks documentation (no ethereum: scheme listed)",
        href: "https://docs.phantom.com/phantom-deeplinks/other-methods",
      },
      {
        label: "Reddit r/ethdev – Wallets with full EIP-681 support (none confirmed)",
        href: "https://www.reddit.com/r/ethdev/comments/1nrq8ly/wallets_with_full_eip681_support/",
      },
    ],
  },
  {
    wallet: "OKX Wallet",
    platforms: ["iOS", "Android", "Desktop (Chrome extension)"],
    supportedChains: "Ethereum and 100+ EVM chains, Solana, Bitcoin, Cosmos, etc.",
    schemeParsing: "no",
    nativeTransfer: "no",
    erc20Transfer: "no",
    arbitraryContractCall: "no",
    chainIdHandling: "no",
    qrScan: "no",
    nfcTap: "no",
    notes:
      "QR scanning for WalletConnect pairing and address sharing only. Developer docs describe okx:// deeplink scheme and WalletConnect integration; no ethereum: URI handler documented.",
    evidence: [
      {
        label: "OKX Wallet developer docs – deeplink/connect (no ethereum: scheme)",
        href: "https://www.okx.com/web3/build/docs/sdks/app-connect-overview",
      },
    ],
  },
  {
    wallet: "Rabby",
    platforms: ["Desktop (Chrome/Brave extension)", "iOS", "Android"],
    supportedChains: "Ethereum and all EVM-compatible chains (100+)",
    schemeParsing: "no",
    nativeTransfer: "no",
    erc20Transfer: "no",
    arbitraryContractCall: "no",
    chainIdHandling: "no",
    qrScan: "no",
    nfcTap: "no",
    notes:
      "Extension-first wallet focused on EVM security features. GitHub repo search for '681' and 'ethereum:' shows no ERC-681 implementation.",
    evidence: [
      {
        label: "Rabby GitHub repo search for '681' (no results)",
        href: "https://github.com/RabbyHub/Rabby/search?q=681",
      },
    ],
  },
  {
    wallet: "Safe (Gnosis Safe)",
    platforms: ["iOS", "Android", "Web app"],
    supportedChains: "Ethereum and major EVM chains (Polygon, Arbitrum, Optimism, Base, etc.)",
    schemeParsing: "no",
    nativeTransfer: "no",
    erc20Transfer: "no",
    arbitraryContractCall: "no",
    chainIdHandling: "no",
    qrScan: "no",
    nfcTap: "no",
    notes:
      "Open GitHub issue (safe-global/safe-android#506) explicitly requests ERC-681 deeplink support but was never implemented. Uses WalletConnect and its own safe: URI scheme for multisig tx sharing. QR scanning is for WalletConnect pairing only.",
    evidence: [
      {
        label: "safe-global/safe-android#506 – EIP-681 deeplink request (open, unimplemented)",
        href: "https://github.com/safe-global/safe-android/issues/506",
      },
    ],
  },
  {
    wallet: "Zerion",
    platforms: ["iOS", "Android", "Desktop (Chrome extension)"],
    supportedChains: "Ethereum and 10+ EVM chains, Solana",
    schemeParsing: "no",
    nativeTransfer: "no",
    erc20Transfer: "no",
    arbitraryContractCall: "no",
    chainIdHandling: "no",
    qrScan: "no",
    nfcTap: "no",
    notes:
      "QR used for WalletConnect pairing only. Open-source wallet-core-ios repo has no references to ERC-681 or ethereum: URI parsing.",
    evidence: [
      {
        label: "Zerion wallet-core-ios repo search for '681' (no results)",
        href: "https://github.com/zeriontech/wallet-core-ios/search?q=681",
      },
    ],
  },
  {
    wallet: "Argent",
    platforms: ["iOS", "Android"],
    supportedChains: "Ethereum, Starknet",
    schemeParsing: "no",
    nativeTransfer: "no",
    erc20Transfer: "no",
    arbitraryContractCall: "no",
    chainIdHandling: "no",
    qrScan: "no",
    nfcTap: "no",
    notes:
      "Smart contract wallet (Account Abstraction). QR for WalletConnect only. Guardian-based security model uses argent:// deeplink scheme; no ethereum: URI handler. Open-source repo has no ERC-681 references.",
    evidence: [
      {
        label: "Argent GitHub repo search for '681' (no results)",
        href: "https://github.com/argentlabs/argent-x/search?q=681",
      },
    ],
  },
  {
    wallet: "Exodus",
    platforms: ["iOS", "Android", "Desktop (Windows/macOS/Linux)"],
    supportedChains: "Ethereum, Bitcoin, Solana, and 300+ assets",
    schemeParsing: "no",
    nativeTransfer: "no",
    erc20Transfer: "no",
    arbitraryContractCall: "no",
    chainIdHandling: "no",
    qrScan: "no",
    nfcTap: "no",
    notes:
      "Retail-focused non-custodial wallet. QR for receive addresses only. Deeplink docs show exodus:// scheme for send flows; no ethereum: URI handling documented. Closed source — no repo search available.",
    evidence: [
      {
        label: "Exodus deeplink support article (exodus:// scheme only)",
        href: "https://support.exodus.com/article/2226-using-links-to-send-crypto-with-exodus",
      },
    ],
  },
  {
    wallet: "1inch Wallet",
    platforms: ["iOS", "Android"],
    supportedChains: "Ethereum and major EVM chains",
    schemeParsing: "no",
    nativeTransfer: "no",
    erc20Transfer: "no",
    arbitraryContractCall: "no",
    chainIdHandling: "no",
    qrScan: "no",
    nfcTap: "no",
    notes:
      "No documentation or open-source code referencing ERC-681 ethereum: URI support. QR used for WalletConnect pairing only. Developer docs describe 1inch:// deeplink scheme.",
    evidence: [
      {
        label: "1inch developer portal – no ERC-681 references in deeplink docs",
        href: "https://portal.1inch.dev/documentation/wallet",
      },
    ],
  },
  {
    wallet: "Uniswap Wallet",
    platforms: ["iOS", "Android", "Desktop (Chrome extension)"],
    supportedChains: "Ethereum, Polygon, Arbitrum, Optimism, Base, BNB Chain",
    schemeParsing: "no",
    nativeTransfer: "no",
    erc20Transfer: "no",
    arbitraryContractCall: "no",
    chainIdHandling: "no",
    qrScan: "no",
    nfcTap: "no",
    notes:
      "Swap-centric wallet. QR for WalletConnect pairing only. Open-source repo uses uniswap:// deeplink scheme; no ethereum: URI handler found.",
    evidence: [
      {
        label: "Uniswap wallet repo search for '681' (no results)",
        href: "https://github.com/Uniswap/wallet/search?q=681",
      },
      {
        label: "Reddit r/ethdev – Wallets with full EIP-681 support (none confirmed)",
        href: "https://www.reddit.com/r/ethdev/comments/1nrq8ly/wallets_with_full_eip681_support/",
      },
    ],
  },
  {
    wallet: "Ledger Live",
    platforms: ["iOS", "Android", "Desktop (Windows/macOS/Linux)"],
    supportedChains: "Ethereum and all major blockchains (Bitcoin, Solana, 5500+ assets)",
    schemeParsing: "no",
    nativeTransfer: "no",
    erc20Transfer: "no",
    arbitraryContractCall: "no",
    chainIdHandling: "no",
    qrScan: "no",
    nfcTap: "no",
    notes:
      "Hardware wallet companion app. QR for receive addresses and WalletConnect pairing only. NFC is used for Ledger device pairing (Nano X Bluetooth/NFC), not for payment URI handling. Open-source repo has no ERC-681 URI parsing.",
    evidence: [
      {
        label: "Ledger Live repo search for '681' (no ERC-681 results)",
        href: "https://github.com/LedgerHQ/ledger-live/search?q=681",
      },
    ],
  },
];


