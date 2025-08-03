import React from 'react'

const Nav = () => {
    return (
        <div className=' text-white  font-quicksand'>
            <div className='flex justify-between items-center px-5 sm:px-10 py-2 '>
                <span className='font-bold text-[15px] md:text-[25px] sm:text-[20px] '>
                    Sticky Wall
                </span>
                <ul className='flex gap-2 md:gap-5 flex-row '>
                    <li className='flex justify-end'><button className='btn-1 cursor-pointer hover:bg-[#686262] w-[30px] h-[25px] sm:w-[80px] rounded-[20px] sm:h-[28px] bg-[#2e2b2b] flex items-center justify-center'>Home</button></li>
                    <li><button className='btn-2 cursor-pointer hover:bg-[#686262] w-[105px] rounded-[20px] h-[28px] bg-[#2e2b2b] flex items-center justify-center'>All Tasks</button></li>
                </ul>
            </div>
        </div>
    )
}

export default Nav
