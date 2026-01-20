console.log("LOADED questions.js :: VERSION mlSplit-FINAL-003-demsoc-circleback-001");

// questions.js
// Branching questions for Iranvalues
// Conventions:
// - effect: keys are axis-keys (must match axes.js leftKey/rightKey values EXACTLY)
// - showIf: (state) => boolean, used for branching/gating
// - meta: used only for eligibility/branch logic (not shown to users)
//
// In this version:
// - Marx eligibility split remains (marxCore vs marxRupture)
// - Adds Democratic Socialism filter questions (for Marx-eligible + not authMarx)
// - Adds circle-backs:
//   * DemSoc track -> can bounce into authMarx (pro-repression question)
//   * AuthMarx/Lenin track -> can bounce out into DemSoc (democratic guarantees question)
//
// IMPORTANT: use `var` so it becomes a true global (window.questions) in the browser.
var questions = [
  // --------------------------
  // LAYER 1: Marxism eligibility (economy + materialism)
  // marxCore = core Marx-ish claims (can still be reformist Marx)
  // marxRupture = rupture/anti-reform emphasis (split later; not a gate)
  // --------------------------
  {
    id: "mx_01",
    layer: "marx_eligibility",
    question: "Major industries and infrastructure should not be privately owned.",
    effect: { econ_democracy: 10, techno_feudal: -10 },
    meta: { marxGate: true, marxCore: true }
  },
  {
    id: "mx_02",
    layer: "marx_eligibility",
    question: "The interests of capital owners and workers are fundamentally opposed.",
    effect: { econ_democracy: 10, techno_feudal: -10 },
    meta: { marxGate: true, marxCore: true }
  },
  {
    id: "mx_03",
    layer: "marx_eligibility",
    question: "Redistribution within capitalism cannot eliminate exploitation.",
    effect: { econ_democracy: 10, techno_feudal: -10 },
    meta: { marxGate: true, marxCore: true }
  },
  {
    id: "mx_04",
    layer: "marx_eligibility",
    question: "Wage labor under capitalism is inherently exploitative.",
    effect: { econ_democracy: 10, techno_feudal: -10 },
    meta: { marxGate: true, marxCore: true }
  },
  {
    id: "mx_05",
    layer: "marx_eligibility",
    question: "Economic systems shape social relations more than individual intentions or moral choices.",
    effect: { econ_democracy: 6, techno_feudal: -6 },
    meta: { marxGate: true, marxCore: true }
  },

  // NOTE: mx_06 / mx_08 / mx_09 are NOT marxCore anymore.
  // They are marxRupture splitters (revolutionary-rupture tilt vs reformist tilt).
  {
    id: "mx_06",
    layer: "marx_eligibility",
    question:
      "Major social change usually arises from internal contradictions within a system, not from gradual improvements or reforms.",
    effect: { econ_democracy: 6, techno_feudal: -6 },
    meta: { marxGate: true, marxRupture: true }
  },

  {
    id: "mx_07",
    layer: "marx_eligibility",
    question:
      "What is considered “normal” or “common sense” in an economy largely reflects the interests of dominant social groups.",
    effect: { econ_democracy: 6, techno_feudal: -6 },
    meta: { marxGate: true, marxCore: true }
  },

  {
    id: "mx_08",
    layer: "marx_eligibility",
    question:
      "Reforms (e.g., Georgism) within capitalism often stabilize the system rather than undermine it.",
    effect: { econ_democracy: 6, techno_feudal: -6 },
    meta: { marxGate: true, marxRupture: true }
  },
  {
    id: "mx_09",
    layer: "marx_eligibility",
    question:
      "A society’s economic system changes primarily through material conditions and social conflict, not through the spread of better ideas or moral persuasion.",
    effect: { econ_democracy: 6, techno_feudal: -6 },
    meta: { marxGate: true, marxRupture: true }
  },

  // --------------------------
  // LAYER 1b: Auth/Dem Marxism tilt (only meaningful after marx eligibility)
  // --------------------------
  {
    id: "mx_tilt_pluralism",
    layer: "marx_tilt",
    showIf: (state) => state.flags && state.flags.marxEligible === true,
    question: "Political pluralism can obstruct the transformation of economic power relations.",
    effect: { authoritarian: 10, democratic: -10 },
    meta: { authTilt: true }
  },

  // --------------------------
  // LAYER 2b: Democratic Socialism filter
  // Only show if: Marx-eligible AND NOT authMarx
  // --------------------------
  {
    id: "ds_01",
    layer: "demsoc_filter",
    showIf: (state) =>
      state.flags && state.flags.marxEligible === true && state.flags.authMarx !== true,
    question:
      "A socialist society must guarantee free elections, independent unions, and a free press, even during periods of crisis.",
    effect: { democratic: 10, authoritarian: -10 },
    meta: { demSocGate: true }
  },
  {
    id: "ds_02",
    layer: "demsoc_filter",
    showIf: (state) =>
      state.flags && state.flags.marxEligible === true && state.flags.authMarx !== true,
    question:
      "Social ownership should be accountable to workers and citizens, not concentrated in a single party or state apparatus.",
    effect: { democratic: 6, authoritarian: -6, econ_democracy: 4 },
    meta: { demSocGate: true }
  },
  {
    id: "ds_03",
    layer: "demsoc_filter",
    showIf: (state) =>
      state.flags && state.flags.marxEligible === true && state.flags.authMarx !== true,
    question:
      "No political movement should justify authoritarian rule by claiming it represents the historical interests of the working class.",
    effect: { democratic: 8, authoritarian: -8 },
    meta: { demSocGate: true }
  },
  {
    id: "ds_04",
    layer: "demsoc_filter",
    showIf: (state) =>
      state.flags && state.flags.marxEligible === true && state.flags.authMarx !== true,
    question:
      "In Iran, socialism must remain independent of clerical authority, military power, and foreign patronage.",
    effect: { democratic: 4, authoritarian: -4 },
    meta: { demSocGate: true, thirdForce: true }
  },
  {
    id: "ds_05",
    layer: "demsoc_filter",
    showIf: (state) =>
      state.flags && state.flags.marxEligible === true && state.flags.authMarx !== true,
    question:
      "Reforms achieved through democratic struggle are meaningful even if they do not immediately abolish capitalism.",
    effect: { democratic: 4, econ_democracy: 4 },
    meta: { demSocGate: true, reformLegit: true }
  },
  {
    id: "ds_confirm",
    layer: "demsoc_confirm",
    showIf: (state) =>
      state.flags && state.flags.marxEligible === true && state.flags.authMarx !== true,
    question:
      "If forced to choose, preserving democratic freedoms is more important than rapidly imposing socialism from above.",
    effect: { democratic: 8, authoritarian: -8 },
    meta: { demSocConfirm: true }
  },

  // --------------------------
  // CIRCLE-BACK A: DemSoc/Pluralist track -> bounce to Auth-Marx
  // (Your engine should set authMarx=true if this is agreed-ish.)
  // --------------------------
  {
    id: "cb_auth_from_demsoc_01",
    layer: "circleback_auth",
    showIf: (state) =>
      state.flags && state.flags.marxEligible === true && state.flags.authMarx !== true,
    question:
      "In a revolutionary period, restricting opposition parties and censoring hostile media is justified to protect socialism.",
    effect: { authoritarian: 8, democratic: -8 },
    meta: { authCircleBack: true }
  },

  // --------------------------
  // LAYER 2: Authoritarian Marxism -> Leninist-eligible filter
  // Only show if: Marx-eligible AND authMarx is TRUE
  // --------------------------
  {
    id: "len_01",
    layer: "leninist_filter",
    showIf: (state) =>
      state.flags && state.flags.marxEligible === true && state.flags.authMarx === true,
    question:
      "Without a centralized revolutionary party, the working class cannot successfully overthrow capitalism.",
    effect: { authoritarian: 6, democratic: -6 },
    meta: { leninGate: true }
  },
  {
    id: "len_02",
    layer: "leninist_filter",
    showIf: (state) =>
      state.flags && state.flags.marxEligible === true && state.flags.authMarx === true,
    question:
      "Revolutionary movements must sometimes suppress dissent within their own ranks to survive.",
    effect: { authoritarian: 6, democratic: -6 },
    meta: { leninGate: true }
  },

  // --------------------------
  // CIRCLE-BACK B: Auth-Marx/Lenin track -> bounce to DemSoc
  // (Your engine should set authMarx=false and leninistEligible=false if this is agreed-ish.)
  // --------------------------
  {
    id: "cb_demsoc_from_len_01",
    layer: "circleback_demsoc",
    showIf: (state) =>
      state.flags && state.flags.marxEligible === true && state.flags.authMarx === true,
    question:
      "Even during a socialist transition, multiple parties, an independent judiciary, and a free press must be protected.",
    effect: { democratic: 10, authoritarian: -10 },
    meta: { demSocCircleBack: true }
  },

  {
    id: "len_03",
    layer: "leninist_filter",
    showIf: (state) =>
      state.flags && state.flags.marxEligible === true && state.flags.authMarx === true,
    question:
      "Permanent organized opposition within a revolutionary movement weakens its ability to govern.",
    effect: { authoritarian: 6, democratic: -6 },
    meta: { leninGate: true }
  },
  {
    id: "len_04",
    layer: "leninist_filter",
    showIf: (state) =>
      state.flags && state.flags.marxEligible === true && state.flags.authMarx === true,
    question:
      "You can build a socialist society in one country and do not need a global and/or permanent revolution.",
    effect: { authoritarian: 2, democratic: -2 },
    meta: { leninGate: true, antiPermanent: true }
  },

  // --------------------------
  // LAYER 3: Leninist -> MLM gate (historical specificity)
  // Only show if: Leninist-eligible is TRUE
  // --------------------------
  {
    id: "mlm_01",
    layer: "mlm_gate",
    showIf: (state) => state.flags && state.flags.leninistEligible === true,
    question:
      "After Stalin, the Soviet Union abandoned key revolutionary principles while retaining socialist rhetoric.",
    effect: { authoritarian: 2, democratic: -2 },
    meta: { mlmGate: true }
  },
  {
    id: "mlm_02",
    layer: "mlm_gate",
    showIf: (state) => state.flags && state.flags.leninistEligible === true,
    question:
      "The doctrine of “peaceful coexistence” with capitalist powers undermined global socialist struggle.",
    effect: { authoritarian: 2, democratic: -2 },
    meta: { mlmGate: true }
  },
  {
    id: "mlm_03",
    layer: "mlm_gate",
    showIf: (state) => state.flags && state.flags.leninistEligible === true,
    question:
      "In the Sino–Soviet split, the Chinese Communist Party was largely correct in its critique of Soviet revisionism.",
    effect: { authoritarian: 2, democratic: -2 },
    meta: { mlmGate: true }
  },

  // --------------------------
  // SPLIT: ML (Stalinism) vs MLM
  // --------------------------
  {
    id: "ml_split",
    layer: "ml_stalin_split",
    showIf: (state) => state.flags && state.flags.leninistEligible === true,
    question:
      "The strategy of postponing socialism in favor of a broad anti-imperialist alliance has historically failed in Iran.",
    effect: { authoritarian: 1, democratic: -1 },
    meta: { mlStalinSplit: true }
  }
];

// Debug: confirm the split tag is present
console.log(
  "questions.js loaded. mlStalinSplit tagged count:",
  questions.filter((q) => q && q.meta && q.meta.mlStalinSplit).length
);

// Debug: confirm marxCore vs marxRupture tagging
console.log(
  "questions.js loaded. marxCore count:",
  questions.filter((q) => q && q.meta && q.meta.marxCore).length,
  "| marxRupture count:",
  questions.filter((q) => q && q.meta && q.meta.marxRupture).length
);

// Debug: confirm DemSoc and circleback tags
console.log(
  "questions.js loaded. demSocGate count:",
  questions.filter((q) => q && q.meta && q.meta.demSocGate).length,
  "| demSocConfirm count:",
  questions.filter((q) => q && q.meta && q.meta.demSocConfirm).length,
  "| authCircleBack count:",
  questions.filter((q) => q && q.meta && q.meta.authCircleBack).length,
  "| demSocCircleBack count:",
  questions.filter((q) => q && q.meta && q.meta.demSocCircleBack).length
);
