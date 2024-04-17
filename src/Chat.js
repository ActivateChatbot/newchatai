import React, { useEffect, useState } from 'react'
//import { Link } from "react-router-dom";
import logo from './images/logo1.png'
import logout from './images/logout.png'
import user from './images/Ellipse.png'
import bot from './images/5.png'
import emoji from './images/emoji.png'
import send from './images/arrow.png'
import { useNavigate } from 'react-router-dom'
import axios from "axios";

const Chat = () => {

    const navigate = useNavigate()

    const [data, setData] = useState("");

    const [ chatHistory, setChatHistory ] = useState([])
  
    function logoutfunc () {
      localStorage.clear()
      navigate('/login')
    }
    
    const handleInputChange = (e) => {
      const { name, value } = e.target;
      setData({
        ...data,
        [name]: value,
      });
    };
    
    useEffect(() => {

        const getHistory = async () => {

            try {
                const response = await fetch( 'https://chatbotapi0.onrender.com/message' );
  
                if (response.ok) {
                  const data = await response.json();
                  setChatHistory(data);
                  //console.log(data)

                } else {
                  // Handle error response
                  console.error('Failed to fetch chat history');
                }
            } catch (error) {
                console.error('Error fetching chat history:', error);       
            }

        };

        getHistory();

    }, []) 
    
    const handleSubmit = async (e) => {

      try {

        e.preventDefault();    

        const userMessage = {
          user_input: data.user_input,
        };

        let formData = new FormData();
        formData.append("user_input", data.user_input);
      
        const userData = localStorage.getItem('user-info');
        if (!userData) {
          throw new Error('User details not found in local storage');
        }
      
        const userdetail = JSON.parse(userData);
        const authToken = userdetail.data.token;
        
        const response = await axios.post("https://chatbotapi0.onrender.com/message", formData, {
          headers: {
            Authorization: `Token ${authToken}`,
          },
        });  

        console.log(response.data);
    
        localStorage.setItem('user-message', JSON.stringify(response.data));
        
      } catch (err) {
        console.log(err);
      }
      
    };

    /*const handleSubmit = async (e) => {
        try {
          e.preventDefault();
      
          const userMessage = {
            user_input: data.user_input,
          };
      
          const userData = localStorage.getItem('user-info');
          if (!userData) {
            throw new Error('User details not found in local storage');
          }
      
          const userdetail = JSON.parse(userData);
          const authToken = userdetail.data.token;
      
          const response = await axios.post("https://chatbotapi0.onrender.com/message", userMessage, {
            headers: {
              Authorization: `Token ${authToken}`,
            },
          });
      
          console.log(response.data); // Log the response data only
      
          localStorage.setItem('user-message', JSON.stringify(response.data));
      
          // Fetch chat history after sending the message
          //await getHistory();
        } catch (error) {
          console.error('Error handling form submission:', error);
          // Handle errors gracefully, e.g., display an error message to the user
        }
      };*/

  return (
    <div className='chatpage pt-24'>

        <div className='chatmain flex flex-col justify-center bg-white rounded-lg'>

            <header className='flex items-center justify-end pt-4 pb-4'>

                <img src={logo} alt='' id='logo2' />
                <button className='btn-logout' onClick={logoutfunc}>
                    <img src={logout} alt='' className='logout ml-64 mr-4' />
                </button>
                
            </header>

            <section className='chat-sec'>

                <div className='profile flex items-center'>
               
                    <img src={user} alt='' id='' />

                    <div className='aboutchat flex flex-col text-left ml-2'>
                        <h3 className='capitalize font-bold'>you</h3>
                        <p className='font-medium text-xs text-gray-500'>Hello, AI chatbot</p>
                    </div>

                </div>

                <div className='profile flex items-center mt-4'>
               
                    <img src={bot} alt='' id='logo' />

                    <div className='aboutchat flex flex-col text-left ml-2'>
                        <h3 className='capitalize font-bold'>ai chatbot</h3>
                        <p className='font-medium text-xs text-gray-500'>Hello, how can I help you today?</p>
                    </div>
                    
                </div>

                <form onSubmit={handleSubmit} className='message flex items-center justify-between rounded-lg px-2'>

                    <div className='flex items-center'>
                        <img src={emoji} alt='' id='emoji' />
                        <input name='user_input' type='text' value={data.user_input}
                            placeholder='Message AI Chatbot' 
                            className='chatinput border-none outline-none'
                            onChange={handleInputChange}
                        />
                    </div>

                    <button type='' className=''> <img src={send} alt='' id='send' /> </button>

                </form>

            </section>

        </div>

    </div>
  )
}

export {Chat}