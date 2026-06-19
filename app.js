const data = window.BB_DATA || { datasets: {}, summary: {} };

const parts = ["頭", "胴", "腕", "脚"];
const weaponSlots = ["主武器", "副武器", "補助装備", "特別装備"];
const slotLabels = {
  主武器: "主",
  副武器: "副",
  補助装備: "補",
  特別装備: "特",
};
const chipTables = ["頭部チップ", "胴部チップ", "腕部チップ", "脚部チップ", "サポートチップ"];
const chipTableParts = {
  頭部チップ: "頭",
  胴部チップ: "胴",
  腕部チップ: "腕",
  脚部チップ: "脚",
};
const statKeys = [
  "重量",
  "スロット",
  "装甲",
  "射撃補正",
  "索敵",
  "ロックオン",
  "DEF回復",
  "ブースター",
  "SP供給",
  "エリア移動",
  "DEF耐久",
  "反動吸収",
  "リロード",
  "武器変更",
  "予備弾数",
  "歩行",
  "ダッシュ",
  "巡航",
  "積載猶予",
  "ジャンプ適性",
  "加速",
  "重量耐性",
  "威力",
  "通常威力",
  "特殊威力",
  "装弾数",
  "連射速度",
  "射撃精度",
  "反動",
  "爆発半径",
  "起爆時間",
  "チャージ",
  "OH復帰時間",
  "効果",
];
const armorPickerStatsByPart = {
  頭: ["系統", "レアリティ", "重量タイプ", "重量", "装甲", "射撃補正", "索敵", "ロックオン", "DEF回復"],
  胴: ["系統", "レアリティ", "重量タイプ", "重量", "装甲", "ブースター", "SP供給", "エリア移動", "DEF耐久"],
  腕: ["系統", "レアリティ", "重量タイプ", "重量", "装甲", "反動吸収", "リロード", "武器変更", "予備弾数"],
  脚: ["系統", "レアリティ", "重量タイプ", "重量", "装甲", "歩行", "ダッシュ", "巡航", "重量耐性"],
};
const requestWeaponPickerStats = ["重量", "リチャージ", "使用 時間", "射撃方式", "威力", "通常威力", "特殊威力", "最大充填", "充填時間", "装弾数", "連射速度", "爆発 半径", "爆発半径", "リロード", "索敵範囲", "稼働時間", "修理速度", "耐久力", "修理量", "有効距離"];
const requestWeaponPreviewStats = ["重量", "リチャージ", "使用 時間", "射撃方式", "威力", "通常威力", "特殊威力", "最大充填", "充填時間", "装弾数", "連射速度"];
const satelliteBunkerWeight = 600;
const weaponRarityValues = ["★★★★", "★★★", "★★", "★"];
const weaponPickerRules = {
  強襲: {
    主武器: { sort: ["系統", "レアリティ", "重量", "射撃方式", "威力"], filters: { rarity: weaponRarityValues, method: ["単射", "3点射", "連射"], attribute: ["実弾", "ニュード"] } },
    副武器: { sort: ["系統", "レアリティ", "重量", "射撃方式", "威力"], filters: { rarity: weaponRarityValues, method: ["単射", "3点射", "連射", "投擲", "ロック誘導"], attribute: ["実弾", "ニュード", "爆発"] } },
    補助装備: { sort: ["系統", "レアリティ", "重量"], filters: { rarity: weaponRarityValues, effect: ["近接戦闘", "銃部射撃"], attribute: ["ニュード", "近接"] } },
    特別装備: { sort: ["系統", "レアリティ", "重量", "出力"], filters: { rarity: weaponRarityValues, effect: ["高速機動"], attribute: ["なし"] } },
  },
  重火力: {
    主武器: { sort: ["系統", "レアリティ", "重量", "射撃方式", "威力"], filters: { rarity: weaponRarityValues, method: ["単射", "3点射", "連射", "一斉発射"], attribute: ["実弾", "ニュード", "爆発"] } },
    副武器: { sort: ["系統", "レアリティ", "重量", "射撃方式", "威力"], filters: { rarity: weaponRarityValues, method: ["単射", "3点射", "連射", "ロック誘導"], attribute: ["ニュード", "爆発"] } },
    補助装備: { sort: ["系統", "レアリティ", "重量"], filters: { rarity: weaponRarityValues, effect: ["近接戦闘", "装甲低下", "視界妨害", "衝撃波", "衝撃散弾", "誘爆"], attribute: ["実弾", "爆発", "近接", "なし"] } },
    特別装備: { sort: ["系統", "レアリティ", "重量", "威力"], filters: { rarity: weaponRarityValues, effect: ["遠距離砲撃", "照射", "自動攻撃", "防弾", "装甲上昇"], attribute: ["ニュード", "爆発", "なし"] } },
  },
  遊撃: {
    主武器: { sort: ["系統", "レアリティ", "重量", "射撃方式", "威力"], filters: { rarity: weaponRarityValues, method: ["双射", "3点双射", "連双射"], attribute: ["実弾", "ニュード"] } },
    副武器: { sort: ["系統", "レアリティ", "重量", "射撃方式", "威力"], filters: { rarity: weaponRarityValues, method: ["単射", "3点射", "連射", "一斉発射", "投擲"], attribute: ["実弾", "ニュード", "爆発"] } },
    補助装備: { sort: ["系統", "レアリティ", "重量"], filters: { rarity: weaponRarityValues, effect: ["近接戦闘", "索敵", "索敵妨害", "自動攻撃", "援護爆撃", "遠隔操作", "行動妨害"], attribute: ["実弾", "ニュード", "近接", "なし"] } },
    特別装備: { sort: ["系統", "レアリティ", "重量"], filters: { rarity: weaponRarityValues, effect: ["自動攻撃", "防弾", "移動妨害", "拠点制圧", "隠密行動"], attribute: ["実弾", "ニュード", "なし"] } },
  },
  支援: {
    主武器: { sort: ["系統", "レアリティ", "重量", "射撃方式", "威力"], filters: { rarity: weaponRarityValues, method: ["単射", "3点射", "連射", "一斉発射"], attribute: ["実弾", "ニュード", "爆発"] } },
    副武器: { sort: ["系統", "レアリティ", "重量", "射撃方式", "威力"], filters: { rarity: weaponRarityValues, method: ["単射", "投擲"], attribute: ["実弾", "ニュード", "爆発"] } },
    補助装備: { sort: ["系統", "レアリティ", "重量"], filters: { rarity: weaponRarityValues, effect: ["索敵", "弾薬補給", "行動妨害"], attribute: ["ニュード", "なし"] } },
    特別装備: { sort: ["系統", "レアリティ", "重量"], filters: { rarity: weaponRarityValues, effect: ["修理/再始動"], attribute: ["なし"] } },
  },
};
const requestWeaponPickerRule = {
  sort: ["系統", "重量", "リチャージ"],
  filters: {
    effect: ["連射", "単射", "ロック誘導", "近接戦闘", "援護爆撃", "自動攻撃", "索敵", "修理/再始動"],
    attribute: ["実弾", "爆発", "ニュード", "近接", "なし"],
  },
};

const state = {
  armorWeightFilter: "all",
  armor: {},
  weapons: {},
  requestWeapon: null,
  includeRequestWeight: false,
  includeSatelliteBunkerWeight: false,
  weaponClass: "強襲",
  chipTable: "脚部チップ",
  statChipTable: "頭部チップ",
  enhance: {},
  weaponModes: {},
  chips: {},
  focused: null,
  picker: {
    open: false,
    scope: "",
    label: "",
    query: "",
    filter: "all",
    detailsOpen: false,
    detailFilters: {},
    sortKey: "",
    sortDir: "asc",
  },
  theme: "dark",
};

const byId = (id) => document.getElementById(id);
let lockedScrollY = 0;

function setPageScrollLock(locked) {
  if (locked) {
    lockedScrollY = window.scrollY || document.documentElement.scrollTop || 0;
    document.body.style.top = `-${lockedScrollY}px`;
    document.body.classList.add("picker-open");
    return;
  }
  document.body.classList.remove("picker-open");
  document.body.style.top = "";
  window.scrollTo(0, lockedScrollY);
}

function normalize(value) {
  return String(value ?? "").replace(/\s+/g, " ").trim();
}

function splitValues(value) {
  return normalize(value).split(/\s+/).filter(Boolean);
}

function firstNumber(value) {
  const match = normalize(value).match(/-?\d+(?:\.\d+)?/);
  return match ? Number(match[0]) : 0;
}

function lastNumber(value) {
  const matches = normalize(value).match(/-?\d+(?:\.\d+)?/g);
  return matches?.length ? Number(matches[matches.length - 1]) : 0;
}

function labelOf(item) {
  return item?.名称 || "(未選択)";
}

function compactName(name) {
  return normalize(name)
    .replace(/\s*※[^\s［\[]*/g, "")
    .replace(/\s*［[^］]*］/g, "")
    .replace(/\s*\[[^\]]*\]/g, "");
}

function optionLabel(item) {
  return compactName(item?.名称 || "(未選択)");
}

function itemSubLabel(item) {
  return [item?.source_page]
    .filter(Boolean)
    .map((value) => normalize(value))
    .find(Boolean) || "";
}

function itemKey(scope, label) {
  return `${scope}:${label}`;
}

function getEnhanceLevel(scope, label) {
  return Number(state.enhance[itemKey(scope, label)] ?? 3);
}

function setEnhanceLevel(scope, label, level) {
  state.enhance[itemKey(scope, label)] = Number(level);
}

function getArmorOptions(part) {
  return (data.datasets.armor || []).filter((item) => {
    if (item.part !== part) return false;
    return state.armorWeightFilter === "all" || item.weight_class === state.armorWeightFilter;
  });
}

function getWeaponOptions(slot, weaponClass = state.weaponClass) {
  const seen = new Set();
  return (data.datasets.weapons || []).filter((item) => {
    if (item.class !== weaponClass || item.slot !== slot || !item.重量) return false;
    const key = compactName(item.名称);
    if (seen.has(key)) return false;
    seen.add(key);
    return true;
  });
}

function weaponStateKey(slot, weaponClass = state.weaponClass) {
  return `${weaponClass}:${slot}`;
}

function selectedWeaponBase(slot) {
  return state.weapons[weaponStateKey(slot)] || null;
}

function setSelectedWeaponBase(slot, item, weaponClass = state.weaponClass) {
  state.weapons[weaponStateKey(slot, weaponClass)] = item || null;
}

function getRequestWeaponOptions() {
  return data.datasets.request_weapons || [];
}

function weaponVariants(item) {
  if (!item) return [];
  if (weaponTypeFieldModes(item).length) return [item];
  const name = compactName(item.名称);
  const variants = (data.datasets.weapons || []).filter((candidate) => {
    return candidate.class === item.class &&
      candidate.slot === item.slot &&
      candidate.重量 &&
      compactName(candidate.名称) === name &&
      (candidate.タイプ || candidate.column);
  });
  return variants.length ? variants : [item];
}

function weaponModeKey(slot) {
  return `${state.weaponClass}:${slot}:${compactName(selectedWeaponBase(slot)?.名称 || "")}`;
}

function weaponModeIndex(slot) {
  return Number(state.weaponModes[weaponModeKey(slot)] || 0);
}

function activeWeaponItem(slot) {
  const base = selectedWeaponBase(slot);
  const variants = weaponVariants(base);
  const index = weaponModeIndex(slot);
  return variants[index] || variants[0] || base;
}

function selectedArmorItems() {
  return parts.map((part) => state.armor[part]).filter(Boolean);
}

function selectedWeaponItems() {
  return weaponSlots.map((slot) => activeWeaponItem(slot)).filter(Boolean);
}

function selectedRequestWeaponItem() {
  return state.requestWeapon || null;
}

function selectedChipItems() {
  return (data.datasets.chips || [])
    .map((chip) => ({ ...chip, count: chipCount(chip) }))
    .filter((chip) => chip.count > 0);
}

function chipKey(chip) {
  return `${chip.table}::${chip.名称}`;
}

function chipCount(chip) {
  return Number(state.chips[chipKey(chip)] || 0);
}

function chipMax(chip) {
  return Math.max(1, firstNumber(chip.最大装着) || 1);
}

function setChipCount(chip, count) {
  const key = chipKey(chip);
  const next = Math.max(0, Math.min(chipMax(chip), count));
  if (next === 0) delete state.chips[key];
  else state.chips[key] = next;
}

function chipUsageByTable() {
  const usage = Object.fromEntries(chipTables.map((table) => [table, 0]));
  for (const chip of selectedChipItems()) {
    usage[chip.table] = (usage[chip.table] || 0) + chip.count;
  }
  return usage;
}

function chipCapacityByTable() {
  return {
    頭部チップ: resolvedSlots(state.armor.頭, getEnhanceLevel("armor", "頭")),
    胴部チップ: resolvedSlots(state.armor.胴, getEnhanceLevel("armor", "胴")),
    腕部チップ: resolvedSlots(state.armor.腕, getEnhanceLevel("armor", "腕")),
    脚部チップ: resolvedSlots(state.armor.脚, getEnhanceLevel("armor", "脚")),
    サポートチップ: 999,
  };
}

function enforceChipCapacity() {
  const capacity = chipCapacityByTable();
  const usage = Object.fromEntries(chipTables.map((table) => [table, 0]));

  for (const chip of selectedChipItems()) {
    const allowed = capacity[chip.table] ?? 999;
    const current = usage[chip.table] || 0;
    const keep = Math.max(0, Math.min(chip.count, allowed - current));
    usage[chip.table] = current + keep;
    if (keep !== chip.count) setChipCount(chip, keep);
  }
}

function isLoadoutChip(chip) {
  const text = `${chip.名称 || ""} ${chip.効果 || ""}`;
  return /重量耐性|重量超過|脚部パーツ強化/.test(text);
}

function loadoutChips() {
  return (data.datasets.chips || []).filter(isLoadoutChip);
}

function isStatChip(chip) {
  return !isLoadoutChip(chip);
}

function statChips() {
  return (data.datasets.chips || []).filter(isStatChip);
}

function chipNumberAfter(text, label) {
  const escaped = label.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  const match = String(text || "").match(new RegExp(`${escaped}\\s*\\+\\s*(\\d+(?:\\.\\d+)?)`));
  return match ? Number(match[1]) : 0;
}

function chipSignedNumberAfter(text, label) {
  const escaped = label.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  const boundary = label === "ダッシュ" ? "(?!消費量|フレーム数)" : label === "ブースター" ? "(?!消費量)" : "";
  const unit = /^(歩行|ダッシュ|巡航)$/.test(label) ? "\\s*m\\/s" : "";
  const match = String(text || "").match(new RegExp(`${escaped}${boundary}\\s*([+-])\\s*(\\d+(?:\\.\\d+)?)${unit}`));
  if (!match) return 0;
  return Number(match[2]) * (match[1] === "-" ? -1 : 1);
}

function chipBonus(text, label) {
  const direct = chipSignedNumberAfter(text, label);
  if (direct) return direct;

  const escaped = label.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  const boundary = label === "ダッシュ" ? "(?!消費量|フレーム数)" : label === "ブースター" ? "(?!消費量)" : "";
  const unit = /^(歩行|ダッシュ|巡航)$/.test(label) ? "\\s*m\\/s" : "";
  const match = String(text || "").match(new RegExp(`${escaped}${boundary}[^\\d+-]*([+-]?\\s*\\d+(?:\\.\\d+)?)${unit}.*?(上昇|短縮|軽減)?`));
  if (!match) return 0;
  const signed = match[1].replace(/\s+/g, "");
  const value = Number(signed.replace(/^[+-]/, ""));
  if (!Number.isFinite(value)) return 0;
  if (signed.startsWith("-")) return -value;
  if (signed.startsWith("+")) return value;
  return Number(match[1]) * (/短縮|軽減/.test(match[2]) ? -1 : 1);
}

function chipEffectBonus(chip, label) {
  const name = chip.名称 || "";
  const effect = chip.効果 || "";
  const direct = chipBonus(effect, label);
  if (direct) return direct;
  const baseName = name.replace(/[ⅡⅢ]/g, "");
  if (baseName !== label) return 0;

  return firstEffectNumber(chip);
}

function firstSignedEffectNumber(chip) {
  const match = String(chip.効果 || "").match(/([+-])\s*(\d+(?:\.\d+)?)/);
  if (!match) return 0;
  return Number(match[2]) * (match[1] === "-" ? -1 : 1);
}

function firstEffectNumber(chip) {
  const text = String(chip.効果 || "");
  const signed = text.match(/([+-])\s*(\d+(?:\.\d+)?)/);
  if (signed) return Number(signed[2]) * (signed[1] === "-" ? -1 : 1);
  const unsigned = text.match(/[（(]\s*(\d+(?:\.\d+)?)\s*(?:%|m|秒)?\s*[）)]/);
  return unsigned ? Number(unsigned[1]) : 0;
}

function activeChipMultiplier(chip) {
  const name = chip.名称 || "";
  const effect = chip.効果 || "";

  if (name.includes("強襲兵装強化") && state.weaponClass !== "強襲") return 0;
  if (name.includes("重火力兵装強化") && state.weaponClass !== "重火力") return 0;
  if (name.includes("遊撃兵装強化") && state.weaponClass !== "遊撃") return 0;
  if (name.includes("支援兵装強化") && state.weaponClass !== "支援") return 0;

  const weightClass = effect.match(/（?[\(（]?(軽量|中量|重量)パーツ1つ毎に/);
  if (weightClass) {
    return selectedArmorItems().filter((item) => item.weight_class === weightClass[1]).length;
  }

  const brand = brandFromChipName(name);
  if (/装備中の.+型機体パーツ1部位につき/.test(effect) && brand) {
    return selectedArmorItems().filter((item) => armorMatchesBrand(item, brand)).length;
  }

  return 1;
}

function brandFromChipName(name) {
  return String(name || "").replace(/適性|強化|Ⅱ|Ⅲ/g, "").trim();
}

function armorMatchesBrand(item, brand) {
  const name = item?.名称 || "";
  if (!brand) return false;
  if (brand === "X") return /^X/.test(name);
  return name.includes(brand);
}

function chipEffects() {
  const selected = selectedChipItems();
  let tolerance = 0;
  let overweightReduction = 0;
  let walk = 0;
  let dash = 0;
  let cruise = 0;
  let shot = 0;
  let search = 0;
  let lockon = 0;
  let defRecovery = 0;
  let booster = 0;
  let spSupply = 0;
  let areaMove = 0;
  let defDurability = 0;
  let recoil = 0;
  let reload = 0;
  let weaponSwitch = 0;
  let ammo = 0;
  let dashCostReduction = 0;
  const armorByPart = Object.fromEntries(parts.map((part) => [part, 0]));

  for (const chip of selected) {
    const effect = chip.効果 || "";
    const count = chip.count || 0;
    const name = chip.名称 || "";
    const multiplier = activeChipMultiplier(chip);
    if (!multiplier) continue;

    if (name.includes("重火力兵装強化") && state.weaponClass !== "重火力") continue;

    if (name.endsWith("適性") && /重量耐性/.test(effect)) {
      const brand = brandFromChipName(name);
      const brandCount = selectedArmorItems().filter((item) => armorMatchesBrand(item, brand)).length;
      tolerance += 25 * brandCount * count;
      continue;
    }

    if (/強化$|強化Ⅱ$|強化Ⅲ$/.test(name) && /1部位につき/.test(effect) && /重量耐性/.test(effect)) {
      const brand = brandFromChipName(name);
      const brandCount = selectedArmorItems().filter((item) => armorMatchesBrand(item, brand)).length;
      tolerance += 40 * brandCount * count;
      continue;
    }

    tolerance += chipEffectBonus(chip, "重量耐性") * count * multiplier;
    const part = chipTableParts[chip.table];
    if (part) armorByPart[part] += chipEffectBonus(chip, "装甲") * count * multiplier;
    walk += chipEffectBonus(chip, "歩行") * count * multiplier;
    dash += chipEffectBonus(chip, "ダッシュ") * count * multiplier;
    cruise += chipEffectBonus(chip, "巡航") * count * multiplier;
    shot += chipEffectBonus(chip, "射撃補正") * count * multiplier;
    search += chipEffectBonus(chip, "索敵") * count * multiplier;
    lockon += chipEffectBonus(chip, "ロックオン") * count * multiplier;
    defRecovery += chipEffectBonus(chip, "DEF回復") * count * multiplier;
    booster += chipEffectBonus(chip, "ブースター") * count * multiplier;
    spSupply += chipEffectBonus(chip, "SP供給") * count * multiplier;
    areaMove += chipEffectBonus(chip, "エリア移動") * count * multiplier;
    defDurability += chipEffectBonus(chip, "DEF耐久") * count * multiplier;
    recoil += chipEffectBonus(chip, "反動吸収") * count * multiplier;
    reload += chipEffectBonus(chip, "リロード") * count * multiplier;
    weaponSwitch += chipEffectBonus(chip, "武器変更") * count * multiplier;
    ammo += chipEffectBonus(chip, "予備弾数") * count * multiplier;
    dashCostReduction += Math.abs(chipEffectBonus(chip, "ブースター消費量")) * count * multiplier;
    dashCostReduction += Math.abs(chipEffectBonus(chip, "ダッシュ消費量")) * count * multiplier;

    const reduction = String(effect).match(/超過重量-([0-9.]+)%/);
    if (reduction) overweightReduction += Number(reduction[1]) * count;
  }

  return {
    tolerance,
    overweightReduction: Math.min(overweightReduction, 80),
    walk,
    dash,
    cruise,
    shot,
    search,
    lockon,
    defRecovery,
    booster,
    spSupply,
    areaMove,
    defDurability,
    recoil,
    reload,
    weaponSwitch,
    ammo,
    dashCostReduction,
    armorByPart,
  };
}

function weaponChipEffects() {
  const effects = {
    blastRadius: 0,
    newdPower: 0,
    liveFireRate: 0,
    spreadControl: 0,
    chargeSpeed: 0,
    maxChargePower: 0,
    projectileSpeed: 0,
    placedDurability: 0,
    repairAlly: 0,
    repairObject: 0,
    quickReload: 0,
    meleePower: 0,
  };
  const armorWeight = selectedArmorItems().reduce((sum, item) => sum + resolvedWeight(item, getEnhanceLevel("armor", item.part)), 0);
  const meleeWeightSteps = Math.max(0, Math.floor((armorWeight - 2000) / 10));

  for (const chip of selectedChipItems()) {
    const count = chip.count || 0;
    const name = chip.名称 || "";
    const effect = chip.効果 || "";
    const multiplier = activeChipMultiplier(chip);
    if (!multiplier) continue;
    const amount = firstEffectNumber(chip) * count * multiplier;

    if (name.includes("爆風範囲拡大")) effects.blastRadius += amount;
    if (name.includes("ニュード威力上昇")) effects.newdPower += amount;
    if (name.includes("実弾速射")) effects.liveFireRate += amount;
    if (name.includes("散弾拡散率制御")) effects.spreadControl += Math.abs(amount);
    if (name.includes("高速充填")) effects.chargeSpeed += amount;
    if (name.includes("強化チャージ")) {
      effects.maxChargePower += chargePowerBonus(chip) * count * multiplier;
      effects.chargeSpeed += chipEffectBonus(chip, "充填速度") * count * multiplier;
    }
    if (name.includes("パワースロー")) effects.projectileSpeed += chipEffectBonus(chip, "弾速") * count * multiplier;
    if (name.includes("設置物補強")) effects.placedDurability += amount;
    if (name.includes("機体修理適性")) effects.repairAlly += amount;
    if (name.includes("対物修理適性")) effects.repairObject += amount;
    if (name.includes("クイックリロード")) effects.quickReload += percentBefore(effect, "速く") * count * multiplier;
    if (name.includes("近接攻撃強化")) effects.meleePower += meleeWeightSteps * meleePowerRate(effect) * count * multiplier;
  }

  return effects;
}

function chargePowerBonus(chip) {
  return chipEffectBonus(chip, "最大充填威力")
    || chipEffectBonus(chip, "充填時威力")
    || chipEffectBonus(chip, "充填威力")
    || chipEffectBonus(chip, "最大充填");
}

function meleePowerRate(effect) {
  const match = String(effect || "").match(/10毎に\s*(\d+(?:\.\d+)?)%/);
  return match ? Number(match[1]) : 0;
}

function percentBefore(text, word) {
  const match = String(text || "").match(new RegExp(`(\\d+(?:\\.\\d+)?)%[^。]*${word}`));
  return match ? Number(match[1]) : 0;
}

function parseEnhancements(item) {
  const text = normalize(item?.性能強化);
  if (!text) return [];

  const markers = [...text.matchAll(/[①②③]/g)].map((match) => match.index);
  if (!markers.length) return parsePlainEnhancements(text);

  return markers.flatMap((start, index) => {
    const stage = index + 1;
    const segment = normalize(text.slice(start + 1, markers[index + 1] ?? text.length));
    return parseEnhancementSegment(item, segment).map((entry) => ({ ...entry, stage }));
  }).filter(Boolean);
}

function parseEnhancementSegment(item, segment) {
  const typed = parseTypeEnhancement(item, segment);
  if (typed.length) return typed;

  const text = normalize(segment);

  return text
    .split(/\s*[&＆]\s*/)
    .flatMap((part) => parsePlainEnhancementPart(item, part));
}

function parsePlainEnhancementPart(item, part) {
  const text = normalize(part);
  const key = enhancementKeys(item)
    .filter((candidate) => text.startsWith(candidate))
    .sort((a, b) => b.length - a.length)[0];
  if (!key) return [];
  return [{ key, value: normalize(text.slice(key.length)) }].filter((entry) => entry.value);
}

function parseTypeEnhancement(item, segment) {
  const typeFieldMap = {
    "A通常威力": "TypeA",
    "A特殊威力": "TypeA_2",
    "B威力": "TypeB",
    "B装弾数": "TypeB_2",
    "B爆発半径": "TypeB_3",
    "Bリロード": "TypeB_4",
  };
  const mode = normalizeTypeLetter(item?.タイプ || item?.column);

  return normalize(segment)
    .split(/\s*[&＆]\s*/)
    .map((part) => {
      const parsed = parseTypedPart(part);
      if (!parsed) return null;

      const typeFieldKey = typeFieldMap[`${parsed.letter}${parsed.label}`];
      if (typeFieldKey && item?.[typeFieldKey] !== undefined) {
        return { key: typeFieldKey, value: parsed.value };
      }

      if (!mode || parsed.letter !== mode) return null;
      const key = findEnhancementKey(item, parsed.label);
      return key ? { key, value: parsed.value } : null;
    })
    .filter(Boolean);
}

function parseTypedPart(part) {
  const text = normalize(part);
  const prefix = text.match(/^([ABＡＢ])\s*(.+?)\s+(.+)$/);
  if (prefix) {
    return {
      letter: normalizeTypeLetter(prefix[1]),
      label: normalize(prefix[2]),
      value: normalize(prefix[3]),
    };
  }

  const suffix = text.match(/^(.+?)\s*([ABＡＢ])\s+(.+)$/);
  if (!suffix) return null;
  return {
    letter: normalizeTypeLetter(suffix[2]),
    label: normalize(suffix[1]),
    value: normalize(suffix[3]),
  };
}

function normalizeTypeLetter(value) {
  const text = normalize(value);
  if (/^[AＡ]$/.test(text)) return "A";
  if (/^[BＢ]$/.test(text)) return "B";
  return "";
}

function enhancementKeys(item) {
  return [...new Set([...statKeys, ...Object.keys(item || {})])]
    .filter((key) => !["source_page", "source_file", "table", "group", "class", "slot", "名称", "型番", "性能強化"].includes(key));
}

function findEnhancementKey(item, label) {
  const normalizedLabel = normalize(label).replace(/\s+/g, "");
  return enhancementKeys(item)
    .filter((key) => key.replace(/\s+/g, "") === normalizedLabel)
    .sort((a, b) => b.length - a.length)[0] || "";
}

function parsePlainEnhancements(text) {
  const hits = [];
  for (const key of statKeys) {
    const index = text.indexOf(key);
    if (index !== -1) hits.push({ key, index });
  }
  hits.sort((a, b) => a.index - b.index || b.key.length - a.key.length);

  const deduped = hits.filter((hit, index) => {
    const prev = hits[index - 1];
    return !prev || hit.index !== prev.index;
  });

  return deduped.map((hit, index) => {
    const end = deduped[index + 1]?.index ?? text.length;
    return {
      key: hit.key,
      value: normalize(text.slice(hit.index + hit.key.length, end)),
      stage: index + 1,
    };
  }).filter((entry) => entry.value);
}

function baseValue(item, key) {
  const value = item?.[key];
  if (value === undefined || value === null) return "";
  const parts = splitValues(value);
  if (parts.length >= 2 && parseEnhancements(item).some((entry) => entry.key === key || enhancementAppliesToKey(entry.key, key))) {
    return parts[0];
  }
  return normalize(value);
}

function resolvedValue(item, key, level) {
  let value = baseValue(item, key);
  const enhancements = parseEnhancements(item).filter((entry) => (entry.stage || 1) <= level);
  for (const entry of enhancements) {
    if (entry.key === key || enhancementAppliesToKey(entry.key, key)) value = entry.value;
  }
  return value || "-";
}

function enhancementAppliesToKey(enhancementKey, valueKey) {
  if (!enhancementKey || !valueKey || enhancementKey === valueKey) return false;
  const normalizedEnhancement = normalize(enhancementKey).replace(/\s+/g, "");
  const normalizedValue = normalize(valueKey).replace(/\s+/g, "");
  return normalizedValue.startsWith(`${normalizedEnhancement}(`);
}

function resolvedWeight(item, level) {
  return firstNumber(resolvedValue(item, "重量", level));
}

function resolvedSlots(item, level) {
  return lastNumber(resolvedValue(item, "スロット", level));
}

function speedValue(value) {
  const match = String(value ?? "").match(/(-?\d+(?:\.\d+)?)\s*m\/s/);
  return match ? Number(match[1]) : 0;
}

function adjustedSpeedText(item, key, level, overweight, floorSpeed, chipBonus = 0) {
  const baseText = resolvedValue(item, key, level);
  const baseSpeed = speedValue(baseText);
  if (!baseSpeed) return baseText;

  const boostedSpeed = baseSpeed + chipBonus;
  const sign = chipBonus > 0 ? "+" : "";
  const boostedText = chipBonus ? `${baseText} ${sign}${chipBonus.toFixed(2)}m/s` : baseText;
  if (overweight <= 0) return boostedText;

  const rate = Math.max(0, 1 - overweight / 4000);
  const adjusted = Math.max(floorSpeed, boostedSpeed * rate);
  return `${boostedText} → ${adjusted.toFixed(1)}m/s`;
}

function adjustedSpeedDelta(item, key, level, overweight, floorSpeed, chipBonus = 0) {
  const baseSpeed = speedValue(resolvedValue(item, key, level));
  if (!baseSpeed) return 0;
  const boostedSpeed = baseSpeed + chipBonus;
  const finalSpeed = overweight > 0 ? Math.max(floorSpeed, boostedSpeed * Math.max(0, 1 - overweight / 4000)) : boostedSpeed;
  return finalSpeed - baseSpeed;
}

function statText(item, key, level, bonus = 0, unit = "") {
  const baseText = resolvedValue(item, key, level);
  if (!bonus) return baseText;
  const sign = bonus > 0 ? "+" : "";
  return `${baseText} ${sign}${Number(bonus.toFixed(2))}${unit}`;
}

function dashCountText(body, level, boosterBonus = 0, dashCostReduction = 0) {
  const booster = firstNumber(resolvedValue(body, "ブースター", level)) + boosterBonus;
  if (!booster) return "-";
  const dashCost = Math.max(1, 10.5 - dashCostReduction);
  return `${Math.floor(booster / dashCost)}回`;
}

function dashCostText(dashCostReduction = 0) {
  const dashCost = Math.max(1, 10.5 - dashCostReduction);
  return dashCostReduction ? `${dashCost.toFixed(1)} (-${Number(dashCostReduction.toFixed(2))})` : `${dashCost.toFixed(1)}`;
}

function setMetric(id, text, delta = 0) {
  const element = byId(id);
  element.textContent = text;
  element.classList.remove("positive", "danger");
  element.classList.toggle("positive", delta > 0);
  element.classList.toggle("danger", delta < 0);
}

function armorPercent(item, level) {
  const value = resolvedValue(item, "装甲", level);
  const match = String(value).match(/\(([+-]?\d+(?:\.\d+)?)%\)/);
  return match ? Number(match[1]) : 0;
}

function signedPercentMetric(item, key, level, bonus = 0) {
  return percentValue(resolvedValue(item, key, level)) + bonus;
}

function setDefaults() {
  for (const part of parts) {
    state.armor[part] = getArmorOptions(part)[0] || null;
    if (state.enhance[itemKey("armor", part)] === undefined) setEnhanceLevel("armor", part, 3);
  }
  for (const weaponClass of Object.keys(weaponPickerRules)) {
    for (const slot of weaponSlots) {
      setSelectedWeaponBase(slot, getWeaponOptions(slot, weaponClass)[0] || null, weaponClass);
      if (state.enhance[itemKey("weapon", slot)] === undefined) setEnhanceLevel("weapon", slot, 3);
    }
  }
  state.requestWeapon = getRequestWeaponOptions()[0] || null;
  state.focused = state.armor.頭 || null;
}

function renderSummaryLine() {
  byId("dataSummary").textContent = "";
}

function renderEnhanceSelect(scope, label) {
  const select = document.createElement("select");
  select.className = "enhance-select";
  select.ariaLabel = "強化段階";
  const current = getEnhanceLevel(scope, label);
  ["0", "1", "2", "3"].forEach((level) => {
    const option = document.createElement("option");
    option.value = level;
    option.textContent = level;
    option.selected = Number(level) === current;
    select.appendChild(option);
  });
  select.addEventListener("change", () => {
    setEnhanceLevel(scope, label, select.value);
    render();
  });
  return select;
}

function renderItemSelectButton(scope, label, item, count) {
  const button = document.createElement("button");
  button.type = "button";
  button.className = "item-select-button";
  button.dataset.scope = scope;
  button.dataset.label = label;
  button.title = `${optionLabel(item)} / ${count}件`;
  button.innerHTML = `<span>${optionLabel(item)}</span>`;
  return button;
}

function openItemPicker(scope, label) {
  setPageScrollLock(true);
  state.picker = { open: true, scope, label, query: "", filter: "all", detailsOpen: false, detailFilters: {}, sortKey: "", sortDir: "asc" };
  renderPicker();
  requestAnimationFrame(() => byId("itemPickerSearch")?.focus());
}

function closeItemPicker() {
  setPageScrollLock(false);
  state.picker.open = false;
  renderPicker();
}

function pickerOptions() {
  if (state.picker.scope === "armor") return getArmorOptions(state.picker.label);
  if (state.picker.scope === "weapon") return getWeaponOptions(state.picker.label);
  if (state.picker.scope === "request") return getRequestWeaponOptions();
  return [];
}

function pickerSelectedItem() {
  if (state.picker.scope === "armor") return state.armor[state.picker.label];
  if (state.picker.scope === "weapon") return selectedWeaponBase(state.picker.label);
  if (state.picker.scope === "request") return state.requestWeapon;
  return null;
}

function pickerTitle() {
  if (state.picker.scope === "armor") return `${state.picker.label}パーツを選択`;
  if (state.picker.scope === "weapon") return `${slotLabels[state.picker.label] || state.picker.label}を選択`;
  if (state.picker.scope === "request") return "要請兵器を選択";
  return "選択";
}

function pickerFilterOptions(options) {
  return [];
}

function currentWeaponPickerRule() {
  return weaponPickerRules[state.weaponClass]?.[state.picker.label] || {
    sort: ["系統", "レアリティ", "重量"],
    filters: { rarity: weaponRarityValues },
  };
}

function pickerStatOptions(options) {
  const allowed = state.picker.scope === "armor"
    ? armorPickerStatsByPart[state.picker.label] || []
    : state.picker.scope === "request"
      ? requestWeaponPickerRule.sort
      : currentWeaponPickerRule().sort || [];
  const keys = [];
  for (const key of allowed) {
    for (const matchedKey of matchingPickerKeys(options, key)) {
      if (!keys.includes(matchedKey)) keys.push(matchedKey);
    }
  }
  return keys;
}

function matchingPickerKeys(options, wantedKey) {
  const aliases = {
    系統: ["系統"],
    レアリティ: ["レアリティ"],
    重量タイプ: ["重量タイプ"],
    スロット数: ["スロット数"],
    積載量: ["重量耐性"],
    爆発半径: ["爆発半径", "爆発 半径", "爆発半径(充填時)", "爆発半径(最大充填)"],
    連射速度: ["連射速度", "連射 速度"],
    起爆時間: ["起爆時間", "起爆 時間"],
    威力: ["威力", "通常威力", "特殊威力", "最大充填", "威力(充填時)", "威力(最大充填)", "通常威力(最大充填)", "特殊威力(最大充填)", "通常威力(充填時)", "特殊威力(充填時)"],
    SP回復: ["SP回復"],
    SP消費: ["SP消費"],
  };
  const candidates = aliases[wantedKey] || [wantedKey];
  if (["系統", "レアリティ", "重量タイプ", "スロット数"].includes(wantedKey)) return [wantedKey];
  const matched = candidates.filter((key) => options.some((item) => itemHasStat(item, key)));
  return matched.length ? matched : [];
}

function itemHasStat(item, key) {
  const value = item?.[key];
  return value !== undefined && value !== null && normalize(value) !== "";
}

function selectedPickerStats() {
  return state.picker.detailFilters?.groups?.stat || [];
}

function selectedPickerGroupValues(key) {
  return state.picker.detailFilters?.groups?.[key] || [];
}

function togglePickerGroupValue(groupKey, value) {
  const groups = state.picker.detailFilters.groups || {};
  const selected = new Set(groups[groupKey] || []);
  if (selected.has(value)) selected.delete(value);
  else selected.add(value);
  state.picker.detailFilters.groups = { ...groups, [groupKey]: [...selected] };
  renderPicker();
}

function clearPickerFilters() {
  state.picker.detailFilters.groups = {};
  renderPicker();
}

function uniqueNormalizedValues(values) {
  return [...new Set(values.map(normalize).filter(Boolean))];
}

function itemAttribute(item) {
  return itemAttributes(item)[0] || "";
}

function itemAttributes(item) {
  if (state.picker.scope === "request" || item?.group === "request_weapons") return requestWeaponAttributes(item);
  const text = `${item?.table || ""} ${weaponText(item)}`;
  const attrs = ["実弾", "ニュード", "爆発", "近接"].filter((attr) => text.includes(attr));
  return attrs.length ? attrs : ["なし"];
}

function requestWeaponAttributes(item) {
  const name = optionLabel(item);
  if (/バラム|オートガン/.test(name)) return ["実弾"];
  if (/CN|アハト|デストロイヤー|爆撃通信機/.test(name)) return ["爆発"];
  if (/メガロ/.test(name)) return ["近接"];
  if (/偵察|リペア/.test(name)) return ["なし"];
  return ["なし"];
}

function requestWeaponEffectTags(item) {
  const name = optionLabel(item);
  const method = normalize(item?.射撃方式);
  const tags = [];
  if (method.includes("連射") || /バラム|オートガン|リペア/.test(name)) tags.push("連射");
  if (method.includes("単射") || /CN|デストロイヤー/.test(name)) tags.push("単射");
  if (method.includes("ロック") || /アハト/.test(name)) tags.push("ロック誘導");
  if (/メガロ/.test(name)) tags.push("近接戦闘");
  if (/爆撃通信機/.test(name)) tags.push("援護爆撃");
  if (/オートガン/.test(name)) tags.push("自動攻撃");
  if (/偵察/.test(name)) tags.push("索敵");
  if (/リペア/.test(name)) tags.push("修理/再始動");
  return tags;
}

function itemEffectTags(item) {
  if (state.picker.scope === "request" || item?.group === "request_weapons") return requestWeaponEffectTags(item);
  const text = `${item?.名称 || ""} ${item?.table || ""} ${weaponText(item)}`;
  const patterns = {
    近接戦闘: /近接|ソード|剣|刀|スピア|ロッド|リヒト|スラッシュ|チャージャー/,
    銃部射撃: /銃|ガン|ショット|射撃|リボルバー|ウェーブ/,
    高速機動: /アサルトチャージャー|チャージャー|AC/,
    装甲低下: /装甲低下|ECM|ジャミング/,
    視界妨害: /視界|妨害|ECM|ジャマー/,
    衝撃波: /衝撃波|インパクト/,
    衝撃散弾: /衝撃散弾|パイク/,
    誘爆: /誘爆/,
    遠距離砲撃: /遠距離砲撃|砲撃|榴弾|重装砲|エアバスター/,
    照射: /照射|NeLIS|レーザー/,
    自動攻撃: /自動攻撃|セントリー|ドローン|滞空/,
    防弾: /防弾|バリア|シールド/,
    装甲上昇: /装甲上昇|バリア/,
    索敵: /索敵|センサー|偵察|滞空/,
    索敵妨害: /索敵妨害|ジャマー/,
    援護爆撃: /援護爆撃|爆撃/,
    遠隔操作: /遠隔|リモート/,
    行動妨害: /行動妨害|妨害|スタナー|ECM|ジャマー/,
    移動妨害: /移動妨害|トラップ|マイン/,
    拠点制圧: /拠点制圧/,
    隠密行動: /隠密|光学迷彩|迷彩|ステルス/,
    弾薬補給: /弾薬|補給/,
    "修理/再始動": /修理|再始動|リペア/,
  };
  return Object.entries(patterns)
    .filter(([, pattern]) => pattern.test(text))
    .map(([label]) => label);
}

function rarityDisplay(item) {
  const count = Number(item?.レアリティ || 0);
  if (count > 0) return "★".repeat(count);
  return item?.レアリティ表示?.replaceAll("☆", "★") || "-";
}

function itemRank(item, key, level) {
  return normalize(resolvedValue(item, key, level)).match(/^([SABCDEF][+-]?)/)?.[1] || "";
}

function rankFamily(rank) {
  return normalize(rank).match(/^([SABCDEF])/)?.[1] || "";
}

function weightTypeLabel(value) {
  return ({ 軽量: "軽量型", 中量: "中量型", 重量: "重量型" })[value] || value || "";
}

function weightTypeValue(label) {
  return ({ 軽量型: "軽量", 中量型: "中量", 重量型: "重量" })[label] || label || "";
}

function armorFilterRankGroup(key, minRank = "E", maxRank = "S") {
  const ranks = ["S", "A", "B", "C", "D", "E"];
  const start = ranks.indexOf(maxRank);
  const end = ranks.indexOf(minRank);
  return {
    key,
    label: key === "重量耐性" ? "重量耐性" : key,
    values: ranks.slice(start, end + 1),
  };
}

function pickerFilterGroups(options) {
  if (state.picker.scope === "armor") {
    const part = state.picker.label;
    const base = [
      { key: "rarity", label: "レアリティ", values: ["★★★★", "★★★", "★★", "★"] },
      { key: "weightClass", label: "重量タイプ", values: ["軽量型", "中量型", "重量型"] },
      { key: "slots", label: "スロット数", values: part === "脚" ? ["3", "2"] : ["3", "2", "1"] },
      armorFilterRankGroup("装甲", "E", "S"),
    ];
    const byPart = {
      頭: [armorFilterRankGroup("射撃補正", "E", "S"), armorFilterRankGroup("索敵", "E", "S"), armorFilterRankGroup("ロックオン", "E", "S"), armorFilterRankGroup("DEF回復", "E", "A")],
      胴: [armorFilterRankGroup("ブースター", "E", "S"), armorFilterRankGroup("SP供給", "E", "A"), armorFilterRankGroup("エリア移動", "E", "S"), armorFilterRankGroup("DEF耐久", "E", "S")],
      腕: [armorFilterRankGroup("反動吸収", "E", "S"), armorFilterRankGroup("リロード", "E", "S"), armorFilterRankGroup("武器変更", "E", "S"), armorFilterRankGroup("予備弾数", "E", "S")],
      脚: [armorFilterRankGroup("歩行", "E", "S"), armorFilterRankGroup("ダッシュ", "E", "S"), armorFilterRankGroup("巡航", "E", "S"), armorFilterRankGroup("重量耐性", "E", "A")],
    };
    return [...base, ...(byPart[part] || [])];
  }
  if (state.picker.scope === "request") {
    const filters = requestWeaponPickerRule.filters;
    return [
      { key: "effect", label: "効果", values: filters.effect || [] },
      { key: "attribute", label: "攻撃属性", values: filters.attribute || [] },
    ].filter((group) => group.values.length);
  }

  const filters = currentWeaponPickerRule().filters || {};
  return [
    { key: "rarity", label: "レアリティ", values: filters.rarity || [] },
    { key: "method", label: "射撃方式", values: filters.method || [] },
    { key: "effect", label: "効果", values: filters.effect || [] },
    { key: "attribute", label: "攻撃属性", values: filters.attribute || [] },
  ].filter((group) => group.values.length);
}

function itemMatchesFilterGroup(item, groupKey, values) {
  if (!values.length) return true;
  if (groupKey === "rarity") return values.includes(rarityDisplay(item));
  if (groupKey === "weightClass") return values.map(weightTypeValue).includes(item.weight_class);
  if (groupKey === "slots") return values.includes(String(resolvedSlots(item, getEnhanceLevel("armor", state.picker.label))));
  if (state.picker.scope === "armor") return values.includes(rankFamily(itemRank(item, groupKey, getEnhanceLevel("armor", state.picker.label))));
  if (groupKey === "method") return values.includes(item.射撃方式);
  if (groupKey === "effect") return values.some((value) => itemEffectTags(item).includes(value));
  if (groupKey === "attribute") return values.some((value) => itemAttributes(item).includes(value));
  if (groupKey === "stat") return values.every((key) => itemHasStat(item, key));
  return true;
}

function itemMatchesPicker(item) {
  const query = normalize(state.picker.query).toLowerCase();
  const filter = state.picker.filter;
  const haystack = [item?.名称, item?.table, item?.source_page, item?.weight_class].filter(Boolean).join(" ").toLowerCase();
  if (query && !haystack.includes(query)) return false;
  if (filter !== "all") {
  if (state.picker.scope === "armor" && item.weight_class !== filter) return false;
  if (state.picker.scope === "weapon" && !weaponText(item).includes(filter)) return false;
  }
  return Object.entries(state.picker.detailFilters?.groups || {}).every(([groupKey, values]) => itemMatchesFilterGroup(item, groupKey, values));
}

function pickerPreviewKeys(item = null) {
  const customKeys = customPickerPreviewKeys(item);
  const keys = customKeys.length ? customKeys : pickerStatOptions(pickerOptions());
  if (state.picker.scope === "weapon" && state.weaponClass === "支援" && state.picker.label === "特別装備") {
    for (const key of ["修理速度", "修理速度 自己修復", "修理量", "自己修復"]) {
      if (!keys.includes(key)) keys.push(key);
    }
  }
  return keys.filter((key) => !isHiddenPreviewKey(key));
}

function customPickerPreviewKeys(item = null) {
  if (state.picker.scope !== "weapon") return [];
  const text = `${item?.名称 || ""} ${item?.table || ""}`;

  if (state.weaponClass === "遊撃" && state.picker.label === "補助装備") {
    return ["重量", "索敵範囲", "効果範囲", "威力"];
  }

  if (state.weaponClass === "遊撃" && state.picker.label === "特別装備") {
    return ["重量", "耐久力", "連続使用", "速度低下", "効果範囲", "制圧能力", "ステルス", "チャージ", "威力"];
  }

  if (state.weaponClass === "重火力" && state.picker.label === "特別装備") {
    if (/バリアユニット/.test(text)) return ["重量", "防弾範囲", "耐久力"];
    if (/AiGIS/.test(text)) return ["重量", "被損傷倍率"];
    return ["重量", "威力", "発射弾数", "爆発半径", "射程距離", "チャージ"];
  }

  if (state.weaponClass === "重火力" && state.picker.label === "補助装備") {
    return ["重量", "効果持続", "被損傷倍率", "爆発半径", "起爆時間", "威力", "拡散率", "装弾数", "振り降ろし威力", "合計ダメージ"];
  }

  if (state.weaponClass === "支援" && state.picker.label === "補助装備") {
    return ["重量", "索敵範囲", "索敵角度", "索敵継続", "威力(最大充填)", "攻撃範囲", "充填時間"];
  }

  return [];
}

function isHiddenPreviewKey(key) {
  return ["系統", "重量タイプ"].includes(key);
}

function hasPreviewValue(item, key, level) {
  if (key === "自己修復" && itemHasStat(item, "修理速度 自己修復")) return false;
  const value = normalize(pickerDisplayValue(item, key, level));
  return value !== "" && value !== "-" && value !== "－";
}

function pickerPreviewText(item) {
  const level = state.picker.scope === "armor"
    ? getEnhanceLevel("armor", state.picker.label)
    : getEnhanceLevel("weapon", state.picker.label);
  const keys = (state.picker.scope === "request" ? requestWeaponPreviewStats : pickerPreviewKeys(item))
    .filter((key) => !isHiddenPreviewKey(key))
    .filter((key) => hasPreviewValue(item, key, level));
  if (!keys.length) return itemSubLabel(item);
  return keys
    .map((key) => {
      const value = pickerDisplayValue(item, key, level);
      return state.picker.scope === "request"
        ? `<span>${escapeHtml(key)}: ${escapeHtml(value)}</span>`
        : pickerPreviewPart(key, value);
    })
    .join(state.picker.scope === "request" ? "" : " / ");
}

function pickerPreviewPart(key, value) {
  if (key === "修理速度 自己修復") return value;
  return `${key}: ${value}`;
}

function pickerDisplayValue(item, key, level) {
  if (key === "系統") return item.table || "-";
  if (key === "レアリティ") return rarityDisplay(item);
  if (key === "重量タイプ") return weightTypeLabel(item.weight_class) || "-";
  if (key === "スロット数") return resolvedSlots(item, level) || "-";
  if (key === "積載量") key = "重量耐性";
  if (!itemHasStat(item, key)) return "-";
  if (key === "重量") return resolvedWeight(item, level);
  if (key === "修理速度 自己修復") return combinedRepairBaseText(resolvedValue(item, key, level));
  return resolvedValue(item, key, level);
}

function sortPickerItems(items) {
  const key = state.picker.sortKey;
  if (!key) return items;
  const dir = state.picker.sortDir === "desc" ? -1 : 1;
  return [...items].sort((a, b) => comparePickerStat(a, b, key) * dir || optionLabel(a).localeCompare(optionLabel(b), "ja"));
}

function comparePickerStat(a, b, key) {
  const aValue = pickerSortValue(a, key);
  const bValue = pickerSortValue(b, key);
  if (Number.isFinite(aValue) && Number.isFinite(bValue)) return aValue - bValue;
  if (Number.isFinite(aValue)) return -1;
  if (Number.isFinite(bValue)) return 1;
  return normalize(aValue).localeCompare(normalize(bValue), "ja");
}

function pickerSortValue(item, key) {
  if (key === "系統") return normalize(state.picker.scope === "request" ? optionLabel(item) : item.table);
  if (key === "レアリティ") return Number(item["レアリティ"] || 0);
  if (key === "重量タイプ") return ["軽量", "中量", "重量"].indexOf(item.weight_class);
  if (key === "スロット数") return resolvedSlots(item, getEnhanceLevel("armor", state.picker.label));
  if (key === "積載量") key = "重量耐性";
  if (!itemHasStat(item, key)) return Number.NaN;
  if (key === "重量") return resolvedWeight(item, state.picker.scope === "armor" ? getEnhanceLevel("armor", state.picker.label) : getEnhanceLevel("weapon", state.picker.label));
  const value = resolvedValue(item, key, state.picker.scope === "armor" ? getEnhanceLevel("armor", state.picker.label) : getEnhanceLevel("weapon", state.picker.label));
  const rank = normalize(value).match(/^([SABCDEF][+-]?)/)?.[1];
  if (rank) return rankValue(rank);
  const number = firstNumber(value);
  return normalize(value).match(/-?\d/) ? number : Number.NaN;
}

function rankValue(rank) {
  const order = ["E-", "E", "E+", "D-", "D", "D+", "C-", "C", "C+", "B-", "B", "B+", "A-", "A", "A+", "S-", "S", "S+"];
  const index = order.indexOf(rank);
  return index >= 0 ? index : Number.NaN;
}

function choosePickerItem(item) {
  if (state.picker.scope === "armor") {
    state.armor[state.picker.label] = item;
    state.focused = item;
  } else if (state.picker.scope === "weapon") {
    setSelectedWeaponBase(state.picker.label, item);
    delete state.weaponModes[weaponModeKey(state.picker.label)];
    state.focused = activeWeaponItem(state.picker.label);
  } else if (state.picker.scope === "request") {
    state.requestWeapon = item;
    state.focused = item;
  }
  setPageScrollLock(false);
  state.picker.open = false;
  render();
}

function renderPicker() {
  const root = byId("itemPicker");
  if (!root) return;
  root.classList.toggle("hidden", !state.picker.open);
  if (!state.picker.open) return;

  const options = pickerOptions();
  const selected = pickerSelectedItem();
  const filters = pickerFilterOptions(options);
  if (!filters.some((filter) => filter.value === state.picker.filter)) state.picker.filter = "all";

  byId("itemPickerTitle").textContent = pickerTitle();
  const search = byId("itemPickerSearch");
  search.value = state.picker.query;

  const filterWrap = byId("itemPickerFilters");
  filterWrap.innerHTML = "";
  for (const filter of filters) {
    const button = document.createElement("button");
    button.type = "button";
    button.className = filter.value === state.picker.filter ? "active" : "";
    button.textContent = filter.label;
    button.addEventListener("click", () => {
      state.picker.filter = filter.value;
      renderPicker();
    });
    filterWrap.appendChild(button);
  }
  const detailToggle = document.createElement("button");
  detailToggle.type = "button";
  detailToggle.className = state.picker.detailsOpen ? "active detail-toggle" : "detail-toggle";
  detailToggle.textContent = "フィルター";
  detailToggle.addEventListener("click", () => {
    if (state.picker.detailsOpen) {
      state.picker.detailsOpen = false;
      state.picker.sortKey = "";
    } else {
      state.picker.detailsOpen = true;
    }
    renderPicker();
  });
  filterWrap.appendChild(detailToggle);

  const detailWrap = byId("itemPickerDetails");
  const statOptions = pickerStatOptions(options);
  const selectedStats = new Set(selectedPickerStats());
  detailWrap.classList.toggle("hidden", !state.picker.detailsOpen);
  detailWrap.innerHTML = "";
  if (state.picker.detailsOpen) {
    const allSortOptions = statOptions.length ? statOptions : ["系統"];
    if (!state.picker.sortKey || !allSortOptions.includes(state.picker.sortKey)) state.picker.sortKey = allSortOptions[0];
    const currentSortIndex = Math.max(0, allSortOptions.indexOf(state.picker.sortKey));
    const sortPanel = document.createElement("div");
    sortPanel.className = "item-picker-sort-panel";
    sortPanel.innerHTML = `<span>ソート順</span>`;
    const prev = document.createElement("button");
    prev.type = "button";
    prev.textContent = "‹";
    const sortName = document.createElement("strong");
    sortName.textContent = state.picker.sortKey;
    const next = document.createElement("button");
    next.type = "button";
    next.textContent = "›";
    const dir = document.createElement("button");
    dir.type = "button";
    dir.textContent = state.picker.sortDir === "desc" ? "降順" : "昇順";
    prev.addEventListener("click", () => {
      state.picker.sortKey = allSortOptions[(currentSortIndex - 1 + allSortOptions.length) % allSortOptions.length];
      renderPicker();
    });
    next.addEventListener("click", () => {
      state.picker.sortKey = allSortOptions[(currentSortIndex + 1) % allSortOptions.length];
      renderPicker();
    });
    dir.addEventListener("click", () => {
      state.picker.sortDir = state.picker.sortDir === "desc" ? "asc" : "desc";
      renderPicker();
    });
    sortPanel.append(prev, sortName, next, dir);
    detailWrap.appendChild(sortPanel);

    const filterHead = document.createElement("div");
    filterHead.className = "item-picker-details-head";
    const activeCount = Object.values(state.picker.detailFilters?.groups || {}).reduce((sum, values) => sum + values.length, 0);
    filterHead.innerHTML = `<b>フィルター</b><span>${activeCount ? `${activeCount}個適用中` : "未適用"}</span>`;
    const clear = document.createElement("button");
    clear.type = "button";
    clear.textContent = "解除";
    clear.disabled = !activeCount;
    clear.addEventListener("click", clearPickerFilters);
    filterHead.appendChild(clear);
    detailWrap.appendChild(filterHead);

    for (const group of pickerFilterGroups(options)) {
      const row = document.createElement("div");
      row.className = "item-picker-filter-row";
      const selectedValues = new Set(selectedPickerGroupValues(group.key));
      row.innerHTML = `<b>${group.label}</b>`;
      const buttons = document.createElement("div");
      buttons.className = "item-picker-filter-buttons";
      for (const value of group.values) {
        const button = document.createElement("button");
        button.type = "button";
        button.className = selectedValues.has(value) ? "active" : "";
        button.textContent = value;
        button.addEventListener("click", () => togglePickerGroupValue(group.key, value));
        buttons.appendChild(button);
      }
      row.appendChild(buttons);
      detailWrap.appendChild(row);
    }
  }

  const list = byId("itemPickerList");
  list.innerHTML = "";
  const visible = sortPickerItems(options.filter(itemMatchesPicker));
  for (const item of visible) {
    const button = document.createElement("button");
    button.type = "button";
    button.className = `${item === selected ? "active" : ""} ${state.picker.scope === "request" ? "request-option" : ""}`.trim();
    const previewText = pickerPreviewText(item);
    button.innerHTML = `
      <span>${optionLabel(item)}</span>
      <small class="${state.picker.scope === "request" ? "request-preview" : ""}">${state.picker.scope === "request" ? previewText : escapeHtml(previewText)}</small>
    `;
    button.addEventListener("click", () => choosePickerItem(item));
    list.appendChild(button);
  }
  if (!visible.length) {
    const empty = document.createElement("p");
    empty.className = "item-picker-empty";
    empty.textContent = "該当なし";
    list.appendChild(empty);
  }
}

function renderLoadout() {
  const grid = byId("loadoutGrid");
  const selectedChipPanel = byId("selectedChipPanel");
  const effects = chipEffects();
  const weaponEffects = weaponChipEffects();
  grid.innerHTML = "";

  grid.appendChild(loadoutHeader("パーツ選択"));

  for (const part of parts) {
    const options = getArmorOptions(part);
    if (!options.includes(state.armor[part])) state.armor[part] = options[0] || null;
    const level = getEnhanceLevel("armor", part);

    const card = document.createElement("div");
    card.className = "loadout-card armor-row";

    const label = document.createElement("label");
    label.innerHTML = `<span class="slot-label">${part}</span><span>${state.armor[part]?.weight_class || ""}</span>`;

    const row = document.createElement("div");
    row.className = "select-row";

    const select = renderItemSelectButton("armor", part, state.armor[part], options.length);
    select.addEventListener("click", () => {
      openItemPicker("armor", part);
      state.focused = state.armor[part];
    });

    row.append(select, renderEnhanceSelect("armor", part));
    card.append(label, row, quickStats(state.armor[part], level, armorQuickKeys(part), effects, weaponEffects));
    grid.appendChild(card);
  }

  grid.appendChild(loadoutHeader("武器を選択"));

  for (const slot of weaponSlots) {
    const options = getWeaponOptions(slot);
    if (!options.includes(selectedWeaponBase(slot))) setSelectedWeaponBase(slot, options[0] || null);
    const level = getEnhanceLevel("weapon", slot);
    const activeWeapon = activeWeaponItem(slot);

    const card = document.createElement("div");
    card.className = "loadout-card weapon-row";

    const label = document.createElement("label");
    label.innerHTML = `<span class="slot-label">${slotLabels[slot] || slot}</span>`;

    const row = document.createElement("div");
    row.className = "select-row";

    const select = renderItemSelectButton("weapon", slot, selectedWeaponBase(slot), options.length);
    select.addEventListener("click", () => {
      openItemPicker("weapon", slot);
      state.focused = activeWeaponItem(slot);
    });

    row.append(select, renderEnhanceSelect("weapon", slot));
    card.append(label, row, renderWeaponModeToggle(slot), quickStats(activeWeapon, level, weaponQuickKeys(activeWeapon, slot), effects, weaponEffects, slot));
    grid.appendChild(card);
  }

  grid.appendChild(loadoutHeader("要請兵器＆チップ", false));
  const requestChipRow = document.createElement("div");
  requestChipRow.className = "request-chip-row";

  const requestOptions = getRequestWeaponOptions();
  if (!requestOptions.includes(state.requestWeapon)) state.requestWeapon = requestOptions[0] || null;
  const requestCard = document.createElement("div");
  requestCard.className = "loadout-card request-row";

  const requestLabel = document.createElement("label");
  requestLabel.innerHTML = `<span class="slot-label">要請</span>`;

  const requestRow = document.createElement("div");
  requestRow.className = "select-row";

  const requestSelect = renderItemSelectButton("request", "要請兵器", state.requestWeapon, requestOptions.length);
  requestSelect.addEventListener("click", () => {
    openItemPicker("request", "要請兵器");
    state.focused = state.requestWeapon;
  });

  requestRow.appendChild(requestSelect);
  requestCard.append(requestLabel, requestRow, quickStats(state.requestWeapon, 0, requestWeaponQuickKeys(state.requestWeapon), effects, weaponEffects));
  requestChipRow.appendChild(requestCard);
  if (selectedChipPanel) requestChipRow.appendChild(selectedChipPanel);
  grid.appendChild(requestChipRow);
}

function loadoutHeader(title, showEnhance = true) {
  const header = document.createElement("div");
  header.className = "loadout-header";
  header.innerHTML = `<span></span><strong>${title}</strong><b>${showEnhance ? "強化段階" : ""}</b><b>重量</b>`;
  return header;
}

function renderWeaponModeToggle(slot) {
  const wrap = document.createElement("div");
  wrap.className = "weapon-mode-toggle";
  const modes = weaponModeOptions(slot);

  if (modes.length <= 1) {
    wrap.classList.add("empty");
    return wrap;
  }

  const key = weaponModeKey(slot);
  const current = weaponModeIndex(slot);
  for (const mode of modes) {
    const button = document.createElement("button");
    button.type = "button";
    button.textContent = mode.label.replace(/^Type/, "");
    button.className = mode.index === current ? "active" : "";
    button.addEventListener("click", () => {
      state.weaponModes[key] = mode.index;
      state.focused = activeWeaponItem(slot);
      render();
    });
    wrap.appendChild(button);
  }

  return wrap;
}

function weaponModeOptions(slot) {
  const base = selectedWeaponBase(slot);
  const variants = weaponVariants(base);
  const typeFieldModes = weaponTypeFieldModes(base);
  if (typeFieldModes.length) return typeFieldModes.map((label, index) => ({ label, index }));
  return variants.length > 1
    ? variants.map((item, index) => ({ label: item.タイプ || item.column || `Type${index + 1}`, index }))
    : [];
}

function renderDetailWeaponModeToggle(item) {
  if (!item || item.group !== "weapons" || !item.slot) return null;
  const modes = weaponModeOptions(item.slot);
  if (modes.length <= 1) {
    return null;
  }

  const wrap = document.createElement("div");
  wrap.className = "detail-mode-toggle";
  const key = weaponModeKey(item.slot);
  const current = weaponModeIndex(item.slot);

  const label = document.createElement("b");
  label.textContent = "タイプ";
  wrap.appendChild(label);

  const buttons = document.createElement("div");
  for (const mode of modes) {
    const button = document.createElement("button");
    button.type = "button";
    button.textContent = mode.label.replace(/^Type/, "");
    button.className = mode.index === current ? "active" : "";
    button.addEventListener("click", () => {
      state.weaponModes[key] = mode.index;
      state.focused = activeWeaponItem(item.slot);
      render();
    });
    buttons.appendChild(button);
  }
  wrap.appendChild(buttons);

  return wrap;
}

function weaponTypeFieldModes(item) {
  if (!item) return [];
  return ["TypeA", "TypeB"].filter((prefix) => Object.keys(item).some((key) => key.startsWith(prefix)));
}

function armorQuickKeys(part) {
  const keysByPart = {
    頭: ["重量", "装甲", "射撃補正", "索敵", "ロックオン", "DEF回復", "スロット"],
    胴: ["重量", "装甲", "ブースター", "SP供給", "DEF耐久", "エリア移動", "スロット"],
    腕: ["重量", "装甲", "反動吸収", "リロード", "武器変更", "予備弾数", "スロット"],
    脚: ["重量", "装甲", "歩行", "ダッシュ", "巡航", "重量耐性", "スロット"],
  };
  return keysByPart[part] || ["重量", "装甲", "スロット"];
}

function weaponQuickKeys(item, slot = "") {
  const typeModes = weaponTypeFieldModes(item);
  if (typeModes.length) {
    const mode = typeModes[weaponModeIndex(slot)] || typeModes[0];
    return [
      "重量",
      ...Object.keys(item)
        .filter((key) => key.startsWith(mode))
        .map((key) => ({ key, label: typeStatLabel(key) })),
    ];
  }

  const preferred = [
    "重量",
    "属性",
    "射撃方式",
    "威力",
    "装弾数",
    "リロード",
    "連射速度",
    "連射 速度",
    "射撃精度",
    "精密照準",
    "反動",
    "拡散率",
    "連射 精度",
    "速度低下",
    "速度 低下",
    "充填時間",
    "秒間火力",
    "マガジン火力",
    "総火力",
    "爆発半径",
    "爆発 半径",
    "爆発半径(充填時)",
    "爆発半径(最大充填)",
    "爆発回数",
    "起爆時間",
    "起爆 時間",
    "着弾時間",
    "着弾誤差",
    "弾速",
    "飛行速度",
    "滑走速度",
    "飛行距離",
    "誘導性能",
    "射程距離",
    "有効距離",
    "発射弾数",
    "索敵範囲",
    "索敵角度",
    "索敵間隔",
    "索敵継続",
    "稼働時間",
    "連続使用",
    "所持数",
    "効果持続",
    "効果範囲",
    "感知半径",
    "感知範囲",
    "感知距離",
    "感知角度",
    "設置数",
    "起動時間",
    "弾道制御",
    "連続射撃",
    "防弾範囲",
    "制圧能力",
    "ステルス",
    "出力",
    "通常威力",
    "特殊威力",
    "最大充填",
    "威力(充填時)",
    "威力(最大充填)",
    "通常威力(最大充填)",
    "特殊威力(最大充填)",
    "通常威力(充填時)",
    "特殊威力(充填時)",
    "合計ダメージ",
    "チャージ",
    "OH復帰時間",
    "耐久力",
    "修理量",
    "修理速度",
    "修理速度 自己修復",
    "自己修復",
  ];
  return preferred.filter((key) => item?.[key] !== undefined && item?.[key] !== null && item?.[key] !== "");
}

function requestWeaponQuickKeys(item) {
  const preferred = [
    "重量",
    "リチャージ",
    "使用 時間",
    "射撃方式",
    "威力",
    "通常威力",
    "特殊威力",
    "最大充填",
    "充填時間",
    "装弾数",
    "連射速度",
    "爆発半径",
    "爆発 半径",
    "リロード",
    "索敵範囲",
    "稼働時間",
    "修理速度",
    "耐久力",
    "修理量",
    "有効距離",
  ];
  return preferred.filter((key) => {
    const value = requestWeaponStatValue(item, key);
    return value !== undefined && value !== null && value !== "" && value !== "-";
  });
}

function quickStats(item, level, keys, effects = chipEffects(), weaponEffects = weaponChipEffects(), slot = "") {
  const wrap = document.createElement("div");
  wrap.className = "quick-stats";
  const rowCount = item?.group === "weapons" ? Math.max(8, keys.length) : 8;
  const rows = keys.slice(0, rowCount);
  while (rows.length < rowCount) rows.push("");

  for (const row of rows) {
    const span = document.createElement("span");
    if (!row) {
      span.className = "empty-stat";
      span.dataset.label = "";
      span.dataset.value = "";
      span.textContent = "";
      wrap.appendChild(span);
      continue;
    }
    const key = typeof row === "string" ? row : row.key;
    const label = typeof row === "string" ? statDisplayLabel(row) : row.label;
    const value = quickStatValue(item, key, level, effects, weaponEffects, slot);
    const delta = quickStatDelta(item, key, label, level, value, slot);
    const formatted = quickStatMarkup(item, key, label, level, value, slot);
    span.dataset.label = label;
    span.dataset.value = value;
    span.title = `${label}: ${value}`;
    span.innerHTML = `<span class="stat-value">${formatted.html}</span>`;
    span.classList.toggle("medium-value", isMediumStatValue(value));
    span.classList.toggle("long-value", isLongStatValue(value));
    span.classList.toggle("positive", !formatted.partial && delta > 0);
    span.classList.toggle("danger", !formatted.partial && delta < 0);
    wrap.appendChild(span);
  }
  return wrap;
}

function escapeHtml(value) {
  return String(value ?? "").replace(/[&<>"']/g, (char) => ({
    "&": "&amp;",
    "<": "&lt;",
    ">": "&gt;",
    "\"": "&quot;",
    "'": "&#39;",
  }[char]));
}

function statDisplayLabel(key) {
  if (key === "修理速度 自己修復") return "修理速度/自己修復";
  return key;
}

function textDelta(value) {
  const text = String(value || "");
  if (!text.includes("→")) return 0;
  const [before, after] = text.split("→");
  const start = lastNumber(before);
  const end = firstNumber(after);
  if (!Number.isFinite(start) || !Number.isFinite(end)) return 0;
  return end - start;
}

function quickStatDelta(item, key, label, level, value, slot = "") {
  if (isBonusNote(value)) return 0;
  const arrowDelta = textDelta(value);
  if (arrowDelta) return arrowDelta;
  if (!isCombatItem(item)) return 0;

  const base = typedValue(item?.group === "request_weapons" ? requestWeaponStatValue(item, key) : resolvedValue(item, key, level), slot);
  const start = comparableNumber(base, label);
  const end = comparableNumber(value, label);
  if (!Number.isFinite(start) || !Number.isFinite(end) || start === end) return 0;
  const delta = end - start;
  return lowerIsBetter(label) ? -delta : delta;
}

function quickStatMarkup(item, key, label, level, value, slot = "") {
  const text = String(value || "");
  if (/\((?:味方修理|対物修理):/.test(text)) {
    return {
      html: formatRepairStatText(text),
      partial: true,
    };
  }

  if (isBonusNote(text)) {
    const match = text.match(/^(.*?)(\([^)]*(?:射補|反動吸収)[^)]*\))(.*)$/);
    if (match) {
      return {
        html: `${formatStatText(match[1])}<span class="positive">${formatStatText(match[2])}</span>${formatStatText(match[3])}`,
        partial: true,
      };
    }
  }

  if (!isCombatItem(item)) {
    return { html: formatStatText(text), partial: false };
  }

  const base = typedValue(item?.group === "request_weapons" ? requestWeaponStatValue(item, key) : resolvedValue(item, key, level), slot);
  const parentheticalChange = parentheticalOnlyMarkup(base, text, label);
  if (parentheticalChange) return parentheticalChange;

  return { html: formatStatText(text), partial: false };
}

function parentheticalOnlyMarkup(baseValue, value, label = "") {
  const baseText = String(baseValue || "");
  const text = String(value || "");
  if (!/\([^)]*\d/.test(baseText) || !/\([^)]*\d/.test(text)) return null;

  const baseMain = firstNumber(baseText);
  const currentMain = firstNumber(text);
  const baseParen = lastNumber(baseText);
  const currentParen = lastNumber(text);
  if (!Number.isFinite(baseMain) || !Number.isFinite(currentMain) || baseMain !== currentMain) return null;
  if (!Number.isFinite(baseParen) || !Number.isFinite(currentParen) || baseParen === currentParen) return null;

  const delta = lowerIsBetter(label) ? baseParen - currentParen : currentParen - baseParen;
  const className = delta > 0 ? "positive" : "danger";
  const match = text.match(/^(.*)(\([^)]*\d[^)]*\))(.*)$/);
  if (!match) return null;

  return {
    html: `${formatStatText(match[1])}<span class="${className}">${formatStatText(match[2])}</span>${formatStatText(match[3])}`,
    partial: true,
  };
}

function formatStatText(value) {
  const text = String(value || "");
  const escaped = escapeHtml(text);
  if (!isLongStatValue(text)) return escaped;
  const pairs = groupedParentheticalParts(text);
  if (pairs.length >= 2) {
    return `<span class="split-values split-values-stack">${pairs.map((part) => `<span>${escapeHtml(part)}</span>`).join("")}</span>`;
  }
  return escaped
    .replace(/合計/g, "<wbr>合計")
    .replace(/最大/g, "<wbr>最大")
    .replace(/\)\s+/g, ")<wbr> ")
    .replace(/\/(?=\S)/g, "/<wbr>");
}

function formatRepairStatText(value) {
  return escapeHtml(value).replace(/(\((?:味方修理|対物修理):[^)]*\))/g, '<span class="positive">$1</span>');
}

function groupedParentheticalParts(value) {
  const text = String(value || "").trim();
  const parts = [];
  const pattern = /([^()\s]+(?:\([^)]*\))?)/g;
  let match;
  while ((match = pattern.exec(text)) !== null) {
    parts.push(match[1]);
  }
  return parts;
}

function isMediumStatValue(value) {
  const text = String(value || "");
  return !isLongStatValue(text) && (text.length > 12 || /\([^)]*\d/.test(text));
}

function isLongStatValue(value) {
  const text = String(value || "");
  return text.length > 24 || (text.match(/\(/g) || []).length >= 2 || /合計|最大/.test(text);
}

function comparableNumber(value, label = "") {
  const text = String(value || "");
  if (/×/.test(text)) return lastNumber(text);
  if (/\([^)]*\d/.test(text)) return lastNumber(text);
  return firstNumber(text);
}

function isBonusNote(value) {
  return /\([^)]*(?:射補|反動吸収)[^)]*\)/.test(String(value || ""));
}

function lowerIsBetter(label = "") {
  return /リロード|充填時間|起爆時間|OH復帰時間|拡散率/.test(label);
}

function typeStatLabel(key) {
  const prefix = key.match(/^Type[AB]/)?.[0] || "";
  const suffix = key.replace(/^Type[AB]\s*/, "").replace(/^Type[AB]_?/, "").replace(/^_/, "");
  const labelsByPrefix = {
    TypeA: {
      "": "通常威力",
      "2": "特殊威力",
    },
    TypeB: {
      "": "威力",
      "2": "装弾数",
      "3": "爆発半径",
      "4": "リロード",
    },
  };
  const commonLabels = {
    通常威力: "通常威力",
    特殊威力: "特殊威力",
    弾速: "弾速",
    射出前硬直: "射出前硬直",
  };
  return labelsByPrefix[prefix]?.[suffix] || commonLabels[suffix] || suffix || key;
}

function quickStatValue(item, key, level, effects, weaponEffects, slot = "") {
  const value = typedValue(item?.group === "request_weapons" ? requestWeaponStatValue(item, key) : resolvedValue(item, key, level), slot);
  if (item?.group === "armor" && key === "装甲") return statText(item, key, level, effects.armorByPart?.[item.part] || 0, "%");
  if (!isCombatItem(item)) return value;
  const label = typeStatLabel(key);
  if (item?.group === "weapons" && (key === "リロード" || label === "リロード")) return adjustedReloadText(value, effects, weaponEffects);
  if (item?.group === "weapons" && (key === "装弾数" || label === "装弾数")) return adjustedAmmoText(value, applicableAmmoBonus(item, effects));
  if (item?.group === "weapons" && key === "所持数") return adjustedCountText(value, applicableAmmoBonus(item, effects));
  if (item?.group === "weapons" && key === "総火力") return adjustedPercentText(value, applicableAmmoBonus(item, effects));
  if (item?.group === "weapons" && key === "射撃精度") return appendBonusNote(value, effectiveShotBonus(effects), "射補");
  if (item?.group === "weapons" && key === "反動") return appendBonusNote(value, effectiveRecoilBonus(effects), "反動吸収");
  if ((key.includes("爆発") && key.includes("半径")) || label === "爆発半径") return adjustedAddText(value, applicableBlastRadius(item, weaponEffects, key));
  if (isPowerLikeKey(key) || isPowerLikeKey(label)) return adjustedPowerText(value, item, key, label, weaponEffects);
  if (key.includes("連射") && key.includes("速度")) return adjustedPercentText(value, applicableLiveFireRate(item, weaponEffects, key));
  if (item?.group === "weapons" && key === "拡散率") return adjustedPercentText(value, -weaponEffects.spreadControl);
  if (item?.group === "weapons" && (key === "弾速" || key === "飛行速度" || key === "滑走速度")) return adjustedAddText(value, weaponEffects.projectileSpeed);
  if (key === "充填時間") return adjustedTimeBySpeedText(value, weaponEffects.chargeSpeed);
  if (item?.group === "weapons" && key === "耐久力") return adjustedPercentText(value, weaponEffects.placedDurability);
  if (key.includes("修理量") || key.includes("修理速度")) return adjustedRepairText(value, weaponEffects, key);
  return value;
}

function isCombatItem(item) {
  return item?.group === "weapons" || item?.group === "request_weapons";
}

function requestWeaponStatValue(item, key) {
  const name = `${item?.名称 || ""} ${optionLabel(item)}`;
  if (/デストロイヤー/.test(name)) {
    if (key === "装弾数") return "1\u00d74";
    if (key === "爆発 半径" || key === "爆発半径") return "21m";
    if (key === "リロード") return "-";
  }
  return resolvedValue(item, key, 0);
}

function typedValue(value, slot) {
  const mode = weaponModeIndex(slot) === 1 ? "B" : "A";
  const other = mode === "A" ? "B" : "A";
  const text = normalize(value);
  if (!/[ABＡＢ]/.test(text) || !/[&＆]/.test(text)) return value;

  const normalizedMode = mode === "A" ? "[AＡ]" : "[BＢ]";
  const normalizedOther = other === "A" ? "[AＡ]" : "[BＢ]";
  const match = text.match(new RegExp(`(?:^|[&＆]\\s*)[^&＆]*?${normalizedMode}\\s*([^&＆]+?)(?=\\s*[&＆]|$)`));
  if (match) return normalize(match[1]);

  return text
    .replace(new RegExp(`[^&＆]*?${normalizedOther}\\s*[^&＆]+`, "g"), "")
    .replace(/[&＆]/g, "")
    .replace(new RegExp(`${normalizedMode}\\s*`, "g"), "")
    .trim() || value;
}

function effectiveAmmoBonus(effects) {
  return percentValue(resolvedValue(state.armor.腕, "予備弾数", getEnhanceLevel("armor", "腕"))) + (effects.ammo || 0);
}

function applicableAmmoBonus(item, effects) {
  if (!["主武器", "副武器"].includes(item?.slot)) return 0;
  return effectiveAmmoBonus(effects);
}

function effectiveShotBonus(effects) {
  return percentValue(resolvedValue(state.armor.頭, "射撃補正", getEnhanceLevel("armor", "頭"))) + (effects.shot || 0);
}

function effectiveRecoilBonus(effects) {
  return percentValue(resolvedValue(state.armor.腕, "反動吸収", getEnhanceLevel("armor", "腕"))) + (effects.recoil || 0);
}

function isPowerLikeKey(key) {
  return key === "威力" || key === "最大充填" || key.includes("威力") || key.includes("ダメージ") || key.includes("火力");
}

function adjustedReloadText(value, effects, weaponEffects = {}) {
  const base = firstNumber(value);
  if (!base) return value;
  const armReload = percentValue(resolvedValue(state.armor.腕, "リロード", getEnhanceLevel("armor", "腕")));
  const reloadBonus = armReload + (effects.reload || 0) + (weaponEffects.quickReload || 0);
  const adjusted = base / (1 + reloadBonus / 100);
  return `${trimNumber(adjusted, 2)}秒`;
}

function adjustedAmmoText(value, ammoBonus = 0) {
  if (!ammoBonus) return value;
  const text = String(value);
  if (/×/.test(text)) {
    let seen = 0;
    return text.replace(/-?\d+(?:\.\d+)?/g, (match) => {
      seen += 1;
      if (seen < 2) return match;
      return String(Math.max(1, Math.floor(Number(match) * (1 + ammoBonus / 100))));
    });
  }
  return adjustedCountText(value, ammoBonus);
}

function adjustedCountText(value, percent = 0) {
  if (!percent) return value;
  return replaceNumbers(value, (number) => Math.max(1, Math.floor(number * (1 + percent / 100))));
}

function appendBonusNote(value, amount = 0, label = "") {
  if (!amount) return value;
  const sign = amount > 0 ? "+" : "";
  return `${value} (${label}${sign}${trimNumber(amount, 2)}%)`;
}

function adjustedPowerText(value, item, key, label, weaponEffects) {
  let percent = applicableNewdPower(item, weaponEffects, key) + applicableMeleePower(item, weaponEffects, key);
  if (label.includes("最大充填") || label === "最大充填") percent += weaponEffects.maxChargePower || 0;

  let adjusted = adjustedPercentText(value, percent);
  if (weaponEffects.maxChargePower && !label.includes("最大充填") && /\([^)]*\d/.test(adjusted)) {
    adjusted = adjustParentheticalNumbers(adjusted, weaponEffects.maxChargePower);
  }
  return adjusted;
}

function applicableBlastRadius(item, weaponEffects, key = "") {
  return weaponEffects.blastRadius * weaponAttributeFactor(item, /爆発|爆風/, key);
}

function applicableNewdPower(item, weaponEffects, key = "") {
  return weaponEffects.newdPower * weaponAttributeFactor(item, /ニュード/, key);
}

function applicableMeleePower(item, weaponEffects, key = "") {
  return weaponEffects.meleePower * weaponAttributeFactor(item, /近接/, key);
}

function applicableLiveFireRate(item, weaponEffects, key = "") {
  return weaponEffects.liveFireRate * weaponAttributeFactor(item, /実弾/, key);
}

function hasWeaponText(item, pattern) {
  return pattern.test(weaponText(item));
}

function weaponAttributeFactor(item, pattern, key = "") {
  const text = weaponAttributeText(item, key);
  if (!pattern.test(text) && !requestAttributeMatches(item, pattern)) return 0;
  const label = pattern.source.includes("実弾") ? "実弾" : pattern.source.includes("ニュード") ? "ニュード" : "(?:爆発|爆風)";
  const match = text.match(new RegExp(`${label}\\s*(\\d+(?:\\.\\d+)?)\\s*%`));
  if (!match && requestAttributeMatches(item, pattern)) return 1;
  return match ? Number(match[1]) / 100 : 1;
}

function requestAttributeMatches(item, pattern) {
  if (item?.group !== "request_weapons") return false;
  return requestWeaponAttributes(item).some((attr) => pattern.test(attr));
}

function weaponAttributeText(item, key = "") {
  const fullText = weaponText(item);
  const mode = normalize(key).match(/^Type([AB])/i)?.[1];
  if (!mode) return fullText;

  const current = new RegExp(`Type${mode}\\s*[:：]?`, "i");
  const start = fullText.search(current);
  if (start < 0) return fullText;

  const nextMode = mode === "A" ? "B" : "A";
  const rest = fullText.slice(start);
  const next = rest.search(new RegExp(`\\sType${nextMode}\\s*[:：]?`, "i"));
  return next > 0 ? rest.slice(0, next) : rest;
}

function weaponText(item) {
  return Object.values(item || {})
    .filter((value) => typeof value === "string")
    .join(" ");
}

function adjustedAddText(value, amount = 0) {
  if (!amount) return value;
  return replaceFirstNumber(value, (number) => number + amount);
}

function adjustedPercentText(value, percent = 0) {
  if (!percent) return value;
  return replaceNumbers(value, (number) => number * (1 + percent / 100));
}

function adjustedRepairText(value, weaponEffects = {}, key = "") {
  const ally = weaponEffects.repairAlly || 0;
  const object = weaponEffects.repairObject || 0;
  const repairBase = key === "修理速度 自己修復" ? combinedRepairBaseText(value) : value;
  const repairValue = key === "修理速度 自己修復" ? splitRepairSelfValue(value).repair : value;
  if (!ally && !object) return repairBase;

  const notes = [];
  if (ally) notes.push(`(味方修理: ${adjustedPercentText(repairValue, ally)})`);
  if (object) notes.push(`(対物修理: ${adjustedPercentText(repairValue, object)})`);
  return `${repairBase} ${notes.join(" ")}`;
}

function combinedRepairBaseText(value) {
  const { repair, self } = splitRepairSelfValue(value);
  return self ? `${repair} / 自己修復 ${self}` : repair;
}

function splitRepairSelfValue(value) {
  const text = normalize(value);
  const values = [...text.matchAll(/(?:毎秒)?\s*-?\d+(?:\.\d+)?/g)].map((match) => normalize(match[0]));
  return {
    repair: values[0] || text,
    self: values[1] || "",
  };
}

function adjustedTimeBySpeedText(value, speedPercent = 0) {
  if (!speedPercent) return value;
  return replaceFirstNumber(value, (number) => number / Math.max(0.1, 1 + speedPercent / 100));
}

function replaceFirstNumber(value, transform) {
  let done = false;
  return String(value).replace(/-?\d+(?:\.\d+)?/, (match) => {
    if (done) return match;
    done = true;
    return trimNumber(transform(Number(match)), 2);
  });
}

function replaceNumbers(value, transform) {
  return String(value).replace(/-?\d+(?:\.\d+)?/g, (match) => trimNumber(transform(Number(match)), 2));
}

function adjustParentheticalNumbers(value, percent) {
  return String(value).replace(/\(([^)]*)\)/g, (segment) => {
    return segment.replace(/-?\d+(?:\.\d+)?/g, (match) => trimNumber(Number(match) * (1 + percent / 100), 2));
  });
}

function percentValue(value) {
  const match = String(value || "").match(/\(([+-]?\d+(?:\.\d+)?)%\)/);
  return match ? Number(match[1]) : 0;
}

function trimNumber(value, digits = 2) {
  return Number(value.toFixed(digits)).toString();
}

function renderChipControls() {
  return;
}

function renderChips() {
  renderChipList("loadoutChipList", state.chipTable, loadoutChips());
  renderChipList("statChipList", state.statChipTable, statChips());
}

function renderSelectedChips() {
  const list = byId("selectedChipList");
  const summary = byId("selectedChipSummary");
  const selected = selectedChipItems();
  const usage = chipUsageByTable();
  const capacity = chipCapacityByTable();

  list.innerHTML = "";
  summary.textContent = parts
    .map((part) => {
      const table = `${part}部チップ`;
      return `${part}${usage[table] || 0}/${capacity[table] || 0}`;
    })
    .join(" ");

  if (!selected.length) {
    const empty = document.createElement("div");
    empty.className = "selected-chip-empty";
    empty.textContent = "チップ未選択";
    list.appendChild(empty);
    return;
  }

  for (const chip of selected) {
    const row = document.createElement("div");
    row.className = "selected-chip";
    row.innerHTML = `
      <span class="selected-chip-part">${chip.table.replace("部チップ", "")}</span>
      <button class="selected-chip-main" type="button">
        <span class="selected-chip-name">${chip.名称}</span>
      </button>
      <strong>x${chip.count}</strong>
      <button class="selected-chip-remove" type="button" title="${chip.名称}を解除">×</button>
    `;
    row.title = chip.効果 || chip.名称;
    row.querySelector(".selected-chip-main").addEventListener("click", () => {
      state.focused = chip;
      renderDetail();
    });
    row.querySelector(".selected-chip-remove").addEventListener("click", () => {
      setChipCount(chip, 0);
      if (state.focused === chip) state.focused = null;
      render();
    });
    list.appendChild(row);
  }
}

function renderChipList(listId, table, sourceChips) {
  enforceChipCapacity();
  const list = byId(listId);
  const usage = chipUsageByTable();
  const capacity = chipCapacityByTable();
  const chips = sourceChips.filter((chip) => {
    return chip.table === table;
  });

  list.innerHTML = "";
  if (!chips.length) {
    const empty = document.createElement("div");
    empty.className = "chip empty";
    empty.textContent = "該当チップなし";
    list.appendChild(empty);
    return;
  }

  for (const chip of chips.slice(0, 120)) {
    const count = chipCount(chip);
    const max = chipMax(chip);
    const tableUsage = usage[chip.table] || 0;
    const tableCapacity = capacity[chip.table] || 0;
    const canAdd = count < max && tableUsage < tableCapacity;
    const row = document.createElement("div");
    row.className = `chip${count > 0 ? " active" : ""}`;
    row.innerHTML = `
      <button class="chip-main" type="button">
        <span>${chip.名称}<small>${chip.効果 || ""}</small></span>
        <span class="chip-limit">最大${max}</span>
      </button>
      <div class="chip-stepper">
        <button type="button" ${count <= 0 ? "disabled" : ""}>-</button>
        <strong>${count}</strong>
        <button type="button" ${!canAdd ? "disabled" : ""}>+</button>
      </div>
    `;
    const [main, stepper] = row.children;
    const [minus, , plus] = stepper.children;
    main.addEventListener("click", () => {
      state.focused = chip;
      renderDetail();
    });
    minus.addEventListener("click", () => {
      setChipCount(chip, count - 1);
      state.focused = chip;
      render();
    });
    plus.addEventListener("click", () => {
      setChipCount(chip, count + 1);
      state.focused = chip;
      render();
    });
    list.appendChild(row);
  }
}

function renderTotals() {
  const armorItems = selectedArmorItems();
  const weaponItems = selectedWeaponItems();
  const requestWeapon = selectedRequestWeaponItem();
  const armorWeight = armorItems.reduce((sum, item) => sum + resolvedWeight(item, getEnhanceLevel("armor", item.part)), 0);
  const weaponWeight = weaponItems.reduce((sum, item) => sum + resolvedWeight(item, getEnhanceLevel("weapon", item.slot)), 0);
  const requestWeight = state.includeRequestWeight && requestWeapon ? resolvedWeight(requestWeapon, 0) : 0;
  const satelliteWeight = state.includeSatelliteBunkerWeight ? satelliteBunkerWeight : 0;
  const slotsByPart = Object.fromEntries(parts.map((part) => [part, resolvedSlots(state.armor[part], getEnhanceLevel("armor", part))]));
  const totalSlots = parts.reduce((sum, part) => sum + (slotsByPart[part] || 0), 0);
  const usageByTable = chipUsageByTable();
  const usedSlots = Object.values(usageByTable).reduce((sum, value) => sum + value, 0);
  const overParts = Object.entries(chipTableParts)
    .filter(([table, part]) => (usageByTable[table] || 0) > (slotsByPart[part] || 0))
    .map(([, part]) => part);
  const effects = chipEffects();
  const totalWeight = armorWeight + weaponWeight + requestWeight + satelliteWeight;
  const payloadLimit = firstNumber(resolvedValue(state.armor.脚, "重量耐性", getEnhanceLevel("armor", "脚"))) + effects.tolerance;
  const payloadMargin = payloadLimit - totalWeight;
  const overweight = Math.max(0, -payloadMargin) * Math.max(0, 1 - effects.overweightReduction / 100);
  const averageArmor = armorItems.length
    ? armorItems.reduce((sum, item) => sum + armorPercent(item, getEnhanceLevel("armor", item.part)) + (effects.armorByPart?.[item.part] || 0), 0) / armorItems.length
    : 0;

  setMetric("payloadCapacity", `${payloadMargin.toLocaleString()} (${totalWeight.toLocaleString()} / ${payloadLimit.toLocaleString()})`, payloadMargin < 0 ? -1 : effects.tolerance);
  setMetric("armorSummary", `${averageArmor >= 0 ? "+" : ""}${averageArmor.toFixed(1)}%`, averageArmor);
  setMetric("boosterSummary", statText(state.armor.胴, "ブースター", getEnhanceLevel("armor", "胴"), effects.booster), effects.booster);
  setMetric("spSupplySummary", statText(state.armor.胴, "SP供給", getEnhanceLevel("armor", "胴"), effects.spSupply, "%"), signedPercentMetric(state.armor.胴, "SP供給", getEnhanceLevel("armor", "胴"), effects.spSupply));
  setMetric("defDurabilitySummary", statText(state.armor.胴, "DEF耐久", getEnhanceLevel("armor", "胴"), effects.defDurability), effects.defDurability);
  setMetric("walkSummary", adjustedSpeedText(state.armor.脚, "歩行", getEnhanceLevel("armor", "脚"), overweight, 3.5, effects.walk), adjustedSpeedDelta(state.armor.脚, "歩行", getEnhanceLevel("armor", "脚"), overweight, 3.5, effects.walk));
  setMetric("dashSummary", adjustedSpeedText(state.armor.脚, "ダッシュ", getEnhanceLevel("armor", "脚"), overweight, 10.0, effects.dash), adjustedSpeedDelta(state.armor.脚, "ダッシュ", getEnhanceLevel("armor", "脚"), overweight, 10.0, effects.dash));
  setMetric("dashCountSummary", dashCountText(state.armor.胴, getEnhanceLevel("armor", "胴"), effects.booster, effects.dashCostReduction), effects.booster + effects.dashCostReduction);
  setMetric("dashCostSummary", dashCostText(effects.dashCostReduction), effects.dashCostReduction);
  setMetric("cruiseSummary", adjustedSpeedText(state.armor.脚, "巡航", getEnhanceLevel("armor", "脚"), overweight, 9.0, effects.cruise), adjustedSpeedDelta(state.armor.脚, "巡航", getEnhanceLevel("armor", "脚"), overweight, 9.0, effects.cruise));
  setMetric("shotSummary", statText(state.armor.頭, "射撃補正", getEnhanceLevel("armor", "頭"), effects.shot, "%"), signedPercentMetric(state.armor.頭, "射撃補正", getEnhanceLevel("armor", "頭"), effects.shot));
  setMetric("searchSummary", statText(state.armor.頭, "索敵", getEnhanceLevel("armor", "頭"), effects.search, "m"), effects.search);
  setMetric("lockonSummary", statText(state.armor.頭, "ロックオン", getEnhanceLevel("armor", "頭"), effects.lockon, "m"), effects.lockon);
  setMetric("defRecoverySummary", statText(state.armor.頭, "DEF回復", getEnhanceLevel("armor", "頭"), effects.defRecovery, "%"), signedPercentMetric(state.armor.頭, "DEF回復", getEnhanceLevel("armor", "頭"), effects.defRecovery));
  setMetric("recoilSummary", statText(state.armor.腕, "反動吸収", getEnhanceLevel("armor", "腕"), effects.recoil, "%"), signedPercentMetric(state.armor.腕, "反動吸収", getEnhanceLevel("armor", "腕"), effects.recoil));
  setMetric("reloadSummary", statText(state.armor.腕, "リロード", getEnhanceLevel("armor", "腕"), effects.reload, "%"), signedPercentMetric(state.armor.腕, "リロード", getEnhanceLevel("armor", "腕"), effects.reload));
  setMetric("switchSummary", statText(state.armor.腕, "武器変更", getEnhanceLevel("armor", "腕"), effects.weaponSwitch, "%"), signedPercentMetric(state.armor.腕, "武器変更", getEnhanceLevel("armor", "腕"), effects.weaponSwitch));
  setMetric("ammoSummary", statText(state.armor.腕, "予備弾数", getEnhanceLevel("armor", "腕"), effects.ammo, "%"), signedPercentMetric(state.armor.腕, "予備弾数", getEnhanceLevel("armor", "腕"), effects.ammo));
  setMetric("areaMoveSummary", statText(state.armor.胴, "エリア移動", getEnhanceLevel("armor", "胴"), effects.areaMove, "秒"), -effects.areaMove);
}

function renderAdditionalConditions() {
  const includeInput = byId("includeRequestWeight");
  if (includeInput) {
    includeInput.checked = state.includeRequestWeight;
    includeInput.disabled = state.includeSatelliteBunkerWeight;
    includeInput.closest(".extra-condition-row")?.classList.toggle("disabled", state.includeSatelliteBunkerWeight);
  }

  const includeBunkerInput = byId("includeSatelliteBunkerWeight");
  if (includeBunkerInput) {
    includeBunkerInput.checked = state.includeSatelliteBunkerWeight;
    includeBunkerInput.disabled = state.includeRequestWeight;
    includeBunkerInput.closest(".extra-condition-row")?.classList.toggle("disabled", state.includeRequestWeight);
  }

  const requestWeightValue = byId("requestWeightValue");
  if (requestWeightValue) {
    const requestWeapon = selectedRequestWeaponItem();
    requestWeightValue.textContent = requestWeapon ? resolvedWeight(requestWeapon, 0).toLocaleString() : "0";
  }

  const bunkerWeightValue = byId("satelliteBunkerWeightValue");
  if (bunkerWeightValue) bunkerWeightValue.textContent = satelliteBunkerWeight.toLocaleString();
}

function focusedLevel(item) {
  if (!item) return 0;
  if (item.group === "armor") return getEnhanceLevel("armor", item.part);
  if (item.group === "weapons") return getEnhanceLevel("weapon", item.slot);
  return 0;
}

function weaponDetailSourceRows(item) {
  if (!item || item.group !== "weapons") return [item].filter(Boolean);
  const name = compactName(item.名称);
  return (data.datasets.weapons || []).filter((candidate) => {
    return candidate.class === item.class &&
      candidate.slot === item.slot &&
      compactName(candidate.名称) === name;
  });
}

function renderDetailTypeRows(panel, item, level) {
  const modes = weaponTypeFieldModes(item);
  if (!modes.length) return;

  const mode = modes[weaponModeIndex(item.slot)] || modes[0];
  const seen = new Set();
  const effects = chipEffects();
  const weaponEffects = weaponChipEffects();

  for (const source of weaponDetailSourceRows(item)) {
    for (const [key, rawValue] of Object.entries(source)) {
      if (!key.startsWith(mode) || rawValue === null || rawValue === "") continue;
      const label = typeStatLabel(key);
      const value = quickStatValue(source, key, level, effects, weaponEffects, item.slot);
      if (!value || value === "-" || seen.has(label)) continue;
      seen.add(label);

      const row = document.createElement("div");
      row.className = "detail-row";
      row.innerHTML = `<b>${label}</b><span>${value}</span>`;
      panel.appendChild(row);
    }
  }
}

function renderDetail() {
  const panel = byId("detailPanel");
  const item = state.focused;
  const level = focusedLevel(item);
  panel.innerHTML = "";

  if (!item) {
    panel.textContent = "選択項目なし";
    return;
  }

  const modeToggle = renderDetailWeaponModeToggle(item);
  if (modeToggle) panel.appendChild(modeToggle);

  const hasTypeFields = item?.group === "weapons" && weaponTypeFieldModes(item).length > 0;
  const skip = new Set(["source_page", "source_file", "table", "group", "class", "slot", "レアリティ表示"]);
  if (hasTypeFields) skip.add("タイプ");
  const entries = Object.entries(item).filter(([key, value]) => !skip.has(key) && value !== null && value !== "");
  let renderedTypeRows = false;
  for (const [key, value] of entries) {
    if (hasTypeFields && key.startsWith("Type")) continue;
    if (hasTypeFields && !renderedTypeRows && ["性能強化", "レアリティ"].includes(key)) {
      renderDetailTypeRows(panel, item, level);
      renderedTypeRows = true;
    }
    const display = key === "レアリティ"
      ? rarityDisplay(item)
      : detailDisplayValue(item, key, value, level);
    if (display === null || display === undefined || display === "" || display === "-") continue;
    const row = document.createElement("div");
    row.className = "detail-row";
    row.innerHTML = `<b>${statDisplayLabel(key)}</b><span>${display}</span>`;
    panel.appendChild(row);
  }

  if (hasTypeFields && !renderedTypeRows) renderDetailTypeRows(panel, item, level);
}

function detailDisplayValue(item, key, value, level) {
  if (item?.group === "request_weapons") {
    return quickStatValue(item, key, level, chipEffects(), weaponChipEffects(), item.slot);
  }

  if (statKeys.includes(key)) {
    const resolved = resolvedValue(item, key, level);
    return isCombatItem(item) ? quickStatValue(item, key, level, chipEffects(), weaponChipEffects(), item.slot) : resolved;
  }

  if (isActionChip(item) && /威力|ダメージ/.test(key)) {
    return adjustedActionPowerText(value, weaponChipEffects().meleePower || 0);
  }

  return value;
}

function isActionChip(item) {
  if (!item || !String(item.table || "").includes("チップ")) return false;
  return !item.最大装着 && !firstNumber(item.最大装着) && /攻撃|蹴り|体当たり|衝撃波|スライディング|タックル|インパクト|キック|バースト/.test(`${item.名称 || ""} ${item.効果 || ""}`);
}

function adjustedActionPowerText(value, percent = 0) {
  if (!percent || value === "-") return value;
  const text = String(value || "");
  const match = text.match(/^(\s*-?\d+(?:\.\d+)?(?:\(-?\d+(?:\.\d+)?\))?)/);
  if (!match) return value;
  const adjusted = match[1].replace(/-?\d+(?:\.\d+)?/g, (number) => trimNumber(Number(number) * (1 + percent / 100), 2));
  return `${adjusted}${text.slice(match[1].length)}`;
}

function applyTheme() {
  document.documentElement.dataset.theme = state.theme;
  byId("themeButton").textContent = state.theme === "dark" ? "☀" : "◐";
  localStorage.setItem("bb-theme", state.theme);
}

function render() {
  applyTheme();
  renderSummaryLine();
  renderLoadout();
  renderPicker();
  renderChipControls();
  renderChips();
  renderSelectedChips();
  renderAdditionalConditions();
  renderTotals();
  renderDetail();
}

function copyBuild() {
  const lines = [];
  for (const part of parts) lines.push(`${part}: ${labelOf(state.armor[part])}`);
  lines.push(`兵装: ${state.weaponClass}`);
  for (const slot of weaponSlots) lines.push(`${slot}: ${labelOf(selectedWeaponBase(slot))}`);
  lines.push(`要請兵器: ${labelOf(state.requestWeapon)}${state.includeRequestWeight ? "" : "（積載除外）"}`);
  lines.push(`サテライトバンカー: ${state.includeSatelliteBunkerWeight ? "装備" : "なし"}`);
  const chips = selectedChipItems().map((chip) => `${chip.名称}x${chip.count}`).join(", ");
  lines.push(`チップ: ${chips || "なし"}`);
  lines.push(`積載猶予: ${byId("payloadCapacity").textContent}`);
  navigator.clipboard?.writeText(lines.join("\n"));
  byId("dataSummary").textContent = "現在のアセンをコピーしました";
  setTimeout(renderSummaryLine, 1400);
}

document.querySelectorAll("[data-class]").forEach((button) => {
  button.addEventListener("click", () => {
    document.querySelectorAll("[data-class]").forEach((item) => item.classList.remove("active"));
    button.classList.add("active");
    state.weaponClass = button.dataset.class;
    for (const slot of weaponSlots) {
      if (!selectedWeaponBase(slot)) setSelectedWeaponBase(slot, getWeaponOptions(slot)[0] || null);
    }
    state.focused = activeWeaponItem("主武器") || null;
    render();
  });
});

document.querySelectorAll("[data-chip-table]:not(:disabled)").forEach((button) => {
  button.addEventListener("click", () => {
    document.querySelectorAll("[data-chip-table]").forEach((item) => item.classList.remove("active"));
    button.classList.add("active");
    state.chipTable = button.dataset.chipTable;
    render();
  });
});

document.querySelectorAll("[data-stat-chip-table]").forEach((button) => {
  button.addEventListener("click", () => {
    document.querySelectorAll("[data-stat-chip-table]").forEach((item) => item.classList.remove("active"));
    button.classList.add("active");
    state.statChipTable = button.dataset.statChipTable;
    render();
  });
});

byId("themeButton").addEventListener("click", () => {
  state.theme = state.theme === "dark" ? "light" : "dark";
  render();
});
byId("resetButton").addEventListener("click", () => {
  state.chips = {};
  state.enhance = {};
  state.weaponModes = {};
  state.requestWeapon = null;
  state.includeRequestWeight = false;
  state.includeSatelliteBunkerWeight = false;
  state.weaponClass = "強襲";
  document.querySelectorAll("[data-class]").forEach((button) => button.classList.toggle("active", button.dataset.class === "強襲"));
  state.armorWeightFilter = "all";
  state.chipTable = "脚部チップ";
  state.statChipTable = "頭部チップ";
  document.querySelectorAll("[data-chip-table]").forEach((button) => button.classList.toggle("active", button.dataset.chipTable === "脚部チップ"));
  document.querySelectorAll("[data-stat-chip-table]").forEach((button) => button.classList.toggle("active", button.dataset.statChipTable === "頭部チップ"));
  setDefaults();
  render();
});
byId("copyButton").addEventListener("click", copyBuild);
byId("mobileStatsToggle")?.addEventListener("click", () => {
  const metrics = document.querySelector(".metrics");
  const shown = metrics?.classList.toggle("show-secondary");
  byId("mobileStatsToggle").textContent = shown ? "詳細ステータスを閉じる" : "詳細ステータス";
});
document.querySelectorAll("[data-chip-accordion]").forEach((panel) => {
  const toggle = panel.querySelector(".accordion-toggle");
  toggle?.addEventListener("click", () => {
    const collapsed = panel.classList.toggle("collapsed");
    toggle.textContent = collapsed ? "開く" : "閉じる";
    toggle.setAttribute("aria-expanded", String(!collapsed));
  });
});
byId("includeRequestWeight")?.addEventListener("change", (event) => {
  state.includeRequestWeight = event.target.checked;
  if (state.includeRequestWeight) state.includeSatelliteBunkerWeight = false;
  renderAdditionalConditions();
  renderTotals();
});
byId("includeSatelliteBunkerWeight")?.addEventListener("change", (event) => {
  state.includeSatelliteBunkerWeight = event.target.checked;
  if (state.includeSatelliteBunkerWeight) state.includeRequestWeight = false;
  renderAdditionalConditions();
  renderTotals();
});
byId("itemPickerClose").addEventListener("click", closeItemPicker);
byId("itemPicker").addEventListener("click", (event) => {
  if (event.target.closest("[data-picker-close]")) closeItemPicker();
});
byId("itemPickerSearch").addEventListener("input", (event) => {
  state.picker.query = event.target.value;
  renderPicker();
});
document.addEventListener("keydown", (event) => {
  if (event.key === "Escape" && state.picker.open) closeItemPicker();
});

setDefaults();
render();
