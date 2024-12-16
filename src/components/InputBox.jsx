/* eslint-disable react/prop-types */

import { useState } from 'react';
import { FaMicrophone, FaPaperPlane } from 'react-icons/fa'; // Import ikon dari react-icons

const InputBox = ({ input, setInput, sendMessage }) => {
  const [isListening, setIsListening] = useState(false);

  const startVoiceInput = () => {
    if (!window.SpeechRecognition && !window.webkitSpeechRecognition) {
      alert("Your browser doesn't support speech recognition.");
      return;
    }

    const SpeechRecognition =
      window.SpeechRecognition || window.webkitSpeechRecognition;
    const recognition = new SpeechRecognition();

    recognition.lang = 'en-US';
    recognition.interimResults = false;

    recognition.onstart = () => setIsListening(true);
    recognition.onresult = (event) => {
      const transcript = event.results[0][0].transcript;
      setInput(transcript);
      setIsListening(false);
      sendMessage();
    };
    recognition.onerror = () => setIsListening(false);
    recognition.onend = () => setIsListening(false);

    recognition.start();
  };

  return (
    <div className="input-group shadow-sm rounded">
      {/* Input Field */}
      <input
        type="text"
        className="form-control border-0"
        placeholder="Type your prompt here..."
        value={input}
        onChange={(e) => setInput(e.target.value)}
        onKeyDown={(e) => e.key === 'Enter' && sendMessage()}
      />
      {/* Voice Input Button */}
      <button
        className={`btn bg-secondary ${isListening ? 'text-danger' : 'text-muted'}`}
        onClick={startVoiceInput}
        title="Voice Input"
      >
        <FaMicrophone size={20} />
      </button>
      {/* Send Button */}
      <button className="btn btn-success" onClick={sendMessage} title="Send">
        <FaPaperPlane size={20} />
      </button>
    </div>
  );
};

export default InputBox;