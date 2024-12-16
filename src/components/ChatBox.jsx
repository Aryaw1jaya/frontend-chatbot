/* eslint-disable react/prop-types */

const ChatBox = ({ messages, isTyping }) => {
  return (
    <div
      className="chat-box border rounded p-3 mb-3 shadow-sm bg-dark text-light rounded-4"
      style={{ height: '80%', overflowY: 'scroll', backgroundColor:"white" }}
    >
      {messages.map((msg, idx) => (
        <div key={idx} className={msg.role === 'user' ? 'text-end' : 'text-start'}>
          <p>
            <strong>{msg.role}:</strong> {msg.content}
          </p>
        </div>
      ))}
      {isTyping && (
        <div className="text-start">
          <p>
            is Thinking...
          </p>
        </div>
      )}
    </div>
  );
};

export default ChatBox;
