// src/services/mockApi.js
export function getEssayFeedback(text) {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({
          grammar: "A few minor punctuation errors in paragraphs 2 and 4.",
          style: "Your tone is formal and consistent—good job!",
          argument: "Strong thesis, but evidence in section 3 needs more citations.",
          structure: "Well-structured intro/conclusion, consider adding subheadings.",
          score: 87
        });
      }, 1500); // simulate network/API delay
    });
  }