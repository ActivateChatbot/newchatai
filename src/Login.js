import React, { useEffect, useState } from 'react'
import image from './images/Rectangle22.png'
import eye from './images/eye.png'
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

const Login = () => {

    const [data, setData] = useState({ username: "", password: "" });

    const navigate = useNavigate();

    useEffect(() => {
      if (localStorage.getItem('user-info')) {
        //navigate("/exam")
        //const userData = localStorage.getItem('user-info')
        //alert(userData)
      }
    }, [])

    const handleChange = (e) => {
      const value = e.target.value;
      setData({
        ...data,
        [e.target.name]: value
      });
    };

    const handleSubmit = (e) => {
      e.preventDefault();

      const userData = {
        username: data.username,
        password: data.password
      };
      axios
        .post("https://chatbotapi0.onrender.com/api-token-auth/", userData)
        .then((response) => {
          
          console.log(response, response.data.token);
          //console.log(document.cookie)
          localStorage.setItem('user-info', JSON.stringify(response))

          const userData = localStorage.getItem('user-info')

          const userdetail = JSON.parse(userData)

          if (userdetail.data.type === 'admin') {
            navigate("/admin")
          } else {
            navigate("/chat")
          }

        })
        .catch((error) => {
          if (error.response) {
            console.log(error.response);
            console.log("server responded");
          } else if (error.request) {
            console.log("network error");
          } else {
            console.log(error);
          }
        });
    };


  return (
    <div className='signup flex justify-between'>

        <img src={image} alt='' />

        <aside className='flex flex-col justify-center p-8'>

            <h1 className='capitalize font-bold text-3xl'>login</h1>

            <span className='font-semibold mt-4 text-sm'> Don't have an account? 
                <Link className='capitalize font-bold' to='/signup' style={{color: '#52018E'}}> register</Link> 
            </span>

            <form onSubmit={handleSubmit} className='flex flex-col mt-8 md:w-3/6'>

                <div className='mt-4 border-2 border-black rounded-lg'>
                    <input type='text' placeholder='Username' className='input border-none outline-none' 
                        name='username' value={data.username} 
                        required
                        onChange={handleChange}
                    />
                </div>

                <div className='mt-4 border-2 border-black rounded-lg flex justify-between items-center'>
                    <input type='password' placeholder='Password' className='input border-none outline-none' 
                        name='password'
                        value={data.password} required
                        onChange={handleChange}
                    />
                    <img src={eye} alt='' />
                </div>

                <button type='submit' className='capitalize flex justify-center items-center text-center rounded-md text-white px-4 py-2 mt-16' style={{background: '#52018E'}}>login</button>

            </form>

        </aside>

    </div>
  )
}

export {Login}