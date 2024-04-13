import React, {useState} from 'react'
import image from './images/Rectangle22.png'
import eye from './images/eye.png'
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

const Signup = () => {

    const navigate = useNavigate();

    const [state, setState] = useState({ first_name: "", last_name: "", username: "", email: "", password: "", password2: "" });

    const handleChange = (e) => {
      const value = e.target.value;
      setState({
        ...state,
        [e.target.name]: value
      });
    };

    const handleSubmit = (e) => {
      e.preventDefault();
      const userData = {
        first_name: state.first_name,
        last_name: state.last_name,
        username: state.username,
        email: state.email,
        password: state.password,
        password2: state.password2,
      };
      axios.post("https://chatbotapi0.onrender.com/register", userData).then((response) => {
        console.log(response, response.data);
        localStorage.setItem('signup-id', JSON.stringify(response))

        navigate("/chat")
      });
    };

  return (
    <div className='signup md:flex md:justify-between'>

        <img src={image} alt='' />

        <aside className='flex flex-col justify-center p-8'>

            <h1 className='capitalize font-bold text-3xl'>get started</h1>

            <span className='font-semibold mt-4 text-sm'> Already have an account? 
                <Link className='capitalize text-blue-700 font-bold' to='/login'>login</Link> 
            </span>

            <form onSubmit={handleSubmit} className='flex flex-col mt-8 md:w-3/6'>

                <div className='mt-4 border-2 border-black rounded-lg'>
                    <input type='text' placeholder='Firstname' className='input border-none outline-none'           
                        name="first_name"
                        value={state.first_name}
                        onChange={handleChange}
                    />
                </div>

                <div className='mt-4 border-2 border-black rounded-lg'>
                    <input type='text' placeholder='Lastname' className='input border-none outline-none'           
                        name="last_name"
                        value={state.last_name}
                        onChange={handleChange}
                    />
                </div>

                <div className='mt-4 border-2 border-black rounded-lg'>
                    <input type='text' placeholder='Username' className='input border-none outline-none'           
                        name="username"
                        value={state.username}
                        onChange={handleChange}
                    />
                </div>

                <div className='mt-4 border-2 border-black rounded-lg'>
                    <input type='email' placeholder='Email address' className='input border-none outline-none' 
                        name="email"
                        value={state.email}
                        onChange={handleChange}
                    />
                </div>

                <div className='mt-4 border-2 border-black rounded-lg flex justify-between items-center'>
                    <input type='password' placeholder='Password' className='input border-none outline-none' 
                        name="password"
                        value={state.password}
                        onChange={handleChange}
                    />
                    <img src={eye} alt='' />
                </div>

                <div className='mt-4 border-2 border-black rounded-lg flex justify-between items-center'>
                    <input type='password' placeholder='Password' className='input border-none outline-none' 
                        name="password2"
                        value={state.password2}
                        onChange={handleChange}
                    />
                    <img src={eye} alt='' />
                </div>

                <button type='submit' className='capitalize flex justify-center items-center text-center rounded-md text-white bg-blue-700 px-4 py-2 mt-16'>Get Started</button>

            </form>

        </aside>

    </div>
  )
}

export {Signup}