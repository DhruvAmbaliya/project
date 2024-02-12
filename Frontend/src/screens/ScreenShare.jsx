import React from "react";
import { ReactMediaRecorder, useReactMediaRecorder } from 'react-media-recorder';

function Recorder(){
    const {status, startRecording, stopRecording, mediaBlobUrl, clearBlobUrl} = useReactMediaRecorder({screen:true});
    
    const handleStopRecording = () => {
        stopRecording();
        clearBlobUrl(); // Clear mediaBlobUrl when stopping recording
    };

    return(
        <div>
            <p>{status}</p>
            <button onClick={startRecording}>Start Sharing</button> 
            <button onClick={handleStopRecording}>Stop Sharing</button>
            <video src={mediaBlobUrl} width={500} height={500} autoPlay controls ></video>
        </div>
    )
}
    
export default Recorder;
