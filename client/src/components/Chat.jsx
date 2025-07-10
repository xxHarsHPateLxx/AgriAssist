import React from 'react';
import { MessageCircle, Send, Mic } from 'lucide-react';
import { sampleChats } from '../data';
import ReactMarkdown from "react-markdown";
import { useState, useEffect, useRef } from 'react';

const Chat = () => {

  const [chatMessages, setChatMessages] = useState([]);
  const [chatInput, setChatInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const chatEndRef = useRef(null);

  const handleSendMessage = async () => {

    if (chatInput.trim()) {
      const newMessage = { type: 'user', text: chatInput, time: new Date().toLocaleTimeString() };
      setChatMessages([...chatMessages, newMessage]);
      setChatInput('');

      // Show typing indicator
      setIsTyping(true);

      try {
        const response = await fetch('http://localhost:8000/chat', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            // 'Authorization': `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2ODVlMzViMmNkYTU2YmI1NzJiYzgzMzgiLCJpYXQiOjE3NTEwMDQ1OTR9.N4yzTysGBdVapPK4yFQwJQSGiTS2tMD5MMSW1bPWb9w`
          },
          body: JSON.stringify({ query: chatInput }),
        });

        const data = await response.json();

        const botResponse = {
          type: 'bot',
          text: data.answer || 'Sorry, no response from server.',
          time: new Date().toLocaleTimeString()
        };

        setChatMessages(prev => [...prev, botResponse]);

      } catch (error) {
        setChatMessages(prev => [
          ...prev,
          {
            type: 'bot',
            text: 'Server error. Please try again later.',
            time: new Date().toLocaleTimeString()
          }
        ]);
        console.error('Chat API error:', error);
      } finally {
        setIsTyping(false);
      }
    }
  };

  useEffect(() => {
    chatEndRef?.current?.scrollIntoView({ behavior: 'smooth' });
  }, [chatMessages]);


  return (
    <div className="w-full">

      <div className="lg:col-span-3 bg-white rounded-xl shadow-sm border border-gray-200 flex flex-col h-[80vh]">

        <div className="p-4 border-b border-gray-200">
          <h3 className="text-lg font-semibold text-gray-800">AI Farming Assistant</h3>
          <p className="text-sm text-gray-500">Ask me anything about farming, crops, or agriculture!</p>
        </div>

        <div className="flex-1 overflow-y-auto p-4 space-y-4">

          {chatMessages.length === 0 && (
            <div className="text-center text-gray-500 mt-28">
              <MessageCircle size={48} className="mx-auto mb-4 text-gray-300" />
              <p>Start a conversation with your AI assistant!</p>
            </div>
          )}

          {chatMessages.map((message, index) => (
            <div key={index} className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}>
              <div className={`max-w-xs lg:max-w-xl  px-4 py-2 rounded-2xl ${message.type === 'user'
                ? 'bg-green-600 text-white'
                : 'bg-gray-100 text-gray-800'
                }`}>
                <ReactMarkdown>{message.text}</ReactMarkdown>
                <p className={`text-xs mt-1 ${message.type === 'user' ? 'text-green-100' : 'text-gray-500'}`}>
                  {message.time}
                </p>
              </div>
            </div>
          ))}

          {/* 3-dot animation */}
          {isTyping && (
            <div className="flex justify-start">
              <div className="bg-gray-100 px-4 py-2 rounded-2xl">
                <div className="flex space-x-1">
                  <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                  <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                  <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                </div>
              </div>
            </div>
          )}
          <div ref={chatEndRef} />

        </div>

        {/* Text input */}
        <div className="p-4 border-t border-gray-200">
          <div className="flex space-x-2">
            <input
              type="text"
              value={chatInput}
              onChange={(e) => setChatInput(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
              placeholder="Type your message..."
              className="flex-1 px-4 py-2 border border-gray-300 rounded-full focus:outline-none focus:border-green-500"
            />
            <button
              onClick={handleSendMessage}
              className="bg-green-600 text-white p-2 rounded-full hover:bg-green-700 transition-colors"
            >
              <Send size={20} />
            </button>
            <button className="bg-gray-100 text-gray-600 p-2 rounded-full hover:bg-gray-200 transition-colors">
              <Mic size={20} />
            </button>
          </div>
        </div>

      </div>

      {/* Chat History */}
      {/* <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4">
        <h4 className="font-semibold text-gray-800 mb-4">Chat History</h4>
        <div className="space-y-2">
          {sampleChats.map(chat => (
            <div key={chat.id} className="p-3 bg-gray-50 rounded-lg hover:bg-gray-100 cursor-pointer transition-colors">
              <p className="text-sm font-medium text-gray-800 truncate">{chat.summary}</p>
              <p className="text-xs text-gray-500">{chat.date}</p>
            </div>
          ))}
        </div>
      </div> */}

    </div>
  );
};

export default Chat;


// className="grid grid-cols-1 lg:grid-cols-4 gap-6 h-[calc(100vh-200px)]"