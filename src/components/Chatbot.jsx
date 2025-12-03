import React, { useEffect, useState, useRef } from 'react';
import ReactMarkdown from 'react-markdown';

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000/api';

const Chatbot = () => {
  const [messages, setMessages] = useState([
    ['', 'Hello! I am Dami, your AI assistant. How can I assist you today?']
  ]);
  const [input, setInput] = useState('');
  const [isOpen, setIsOpen] = useState(false);
  const messagesEndRef = useRef(null);
  const inactivityTimerRef = useRef(null);
  const inactivityCounterRef = useRef(0);

  useEffect(() => {
    if (!isOpen) {
      if (inactivityTimerRef.current) clearInterval(inactivityTimerRef.current);
      inactivityCounterRef.current = 0;
      return;
    }

    if (inactivityTimerRef.current) clearInterval(inactivityTimerRef.current);

    inactivityTimerRef.current = setInterval(() => {
      inactivityCounterRef.current += 1;

      if (inactivityCounterRef.current === 60) {
        setMessages((prev) => [...prev, ['', 'Are you still there? Do you need more help?']]);
      }

      if (inactivityCounterRef.current === 90) {
        setMessages((prev) => [...prev, ['', `The chat will close in ${120 - inactivityCounterRef.current} seconds due to inactivity.`]]);
      }

      if (inactivityCounterRef.current === 120) {
        setMessages([
          ['', 'Hello! I am Dami, your AI assistant. How can I assist you today?']
        ]);
        setIsOpen(false);
        inactivityCounterRef.current = 0;
      }
    }, 1000);

    return () => {
      if (inactivityTimerRef.current) clearInterval(inactivityTimerRef.current);
    };
  }, [isOpen, messages]);

  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages]);


  const sendMessage = async () => {
  if (!input.trim()) return;

  const newMessages = [...messages, [input, '']];
  setMessages(newMessages);
  setInput('');

  try {
    const payload = {
      question: input,
    };

    const response = await fetch(`${API_BASE_URL}/chat`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();

    setMessages((prev) => {
      const updated = [...prev];
      updated[updated.length - 1][1] = data.response;
      return updated;
    });

  } catch (error) {
    console.error('Error:', error);
    setMessages((prev) => [...prev, ['', 'Sorry, something went wrong.']]);
  }

  inactivityCounterRef.current = 0;
};


  const handleKeyPress = (e) => {
    if (e.key === 'Enter') sendMessage();
  };

  return (
    <>
    <button
        className="fixed bottom-4 right-4 bg-gradient-to-r from-green-500 to-purple-500 text-white px-4 py-2 rounded-full shadow-lg flex items-center space-x-2 hover:shadow-xl transition-all duration-300 ease-in-out"
        onClick={() => setIsOpen(!isOpen)}
        aria-label={isOpen ? 'Close chat' : 'Open chat'}
      >
        {isOpen ? (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        ) : (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
            />
          </svg>
        )}
        <span>{isOpen ? 'Close' : 'Chat with Dami'}</span>
      </button>


      {isOpen && (
        <div className="fixed bottom-16 right-4 w-96 h-128 bg-white rounded-lg shadow-lg p-4 border border-gray-300 max-w-[90%] overflow-hidden">
          <div className="flex items-center mb-4">
            <p className="text-xl font-medium">Meet Dami, your AI assistant</p>
          </div>
          <div className="space-y-4 max-h-[400px] overflow-y-auto">
            {messages.map(([userMsg, botMsg], index) => (

            <React.Fragment key={index}>
                {userMsg && (
                  <div className="flex items-end justify-end">
                    <div className="bg-blue-500 p-3 rounded-lg">
                      <p className="text-sm text-white">{userMsg}</p>
                    </div>
                    <img
                      src="https://pbs.twimg.com/profile_images/1707101905111990272/Z66vixO-_normal.jpg"
                      alt="User Avatar"
                      className="w-8 h-8 rounded-full ml-3"
                    />
                  </div>
                )}
                {botMsg && (
                  <div className="flex items-start">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 100 100"
                      width="32"
                      height="32"
                      fill="#009688"
                      className="w-8 h-8 rounded-full"
                    >
                      <circle cx="50" cy="50" r="20" fill="#009688" />
                      <circle cx="50" cy="40" r="2" fill="#fff" />
                      <rect x="47" y="45" width="6" height="10" fill="#fff" />
                      <circle cx="50" cy="65" r="3" fill="#009688" />
                      <circle cx="45" cy="45" r="3" fill="#fff" />
                      <circle cx="55" cy="45" r="3" fill="#fff" />
                      <circle cx="45" cy="45" r="1" fill="#000" />
                      <circle cx="55" cy="45" r="1" fill="#000" />
                      <line x1="50" y1="30" x2="40" y2="20" stroke="#009688" strokeWidth="2" />
                      <line x1="50" y1="30" x2="60" y2="20" stroke="#009688" strokeWidth="2" />
                    </svg>
                    <div className="ml-3 bg-gray-100 p-3 rounded-lg">
                      <ReactMarkdown>{botMsg}</ReactMarkdown>
                    </div>
                  </div>
                )}
              </React.Fragment>


            ))}
            <div ref={messagesEndRef} />
          </div>
          <div className="mt-4 flex items-center">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Type your message..."
              className="flex-1 py-2 px-3 rounded-full bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <button
              onClick={sendMessage}
              className="bg-[rgb(255,96,71)] text-white px-4 py-2 rounded-full ml-3 hover:bg-[rgb(230,80,60)] transition-all duration-300"
            >
              Send
            </button>
          </div>
        </div>
      )}
    </>
  );
};


export default Chatbot
