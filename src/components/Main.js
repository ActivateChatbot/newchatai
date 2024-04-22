import React from 'react'
import './main.css'
import image1 from '../images/Rectangle12.png'
import video from '../images/Group2.png'
import { Link } from "react-router-dom";
import { Uses } from './Uses'

const Main = () => {
  return (
    <div className='flex flex-col m-4'>

      <section className='hero'>

        <h1 className='text-white font-semibold text-3xl md:text-5xl text-center'>Transform Citizen Interactions with Next-Generation AI Chatbot</h1>
        
        <p className='p1 text-white text-center font-medium'>Revolutionizing Public Engagement: Empowerment through Advanced AI Chatbot Technology</p>

        <Link to='/signup' className='capitalize flex items-center rounded-md text-black bg-white px-4 py-2'>Get Started For Free</Link>
      
      </section>

      <section className='about justify-center md:flex md:justify-around items-center pt-16'>

        <article>

          <h1 className='font-bold text-3xl md:text-left'>Accurate Responses with Leading Gen AI Chatbot Technology, Eliminating Wait Times and Access Barriers.</h1>
          <p className='font-semibold mt-4 mb-6'>Empower your agency to deliver instant, accurate responses to citizens. 
            Say goodbye to long wait times and inaccessible information with our leading Gen AI chatbot solution.
          </p>
          <Link className='artcle-link capitalize flex items-center rounded-md text-white px-4 py-2' to='/login'>Try It Now</Link>
        
        </article>

        <img src={image1} alt='' />

      </section>

      <section className='how flex items-center justify-center flex-col md:p-16'>

        <h1 className='font-bold text-center text-3xl md:mt-16 mb-8'>How It Works? Watch Now</h1>

        <div className='watch-now'>
          <img src={video} alt='' id='watch' />
        </div>

      </section>

      <Uses />

      <section className='try flex flex-col mt-16 items-center justify-center text-center'>

        <div className='flex flex-col items-center justify-center text-center mt-16 mb-16'>
          <p className='text-white font-semibold md:mt-32 md:mb-8 md:text-lg'>Adopt our AI to modernize your agency interaction with the public and elevate citizens engagement.</p>
          <Link className='try-link capitalize flex items-center rounded-md mb-44 text-white px-4 py-2' to='/login'>Try It Now</Link>
        </div>

      </section>

    </div>
  )
}

export {Main}