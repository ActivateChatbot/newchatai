import React from 'react'

const Uses = () => {
  return (

    <div className='cases flex flex-col justify-center items-center'>

      <h1 className='font-bold text-3xl'>Our Use Cases</h1>

      <p className='mt-4 font-semibold text-center mb-8'>Exploring AI Chatbot solutions Across Diverse Industries: Real-world Applications</p>

      <section className='uses flex justify-between items-center'>

        <div className='use flex flex-col rounded-md' id='use1'>
          <p className='inner text-white flex items-start text-left pl-4 py-6 mt-56 capitalize font-semibold rounded-b-md rounded-l-md'>governor's mission</p>
        </div>

        <div className='use flex flex-col rounded-lg' id='use2'>
          <p className='inner text-white flex items-start text-left pl-4 py-6 mt-56 capitalize font-semibold rounded-b-md rounded-l-md'>health services</p>
        </div>

      </section>

      <section className='uses flex justify-between items-center'>

        <div className='use flex flex-col rounded-lg' id='use3'>
          <p className='inner text-white flex items-start text-left pl-4 py-6 mt-56 capitalize font-semibold rounded-b-md rounded-l-md'>Arts & Culture</p>
        </div>

        <div className='use flex flex-col rounded-md' id='use4'>
          <p className='inner text-white flex items-start text-left pl-4 py-6 mt-56 capitalize font-semibold rounded-b-md rounded-l-md'>Educational Resources</p>
        </div>

      </section>

      <section className='uses flex justify-between items-center'>

        <div className='use flex flex-col rounded-md' id='use5'>
          <p className='inner text-white flex items-start text-left pl-4 py-6 mt-64 capitalize font-semibold rounded-b-md rounded-l-md'>Sports</p>
        </div>

        <div className='use flex flex-col rounded-lg' id='use6'>
          <p className='inner text-white flex items-start text-left pl-4 py-6 mt-64 capitalize font-semibold rounded-b-md rounded-l-md'>Tourism Information</p>
        </div>

      </section>

      <section className='uses flex justify-between items-center'>

        <div className='use flex flex-col rounded-lg' id='use7'>
          <p className='inner text-white flex items-start text-left pl-4 py-6 mt-52 capitalize font-semibold rounded-b-md rounded-l-md'>Security Measures</p>
        </div>

        <div className='use flex flex-col rounded-md' id='use8'>
          <p className='inner text-white flex items-start text-left pl-4 py-6 mt-52 capitalize font-semibold rounded-b-md rounded-l-md'>Investment Guidance</p>
        </div>

      </section>

    </div>
  )
}

export {Uses}