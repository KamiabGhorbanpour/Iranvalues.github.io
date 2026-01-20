console.log("LOADED questions.js :: VERSION mlSplit-FINAL-002-reformMarxCore");

// questions.js
// Branching questions for Iranvalues
// Conventions:
// - effect: keys are axis-keys (must match axes.js leftKey/rightKey values EXACTLY)
// - showIf: (state) => boolean, used for branching/gating
// - meta: used only for eligibility/branch logic (not shown to users)
//
// CHANGE in this version:
// - Marx eligibility is now split into:
//   * marxCore: "Marx-ish" commitments that can include reformist Marxism (Kautsky/Bernstein/Maleki etc.)
//   * marxRupture: anti-reform / rupture emphasis (used later as a splitter; NOT required for Marx eligibility)
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
    question: "Major social change usually arises from internal contradictions within a system, not from gradual improvements or reforms.",
    effect: { econ_democracy: 6, techno_feudal: -6 },
    meta: { marxGate: true, marxRupture: true }
  },

  {
    id: "mx_07",
    layer: "marx_eligibility",
    question: "What is considered “normal” or “common sense” in an economy largely reflects the interests of dominant social groups.",
    effect: { econ_democracy: 6, techno_feudal: -6 },
    meta: { marxGate: true, marxCore: true }
  },

  {
    id: "mx_08",
    layer: "marx_eligibility",
    question: "Reforms (e.g., Georgism) within capitalism often stabilize the system rather than undermine it.",
    effect: { econ_democracy: 6, techno_feudal: -6 },
    meta: { marxGate: true, marxRupture: true }
  },
  {
    id: "mx_09",
    layer: "marx_eligibility",
    question: "A society’s economic system changes primarily through material conditions and social conflict, not through the spread of better ideas or moral persuasion.",
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
  // LAYER 2: Authoritarian Marxism -> Leninist-eligible filter
  // Only show if: Marx-eligible AND auth-tilt is TRUE (i.e., agreed)
  // --------------------------
  {
    id: "len_01",
    layer: "leninist_filter",
    showIf: (state) =>
      state.flags && state.flags.marxEligible === true && state.flags.authMarx === true,
    question: "Without a centralized revolutionary party, the working class cannot successfully overthrow capitalism.",
    effect: { authoritarian: 6, democratic: -6 },
    meta: { leninGate: true }
  },
  {
    id: "len_02",
    layer: "leninist_filter",
    showIf: (state) =>
      state.flags && state.flags.marxEligible === true && state.flags.authMarx === true,
    question: "Revolutionary movements must sometimes suppress dissent within their own ranks to survive.",
    effect: { authoritarian: 6, democratic: -6 },
    meta: { leninGate: true }
  },
  {
    id: "len_03",
    layer: "leninist_filter",
    showIf: (state) =>
      state.flags && state.flags.marxEligible === true && state.flags.authMarx === true,
    question: "Permanent organized opposition within a revolutionary movement weakens its ability to govern.",
    effect: { authoritarian: 6, democratic: -6 },
    meta: { leninGate: true }
  },
  {
    id: "len_04",
    layer: "leninist_filter",
    showIf: (state) =>
      state.flags && state.flags.marxEligible === true && state.flags.authMarx === true,
    question: "You can build a socialist society in one country and do not need a global and/or permanent revolution.",
    effect: { authoritarian: 2, democratic: -2 },
    meta: { leninGate: true, antiPermanent: true }
  },

  // --------------------------
  // LAYER 3: Leninist -> MLM gate (historical specificity)
  // Only show if: Leninist-eligible is TRUE
  // MLM rule: allow up to 1 unsure/neutral across these MLM questions.
  // --------------------------
  {
    id: "mlm_01",
    layer: "mlm_gate",
    showIf: (state) => state.flags && state.flags.leninistEligible === true,
    question: "After Stalin, the Soviet Union abandoned key revolutionary principles while retaining socialist rhetoric.",
    effect: { authoritarian: 2, democratic: -2 },
    meta: { mlmGate: true }
  },
  {
    id: "mlm_02",
    layer: "mlm_gate",
    showIf: (state) => state.flags && state.flags.leninistEligible === true,
    question: "The doctrine of “peaceful coexistence” with capitalist powers undermined global socialist struggle.",
    effect: { authoritarian: 2, democratic: -2 },
    meta: { mlmGate: true }
  },
  {
    id: "mlm_03",
    layer: "mlm_gate",
    showIf: (state) => state.flags && state.flags.leninistEligible === true,
    question: "In the Sino–Soviet split, the Chinese Communist Party was largely correct in its critique of Soviet revisionism.",
    effect: { authoritarian: 2, democratic: -2 },
    meta: { mlmGate: true }
  },

  // --------------------------
  // SPLIT: ML (Stalinism) vs MLM
  // Rule in your engine:
  // - If user DISAGREES with this statement (mult <= -0.5), then mlStalinEligible = true
  // - If mlStalinEligible true, MLM is forced false
  // --------------------------
  {
    id: "ml_split",
    layer: "ml_stalin_split",
    showIf: (state) => state.flags && state.flags.leninistEligible === true,
    question:
      "The strategy of postponing socialism in favor of a broad anti-imperialist alliance has historically failed in Iran.",
    // keep a small effect or none; doesn't matter for branching.
    effect: { authoritarian: 1, democratic: -1 },
    meta: { mlStalinSplit: true }
  }
];

// Debug: confirm the split tag is present
console.log(
  "questions.js loaded. mlStalinSplit tagged count:",
  questions.filter((q) => q && q.meta && q.meta.mlStalinSplit).length
);

// Debug: confirm marxCore vs marxRupture tagging (helps you verify quickly)
console.log(
  "questions.js loaded. marxCore count:",
  questions.filter((q) => q && q.meta && q.meta.marxCore).length,
  "| marxRupture count:",
  questions.filter((q) => q && q.meta && q.meta.marxRupture).length
);
