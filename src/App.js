import React, { useState } from 'react';
import { init } from 'filestack-js';
import './App.css';

const App = () => {
  const apikey = 'A18L3T2eWRemxYIGwGlZsz';
  const client = init(apikey);

  const [uploadedFileHandle, setUploadedFileHandle] = useState(null);
  const [enhancedFileHandle, setEnhancedFileHandle] = useState(null);
  const [redEyeRemovalUrl, setRedEyeRemovalUrl] = useState('');

  const openFilestackEnhancePicker = () => {
    const options = {
      onUploadDone: (res) => {
        setUploadedFileHandle(res.filesUploaded[0].handle);
        alert('File uploaded successfully. Click on the "Red Eye Removal" to apply the enhancement.');
      },
    };
    const picker = client.picker(options);
    picker.open();
  };

  const applyRedEyeRemoval = () => {
    alert('Red-eye removal is under process...');
    const fileHandle = uploadedFileHandle;
    const url = `https://process.filestackapi.com/redeye/${fileHandle}`;
    setRedEyeRemovalUrl(url);
    setEnhancedFileHandle(fileHandle);
    alert('Red-eye is removed. Access your image now!');
  };

  const redirectToEnhancedImage = () => {
    window.location.href = redEyeRemovalUrl;
  };

  return (
    <div className="container">
      <div className="buttonContainer">
        {!uploadedFileHandle && (
          <button onClick={openFilestackEnhancePicker}>Remove Red Eye</button>
        )}
        {uploadedFileHandle && !enhancedFileHandle && (
          <button onClick={applyRedEyeRemoval}>Red Eye Removal</button>
        )}
        {enhancedFileHandle && (
          <button onClick={redirectToEnhancedImage}>Access Image</button>
        )}
      </div>
    </div>
  );
};

export default App;
