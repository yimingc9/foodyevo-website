import React, { useState } from 'react';

const ImageUploadComponent = () => {
  const [uploadedImage, setUploadedImage] = useState(null);
  const [uploadText, setUploadText] = useState('');

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setUploadedImage(URL.createObjectURL(file));
      
      setUploadText(`Meal uploaded successfully! \n Nutrition Facts: 250 cal`);
    }
  };

  return (
    <div className="image-upload-container flex flex-wrap">
      <div className="flex items-center justify-center w-full lg:w-5/6">

        <input type="file" onChange={handleImageChange} accept="image/*" />
        {uploadedImage && (
          <div>
            <img src={uploadedImage} alt="Uploaded" style={{ width: '50%', height: 'auto' }} />
            <p>{uploadText}</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ImageUploadComponent;
