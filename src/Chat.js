import React from 'react'
import { Link } from "react-router-dom";
import logo from './images/logo1.png'
import logout from './images/logout.png'
import user from './images/Ellipse.png'
import bot from './images/5.png'
import emoji from './images/emoji.png'
import send from './images/arrow.png'

const Chat = () => {
  return (
    <div className='chatpage pt-24'>

        <div className='chatmain flex flex-col justify-center bg-white rounded-lg'>

            <header className='flex items-center justify-end pt-4 pb-4'>
                <img src={logo} alt='' id='logo2' />
                <img src={logout} alt='' className='logout ml-64 mr-4' />
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

                <form className='message flex items-center justify-between rounded-lg px-2'>

                    <div className='flex items-center'>
                        <img src={emoji} alt='' id='emoji' />
                        <input type='text' placeholder='Message AI Chatbot' className='chatinput border-none outline-none' />
                    </div>

                    <button type='' className=''> <img src={send} alt='' id='send' /> </button>

                </form>

            </section>

        </div>

    </div>
  )
}

export {Chat}