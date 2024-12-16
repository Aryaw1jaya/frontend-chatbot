import { useState } from "react";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import ChatBox from "./components/ChatBox";
import InputBox from "./components/InputBox";
import "./App.css";

function App() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);

  const sendMessage = async () => {
    if (!input.trim()) return;

    const newMessages = [...messages, { role: "user", content: input }];
    setMessages(newMessages);
    setInput("");
    setIsTyping(true);

    try {
      const response = await axios.post("https://bnpkgpvm-5000.asse.devtunnels.ms/chat", {
        messages: newMessages,
      });

      const assistantMessage = response.data.assistantMessage.content;
      simulateTypingEffect(assistantMessage);
    } catch (error) {
      console.error("Error sending message:", error);
      setMessages([
        ...newMessages,
        { role: "system", content: "Error contacting AI." },
      ]);
      setIsTyping(false);
    }
  };

  const simulateTypingEffect = (text) => {
    let index = 0;
    const typingSpeed = 0.8;
    let currentMessage = "";

    const interval = setInterval(() => {
      if (index < text.length) {
        currentMessage += text[index];
        setMessages((prevMessages) => {
          const updatedMessages = [...prevMessages];
          if (
            updatedMessages[updatedMessages.length - 1]?.role === "assistant"
          ) {
            updatedMessages[updatedMessages.length - 1].content =
              currentMessage;
          } else {
            updatedMessages.push({
              role: "assistant",
              content: currentMessage,
            });
          }
          return updatedMessages;
        });
        index++;
      } else {
        clearInterval(interval);
        setIsTyping(false);
      }
    }, typingSpeed);
  };

  return (
    <div className="container-fluid d-flex p-3 full-height" style={{ backgroundColor:'#000000' }}>
      <div className="container card w-25 me-2 text-light rounded-5" style={{ backgroundColor:'#202020' }}>
        <div className="card-body">
          <h5 className="card-title">Chat with AI</h5>
          <div className="input-group mb-3"></div>
        </div>
      </div>
      <div className="container card w-75 p-3 text-light rounded-5" style={{ backgroundColor:'#202020' }}>
        <h1>AI Chat Interface</h1>
        <ChatBox messages={messages} isTyping={isTyping} />
        <InputBox input={input} setInput={setInput} sendMessage={sendMessage} />
      </div>
    </div>
  );
}

export default App;
