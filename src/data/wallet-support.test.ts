import { describe, expect, it } from "vitest";

import {
  VERIFIED_WALLET_SUPPORT,
  WALLET_RESEARCH_QUEUE,
  WALLET_SUPPORT,
} from "./wallet-support";

describe("wallet adoption evidence", () => {
  it("keeps wallet names unique across the full ledger", () => {
    const names = WALLET_SUPPORT.map((row) => row.wallet);

    expect(new Set(names).size).toBe(names.length);
  });

  it("requires official source links for every tracked wallet", () => {
    for (const row of WALLET_SUPPORT) {
      expect(row.evidence.length).toBeGreaterThan(0);

      for (const evidence of row.evidence) {
        expect(evidence.href).toMatch(/^https:\/\//);
        expect(evidence.kind).toMatch(
          /^official-(code|docs|release|site)$/,
        );
      }
    }
  });

  it("distinguishes reviewed evidence rows from the pending queue", () => {
    for (const row of VERIFIED_WALLET_SUPPORT) {
      expect(row.reviewedAt).toMatch(/^\d{4}-\d{2}-\d{2}$/);
    }

    for (const row of WALLET_RESEARCH_QUEUE) {
      expect(row.reviewedAt).toBeNull();
    }
  });

  it("does not turn missing public evidence into a compatibility verdict", () => {
    for (const row of WALLET_RESEARCH_QUEUE) {
      expect(row.evidenceGrade).toBe("no-public-evidence");
      expect(row.schemeParsing).toBe("not-documented");
      expect(row.nativeTransfer).toBe("not-documented");
      expect(row.erc20Transfer).toBe("not-documented");
      expect(row.otherContractCalls).toBe("not-documented");
      expect(row.chainIdHandling).toBe("not-documented");
      expect(row.qrScan).toBe("not-documented");
    }
  });

  it("keeps evidence-backed rows out of the open research queue", () => {
    const queue = new Set(WALLET_RESEARCH_QUEUE.map((row) => row.wallet));

    for (const row of VERIFIED_WALLET_SUPPORT) {
      expect(queue.has(row.wallet)).toBe(false);
      expect(row.evidenceGrade).not.toBe("no-public-evidence");
    }
  });
});
