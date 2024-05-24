import './App.css'
import React, { useState,useRef, useEffect} from "react";
import ReactPlayer from "react-player";





const App = ()=>{
 const [url, setUrl] = useState();
 const [captions, setCaptions] = useState([]);
 const [newCaption, setNewCaption] = useState({ text: '', time: '' });
 const videoRef = useRef(null);
 const [currentCaption, setCurrentCaption] = useState('');

 const handleInputChange = (e) => {
   const { name, value } = e.target;
   setNewCaption({ ...newCaption, [name]: value });
 };

 const addCaption = () => {
   setCaptions([...captions, newCaption]);
   setNewCaption({ text: '', time: '' });
 };

 useEffect(() => {
   const interval = setInterval(() => {
     if (videoRef.current) {
       const currentTime = videoRef.current.currentTime;
       const caption = captions.find(
         (caption) => Math.abs(currentTime - caption.time) < 0.5
       );
       if (caption) {
         setCurrentCaption(caption.text);
       } else {
         setCurrentCaption('');
       }
     }
   }, 500);

   return () => clearInterval(interval);
 }, [captions]);

return (
   <div >
    <div>
   <div>
    <label className='text-xl'>Video URL :</label>
    <input className="rounded-full h-7 w-64 border border-black m-2 p-2"
     type = "string" placeholder = "Paste-here" onChange={(e)=>{setUrl(e.target.value)}}/>
    </div>
   
    <ReactPlayer className='m-2 p-2 ' ref={videoRef}   controls={true} url={url} type="video/mp4" />
    </div>
      <div className="caption">{currentCaption}</div>
      <div className="controls">
        <input
        className='rounded-md border border-black pl-2 m-2'
          type="text"
          name="text"
          placeholder="Caption text"
          value={newCaption.text}
          onChange={handleInputChange}
        />
        <input
         className='rounded-md border border-black pl-2 m-2'
          type="number"
          name="time"
          placeholder="Time in seconds"
          value={newCaption.time}
          onChange={handleInputChange}
        />
        <button className='hover:text-white hover:bg-blue-700 rounded-md  border border-black pl-2 w-32' onClick={addCaption}>Add Caption</button>
      </div>
      <ul>
        {captions.map((caption, index) => (
          <li key={index}>
            {caption.time}s: {caption.text}
          </li>
        ))}
      </ul>
    </div>
  )}


export default App;
















