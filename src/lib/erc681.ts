export type Erc681TransferKind = "native" | "erc20-transfer";

export type Erc681BuildInput =
  | {
      kind: "native";
      to: string; // 0x… or ENS
      chainId?: number;
      // In atomic units (wei). Scientific notation recommended by ERC-681.
      value?: string;
      gas?: string;
      gasPrice?: string;
    }
  | {
      kind: "erc20-transfer";
      tokenContract: string; // 0x…
      chainId?: number;
      to: string; // beneficiary address
      // In atomic units. Scientific notation recommended by ERC-681.
      amount: string;
      gas?: string;
      gasPrice?: string;
    };

export type BuildOptions = {
  /**
   * Optional prefix defined by ERC-681: `ethereum:pay-...`
   * Some wallets historically used this for payments.
   */
  payPrefix?: boolean;
};

export function isHexAddress(value: string): boolean {
  return /^0x[a-fA-F0-9]{40}$/.test(value);
}

export function isLikelyEnsName(value: string): boolean {
  // Minimal heuristic. ENS resolution is wallet/client responsibility per ERC-681.
  return /^[a-zA-Z0-9-]+\.[a-zA-Z0-9.-]+$/.test(value) && !isHexAddress(value);
}

export function buildErc681Uri(input: Erc681BuildInput, opts: BuildOptions = {}) {
  const prefix = `ethereum:${opts.payPrefix ? "pay-" : ""}`;

  const chainSuffix =
    typeof input.chainId === "number" && Number.isFinite(input.chainId)
      ? `@${Math.trunc(input.chainId)}`
      : "";

  const params = new URLSearchParams();
  if (input.gas) params.set("gas", input.gas);
  if (input.gasPrice) params.set("gasPrice", input.gasPrice);

  if (input.kind === "native") {
    if (input.value) params.set("value", input.value);
    const query = params.toString();
    return `${prefix}${input.to}${chainSuffix}${query ? `?${query}` : ""}`;
  }

  params.set("address", input.to);
  params.set("uint256", input.amount);
  const query = params.toString();
  return `${prefix}${input.tokenContract}${chainSuffix}/transfer?${query}`;
}

/**
 * Convenience helper for amounts that humans type in "nominal units"
 * (e.g. ETH) while ERC-681 wants atomic units in a `value=` parameter.
 *
 * ERC-681 encourages scientific notation where exponent equals token decimals.
 * Example: `2.014 ETH -> 2.014e18` (wei).
 */
export function toScientificAtomic(amount: string, decimals: number): string {
  const trimmed = amount.trim();
  if (!trimmed) return "";
  // Keep as-is but normalize whitespace; we don't do floating math.
  // Wallets that implement ERC-681 should parse scientific notation.
  return `${trimmed}e${Math.trunc(decimals)}`;
}


