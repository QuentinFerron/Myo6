// import React, { useState } from 'react';

// function VideoRecorder() {
//    const [stream, setStream] = useState(null);
//    const [recording, setRecording] = useState(false);
//    const [videoBlob, setVideoBlob] = useState(null);

//    const startRecording = async () => {
//      try {
//        const stream = await navigator.mediaDevices.getUserMedia({ video: true });
//        setStream(stream);

//        const mediaRecorder = new MediaRecorder(stream, { mimeType: 'video/webm' });
//        const chunks = [];

//        mediaRecorder.addEventListener('dataavailable', (event) => {
//          chunks.push(event.data);
//        });

//        mediaRecorder.addEventListener('stop', () => {
//          const videoBlob = new Blob(chunks, { type: 'video/webm' });
//          setVideoBlob(videoBlob);
//          setRecording(false);
//        });

//        mediaRecorder.start();
//        setRecording(true);

//        setTimeout(() => {
//          mediaRecorder.stop();
//        }, 10000); // Enregistrement de 10 secondes
//      } catch (error) {
//        console.error('Erreur lors de laccès à la caméra :', error);
//      }
//    };

//    const sendVideoToAPI = async () => {
//      if (videoBlob) {
//        try {
//          const response = await fetch('https://myo6.duckdns.org/upload/video', {
//            method: 'POST',
//            headers: {
//            'X-API-Key': 'q9567FXn71h6Xgio9htWjMNUsC2NBkpd' // Ajout de la clé API dans les en-têtes
//          },
//          body: {'file': '/home/myo6/Myo6Pi/Data/ID_19/video.avi', videoBlob,}
        
//        });

//          if (response.ok) {
//            console.log('Vidéo envoyée avec succès');
//          } else {
//            console.error('Erreur lors de lenvoi de la vidéo');
//          }
//        } catch (error) {
//          console.error('Erreur lors de lenvoi de la vidéo :', error);
//        }
//      }
//    };

//    return (
//      <div>
//        <button onClick={startRecording} disabled={recording}>
//          {recording ? 'Enregistrement en cours...' : 'Démarrer lenregistrement'}
//        </button>
//        {videoBlob && (
//          <div>
//            <video src={URL.createObjectURL(videoBlob)} controls />
//            <button onClick={sendVideoToAPI}>Envoyer la vidéo à l'API</button>
//          </div>
//        )}
//      </div>
//    );
//  }

// export default VideoRecorder;

/////////////////////////////////////////////////////////////////////////////////////////////////////

// import React, { useState } from 'react';

// const API_KEY = 'q9567FXn71h6Xgio9htWjMNUsC2NBkpd';
// const HEADER = { 'X-API-Key': API_KEY };
// const SERVER_URL = `${link}/upload/video`;

// function VideoRecorder() {
//   const [stream, setStream] = useState(null);
//   const [recording, setRecording] = useState(false);
//   const [videoBlob, setVideoBlob] = useState(null);
//   const [uploadSuccess, setUploadSuccess] = useState(false);
//   const [uploadError, setUploadError] = useState(null);
//   const [videoPath, setVideoPath] = useState('');
//   const [response, setResponse] = useState(null);

//   const startRecording = async () => {
//     try {
//       const stream = await navigator.mediaDevices.getUserMedia({ video: true });
//       setStream(stream);
//       const mediaRecorder = new MediaRecorder(stream, { mimeType: 'video/webm' });
//       const chunks = [];
//       mediaRecorder.addEventListener('dataavailable', (event) => {
//         chunks.push(event.data);
//       });
//       mediaRecorder.addEventListener('stop', () => {
//         const videoBlob = new Blob(chunks, { type: 'video/webm' });
//         setVideoBlob(videoBlob);
//         setRecording(false);
//       });
//       mediaRecorder.start();
//       setRecording(true);
//       setTimeout(() => {
//         mediaRecorder.stop();
//       }, 10000); // Enregistrement de 10 secondes
//     } catch (error) {
//       console.error('Erreur lors de l\'accès à la caméra :', error);
//     }
//   };

//   const sendVideoToAPI = async () => {
//     if (videoBlob) {
//       try {
//         const response = await fetch('https://myo6.duckdns.org/upload/video', {
//           method: 'POST',
//           files : videoBlob,
//           data : {'video_path': '/home/myo6/Myo6Pi/Data/ID_19/video.avi'},
//           headers: {
//             'X-API-Key': 'q9567FXn71h6Xgio9htWjMNUsC2NBkpd',
//           },
//         });

//         if (response.ok) {
//           console.log('Vidéo envoyée avec succès');
//           setUploadSuccess(true);
//           setUploadError(null);
//         } else {
//           console.error('Erreur lors de l\'envoi de la vidéo');
//           setUploadSuccess(false);
//           setUploadError(`Failed to upload video. Status code: ${response.status}`);
//         }
//       } catch (error) {
//         console.error('Erreur lors de l\'envoi de la vidéo :', error);
//         setUploadSuccess(false);
//         setUploadError(`Error occurred: ${error.message}`);
//       }
//     }
//   };

//   return (
//     <div>
//       <button onClick={startRecording} disabled={recording}>
//         {recording ? 'Enregistrement en cours...' : 'Démarrer l\'enregistrement'}
//       </button>
//       {videoBlob && (
//         <div>
//           <video src={URL.createObjectURL(videoBlob)} controls />
//           <button onClick={sendVideoToAPI}>Envoyer la vidéo à l'API</button>
//           {uploadSuccess && <p>Vidéo envoyée avec succès !</p>}
//           {uploadError && <p>{uploadError}</p>}
//         </div>
//       )}
//     </div>
//   );
// }

// export default VideoRecorder;

import React, { useState } from 'react';

const API_KEY = 'q9567FXn71h6Xgio9htWjMNUsC2NBkpd';
const HEADER = { 'X-API-Key': API_KEY };
const SERVER_URL = "https://myo6.duckdns.org/upload/video";

function VideoRecorder() {
  const [stream, setStream] = useState(null);
  const [recording, setRecording] = useState(false);
  const [videoBlob, setVideoBlob] = useState(null);

  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true });
      setStream(stream);
      const mediaRecorder = new MediaRecorder(stream, { mimeType: 'video/webm' });
      const chunks = [];
      mediaRecorder.addEventListener('dataavailable', (event) => {
        chunks.push(event.data);
      });
      mediaRecorder.addEventListener('stop', () => {
        const videoBlob = new Blob(chunks, { type: 'video/webm' });
        setVideoBlob(videoBlob);
        setRecording(false);
      });
      mediaRecorder.start();
      setRecording(true);
      setTimeout(() => {
        mediaRecorder.stop();
      }, 10000); // Enregistrement de 10 secondes
    } catch (error) {
      console.error('Erreur lors de laccès à la caméra :', error);
    }
  };

  const sendVideoToAPI = async () => {
    const formData = new FormData();
    formData.append('file', videoBlob);
    formData.append('video_path', videoBlob.name);

    try {
      const response = await fetch(SERVER_URL, {
        method: 'POST',
        headers: HEADER,
        body: formData,
      });
      const data = await response.json();
      console.log('Réponse de lAPI :', data);
    } catch (error) {
      console.error('Erreur lors de lenvoi de la vidéo :', error);
    }
  };
  

  return (
    <div>
      <button onClick={startRecording} disabled={recording}>
        {recording ? 'Enregistrement en cours...' : 'Démarrer lenregistrement'}
      </button>
      {videoBlob && (
        <div>
          <video src={URL.createObjectURL(videoBlob)} controls />
          <button onClick={sendVideoToAPI}>Envoyer la vidéo à l'API</button>
        </div>
      )}
    </div>
  );
}

export default VideoRecorder;