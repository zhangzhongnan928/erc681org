export type CapabilityStatus =
  | "confirmed"
  | "limited"
  | "not-supported"
  | "not-documented";

export type EvidenceGrade =
  | "code-confirmed"
  | "official-claim"
  | "scoped"
  | "no-public-evidence";

export type WalletEvidence = {
  label: string;
  href: string;
  kind: "official-code" | "official-docs" | "official-release" | "official-site";
};

export type WalletSupportRow = {
  wallet: string;
  platforms: string[];
  evidenceGrade: EvidenceGrade;
  schemeParsing: CapabilityStatus;
  nativeTransfer: CapabilityStatus;
  erc20Transfer: CapabilityStatus;
  otherContractCalls: CapabilityStatus;
  chainIdHandling: CapabilityStatus;
  qrScan: CapabilityStatus;
  reviewedAt: string | null;
  notes: string;
  evidence: WalletEvidence[];
};

const REVIEWED_AT = "2026-07-24";

export const VERIFIED_WALLET_SUPPORT: WalletSupportRow[] = [
  {
    wallet: "MetaMask Mobile",
    platforms: ["iOS", "Android"],
    evidenceGrade: "code-confirmed",
    schemeParsing: "confirmed",
    nativeTransfer: "confirmed",
    erc20Transfer: "confirmed",
    otherContractCalls: "limited",
    chainIdHandling: "confirmed",
    qrScan: "confirmed",
    reviewedAt: REVIEWED_AT,
    notes:
      "Current source routes ethereum: links through eth-url-parser, switches to the requested chain, and builds native, ERC-20 transfer, and approve flows. This is not general ABI-driven contract-call support.",
    evidence: [
      {
        label: "Ethereum URI handler",
        href: "https://github.com/MetaMask/metamask-mobile/blob/8a480513f106dfc735f7a85d6d6d7fde47e508e8/app/core/DeeplinkManager/handlers/legacy/handleEthereumUrl.ts",
        kind: "official-code",
      },
      {
        label: "Native + ERC-20 generators",
        href: "https://github.com/MetaMask/metamask-mobile/blob/8a480513f106dfc735f7a85d6d6d7fde47e508e8/app/util/payment-link-generator.js",
        kind: "official-code",
      },
      {
        label: "Mobile deeplink guide",
        href: "https://github.com/MetaMask/metamask-mobile/blob/8a480513f106dfc735f7a85d6d6d7fde47e508e8/docs/readme/deeplinking.md",
        kind: "official-docs",
      },
    ],
  },
  {
    wallet: "Rainbow",
    platforms: ["iOS", "Android"],
    evidenceGrade: "code-confirmed",
    schemeParsing: "confirmed",
    nativeTransfer: "confirmed",
    erc20Transfer: "confirmed",
    otherContractCalls: "not-supported",
    chainIdHandling: "confirmed",
    qrScan: "confirmed",
    reviewedAt: REVIEWED_AT,
    notes:
      "The QR scanner and deep-link handler both route ethereum: URIs into a send flow. Current code supports native transfers and ERC-20 transfer, uses chain_id, and rejects other function names.",
    evidence: [
      {
        label: "QR scanner",
        href: "https://github.com/rainbow-me/rainbow/blob/354bd7cda8954b3e90e2815851778529f543751e/src/hooks/useScanner.ts",
        kind: "official-code",
      },
      {
        label: "Transfer URI handler",
        href: "https://github.com/rainbow-me/rainbow/blob/354bd7cda8954b3e90e2815851778529f543751e/src/features/transfer/utils/startSendFromEthereumUrl.ts",
        kind: "official-code",
      },
    ],
  },
  {
    wallet: "AlphaWallet",
    platforms: ["iOS", "Android"],
    evidenceGrade: "code-confirmed",
    schemeParsing: "confirmed",
    nativeTransfer: "confirmed",
    erc20Transfer: "limited",
    otherContractCalls: "not-supported",
    chainIdHandling: "confirmed",
    qrScan: "confirmed",
    reviewedAt: REVIEWED_AT,
    notes:
      "iOS tests cover native and ERC-20 transfers, scientific notation, ENS, and @chainId. Android tests confirm native payment QR parsing; equivalent Android ERC-20 behavior was not proven in the reviewed tests.",
    evidence: [
      {
        label: "iOS parser tests",
        href: "https://github.com/AlphaWallet/alpha-wallet-ios/blob/e4e5cc89edc459b3d266cd7124ab09b7f096b80d/AlphaWalletTests/Foundation/QRCodeValueParserTests.swift",
        kind: "official-code",
      },
      {
        label: "iOS resolver",
        href: "https://github.com/AlphaWallet/alpha-wallet-ios/blob/e4e5cc89edc459b3d266cd7124ab09b7f096b80d/modules/AlphaWalletFoundation/AlphaWalletFoundation/Tokens/Eip681UrlResolver.swift",
        kind: "official-code",
      },
      {
        label: "Android parser test",
        href: "https://github.com/AlphaWallet/alpha-wallet-android/blob/f7b84e0cec282f0a1a7f0cd30f60d5c5fee26d40/app/src/test/java/com/alphawallet/app/util/QRParserTest.java",
        kind: "official-code",
      },
    ],
  },
  {
    wallet: "Trezor Suite Mobile",
    platforms: ["Android"],
    evidenceGrade: "code-confirmed",
    schemeParsing: "confirmed",
    nativeTransfer: "limited",
    erc20Transfer: "confirmed",
    otherContractCalls: "not-supported",
    chainIdHandling: "confirmed",
    qrScan: "confirmed",
    reviewedAt: REVIEWED_AT,
    notes:
      "Mobile release 26.5.1 added ERC-681 QR scanning. The parser accepts address-only native requests and ERC-20 transfer with integer amounts and known @chainId values; it rejects native ?value= requests and non-transfer calls.",
    evidence: [
      {
        label: "Mobile 26.5.1 release",
        href: "https://github.com/trezor/trezor-suite/releases/tag/v26.5.1%40mobile",
        kind: "official-release",
      },
      {
        label: "Transfer URI parser",
        href: "https://github.com/trezor/trezor-suite/blob/ab48a1e3c874658173df4ae5ed05c6b485f7df4a/suite-common/transfer-uri/src/parseErc681TransferUri.ts",
        kind: "official-code",
      },
      {
        label: "Parser fixtures",
        href: "https://github.com/trezor/trezor-suite/blob/ab48a1e3c874658173df4ae5ed05c6b485f7df4a/suite-common/transfer-uri/src/__fixtures__/parseErc681TransferUri.ts",
        kind: "official-code",
      },
    ],
  },
  {
    wallet: "D'CENT Wallet",
    platforms: ["iOS", "Android"],
    evidenceGrade: "official-claim",
    schemeParsing: "confirmed",
    nativeTransfer: "confirmed",
    erc20Transfer: "confirmed",
    otherContractCalls: "not-documented",
    chainIdHandling: "limited",
    qrScan: "confirmed",
    reviewedAt: REVIEWED_AT,
    notes:
      "D'CENT's official announcement says its mobile app populates payment amount and beneficiary from EIP-681 QR codes for native assets and ERC-20 tokens across multiple EVM networks. Exact @chainId and arbitrary-call behavior are not documented.",
    evidence: [
      {
        label: "Official EIP-681 announcement",
        href: "https://store.dcentwallet.com/blogs/post/d-cent-wallet-integrates-transaction-request-protocol-eip681",
        kind: "official-release",
      },
    ],
  },
  {
    wallet: "Tether Wallet",
    platforms: ["iOS", "Android"],
    evidenceGrade: "official-claim",
    schemeParsing: "confirmed",
    nativeTransfer: "limited",
    erc20Transfer: "limited",
    otherContractCalls: "not-documented",
    chainIdHandling: "not-documented",
    qrScan: "limited",
    reviewedAt: REVIEWED_AT,
    notes:
      "Version 1.6.0/1.6.1 release notes claim EIP-681 send and receive support, specifically naming XAUt and USA₮. Public release notes do not define the accepted URI grammar or chain-selection behavior.",
    evidence: [
      {
        label: "iOS version history",
        href: "https://apps.apple.com/us/app/tether-wallet/id6759002210",
        kind: "official-release",
      },
      {
        label: "Official launch",
        href: "https://tether.io/news/tether-launches-tether-wallet-the-peoples-wallet-extending-its-global-financial-infrastructure-directly-to-billions-of-users-left-behind-by-the-traditional-financial-system/",
        kind: "official-release",
      },
    ],
  },
  {
    wallet: "Splendor Wallet",
    platforms: ["iOS", "Android"],
    evidenceGrade: "official-claim",
    schemeParsing: "confirmed",
    nativeTransfer: "limited",
    erc20Transfer: "limited",
    otherContractCalls: "limited",
    chainIdHandling: "not-documented",
    qrScan: "confirmed",
    reviewedAt: REVIEWED_AT,
    notes:
      "The provider's iOS listing claims universal QR and EIP-681 with full URI parameter support. No public source or conformance tests were located, so individual transaction shapes remain provider-claimed rather than code-verified.",
    evidence: [
      {
        label: "Official iOS listing",
        href: "https://apps.apple.com/us/app/splendor-wallet/id6766822129",
        kind: "official-release",
      },
      {
        label: "Official wallet page",
        href: "https://splendor.org/wallet",
        kind: "official-site",
      },
    ],
  },
  {
    wallet: "TokenPocket",
    platforms: ["iOS", "Android"],
    evidenceGrade: "scoped",
    schemeParsing: "limited",
    nativeTransfer: "not-documented",
    erc20Transfer: "not-documented",
    otherContractCalls: "limited",
    chainIdHandling: "limited",
    qrScan: "confirmed",
    reviewedAt: REVIEWED_AT,
    notes:
      "Official docs reference EIP-681 but define a TokenPocket-specific ethereum:signTransaction protocol for cold-wallet signing. That is not evidence that canonical ERC-681 payment requests are accepted.",
    evidence: [
      {
        label: "Official EVM QR protocol",
        href: "https://help.tokenpocket.pro/developer-en/scan-protocol/evm",
        kind: "official-docs",
      },
    ],
  },
  {
    wallet: "Uniswap Wallet",
    platforms: ["iOS", "Android"],
    evidenceGrade: "scoped",
    schemeParsing: "limited",
    nativeTransfer: "limited",
    erc20Transfer: "not-supported",
    otherContractCalls: "not-supported",
    chainIdHandling: "not-supported",
    qrScan: "confirmed",
    reviewedAt: REVIEWED_AT,
    notes:
      "Current scanner code accepts ethereum:<address> as an address QR. It does not parse the ERC-681 path, query parameters, or @chainId suffix, so this is address import rather than payment-request support.",
    evidence: [
      {
        label: "Scanner URI classifier",
        href: "https://github.com/Uniswap/interface/blob/a69a38c2fab83be09b7d4113094a49b385810c5e/apps/mobile/src/components/Requests/ScanSheet/util.ts",
        kind: "official-code",
      },
      {
        label: "Scanner tests",
        href: "https://github.com/Uniswap/interface/blob/a69a38c2fab83be09b7d4113094a49b385810c5e/apps/mobile/src/components/Requests/ScanSheet/util.test.ts",
        kind: "official-code",
      },
    ],
  },
];

const NOT_DOCUMENTED =
  "No explicit ERC-681 implementation claim or conformance evidence was found in the official sources reviewed. This is an open research result, not proof of incompatibility.";

type ResearchQueueSeed = Pick<
  WalletSupportRow,
  "wallet" | "platforms" | "evidence"
>;

const WALLET_RESEARCH_SEEDS: ResearchQueueSeed[] = [
  {
    wallet: "Trust Wallet",
    platforms: ["iOS", "Android"],
    evidence: [
      {
        label: "Official developer docs",
        href: "https://developer.trustwallet.com/developer/develop-for-trust/deeplinking",
        kind: "official-docs",
      },
      {
        label: "Official Wallet Core",
        href: "https://github.com/trustwallet/wallet-core",
        kind: "official-code",
      },
    ],
  },
  {
    wallet: "Coinbase Wallet",
    platforms: ["iOS", "Android"],
    evidence: [
      {
        label: "Official mobile deeplinking docs",
        href: "https://docs.cdp.coinbase.com/coinbase-wallet/introduction/mobile-app-deeplinking",
        kind: "official-docs",
      },
    ],
  },
  {
    wallet: "imToken",
    platforms: ["iOS", "Android"],
    evidence: [
      {
        label: "Official wallet site",
        href: "https://www.token.im/",
        kind: "official-site",
      },
    ],
  },
  {
    wallet: "Phantom",
    platforms: ["iOS", "Android"],
    evidence: [
      {
        label: "Official deeplink docs",
        href: "https://docs.phantom.com/phantom-deeplinks/other-methods",
        kind: "official-docs",
      },
    ],
  },
  {
    wallet: "Brave Wallet",
    platforms: ["iOS", "Android"],
    evidence: [
      {
        label: "Official mobile wallet page",
        href: "https://brave.com/wallet/",
        kind: "official-site",
      },
      {
        label: "Official mobile and desktop source",
        href: "https://github.com/brave/brave-core",
        kind: "official-code",
      },
    ],
  },
  {
    wallet: "Backpack",
    platforms: ["iOS", "Android"],
    evidence: [
      {
        label: "Official mobile downloads",
        href: "https://backpack.app/download",
        kind: "official-site",
      },
      {
        label: "Official EVM wallet overview",
        href: "https://support.backpack.exchange/wallet/what-is-backpack-wallet",
        kind: "official-docs",
      },
    ],
  },
  {
    wallet: "Status Wallet",
    platforms: ["iOS", "Android"],
    evidence: [
      {
        label: "Official current wallet overview",
        href: "https://status.app/help/getting-started/what-is-status",
        kind: "official-docs",
      },
      {
        label: "Official app source",
        href: "https://github.com/status-im/status-app",
        kind: "official-code",
      },
    ],
  },
  {
    wallet: "SafePal",
    platforms: ["iOS", "Android"],
    evidence: [
      {
        label: "Official download center",
        href: "https://www.safepal.com/en/download/index",
        kind: "official-site",
      },
      {
        label: "Official developer docs",
        href: "https://devdocs.safepal.com/Connect-wallet/Web/introduction.html",
        kind: "official-docs",
      },
    ],
  },
  {
    wallet: "OKX Wallet",
    platforms: ["iOS", "Android"],
    evidence: [
      {
        label: "Official app-connect docs",
        href: "https://web3.okx.com/build/docs/sdks/app-connect-overview",
        kind: "official-docs",
      },
    ],
  },
  {
    wallet: "Rabby Wallet",
    platforms: ["iOS", "Android"],
    evidence: [
      {
        label: "Official source repository",
        href: "https://github.com/RabbyHub/Rabby",
        kind: "official-code",
      },
    ],
  },
  {
    wallet: "Safe Wallet",
    platforms: ["iOS", "Android"],
    evidence: [
      {
        label: "Archived Android feature request",
        href: "https://github.com/safe-global/safe-android/issues/506",
        kind: "official-code",
      },
    ],
  },
  {
    wallet: "Zerion",
    platforms: ["iOS", "Android"],
    evidence: [
      {
        label: "Official iOS core repository",
        href: "https://github.com/zeriontech/wallet-core-ios",
        kind: "official-code",
      },
    ],
  },
  {
    wallet: "Argent",
    platforms: ["iOS", "Android"],
    evidence: [
      {
        label: "Official wallet site",
        href: "https://www.argent.xyz/",
        kind: "official-site",
      },
    ],
  },
  {
    wallet: "Ambire Wallet",
    platforms: ["iOS", "Android", "unlisted; support mode"],
    evidence: [
      {
        label: "Official mobile availability notice",
        href: "https://blog.ambire.com/mobile-app-under-rebuild/",
        kind: "official-release",
      },
      {
        label: "Official wallet source",
        href: "https://github.com/AmbireTech/wallet",
        kind: "official-code",
      },
    ],
  },
  {
    wallet: "Sequence",
    platforms: ["iOS", "Android", "embedded wallet SDK"],
    evidence: [
      {
        label: "Official wallet model",
        href: "https://support.sequence.xyz/en/article/the-sequence-wallets-v3yt0a/",
        kind: "official-docs",
      },
      {
        label: "Official wallet contracts",
        href: "https://github.com/0xsequence/wallet-contracts",
        kind: "official-code",
      },
    ],
  },
  {
    wallet: "Exodus",
    platforms: ["iOS", "Android"],
    evidence: [
      {
        label: "Official link documentation",
        href: "https://www.exodus.com/support/en/articles/8598656-how-do-i-use-exodus-links",
        kind: "official-docs",
      },
    ],
  },
  {
    wallet: "1inch Wallet",
    platforms: ["iOS", "Android"],
    evidence: [
      {
        label: "Official developer portal",
        href: "https://portal.1inch.dev/documentation/wallet",
        kind: "official-docs",
      },
    ],
  },
  {
    wallet: "Ledger Live",
    platforms: ["iOS", "Android"],
    evidence: [
      {
        label: "Official source repository",
        href: "https://github.com/LedgerHQ/ledger-live",
        kind: "official-code",
      },
    ],
  },
  {
    wallet: "Crypto.com Onchain",
    platforms: ["iOS", "Android"],
    evidence: [
      {
        label: "Official help center",
        href: "https://help.crypto.com/en/collections/2221157-crypto-com-onchain",
        kind: "official-docs",
      },
    ],
  },
  {
    wallet: "Binance Wallet",
    platforms: ["iOS", "Android"],
    evidence: [
      {
        label: "Official wallet docs",
        href: "https://developers.binance.com/docs/binance-w3w",
        kind: "official-docs",
      },
    ],
  },
  {
    wallet: "MEW wallet",
    platforms: ["iOS", "Android"],
    evidence: [
      {
        label: "Official help center",
        href: "https://help.myetherwallet.com/en/collections/1450138-mew-wallet",
        kind: "official-docs",
      },
    ],
  },
  {
    wallet: "Zengo Wallet",
    platforms: ["iOS", "Android"],
    evidence: [
      {
        label: "Official help center",
        href: "https://help.zengo.com/en/",
        kind: "official-docs",
      },
    ],
  },
  {
    wallet: "Gem Wallet",
    platforms: ["iOS", "Android"],
    evidence: [
      {
        label: "Official iOS repository",
        href: "https://github.com/gemwalletcom/gem-ios",
        kind: "official-code",
      },
    ],
  },
  {
    wallet: "Coin98 Wallet",
    platforms: ["iOS", "Android"],
    evidence: [
      {
        label: "Official documentation",
        href: "https://docs.coin98.com/",
        kind: "official-docs",
      },
    ],
  },
  {
    wallet: "OneKey",
    platforms: ["iOS", "Android"],
    evidence: [
      {
        label: "Official wallet site",
        href: "https://onekey.so/",
        kind: "official-site",
      },
    ],
  },
  {
    wallet: "Ctrl Wallet",
    platforms: ["iOS", "Android"],
    evidence: [
      {
        label: "Official wallet site",
        href: "https://ctrl.xyz/",
        kind: "official-site",
      },
    ],
  },
  {
    wallet: "Bitget Wallet",
    platforms: ["iOS", "Android"],
    evidence: [
      {
        label: "Official wallet site",
        href: "https://web3.bitget.com/",
        kind: "official-site",
      },
    ],
  },
  {
    wallet: "imKey Pro",
    platforms: ["iOS", "Android"],
    evidence: [
      {
        label: "Official wallet site",
        href: "https://imkey.im/",
        kind: "official-site",
      },
    ],
  },
  {
    wallet: "Railway Wallet",
    platforms: ["iOS", "Android"],
    evidence: [
      {
        label: "Official wallet site",
        href: "https://www.railway.xyz/",
        kind: "official-site",
      },
    ],
  },
  {
    wallet: "ShapeShift",
    platforms: ["iOS", "Android"],
    evidence: [
      {
        label: "Official wallet site",
        href: "https://shapeshift.com/",
        kind: "official-site",
      },
    ],
  },
  {
    wallet: "Burner",
    platforms: ["iOS", "Android"],
    evidence: [
      {
        label: "Official wallet site",
        href: "https://www.burner.pro/",
        kind: "official-site",
      },
    ],
  },
  {
    wallet: "Edge Wallet",
    platforms: ["iOS", "Android"],
    evidence: [
      {
        label: "Official wallet site",
        href: "https://edge.app/",
        kind: "official-site",
      },
    ],
  },
  {
    wallet: "Loopring Wallet",
    platforms: ["iOS", "Android"],
    evidence: [
      {
        label: "Official wallet site",
        href: "https://wallet.loopring.io/",
        kind: "official-site",
      },
    ],
  },
  {
    wallet: "Coin Wallet",
    platforms: ["iOS", "Android"],
    evidence: [
      {
        label: "Official wallet site",
        href: "https://coin.space/",
        kind: "official-site",
      },
    ],
  },
  {
    wallet: "Unstoppable Wallet",
    platforms: ["iOS", "Android"],
    evidence: [
      {
        label: "Official wallet site",
        href: "https://unstoppable.money/",
        kind: "official-site",
      },
    ],
  },
  {
    wallet: "Clave",
    platforms: ["iOS", "Android"],
    evidence: [
      {
        label: "Official wallet site",
        href: "https://www.getclave.com/",
        kind: "official-site",
      },
    ],
  },
  {
    wallet: "FoxWallet",
    platforms: ["iOS", "Android"],
    evidence: [
      {
        label: "Official wallet site",
        href: "https://foxwallet.com/",
        kind: "official-site",
      },
    ],
  },
  {
    wallet: "Bridge Wallet",
    platforms: ["iOS", "Android"],
    evidence: [
      {
        label: "Official wallet site",
        href: "https://www.mtpelerin.com/",
        kind: "official-site",
      },
    ],
  },
  {
    wallet: "Braavos",
    platforms: ["iOS", "Android"],
    evidence: [
      {
        label: "Official wallet site",
        href: "https://braavos.app/",
        kind: "official-site",
      },
    ],
  },
  {
    wallet: "PillarX",
    platforms: ["iOS", "Android"],
    evidence: [
      {
        label: "Official wallet site",
        href: "https://pillarx.app/",
        kind: "official-site",
      },
    ],
  },
  {
    wallet: "Ready Wallet",
    platforms: ["iOS", "Android"],
    evidence: [
      {
        label: "Official wallet site",
        href: "https://www.ready.co/",
        kind: "official-site",
      },
    ],
  },
  {
    wallet: "Cake Wallet",
    platforms: ["iOS", "Android"],
    evidence: [
      {
        label: "Official wallet site",
        href: "https://cakewallet.com/",
        kind: "official-site",
      },
    ],
  },
  {
    wallet: "io.finnet MPC Wallet",
    platforms: ["iOS", "Android"],
    evidence: [
      {
        label: "Official wallet site",
        href: "https://www.iofinnet.com/",
        kind: "official-site",
      },
    ],
  },
  {
    wallet: "Tangem",
    platforms: ["iOS", "Android"],
    evidence: [
      {
        label: "Official help center",
        href: "https://tangem.com/en/help_center/",
        kind: "official-docs",
      },
    ],
  },
];

export const WALLET_RESEARCH_QUEUE: WalletSupportRow[] =
  WALLET_RESEARCH_SEEDS.map((row) => ({
    ...row,
    evidenceGrade: "no-public-evidence" as const,
    schemeParsing: "not-documented" as const,
    nativeTransfer: "not-documented" as const,
    erc20Transfer: "not-documented" as const,
    otherContractCalls: "not-documented" as const,
    chainIdHandling: "not-documented" as const,
    qrScan: "not-documented" as const,
    reviewedAt: null,
    notes: NOT_DOCUMENTED,
  }));

export const WALLET_SUPPORT = [
  ...VERIFIED_WALLET_SUPPORT,
  ...WALLET_RESEARCH_QUEUE,
];
