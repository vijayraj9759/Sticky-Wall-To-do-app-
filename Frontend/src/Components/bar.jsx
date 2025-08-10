import React from 'react'
import {useEffect , useState} from 'react'

const bar = () => {
    const text = "\"One r  Wall, All Tasks, Total Control. \""
    const words = text.split(" ");
    const [visible, setvisible] = useState([])
    useEffect(() => {
      let i = 0;
      const interval = setInterval(() => {   
          if(i < words.length){
            setvisible((prev)=>[...prev,words[i]]);
            i++;
          }
          else{
            clearInterval(interval)
          }
      }, 100);
      return () => clearInterval(interval)
    }, [])
    
  return (
    <div className='my-[10px] font-quicksand'>
      <div className='text-[white] text-center   text-[15px] sm:text-[14px] font-bold  md:text-[15px] lg:text-[20px] px-[8px] mx-[10px]'>
        {visible.join(" ")}
      </div>
    </div>
  )
}

export default bar
