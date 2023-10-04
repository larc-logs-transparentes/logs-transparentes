import React, { useState, useEffect } from 'react';
import axios from 'axios';

function ShowBu() {
//   const [buData, setBuData] = useState(null);

//   useEffect(() => {
    
//     axios.get('/bu')
//       .then(response => {   setBuData(response.data);})
//   }, []); 

    
  return (
    <div className='flex place-content-center p-[20px]'>
      <div className='flex-col'>     
        <div className='w-[892px] h-[403px] border-2 border-blue-light rounded-2xl'>
            <h1 className='text-blue text-2xl font-bold p-[5px]'>Boletim de Urna</h1>
        </div>                                        
        <div className='w-[892px] h-[335px] border-2 border-blue-light rounded-2xl mt-[15px]'>
        <h1 className='text-black text-xl font-bold p-[5px]'>Eleição XYZ</h1>
        </div>                                        
        <div className='w-[892px] h-[335px] border-2 border-blue-light rounded-2xl mt-[15px]'>
        <h1 className='text-black text-xl font-bold p-[5px]'>Eleição XYZ</h1>
        </div>                                        
      </div>
    </div>
  );
}

export default ShowBu;
