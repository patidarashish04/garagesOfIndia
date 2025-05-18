import React, { useRef } from 'react';

const PhotoGallery = ({ photos = [], setPhotos }) => {
  const fileInputRef = useRef(null);

  const handlePhotoUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        // Append new photo to the gallery
        setPhotos(prev => [...prev, reader.result]);

        // TODO: Send reader.result to backend via Axios if needed
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="mt-4">
      <div className="text-lg font-semibold mb-2">Photos</div>
      <div className="flex gap-3 overflow-x-auto">
        {photos.map((src, index) => (
          <img key={index} src={src} alt={`photo-${index}`} className="h-24 w-32 object-cover rounded border" />
        ))}
      </div>

      {/* Upload Button */}
      <div className="mt-2">
        <button
          className="text-sm text-blue-600 underline"
          onClick={() => fileInputRef.current.click()}
        >
          Upload Photo
        </button>
        <input
          type="file"
          accept="image/*"
          ref={fileInputRef}
          onChange={handlePhotoUpload}
          hidden
        />
      </div>
    </div>
  );
};

export default PhotoGallery;
