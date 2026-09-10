// Pure helpers for matching custom Gem amounts to predefined conversions.
// The backend remains the authority: these only decide WHICH predefined
// option to preview — the server validates and applies the conversion.

// Best predefined option unlocked by `amount` (highest VEs reward with
// requiredGems <= amount). Returns null when nothing is unlocked.
export function matchOption(amount, options) {
  const n = Number(amount);
  if (!Number.isFinite(n) || n <= 0) return null;
  const unlocked = options.filter((o) => o.requiredGems <= n);
  if (unlocked.length === 0) return null;
  return unlocked.reduce((best, o) => (o.receiveVEs > best.receiveVEs ? o : best));
}

// Display rate for a predefined option, e.g. 151/28 -> "5.39".
export function gemRate(option) {
  if (!option || !option.requiredGems) return null;
  return (option.receiveVEs / option.requiredGems).toFixed(2);
}
