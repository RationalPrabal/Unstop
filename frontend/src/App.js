
import axios from 'axios';
import './App.css';
import SeatComponent from './components/SeatComponent';
import { useEffect, useState } from 'react';
import { useToast } from '@chakra-ui/react';
function App() {

  const [seats,setSeats]= useState(null)
  const [numOfSeats,setNumOfSeats]= useState(0)
  const [bookedSeats,setBookedSeats]= useState(null)
const toast=useToast()
  const getSeats=async()=>{
    try {
      let seats=await axios.get(`${process.env.backned_URL}`)
     
      setSeats(seats.data)
    } catch (error) {
      console.log(error.message)
    }
  }

  const bookSeats=async()=>{
    if(+numOfSeats>7){
      toast({
        title: 'You can books seats between 1 to 7 only',
        status: 'error',
        duration: 6000,
        isClosable: true,
      })
      return
    }
    const data={
      seats:+numOfSeats
    }

try {
 let result=await axios.patch(`${process.env.backned_URL}/bookSeat`,data)
 
 setBookedSeats(result.data)
getSeats()
} catch (error) {
  console.log(error.message)
}
  }

  const ResetSeats = async() =>{
try {
  await axios.post(`${process.env.backned_URL}/postSeats`)
  getSeats()
} catch (error) {
  console.log(error.message)
}
  }
useEffect(()=>{
getSeats()
},[])
  return (
    <div className='flex justify-between text-white font-bold'>
   <div className='grid grid-cols-7 w-[80%]'>
    {
      seats?.map(el=><SeatComponent key={el._id} {...el} />)
    }
 
   </div>
<div className="w-[20%] mt-20">
<input className='text-black' type='number' placeholder='Number of seats to book' onChange={(e)=>setNumOfSeats(e.target.value)}/>
<br></br>
<button className='bg-green-600 py-1 px-4 rounded-md mt-2' onClick={bookSeats}>Book</button>
<br></br>
<button className='bg-blue-600 px-4 py-2 rounded-md mt-4' onClick={ResetSeats}>Reset Seats</button>
{ bookedSeats&&
<div className='grid mt-10 items-center '>

  <p className='text-black'>Seats Alloted:</p>
  {bookedSeats.length>0 ?  <div className='grid grid-cols-4 '>
{
  bookedSeats.map(el=>{
  return  <div  className='bg-green-400 p-3 py-2 mr-4 mt-3'>{el}</div>
  })
}
  
</div>: <p className='text-red-500'>No Sufficient Seats</p>}
</div>}
</div>
   </div>
  );
}

export default App;
