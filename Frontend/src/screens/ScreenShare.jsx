import React, { useEffect } from "react";
import { useReactMediaRecorder } from 'react-media-recorder-2';

const Recorder = ()=> {
    const {status, startRecording, stopRecording, mediaBlobUrl, clearBlobUrl} = 
    useReactMediaRecorder({
        screen:true,
        // video: {type: "video/mp4"},
        // audio: { type: "audio/wav" },
    });
    
    const handleStopRecording = () => {
        stopRecording();
        clearBlobUrl(); 
        // Clear mediaBlobUrl when stopping recording
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

// import React, { useEffect, useState } from 'react';
// import RecordRTC from 'recordrtc';

// const Recorder = () => {
//   const [recording, setRecording] = useState(null);
//   const [mediaBlobUrl, setMediaBlobUrl] = useState(null);

//   const startRecording = async () => {
//     const stream = await navigator.mediaDevices.getUserMedia({ audio: true, });
//     const recorder = RecordRTC(stream, { type: 'screen' });
//     recorder.startRecording();
//     setRecording(recorder);
//   };

//   const stopRecording = () => {
//     if (recording) {
//       recording.stopRecording(() => {
//         const blob = recording.getBlob();
//         const url = URL.createObjectURL(blob);
//         setMediaBlobUrl(url);
//       });
//     }
//   };

//   useEffect(() => {
//     return () => {
//       if (recording) {
//         recording.destroy();
//       }
//     };
//   }, [recording]);

//   return (
//     <div>
//       <p>{mediaBlobUrl ? 'Recording stopped' : 'Recording...'}</p>
//       <button onClick={startRecording}>Start Sharing</button>
//       <button onClick={stopRecording} disabled={!recording}>Stop Sharing</button>
//       <button onClick={() => startRecording({ audio: { mediaSource: 'screen' } })}>Start Screen Share</button>
//       {mediaBlobUrl && <audio src={mediaBlobUrl} width={500} height={500} autoPlay controls></audio>}
//     </div>
//   );
// };

// export default Recorder;
