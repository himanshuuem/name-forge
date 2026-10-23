export const FORGES = {
  band: {
    label: "Band",
    emoji: "🎸",
    tagline: "For your garage band, your DJ alias or your shower-concert persona.",
    patterns: ["The {adj} {noun:plural}", "{adj} {noun}", "{noun} of {place}", "{adj} {place}"],
    adj: ["Velvet", "Neon", "Midnight", "Paper", "Electric", "Hollow", "Golden", "Monsoon", "Static", "Lunar", "Wild", "Silent", "Copper", "Feral", "Analog"],
    noun: ["Tiger", "Echo", "Lantern", "Riot", "Ghost", "Satellite", "Mango", "Cassette", "Wolf", "Comet", "Pilot", "Rickshaw", "Prophet", "Monarch"],
    place: ["Bandra", "Saturn", "the Deep", "Old Delhi", "Nowhere", "the Suburbs", "Room 404", "the Ganges", "Neptune"],
  },
  startup: {
    label: "Startup",
    emoji: "🚀",
    tagline: "Names that sound like they've already raised a seed round.",
    patterns: ["{prefix}{suffix}", "{noun}{suffix}", "{prefix}{noun}", "{noun}ly"],
    prefix: ["Zen", "Kai", "Nova", "Flux", "Byte", "Quill", "Loop", "Arc", "Pulse", "Grid", "Bloom", "Orbit"],
    suffix: ["ify", "io", "ly", "hub", "base", "stack", "labs", "flow", "kit", "able", "verse"],
    noun: ["Chai", "Ledger", "Pixel", "Harbor", "Atlas", "Signal", "Spark", "Cargo", "Mint", "Thread", "Beacon"],
  },
  tavern: {
    label: "Tavern",
    emoji: "🍺",
    tagline: "A cosy inn for your next tabletop campaign.",
    patterns: ["The {adj} {creature}", "The {creature} & {object}", "{adj} {object} Inn", "The {creature}'s {object}"],
    adj: ["Prancing", "Drunken", "Gilded", "Sleeping", "Crooked", "Rusty", "Wandering", "Laughing", "Silver", "One-Eyed"],
    creature: ["Griffin", "Goblin", "Dragon", "Badger", "Mermaid", "Ogre", "Owl", "Stag", "Wyvern", "Mongoose"],
    object: ["Tankard", "Lantern", "Anvil", "Cauldron", "Crown", "Dagger", "Kettle", "Harp", "Spoon"],
  },
};

export const FORGE_KEYS = Object.keys(FORGES);
