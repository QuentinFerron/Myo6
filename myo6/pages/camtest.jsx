import React, { useState, useRef } from 'react';
import Webcam from 'react-webcam';

const WebcamComponent = () => {
  const [deviceId, setDeviceId] = useState({});
  const webcamRef = useRef(null);

  const deviceIds = React.useMemo(
    () =>
      navigator.mediaDevices
        .enumerateDevices()
        .then(devices => devices.filter(device => device.kind === 'videoinput'))
        .then(devices => devices.map(device => device.deviceId)),
    []
  );

  const handleDevices = React.useCallback(
    mediaDevices =>
      setDeviceId(mediaDevices.map(mediaDevice => mediaDevice.deviceId)),
    []
  );

  const handleStartCaptureClick = React.useCallback(() => {
    navigator.mediaDevices
      .getUserMedia({ video: { deviceId: deviceId } })
      .then(stream => {
        const video = webcamRef.current;
        video.srcObject = stream;
        video.play();
      })
      .catch(err => {
        console.error('error:', err);
      });
  }, [deviceId]);

  return (
    <div>
      <Webcam
        ref={webcamRef}
        audioConstraints={false}
        deviceId={deviceId}
        onUserMedia={handleDevices}
      />
      <button onClick={handleStartCaptureClick}>Démarrer la capture</button>
    </div>
  );
};

export default WebcamComponent;