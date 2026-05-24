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
  // ── Week of 2026-05-25 research: 3 additional wallets ──
  // MetaMask Mobile v7.78.0 (May 22 2026): translations, Explore page feature,
  // token icon fixes, BTC swap fix — no ERC-681 changes. All prior ratings unchanged.
  // New wallets added: Brave Wallet, Backpack, MyEtherWallet (MEW).
  // Methodology: checked official docs, developer deeplink references, and public
  // GitHub repos for 'ethereum:' URI and '681' references. No wallet found to have
  // added or removed ERC-681 support vs prior week.
  {
    wallet: "Brave Wallet",
    platforms: ["Desktop (built-in Brave browser, Windows/macOS/Linux)", "iOS", "Android"],
    supportedChains: "Ethereum and all EVM-compatible chains, Solana, Bitcoin",
    schemeParsing: "no",
    nativeTransfer: "no",
    erc20Transfer: "no",
    arbitraryContractCall: "no",
    chainIdHandling: "no",
    qrScan: "no",
    nfcTap: "no",
    notes:
      "Built directly into the Brave browser; interaction model is dApp → injected provider (EIP-1193) or WalletConnect. No ethereum: URI deeplink handler documented in Brave Wallet docs. No ERC-681 references found in the brave-core open-source repo. QR used for receive address display and WalletConnect pairing only.",
    evidence: [
      {
        label: "Brave Wallet developer docs (no ethereum: deeplink scheme)",
        href: "https://brave.com/learn/what-is-brave-wallet/",
      },
      {
        label: "brave/brave-core GitHub repo (no ERC-681 references found)",
        href: "https://github.com/brave/brave-core",
      },
    ],
  },
  {
    wallet: "Backpack",
    platforms: ["iOS", "Android", "Desktop (Chrome/Brave extension)"],
    supportedChains: "Solana, Ethereum, Base, Polygon, Arbitrum, Sui, Monad, Bitcoin",
    schemeParsing: "no",
    nativeTransfer: "no",
    erc20Transfer: "no",
    arbitraryContractCall: "no",
    chainIdHandling: "no",
    qrScan: "no",
    nfcTap: "no",
    notes:
      "Solana-first multi-chain wallet with integrated exchange. Ethereum support added later; interaction model is injected provider/WalletConnect. No ethereum: URI deeplink handler documented. Developer docs and blog posts show no ERC-681 references; QR is for address display and WalletConnect pairing only.",
    evidence: [
      {
        label: "Backpack developer docs (no ethereum: URI scheme)",
        href: "https://docs.backpack.app/",
      },
      {
        label: "Backpack wallet review 2026 (Solana-first, multi-chain via injected provider)",
        href: "https://cryptoadventure.com/backpack-review-2026-solana-wallet-ux-exchange-tie-ins-and-who-it-fits-best/",
      },
    ],
  },
  {
    wallet: "MyEtherWallet (MEW)",
    platforms: ["iOS", "Android", "Web app"],
    supportedChains: "Ethereum and EVM-compatible chains",
    schemeParsing: "no",
    nativeTransfer: "no",
    erc20Transfer: "no",
    arbitraryContractCall: "no",
    chainIdHandling: "no",
    qrScan: "no",
    nfcTap: "no",
    notes:
      "One of the original Ethereum wallets. QR scanning is for receive addresses and MEWconnect/WalletConnect pairing only. Help center articles describe QR as address-display feature; no ethereum: URI payment request flow documented. MEW mobile open-source codebase has no ERC-681 parsing.",
    evidence: [
      {
        label: "MEW help: Sending and Receiving on MEW Mobile iOS (QR for receive address only)",
        href: "https://help.myetherwallet.com/en/articles/5946513-sending-and-receiving-crypto-on-mew-mobile-ios",
      },
      {
        label: "MyEtherWallet/MyEtherWallet GitHub repo (no ERC-681 references)",
        href: "https://github.com/MyEtherWallet/MyEtherWallet",
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
  // ── Week of 2026-03-23 research: 3 additional wallets ──
  // Methodology: searched each wallet's GitHub repo/codebase for "681", "ethereum:",
  // and "erc-681"; checked developer deeplink docs; confirmed wallet deeplink schemes.
  // MetaMask Mobile confirmed at v7.68.0 (changelog: analytics refactoring only, no
  // ERC-681 changes). No wallets found to have added or removed ERC-681 support vs prior week.
  //
  // ── Week of 2026-05-18 research: 3 additional wallets ──
  // MetaMask Mobile v7.77.0/v7.78.0 (May 15 2026): cherry-pick fixes for MetaMask Pay
  // activity display, Ledger error handling, mUSD icon — no ERC-681 changes. Rating unchanged.
  // New wallets added: TokenPocket, Coin98, Frame.
  {
    wallet: "Bitget Wallet",
    platforms: ["iOS", "Android", "Desktop (Chrome extension)"],
    supportedChains: "Ethereum and 100+ EVM chains, Bitcoin, Solana, TON, etc.",
    schemeParsing: "no",
    nativeTransfer: "no",
    erc20Transfer: "no",
    arbitraryContractCall: "no",
    chainIdHandling: "no",
    qrScan: "no",
    nfcTap: "no",
    notes:
      "Formerly BitKeep. Developer docs confirm proprietary `bitkeep://` deeplink scheme and WalletConnect for dApp connections. PayFi checkout flow uses `bitkeep://` protocol via their SDK. No ethereum: URI handler documented or found in public repos.",
    evidence: [
      {
        label: "Bitget Wallet deeplink docs (bitkeep:// scheme only, no ethereum:)",
        href: "https://web3.bitget.com/en/docs/reference/deeplink/",
      },
      {
        label: "Bitget Wallet PayFi developer guide (bitkeep:// checkout)",
        href: "https://web3.bitget.com/en/docs/payfi/developer-guide/",
      },
    ],
  },
  {
    wallet: "Ambire Wallet",
    platforms: ["iOS", "Android", "Desktop (Chrome extension)"],
    supportedChains: "Ethereum and all EVM-compatible chains",
    schemeParsing: "no",
    nativeTransfer: "no",
    erc20Transfer: "no",
    arbitraryContractCall: "no",
    chainIdHandling: "no",
    qrScan: "no",
    nfcTap: "no",
    notes:
      "Smart contract wallet (ERC-4337, EIP-7702). Open-source repo shows no ERC-681 or ethereum: URI handler. Focus is on AA features (transaction batching, Gas Tank), WalletConnect, and EIP-7702 delegation. QR used for WalletConnect pairing only.",
    evidence: [
      {
        label: "AmbireTech/wallet GitHub repo (no ERC-681 references)",
        href: "https://github.com/AmbireTech/wallet",
      },
      {
        label: "Ambire EIP-7702 blog post (feature focus; no ERC-681 mentioned)",
        href: "https://blog.ambire.com/eip-7702-wallet/",
      },
    ],
  },
  {
    wallet: "Sequence",
    platforms: ["iOS", "Android", "Web app (embedded wallet)"],
    supportedChains: "Ethereum and major EVM chains (Polygon, Arbitrum, Optimism, Base, etc.)",
    schemeParsing: "no",
    nativeTransfer: "no",
    erc20Transfer: "no",
    arbitraryContractCall: "no",
    chainIdHandling: "no",
    qrScan: "no",
    nfcTap: "no",
    notes:
      "Smart contract wallet primarily used as an embedded SDK wallet for games/dApps (e.g. Skyweaver). No ERC-681 references in open-source wallet-contracts repo. Integration is SDK-based (sequence.js), not deeplink/QR URI based.",
    evidence: [
      {
        label: "0xsequence/wallet-contracts GitHub repo (no ERC-681 references)",
        href: "https://github.com/0xsequence/wallet-contracts",
      },
    ],
  },
  {
    wallet: "TokenPocket",
    platforms: ["iOS", "Android"],
    supportedChains: "Ethereum and 20+ blockchains (BSC, Tron, Solana, Polygon, EOS, etc.)",
    schemeParsing: "partial",
    nativeTransfer: "partial",
    erc20Transfer: "no",
    arbitraryContractCall: "no",
    chainIdHandling: "no",
    qrScan: "partial",
    nfcTap: "no",
    notes:
      "Receipt QR scanning recognises bare `ethereum:0x<address>` format (ERC-831/ERC-681 address-only). Full ERC-681 function params and chainId are not parsed. Token transfers and contract calls use a proprietary `tpoutside://pull.activity?param={...}` deeplink with JSON payload — not ERC-681 compatible. No `@chainId` handling in the ethereum: URI path.",
    evidence: [
      {
        label: "TokenPocket QRCode Protocol docs (ethereum: bare address in receipt QR)",
        href: "https://help.tokenpocket.pro/developer-en/scan-protocol",
      },
      {
        label: "TokenPocket DeepLink docs (tpoutside:// proprietary JSON scheme, not ERC-681)",
        href: "https://help.tokenpocket.pro/developer-en/wallet/pull-up-wallet-with-deeplink",
      },
    ],
  },
  {
    wallet: "Coin98",
    platforms: ["iOS", "Android", "Desktop (Chrome extension)"],
    supportedChains: "Ethereum and major EVM chains, Solana, Terra, Cosmos, etc.",
    schemeParsing: "no",
    nativeTransfer: "no",
    erc20Transfer: "no",
    arbitraryContractCall: "no",
    chainIdHandling: "no",
    qrScan: "no",
    nfcTap: "no",
    notes:
      "Developer docs describe proprietary `https://coin98.com/dapp/:link/:chainId` URL scheme for dApp launching and `https://exchange.coin98.com/:chain/:from/:to` for swaps. No `ethereum:` URI handler documented. QR scanning is for WalletConnect pairing and address display only.",
    evidence: [
      {
        label: "Coin98 deeplink docs (coin98.com/dapp scheme only, no ethereum:)",
        href: "https://docs.coin98.com/developer-guide/deeplink",
      },
    ],
  },
  {
    wallet: "Frame",
    platforms: ["Desktop (macOS/Windows/Linux — native app + browser extension)"],
    supportedChains: "Ethereum and all EVM-compatible chains",
    schemeParsing: "no",
    nativeTransfer: "no",
    erc20Transfer: "no",
    arbitraryContractCall: "no",
    chainIdHandling: "no",
    qrScan: "no",
    nfcTap: "no",
    notes:
      "Desktop-only Ethereum wallet acting as a system-level provider for dApps. Interaction model is entirely dApp → injected provider (EIP-1193); no URI deeplink or QR scanning for payment requests. No ERC-681 references found in the open-source codebase.",
    evidence: [
      {
        label: "frame-eth/frame GitHub repo (no ERC-681 references)",
        href: "https://github.com/frame-eth/frame",
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


