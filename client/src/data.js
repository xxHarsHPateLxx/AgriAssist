export const sampleChats = [
  {
    id: 1,
    summary: "Tomato disease identification",
    date: "2024-06-20",
    messages: [
      {
        type: "user",
        text: "My tomato plants have yellow spots on leaves",
        time: "10:30 AM",
      },
      {
        type: "bot",
        text: "This could be early blight. Can you describe the spots more? Are they circular with dark rings?",
        time: "10:31 AM",
      },
    ],
  },
  {
    id: 2,
    summary: "Wheat fertilizer recommendations",
    date: "2024-06-18",
    messages: [
      {
        type: "user",
        text: "Best fertilizer for wheat in sandy soil?",
        time: "2:15 PM",
      },
      {
        type: "bot",
        text: "For sandy soil, I recommend NPK 20-10-10 with added organic matter. Apply 150kg per hectare during sowing.",
        time: "2:16 PM",
      },
    ],
  },
];

export const samplePredictions = [
  {
    id: 1,
    crop: "Wheat",
    soil: "Loamy",
    yield: "4.2 tons/ha",
    date: "2024-06-22",
    confidence: "94%",
  },
  {
    id: 2,
    crop: "Rice",
    soil: "Clay",
    yield: "5.8 tons/ha",
    date: "2024-06-20",
    confidence: "89%",
  },
  {
    id: 3,
    crop: "Corn",
    soil: "Sandy",
    yield: "3.9 tons/ha",
    date: "2024-06-18",
    confidence: "91%",
  },
];