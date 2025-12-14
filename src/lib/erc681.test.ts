import { describe, expect, it } from "vitest";
import { buildErc681Uri, toScientificAtomic } from "./erc681";

describe("toScientificAtomic", () => {
  it("encodes nominal amount with exponent equal to decimals", () => {
    expect(toScientificAtomic("2.014", 18)).toBe("2.014e18");
  });
});

describe("buildErc681Uri", () => {
  it("builds native transfer with optional chainId and value", () => {
    const uri = buildErc681Uri(
      { kind: "native", to: "0x0000000000000000000000000000000000000001", chainId: 1, value: "1e18" },
      { payPrefix: false },
    );
    expect(uri).toBe("ethereum:0x0000000000000000000000000000000000000001@1?value=1e18");
  });

  it("builds ERC-20 transfer call", () => {
    const uri = buildErc681Uri(
      {
        kind: "erc20-transfer",
        tokenContract: "0x0000000000000000000000000000000000000002",
        to: "0x0000000000000000000000000000000000000003",
        chainId: 1,
        amount: "1e6",
      },
      { payPrefix: true },
    );
    expect(uri).toBe(
      "ethereum:pay-0x0000000000000000000000000000000000000002@1/transfer?address=0x0000000000000000000000000000000000000003&uint256=1e6",
    );
  });
});


