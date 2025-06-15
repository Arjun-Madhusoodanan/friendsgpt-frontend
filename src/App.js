import React, { useState } from "react";
import FriendsCouch from "./components/FriendsCouch";
import ChatBubble from "./components/ChatBubble";
import { sendTopic } from "./api";
import "./App.css";

const avatarData = [
  { name: "Chandler", src: require("./assets/avatars/chan.png") },
  { name: "Joey", src: require("./assets/avatars/joey.png") },
  { name: "Monica", src: require("./assets/avatars/mon.png") },
  { name: "Phoebe", src: require("./assets/avatars/pheebs.png") },
  { name: "Rachel", src: require("./assets/avatars/rach.png") },
  { name: "Ross", src: require("./assets/avatars/ross.png") }
];

function App() {
  const [topic, setTopic] = useState("");
  const [response, setResponse] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleGenerate = async () => {
    if (!topic.trim()) return;
    setIsLoading(true);
    setResponse("");

    try {
      console.log("Sending topic:", topic);
      const reply = await sendTopic(topic);
      setResponse(reply || []);
    } catch (err) {
      console.error("Fetch error:", err);
      setResponse("Something went wrong.");
    } finally {
      setIsLoading(false);
    }
  };

  const chatLines = Array.isArray(response)
   ? response.map((line, idx) => ({
         speaker: line.speaker,
         message: line.message,
         position: idx % 6
       }))
     : [];

  return (
    <div className="App">
      <h1>☕ FriendsGPT</h1>
      <p className="subtitle">You're at Central Perk, chatting with the Friends!</p>

      {/* Input */}
      <div className="chat-input">
          <input
            type="text"
            value={topic}
            onChange={(e) => setTopic(e.target.value)}
            placeholder="Ask the gang something..."
          />
          <button onClick={handleGenerate} disabled={isLoading}>
            {isLoading ? "Thinking..." : "Ask the Gang"}
          </button>
        </div>
      {/* <div style={{ position: "relative", maxWidth: "900px", margin: "30px auto" }}> */}
      {/* <div className="chat-scene">
        <FriendsCouch avatars={avatarData} />
        {chatLines.map(({ speaker, message, position }, idx) => {
            console.log("Rendering chat line:", { speaker });
          const avatarObj = avatarData.find(
            (a) => a.name.toLowerCase().startsWith(speaker.toLowerCase().split(" ")[0])
          );
          return (
            <ChatBubble
              key={idx}
              speaker={speaker}
              message={message}
              avatar={avatarObj?.src || "/fallback.png"}
              position={position}
            />
          );
        })}
      </div> */}
      <div className="main-layout">
  {/* LEFT SIDE: Couch and avatars */}
  <div className="couch-area">
    <FriendsCouch avatars={avatarData} />
  </div>

  {/* RIGHT SIDE: Chat responses */}
  <div className="chat-area">
    <div className="chat-header">🗨️ Friends Group Chat</div>
    <div className="chat-scroll">
      {chatLines.map(({ speaker, message, position }, idx) => {
        const avatarObj = avatarData.find((a) =>
          a.name.toLowerCase().startsWith(speaker.toLowerCase().split(" ")[0])
        );
        const avatarSrc = avatarObj
          ? avatarObj.src
          : `https://ui-avatars.com/api/?name=${encodeURIComponent(speaker)}`;

        return (
          <ChatBubble
            key={idx}
            speaker={speaker}
            message={message}
            avatar={avatarSrc}
            position={position}
          />
        );
      })}
    </div>
  </div>
</div>

    </div>
  );
}

export default App;
