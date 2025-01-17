import React, { useState } from "react";
import hamburger from '../images/hamdark.png'
import close from '../images/Frame.png'
import logo from "../images/Logo2.png";
import logout from "../images/logout.png";
import { Fragment } from 'react'
import { Transition, Dialog } from '@headlessui/react'
import { useNavigate, Link } from "react-router-dom";

const Chatbar = () => {

    const [open, setOpen] = useState(false)
    const [nav, setNav] = useState(false);
    const navigate = useNavigate();

    const links = [
      {
        id: 1,
        link: "home",
      },
      {
        id: 2,
        link: "about",
      },
      {
        id: 3,
        link: "use cases",
      },
      {
        id: 4,
        link: "contact us",
      },
    ];

    function logoutfunc() {
      localStorage.clear();
      navigate("/login");
    }

  return (
    <>

        <div onClick={() => setOpen(!open)} className="toggler md:hidden">

            {open ? <img src={close} alt='logo' width='40' height='40'/> : 
              <img src={hamburger} alt='logo' width='30' height='30'/>
            }

        </div>

        <Transition.Root show={open} as={Fragment}>

            <Dialog as="div" className="relative z-10" onClose={setOpen}>

            <Transition.Child
            as={Fragment}
            enter="ease-in-out duration-500"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in-out duration-500"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
            >
            <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
            </Transition.Child>

            <div className="fixed inset-0 overflow-hidden">

                <div className="absolute inset-0 overflow-hidden">

                    <div className="pointer-events-none fixed inset-y-0 left-0 flex max-w-full pl-10">

                      <Transition.Child
                        as={Fragment}
                        enter="transform transition ease-in-out duration-500 sm:duration-700"
                        enterFrom="translate-x-full"
                        enterTo="translate-x-0"
                        leave="transform transition ease-in-out duration-500 sm:duration-700"
                        leaveFrom="translate-x-0"
                        leaveTo="translate-x-full"
                      >
                        <Dialog.Panel className="pointer-events-auto relative w-screen max-w-md">

                            <Transition.Child
                              as={Fragment}
                              enter="ease-in-out duration-500"
                              enterFrom="opacity-0"
                              enterTo="opacity-100"
                              leave="ease-in-out duration-500"
                              leaveFrom="opacity-100"
                              leaveTo="opacity-0"
                            >
                              <div className="absolute left-0 top-0 -ml-8 flex pr-2 pt-4 sm:-ml-10 sm:pr-4">
                                <button
                                  type="button"
                                  className="relative rounded-md text-gray-300 hover:text-white focus:outline-none focus:ring-2 focus:ring-white"
                                  onClick={() => setOpen(false)}
                                >
                                  <span className="absolute -inset-2.5" />
                                  <span className="sr-only">Close panel</span>
                                  <img src={close} alt='logo' width='40' height='40' />
                                </button>
                              </div>

                            </Transition.Child>

                            <div className="flex h-full flex-col overflow-y-scroll bg-white py-6 shadow-xl">

                                <div className="flex justify-between items-center px-4 sm:px-6">

                                    <img src={logo} alt="" id="logo3" />

                                    <button className="btn-logout" onClick={logoutfunc}>
                                      <img src={logout} alt="" className="logout" />
                                    </button>

                                </div>

                                <div className="relative mt-6 flex-1 px-4 sm:px-6">                   

                                    {links.map(({ id, link }) => (
                                      <div
                                        key={id} className='mt-4'
                                      >
                                        <a className='capitalize font-semibold' onClick={() => setNav(!nav)} href={link}>
                                          {link}
                                        </a>
                                      </div>
                                    ))}
                                  
                                    <Link to='/signup' className='mobilestart capitalize flex justify-center items-center text-center rounded-md text-white px-4 py-2'>Get Started</Link>

                                </div>

                            </div>

                        </Dialog.Panel>

                      </Transition.Child>

                    </div>

                </div>

            </div>

            </Dialog>

        </Transition.Root>

    </>
  )
}

export {Chatbar}