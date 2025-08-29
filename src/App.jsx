import React, { useState } from "react";

const MentalHealthChatbot = () => {
  const [isDashboardOpen, setIsDashboardOpen] = useState(false);
  const [messages, setMessages] = useState([
    {
      id: 1,
      text: "Welcome to your Mental Health Support! I'm here to help you with your mental wellness journey. How are you feeling today?",
      isUser: false,
    },
    {
      id: 2,
      text: "You can access various tools through your progress dashboard, including sleep timers, meditation guides, and progress tracking.",
      isUser: false,
    },
  ]);
  const [inputText, setInputText] = useState("");
  const [activeTab, setActiveTab] = useState("");

  const toggleDashboard = () => {
    setIsDashboardOpen(!isDashboardOpen);
    setActiveTab(isDashboardOpen ? "" : "Your Progress");
  };

  const sendMessage = () => {
    if (inputText.trim()) {
      const newMessage = {
        id: Date.now(),
        text: inputText.trim(),
        isUser: true,
      };

      setMessages((prev) => [...prev, newMessage]);
      setInputText("");

      // Simulate bot response
      setTimeout(() => {
        const responses = [
          "Thank you for sharing. I'm here to listen and support you.",
          "That sounds like something worth exploring. How does that make you feel?",
          "I understand. Would you like to try a breathing exercise or talk more about this?",
          "Your feelings are valid. Let's work through this together.",
          "That's a great insight. How can we build on that positive thinking?",
        ];
        const randomResponse =
          responses[Math.floor(Math.random() * responses.length)];

        setMessages((prev) => [
          ...prev,
          {
            id: Date.now() + 1,
            text: randomResponse,
            isUser: false,
          },
        ]);
      }, 1000);
    }
  };

  const handleSidebarClick = (item) => {
    if (item === "Your Progress") {
      toggleDashboard();
    } else {
      setActiveTab(item);
      setIsDashboardOpen(false);
    }
  };

  const handleDashboardItemClick = (feature) => {
    const botMessage = {
      id: Date.now(),
      text: `Opening ${feature}...`,
      isUser: false,
    };

    setMessages((prev) => [...prev, botMessage]);

    setTimeout(() => {
      setMessages((prev) => [
        ...prev,
        {
          id: Date.now() + 1,
          text: `${feature} is now ready for you. How would you like to proceed?`,
          isUser: false,
        },
      ]);
    }, 800);
  };

  const sidebarItems = [
    "CHATBOT J AND K",
    "EMERGENCY CONTACT REQUIREMENTS",
    "Your Progress",
    "Counselling Booking System",
    "Wellness Hub",
    "PEER SUPPORT FORM",
    "Health and Support",
    "Chat Summary",
  ];

  return (
    <div
      className="w-full h-screen overflow-hidden"
      style={{
        background: "linear-gradient(135deg, #a8c8ec, #d4e4f7)",
      }}
    >
      {/* Overlay */}
      {isDashboardOpen && (
        <div
          className="fixed inset-0 bg-black opacity-30 z-40"
          onClick={toggleDashboard}
        />
      )}

      <div className="flex h-full p-4 gap-4 relative">
        {/* Sidebar */}
        <div className="flex flex-col w-52 min-w-[13rem] bg-white bg-opacity-90 rounded-xl p-4 shadow-lg backdrop-blur-sm">
          <div className="flex flex-col gap-3 flex-1">
            {sidebarItems.map((item, index) => (
              <button
                key={index}
                onClick={() => handleSidebarClick(item)}
                className={`p-3 text-white text-sm font-medium text-left rounded-lg transition-all duration-300 hover:translate-x-1 ${
                  activeTab === item
                    ? "bg-blue-700 shadow-md"
                    : "bg-blue-400 hover:bg-blue-500"
                }`}
              >
                {item}
              </button>
            ))}
          </div>

          <div className="mt-4 p-3 bg-gray-600 rounded-lg text-white flex items-center gap-2">
            <div className="w-7 h-7 bg-gray-400 rounded-full flex items-center justify-center text-xs">
              👤
            </div>
            <span className="text-sm">Profile</span>
          </div>
        </div>

        {/* Dashboard Panel */}
        <div
          className={`absolute left-52 top-0 w-72 h-full bg-white bg-opacity-95 rounded-xl p-4 shadow-xl backdrop-blur-sm z-50 transform transition-all duration-500 ${
            isDashboardOpen
              ? "translate-x-0 opacity-100"
              : "-translate-x-full opacity-0"
          }`}
        >
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-semibold text-gray-800">DASHBOARD</h2>
            <button
              onClick={toggleDashboard}
              className="text-2xl text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded p-1 transition-colors"
            >
              ×
            </button>
          </div>

          <div className="bg-gray-50 p-3 rounded-lg mb-4 border-l-4 border-blue-400">
            <div className="font-semibold text-gray-800 text-sm mb-1">
              Welcome Back!
            </div>
            <div className="text-gray-600 text-xs">Ready and waiting.</div>
            <div className="text-gray-600 text-xs">Summary for today</div>
          </div>

          <div className="space-y-3">
            <button
              onClick={() => handleDashboardItemClick("SLEEP TIMER")}
              className="w-full p-3 bg-blue-300 text-gray-800 font-medium rounded-lg transition-all duration-300 hover:bg-blue-400 hover:translate-x-1"
            >
              SLEEP TIMER
            </button>
            <button
              onClick={() => handleDashboardItemClick("MEDITATION TIMER")}
              className="w-full p-3 bg-blue-300 text-gray-800 font-medium rounded-lg transition-all duration-300 hover:bg-blue-400 hover:translate-x-1"
            >
              MEDITATION TIMER
            </button>
          </div>
        </div>

        {/* Main Chat Area */}
        <div className="flex-1 flex flex-col bg-white bg-opacity-95 rounded-xl p-4 shadow-lg backdrop-blur-sm min-w-0">
          {/* Top Navigation */}
          <div className="mb-4">
            <button className="px-6 py-3 bg-blue-400 text-white font-semibold rounded-full transition-all duration-300 hover:bg-blue-500 hover:-translate-y-0.5 hover:shadow-lg">
              MENTAL GURU CHATBOT
            </button>
          </div>

          {/* Chat Messages */}
          <div className="flex-1 flex flex-col overflow-y-auto mb-4 space-y-3 pr-2">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`p-4 rounded-xl shadow-sm transition-all duration-300 hover:-translate-y-0.5 hover:shadow-md ${
                  message.isUser
                    ? "bg-blue-100 ml-16 text-gray-800"
                    : "bg-blue-300 text-gray-800"
                }`}
              >
                <span className="font-semibold">
                  {message.isUser ? "You: " : "Mental Health Bot: "}
                </span>
                {message.text}
              </div>
            ))}
          </div>

          {/* Chat Input */}
          <div className="bg-gray-600 p-4 rounded-xl flex gap-3 items-center">
            <input
              type="text"
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && sendMessage()}
              className="flex-1 p-3 rounded-lg text-base bg-white bg-opacity-90 border-0 focus:outline-none focus:ring-2 focus:ring-blue-400"
              placeholder="Type your message here..."
            />
            <button
              onClick={sendMessage}
              className="px-4 py-3 bg-blue-400 text-white font-semibold rounded-lg transition-all duration-300 hover:bg-blue-600 hover:scale-105"
            >
              Send
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MentalHealthChatbot;
