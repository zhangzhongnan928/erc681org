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
    wallet: "D’CENT",
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
        label: "D’CENT EIP-681 guide",
        href: "https://dev-docs.dcentwallet.com/dynamic-link/eip-681-transaction-payment-request",
      },
      {
        label: "EIP-681 spec",
        href: "https://eips.ethereum.org/EIPS/eip-681",
      },
    ],
  },
];


