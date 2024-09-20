import React from 'react'

export default function App() {
  return (
    <>
      {/* <div className='text-[22px] text bg-[#e74c3c]'>App</div>
      <div className='text-center relative w-[100px] bg-neutral-900 text-white mx-auto mt-10 p-2'>
        <h1 className='hover:text-[red] w-10 sm:text-2xl md:text-5xl lg:text-6xl duration-75 cursor-pointer'>Hello</h1>
        <div className='p-2 w-2 animate-ping absolute top-[-5px] right-[80px]  rounded-full bg-[#e74c3c]'></div>
      </div>
      <input type="text" className='border border-black' /> */}

      <div className='max-w-[1200px] grid  sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2 p-2 mx-auto border border-double'>
        <div className='border text-center  border-red-400'>1</div>
        <div className='border text-center  border-red-400'>2</div>
        <div className='border text-center lg:col-span-2  border-red-400'>3</div>

      </div>

    </>
  )
}
