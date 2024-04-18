import React, { useState, useEffect } from "react";
import logo from "./images/logo1.png";
import logout from "./images/logout.png";
import user from "./images/Ellipse.png";
import bot from "./images/5.png";
import emoji from "./images/emoji.png";
import send from "./images/arrow.png";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Chat = () => {

    const [messages, setMessages] = useState([]);
    const [inputValue, setInputValue] = useState("");
    const navigate = useNavigate();

    useEffect(() => {
      // Scroll to bottom when messages change
      scrollToBottom();
    }, [messages]);

    function scrollToBottom() {
      const chatContainer = document.getElementById("chat-container");
      chatContainer.scrollTop = chatContainer.scrollHeight;
    }

    function logoutfunc() {
      localStorage.clear();
      navigate("/login");
    }

    const sendMessage = async () => {

      if (!inputValue.trim()) return; // Don't send empty messages

      // Add user message to chat history
      const updatedMessages = [...messages, { text: inputValue, isUser: true }];
      setMessages(updatedMessages);
      setInputValue("");

      try {

        const formData = new FormData();

        formData.append("user_input", inputValue);

        const userData = localStorage.getItem("user-info");
        if (!userData) {
          throw new Error("User details not found in local storage");
        }

        const userdetail = JSON.parse(userData);
        const authToken = userdetail.data.token;

        const response = await axios.post(
          "https://chatbotapi0.onrender.com/message",
          formData,
          {
            headers: {
              Authorization: `Token ${authToken}`,
            },
          }
        );

        const botResponse = response.data.bot_response;

        // Add bot response to chat history
        const updatedMessagesWithBotResponse = [
          ...updatedMessages,
          { text: botResponse, isUser: false },
        ];
        setMessages(updatedMessagesWithBotResponse);

        localStorage.setItem("user-message", JSON.stringify(response.data));
      } catch (error) {
        console.error("Error handling form submission:", error);
        // Handle errors gracefully, e.g., display an error message to the user
      }

    };

  return (
    <div className="chatpage pt-24">

      <div className="chatmain flex flex-col justify-center bg-white rounded-lg">

        <header className="flex items-center justify-end pt-4 pb-4">

          <img src={logo} alt="" id="logo2" />

          <button className="btn-logout" onClick={logoutfunc}>
            <img src={logout} alt="" className="logout ml-64 mr-4" />
          </button>

        </header>

        <section id="chat-container" className="chat-sec">

          {messages.map((message, index) => (

            <div
              key={index}
              className={`profile flex items-center mt-4 ${
                message.isUser ? "justify-end" : ""
              }`}
            >
              {!message.isUser && <img src={bot} alt="" id="logo" />}

              <div className="aboutchat flex flex-col text-left ml-2">

                <h3
                  className={`capitalize font-bold ${
                    message.isUser ? "text-green-600" : "text-blue-600"
                  }`}
                >
                  {message.isUser ? "you" : "ai chatbot"}
                </h3>

                <p className="font-medium text-xs text-gray-500"> {message.text} </p>

              </div>

              {message.isUser && <img src={user} alt="" id="" />}

            </div>
          ))}  
          
          <form
            onSubmit={(e) => {
              e.preventDefault();
              sendMessage();
            }}
            className="message flex items-center justify-between rounded-lg px-2"
          >
            <div className="flex items-center">
          
              <img src={emoji} alt="" id="emoji" />
              <input
                type="text"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                placeholder="Message AI Chatbot"
                className="chatinput border-none outline-none"
              />
          
            </div>
          
            <button type="submit">
              <img src={send} alt="" id="send" />
            </button>
          
          </form>


        </section>
        
      </div>

    </div>
  );
};

export { Chat };