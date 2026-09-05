// Static catalogue of Exchange Center content.
// NOTE: live exchange values + balances always come from the backend
// (GET /api/exchange-options, /api/balances). This file only holds
// copy, fallbacks and presentation metadata so JSX never scatters values.

// Fallback mirror of the backend truth (used only if backend is unreachable
// and only to render the error state context — never for real conversions).
export const FALLBACK_OPTIONS = [
  { id: "exchange-01", title: "Daily Gem Conversion", tag: "Most popular", requiredGems: 28, receiveVEs: 151, description: "Convert your earned Gems into VEs.", rewardType: "Daily Gem Conversion" },
  { id: "exchange-02", title: "Standard Reward Conversion", tag: "Great value", requiredGems: 39, receiveVEs: 168, description: "Turn eligible Gems into VEs and keep your reward journey going.", rewardType: "Standard Conversion" },
  { id: "exchange-03", title: "Starter Conversion", tag: "Quick convert", requiredGems: 25, receiveVEs: 120, description: "A small, quick conversion for everyday earners.", rewardType: "Starter Conversion" },
  { id: "exchange-04", title: "Plus Reward Conversion", tag: "Boost", requiredGems: 55, receiveVEs: 310, description: "Convert a bigger Gem bundle into a bigger VE reward.", rewardType: "Plus Conversion" },
  { id: "exchange-05", title: "Mega Vault Conversion", tag: "High reward", requiredGems: 120, receiveVEs: 690, description: "Unlock the vault: convert a large Gem balance at once.", rewardType: "Vault Conversion" },
  { id: "exchange-06", title: "Grand Treasure Conversion", tag: "Locked — earn more", requiredGems: 300, receiveVEs: 1750, description: "The grand prize. Requires 300 Gems — earn more to unlock.", rewardType: "Grand Conversion" },
];

export const INITIAL_BALANCES = { gems: 275, ves: 500 };

export const INFO_COPY = {
  gems: "Gems are reward credits earned through eligible activities on VELOOP Rewards.",
  ves: "VEs are VELOOP Rewards' virtual reward currency and may be used for eligible redemption options according to platform rules.",
  rate: "Each conversion uses a predefined exchange value set by VELOOP Rewards — not a market price.",
  rules: "Only eligible Gems can be exchanged. A successful conversion cannot be duplicated.",
};

export const EXCHANGE_RULES = [
  "Only eligible Gems can be exchanged.",
  "Exchange rates are predefined by VELOOP Rewards.",
  "Available conversions may vary.",
  "A successful conversion cannot be duplicated.",
  "Your balance is updated after successful conversion.",
  "Platform rules apply.",
];

export const HOW_IT_WORKS = [
  { step: "01", title: "Earn Gems", text: "Collect Gems from eligible activities." },
  { step: "02", title: "Choose Conversion", text: "Pick a reward conversion that fits your balance." },
  { step: "03", title: "Review Exchange", text: "Check required Gems and VEs you will receive." },
  { step: "04", title: "Confirm", text: "Confirm the conversion. Balances are verified on the server." },
  { step: "05", title: "Receive VEs", text: "VEs are added to your balance instantly." },
];

export const SEED_HISTORY = [
  { id: "seed-today", label: "Today", text: "28 Gems → 151 VEs", status: "completed" },
  { id: "seed-yesterday", label: "Yesterday", text: "39 Gems → 168 VEs", status: "completed" },
  { id: "seed-18aug", label: "18 Aug", text: "25 Gems → 120 VEs", status: "completed" },
];
