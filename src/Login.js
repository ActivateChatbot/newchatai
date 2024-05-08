import React, { useEffect, useState } from 'react'
import image from './images/Rectangle22.png'
import eye from './images/eye.png'
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import logo from "./images/Logo3.png";

const Login = () => {

    const [data, setData] = useState({ username: "", password: "" });

    const [loading, setLoading] = useState(false);

    const navigate = useNavigate();

    useEffect(() => {
      if (localStorage.getItem('user-info')) {
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
      setLoading(true);

      const userData = {
        username: data.username,
        password: data.password
      };
      axios
        //.post("https://chatbotapi0.onrender.com/api-token-auth/", userData)
        .post("http://ec2-13-49-70-103.eu-north-1.compute.amazonaws.com/api-token-auth/", userData)
        .then((response) => {
          
          //console.log(response, response.data.token);
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

        })
        .finally(() => {
            setLoading(false); 
        });

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
  


  return (
    <div className='signup flex justify-between'>

        <Link to="/"> <img src={logo} alt='' className='formlogo absolute' id="formlogo" /> </Link>

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

                <button type='submit'  style={{background: '#52018E'}} disabled={loading}
                    className='capitalize flex justify-center items-center text-center rounded-md text-white px-4 py-2 mt-16'>
                    {loading ? <LoadingDots /> : "Login"}
                </button>

            </form>

        </aside>

    </div>
  )
}

export {Login}