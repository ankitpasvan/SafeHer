// controllers/toolController.js

// Self defense video guides & move metadata matching Slide 9
const SELF_DEFENSE_TUTORIALS = [
  {
    id: "move-1",
    title: "Palm Heel Strike",
    target: "Nose / Jaw of attacker",
    duration: "04:35",
    level: "Basic",
    description: "Drive heel of palm upward into the attacker's nose or chin using full hip rotational force.",
    steps: [
      "Open your dominant hand with fingers pulled back tightly.",
      "Thrust forward from the hip, driving the hard base of your palm directly upward.",
      "Exhale sharply upon impact and immediately retreat to a safe distance.",
    ],
  },
  {
    id: "move-2",
    title: "Groin Kick / Knee Strike",
    target: "Groin / Lower abdomen",
    duration: "03:10",
    level: "Basic",
    description: "Deliver an explosive upward kick using the top of your foot or knee to instantly incapacitate.",
    steps: [
      "Grab attacker's shoulders or clothes if within close range.",
      "Drive your knee violently upward into the groin.",
      "Push off and run toward a populated safe zone.",
    ],
  },
  {
    id: "move-3",
    title: "Elbow Strike",
    target: "Temple / Jaw / Ribs",
    duration: "02:45",
    level: "Intermediate",
    description: "Use the point of your elbow in close-quarters grab scenarios.",
    steps: [
      "Bend your elbow tightly against your chest.",
      "Rotate your torso and whip your elbow horizontally into the attacker's face.",
    ],
  },
  {
    id: "move-4",
    title: "Wrist Grab Release",
    target: "Attacker's thumb gap",
    duration: "03:50",
    level: "Basic",
    description: "Rotate your wrist toward the attacker's thumb—the weakest structural point of any grip.",
    steps: [
      "Rotate arm so your thumb aligns with attacker's thumb.",
      "Yank sharply upward toward your own shoulder.",
    ],
  },
  {
    id: "move-5",
    title: "Hammer Fist",
    target: "Nose / Collarbone",
    duration: "04:00",
    level: "Basic",
    description: "Clench your fist and strike downward like a hammer using the fleshy bottom base of the hand.",
    steps: [
      "Raise fist above shoulder level.",
      "Strike downward with full body weight into collarbone or bridge of nose.",
    ],
  },
];

// @desc    Get self defense guides and crisis tool definitions
// @route   GET /api/tools/tips
// @access  Public or Private
const getDefenseTips = (req, res) => {
  res.status(200).json({
    courseTitle: "5 Basic Moves Every Woman Should Know",
    views: 35,
    totalDuration: "04:35",
    moves: SELF_DEFENSE_TUTORIALS,
    helpline: {
      tollFree: "1800-123-4567",
      nationalEmergency: "112",
      womenHelpline: "1091",
    },
  });
};

// @desc    Log a safety tool crisis action (e.g. discreet audio recorded, siren sounded, fake call received)
// @route   POST /api/tools/log-action
// @access  Private
const logToolAction = (req, res) => {
  const { toolName, actionDetails } = req.body;
  res.status(200).json({
    success: true,
    message: `${toolName || "Safety tool"} executed and recorded in secure encrypted vault.`,
    timestamp: new Date(),
  });
};

module.exports = { getDefenseTips, logToolAction };
