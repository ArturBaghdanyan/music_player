import React, { ChangeEvent, useState } from 'react';
import style from './styles.module.scss';
import { useCard } from '../context/SongContext';


const MusicUploadForm = () => {
  const { setSelectedFiles, selectedFiles } = useCard();
  const [isUploading, setIsUploading] = useState(false);
  const [uploadError, setUploadError] = useState<string | null>(null);
  
  const API_URL = process.env.REACT_APP_API_URL as any;

  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files.length > 0) {
      const newFiles = Array.from(event.target.files);
      // Append new files to the existing selectedFiles array
      setSelectedFiles([...selectedFiles, ...newFiles]);    
    }
  };

  const onSubmit = async (files: any) => {
    console.log('submitted', files);
    try {
      const formData = new FormData();
      // Append each file to the FormData object with a unique key
      files.forEach((file: any, index: any) => {
        formData.append(`file${index + 1}`, file);
      });
      
      // Make a POST request to my backend API
      const response = await fetch(API_URL, {
        method: 'POST',
        body: formData,
      });
  
      if (response.ok) {
        // successful response
        const responseData = await response.json();
        console.log('Upload successful.', responseData);
      } else {
        // error response
        const errorData = await response.json();
        console.error('Upload failed', errorData);
      }
    } catch (error) {
      console.error('Error during file upload:', error);
    }
  };

  const handleUpload = async () => {
    if (selectedFiles.length === 0) {
      //when the file is not selected, clicking will write the code below
      setUploadError('Please select a files');
      return;
    }

    setIsUploading(true);
    try {
      await new Promise((resolve) => setTimeout(resolve, 2000));
      await onSubmit(selectedFiles);
      setUploadError(null);
    } catch (error) {
      setUploadError('Upload failed. Please try again.');
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <form className={style.music_list}>
      <input
        type="file" 
        accept=".mp3, .wav" 
        onChange={handleFileChange} 
        disabled={isUploading}
      />
       {/* Show upload error if there is any */}
      {uploadError && <p style={{ color: 'red' }}>{uploadError}</p>}

      {selectedFiles.length > 0 && (
          <div className={style.music_list_error_message}>
            <p style={{color: 'red', fontSize: '20px'}}>Selected file:</p>
            <ul className={style.music_list}>
              {/* show music name */}
              {selectedFiles.map((files: any, index: string) => (
                <li key={index}>{files.name}</li>
              ))}
            </ul>
          </div>
      )}
      {/* If there is any, then show "Uploading..." */}
      {isUploading ? (
        <div>
          <p>Uploading...</p>
        </div>
      ) : (
        <button 
          onClick={handleUpload} 
          disabled={!selectedFiles} 
          className={style.music_list_upload}
        >
          {selectedFiles ? 'Upload' : 'Choose a file to upload'}
        </button>
      )}
    </form>
  );
};

export default MusicUploadForm;