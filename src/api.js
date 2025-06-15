// src/api.js

const API_URL = "http://localhost:5000/chat"; // Make sure Flask is running on port 5000

export async function sendTopic(topic) {
  try {
    const response = await fetch(API_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ topic })
    });

    const data = await response.json();
    console.log("API response:", data);
    if (response.ok) {
      return data.reply;
    } else {
      throw new Error(data.error || "Something went wrong");
    }
  } catch (error) {
    console.error("API error:", error);
    throw error;
  }
}
