import React, { useState } from 'react';
import UploadForm from './components/UploadForm';
import ContentView from './components/ContentView';


const App = () => {
  const [uploadedFiles, setUploadedFiles] = useState([]);

  const handleUpload = (files) => {
    setUploadedFiles([...uploadedFiles, ...files]);
  };

  return (
    <div>
      <UploadForm onUpload={handleUpload} />
      <ContentView uploadedFiles={uploadedFiles} />
    </div>
  );
};

export default App;




