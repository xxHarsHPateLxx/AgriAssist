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
      const userQuery = chatInput; // Store the query before clearing
      const newMessage = { type: 'user', text: userQuery, time: new Date().toLocaleTimeString() };
      setChatMessages([...chatMessages, newMessage]);
      setChatInput('');

      // Show typing indicator
      setIsTyping(true);

      try {
        const response = await fetch('https://agriassist-llyw.onrender.com/chat', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            // 'Authorization': `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2ODVlMzViMmNkYTU2YmI1NzJiYzgzMzgiLCJpYXQiOjE3NTEwMDQ1OTR9.N4yzTysGBdVapPK4yFQwJQSGiTS2tMD5MMSW1bPWb9w`
          },
          body: JSON.stringify({ query: userQuery }),
        });

        const data = await response.json();

        if (!response.ok) {
          throw new Error(data.detail || 'Failed to get response');
        }

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

      <div className="lg:col-span-3 bg-gradient-to-br from-white to-green-50 rounded-2xl shadow-enhanced border border-green-200 flex flex-col h-[80vh] overflow-hidden">

        <div className="p-6 border-b border-green-200 bg-gradient-to-r from-emerald-500 to-green-600 text-white">
          <h3 className="text-xl font-bold">🌾 AI Farming Assistant</h3>
          <p className="text-sm text-white/90 mt-1">Ask me anything about farming, crops, or agriculture!</p>
        </div>

        <div className="flex-1 overflow-y-auto p-6 space-y-4 bg-gradient-to-b from-white to-green-50/30">

          {chatMessages.length === 0 && (
            <div className="text-center text-gray-500 mt-32 animate-fadeInUp">
              <div className="bg-gradient-to-br from-green-100 to-emerald-100 p-4 rounded-full inline-block mb-4">
                <MessageCircle size={48} className="text-green-600" />
              </div>
              <p className="text-lg font-semibold">Start a conversation with your AI assistant!</p>
              <p className="text-sm text-gray-400 mt-2">I'm here to help with all your farming needs</p>
            </div>
          )}

          {chatMessages.map((message, index) => (
            <div key={index} className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'} animate-fadeInUp`}>
              <div className={`max-w-xs lg:max-w-xl px-5 py-3 rounded-2xl shadow-md transition-all ${message.type === 'user'
                ? 'bg-gradient-to-r from-emerald-500 to-green-600 text-white rounded-br-none'
                : 'bg-white text-gray-800 rounded-bl-none border border-green-200'
                }`}>
                <ReactMarkdown components={{
                  p: ({node, ...props}) => <p className="text-sm" {...props} />,
                  a: ({node, ...props}) => <a className="text-sm underline" {...props} />,
                }}>
                  {message.text}
                </ReactMarkdown>
                <p className={`text-xs mt-2 ${message.type === 'user' ? 'text-white/70' : 'text-gray-400'}`}>
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
        <div className="p-5 border-t border-green-200 bg-gradient-to-t from-green-50 to-white">
          <div className="flex space-x-2">
            <input
              type="text"
              value={chatInput}
              onChange={(e) => setChatInput(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
              placeholder="Type your message..."
              className="flex-1 px-5 py-3 border border-green-300 rounded-full focus:outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-200 bg-white transition-all"
            />
            <button
              onClick={handleSendMessage}
              className="bg-gradient-to-r from-emerald-500 to-green-600 text-white p-3 rounded-full hover:shadow-lg transition-all transform hover:scale-105"
            >
              <Send size={20} />
            </button>
            <button className="bg-gray-100 text-gray-600 p-3 rounded-full hover:bg-gray-200 transition-colors">
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