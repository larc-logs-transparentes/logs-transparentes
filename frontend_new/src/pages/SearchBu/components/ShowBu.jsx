import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Bu from './Bu';
import Result from './Result';
function ShowBu() {
//   const [buData, setBuData] = useState(null);

//   useEffect(() => {
    
//     axios.get('/bu')
//       .then(response => {   setBuData(response.data);})
//   }, []); 

    
  return (
    <div className='flex place-content-center p-[20px]'>

      <div className='flex-col space-y-[20px]'>     
      <Bu/>
      <Result/>
      </div>

    </div>
  );
}

export default ShowBu;
