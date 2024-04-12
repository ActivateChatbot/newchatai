import React from 'react'
import image from './images/Rectangle22.png'
import eye from './images/eye.png'
import { Link } from "react-router-dom";

const Login = () => {
  return (
    <div className='signup flex justify-between'>

        <img src={image} alt='' />

        <aside className='flex flex-col justify-center p-8'>

            <h1 className='capitalize font-bold text-3xl'>login</h1>

            <span className='font-semibold mt-4 text-sm'> Don't have an account? 
                <Link className='capitalize text-blue-700 font-bold' to='/login'>register</Link> 
            </span>

            <form className='flex flex-col mt-8 w-3/6'>

                <div className='mt-4 border-2 border-black rounded-lg'>
                    <input type='text' placeholder='Username' className='input border-none outline-none' />
                </div>

                <div className='mt-4 border-2 border-black rounded-lg flex justify-between items-center'>
                    <input type='password' placeholder='Password' className='input border-none outline-none' />
                    <img src={eye} alt='' />
                </div>

                <button type='submit' className='capitalize flex justify-center items-center text-center rounded-md text-white bg-blue-700 px-4 py-2 mt-16'>login</button>

            </form>

        </aside>

    </div>
  )
}

export {Login}