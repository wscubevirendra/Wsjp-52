
import { useState } from "react";
import { CiHeart } from "react-icons/ci";
import { IoIosHeartDislike } from "react-icons/io";

function ShowData(props) {
    console.log(props)
    const [toggle, settoggle] = useState(true)
    
    function toggleHandler() {
      settoggle(!toggle)
    }
  
    return (
      <div className='col-3 border border-primary'>
        <img width="220" height="200" src={props.image} alt="" />
        <div className='text-center mt-4'>
          {
            toggle == true ?
              <CiHeart onClick={toggleHandler} className='fs-1' />
              :
              <IoIosHeartDislike onClick={toggleHandler} className='fs-1' />
          }
  
        </div>
      </div>
    )
  
  }
  
  
  export default ShowData