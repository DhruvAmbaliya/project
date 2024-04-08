import React, { useEffect } from "react";
import { useReactMediaRecorder } from 'react-media-recorder-2';

const Recorder = ({closeModal})=> {
    const {status, startRecording, stopRecording, mediaBlobUrl, clearBlobUrl} = 
    useReactMediaRecorder({
        screen:true,
        // video: {type: "video/mp4"},
        // audio: { type: "audio/wav" },
    });
    
    const handleStopRecording = () => {
        stopRecording();
        clearBlobUrl(); // Clear mediaBlobUrl when stopping recording
    };

    return(
        <div style={{margin:10,}}>
            <button style={{margin:10,}} onClick={closeModal}>close</button>
            <button style={{margin:10,}} onClick={startRecording}>Start Sharing</button> 
            <button style={{margin:10,}} onClick={handleStopRecording}>Stop Sharing</button>
            <p>Status : {status}</p>
            <video src={mediaBlobUrl} width={600} height={400} autoPlay controls ></video>
        </div>
    )
}
    
export default Recorder;

