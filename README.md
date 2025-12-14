# ERC‑681 (erc681.org)

Community website to **document and accelerate ERC‑681 adoption**, especially in **mobile wallets**, and to highlight ERC‑681’s potential for **in‑person payments** (QR / NFC deep links).

## What’s inside

- **Spec highlights**: `src/app/spec/page.tsx`
- **Wallet adoption matrix (evidence-linked)**: `src/app/adoption/page.tsx` + `src/data/wallet-support.ts`
- **ERC‑681 link & QR builder**: `src/app/builder/page.tsx`
- **In‑person payments page**: `src/app/in-person/page.tsx`

## Local development

```bash
npm install
npm run dev
```

Open `http://localhost:3000`.

## Tests

```bash
npm test
```

## Contributing (wallet teams welcome)

Please update `src/data/wallet-support.ts` with:

- Wallet version + OS version
- Reproducible test URIs (native + ERC‑20 transfer + `@chainId`)
- Evidence links (issues, release notes, docs)

## Sources

- ERC‑681 canonical spec: `https://eips.ethereum.org/EIPS/eip-681`
- Ethereum Magicians discussion: `https://ethereum-magicians.org/t/erc-681-representing-various-transactions-as-urls/650`
