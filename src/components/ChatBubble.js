import React from 'react';
import './ChatBubble.css';

// const ChatBubble = ({ speaker, message, avatar }) => {
//   return (
//     <div className="chat-row">
//       <img src={avatar} alt={speaker} className="avatar" />
//       <div className={`bubble ${speaker.toLowerCase().replace(/\s+/g, '-')}`}>
//         <strong>{speaker}:</strong> {message}
//       </div>
//     </div>
//   );
// };


const ChatBubble = ({ speaker, message, avatar, position }) => {
  const bubbleClass = `bubble ${speaker.toLowerCase().replace(/\s+/g, "-")} delay-${position}`;

  return (
    <div className="chat-row">
      <img src={avatar} alt={speaker} className="avatar" />
      <div className={bubbleClass}>
        <strong>{speaker.split(" ")[0]}:</strong> {message}
      </div>
    </div>
  );
};

export default ChatBubble;
