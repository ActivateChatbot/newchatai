import React, { useState, useEffect } from "react";
import ReactMarkdown from 'react-markdown';
import logo from "./images/Logo2.png";
import arrow from "./images/arrow1.png";
import logout from "./images/logout.png";
//import user from "./images/Ellipse.png";
//import bot from "./images/5.png";
import emoji from "./images/emoji.png";
import send from "./images/send1.png";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { Fragment } from 'react'
import { Menu, Transition } from '@headlessui/react'
import { Chatbar } from "./components/Chatbar";
//import {useStream} from 'react-fetch-streams';

function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}

const Chat = () => {

    const [messages, setMessages] = useState([]);
    const [inputValue, setInputValue] = useState("");
    const [chatHistory, setChatHistory] = useState([]);
    const [loading, setLoading] = useState(false);
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
    
    useEffect(() => {
      fetchUserChatHistory();
    }, []);
  
    const fetchUserChatHistory = async () => {

      try {
        const userData = localStorage.getItem("user-info");

        if (!userData) {
          throw new Error("User details not found in local storage");
        }
  
        const userdetail = JSON.parse(userData);
        const authToken = userdetail.data.token;
  
        const response = await axios.get(
          "http://ec2-13-49-70-103.eu-north-1.compute.amazonaws.com/message",
          {
            headers: {
              Authorization: `Token ${authToken}`,
            },
          }
        );
  
        setChatHistory(response.data);
        //console.log("Response", response.data);

      } catch (error) {
        console.error("Error fetching user chat history:", error);
      }
    };
    
    const sortedChatHistory = chatHistory.sort((a, b) => { 
      return a.id - b.id;
    });

    const handleInputChange = (e) => {
      setInputValue(e.target.value)
    }

    const sendMessage = async (e) => {

      if (!inputValue.trim()) return; // Don't send empty messages

      // Add user message to chat history
      const updatedMessages = [...messages, { text: inputValue, isUser: true }];
      setMessages(updatedMessages);
      setInputValue("");
  
      setLoading(true);

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
          "http://ec2-13-49-70-103.eu-north-1.compute.amazonaws.com/message",
          formData,
          {
            headers: {
              Authorization: `Token ${authToken}`,
            },
          }

        );

        const botResponse = response.data.bot_response;

        // Placeholder message for bot response
        const placeholderMessage = { text: "Waiting for bot response...", isUser: false };
        const updatedMessagesWithPlaceholder = [...updatedMessages, placeholderMessage];
        setMessages(updatedMessagesWithPlaceholder);

        setTimeout(() => {
          // Simulated response stages
          const stages = [
            "Generating response...",
            "Thinking...",
            "Almost there...",
            "Here's your response!"
          ];

          let stageIndex = 0;

          const interval = setInterval(() => {

            const stagedMessages = [...updatedMessagesWithPlaceholder];
            stagedMessages[stagedMessages.length - 1].text = stages[stageIndex];
            setMessages(stagedMessages);
      
            stageIndex++;

            //setMessages(stages[stageIndex]);

            //stageIndex++;

            if (stageIndex === stages.length) {

              clearInterval(interval);
              setLoading(false);

              // Replace placeholder message with actual bot response
              const updatedMessagesWithBotResponse = [...stagedMessages];
              updatedMessagesWithBotResponse[updatedMessagesWithBotResponse.length - 1].text = botResponse;
              setMessages(updatedMessagesWithBotResponse);
            }
          }, 1000); // Simulated stage change every second

        }, 2000); // Simulating a delay of 2 seconds before starting response stages

        // Add bot response to chat history
        /*const updatedMessagesWithBotResponse = [
          ...updatedMessages,
          { text: botResponse, isUser: false },
        ];
        setMessages(updatedMessagesWithBotResponse);*/

        localStorage.setItem("user-message", JSON.stringify(response.data));

      } catch (error) {
        console.error("Error handling form submission:", error);
        // Handle errors gracefully, e.g., display an error message to the user
      } finally {
        setLoading(false); // Reset loading state after request completes
      }

    };

  return (

      <div className="chatmain flex flex-col justify-center bg-white rounded-lg">

        <header className="flex items-center justify-between p-4">

          <Chatbar />

          <Menu as="div" className="relative inline-block text-left md:ml-16">
          
            <div>

              <Menu.Button className="inline-flex w-full justify-center items-center gap-x-1.5 rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50">
                <Link to="/" id="logo2"> <img src={logo} alt="" /> </Link>
                <img src={arrow} alt="" className="-mr-1 h-5 w-5 text-gray-400" aria-hidden="true" />
              </Menu.Button>

            </div>

            <Transition
              as={Fragment}
              enter="transition ease-out duration-100"
              enterFrom="transform opacity-0 scale-95"
              enterTo="transform opacity-100 scale-100"
              leave="transition ease-in duration-75"
              leaveFrom="transform opacity-100 scale-100"
              leaveTo="transform opacity-0 scale-95"
            >
              <Menu.Items className="absolute right-0 z-10 mt-2 w-56 origin-top-right divide-y divide-gray-100 rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
               
                <div className="py-1">

                  <Menu.Item>
                    {({ active }) => (
                      <a
                        href="htt"
                        className={classNames(
                          active ? 'bg-gray-100 text-gray-900' : 'text-gray-700',
                          'block px-4 py-2 text-sm'
                        )}
                      >
                        Edit
                      </a>
                    )}
                  </Menu.Item>
                  
                </div>

                <div className="py-1">
                  <Menu.Item>
                    {({ active }) => (
                      <a
                        href="http"
                        className={classNames(
                          active ? 'bg-gray-100 text-gray-900' : 'text-gray-700',
                          'block px-4 py-2 text-sm'
                        )}
                      >
                        Archive
                      </a>
                    )}
                  </Menu.Item>

                </div>

              </Menu.Items>

            </Transition>
            
          </Menu>

          <button className="btn-logout md:mr-16" onClick={logoutfunc}>
            <img src={logout} alt="" className="logout" />
          </button>

        </header>

        <section id="chat-container" className="chat-sec">

          {sortedChatHistory.map((message, index) => (
              <div key={index} className={`profile flex flex-col mt-4 ${message.isUser ? "" : ""}`}>
                <p className="chat-input font-medium text-sm text-gray-500 mr-2">{message?.messageInput} </p>

                <p className="bot-input mr-2 font-medium text-sm text-gray-500 self-start ml-2">{message?.bot_response} </p>

              </div>
          ))}

          {messages.map((message, index) => (

            <div key={index} id="msg-profile" className={`profile flex items-center mt-4 ${ message.isUser ? "justify-end" : "" }`}>

              <div className={`aboutchat flex flex-col text-left ml-2 ${message.isUser ? "bg-gray-500" : ""}`}
                style={{ backgroundColor: message.isUser ? "#52018E" : "#c0c0c0", marginRight: message.isUser ? "1em" : "", }}
              >

                <h3 className={`capitalize font-bold ${message.isUser ? "text-green-600" : "text-blue-600"}`}>
                  {message.isUser ? "you" : "ai chatbot"}
                </h3>
              {/* Render Markdown content using react-markdown */}
              <ReactMarkdown className={`font-medium text-sm ${message.isUser ? "text-white" : "text-gray-500"}`}>
                {message.text}
              </ReactMarkdown>

                {/*<p className={`font-medium text-sm ${message.isUser ? "text-white" : "text-gray-500"}`}> {message.text} </p>*/}

              </div>

              {/*{message.isUser && <img src={user} alt="" id="userlogo" />} */}

            </div>
          ))}  

          {/* Show spinner for bot messages when loading */}
          
          {loading && (
            <div className="bot-input flex text-left ml-2">
                  <LoadingDots />
                </div>
          )}

        </section>
          
          <form onSubmit={(e) => {e.preventDefault(); sendMessage();}}
            className="message flex items-center justify-between rounded-3xl px-2 py-2"
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
        
      </div>

  );
};

const LoadingDots = () => {
    return (
        <div className="loading-dots">
            <span className="dot"></span>
            <span className="dot"></span>
            <span className="dot"></span>
        </div>
    );
};

export { Chat };