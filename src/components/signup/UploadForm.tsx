import { buttonStyle } from '@/constants/styles';
import { SectionProps } from '@/types/signup';
import React, { useState } from 'react';
import { FaCloudUploadAlt } from 'react-icons/fa';

const UploadForm = (props: SectionProps) => {
  const { formData, onChange, onNext, error, handleError, setFormData } = props;
  const [uploadProgress, setUploadProgress] = useState<number>(0);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target?.files && event.target.files[0]) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setSelectedImage(e.target?.result as string);
      };
      reader.readAsDataURL(event.target.files[0]);
    }
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const request = new Request('/api/upload', {
      method: 'POST',
      body: formData,
    });

    try {
      const response = await fetch(request);
      console.log(response);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="mb-4">
        <label className="block text-gray-700 font-bold mb-2" htmlFor="image">
          <FaCloudUploadAlt className="mr-2" />
          Upload Image
        </label>
        <input
          className="border rounded-lg py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          type="file"
          name="image"
          id="image"
          onChange={handleImageChange}
        />
      </div>
      {selectedImage && (
        <div className="mb-4">
          <img
            src={selectedImage}
            alt="Preview"
            className="w-64 h-64 object-contain mx-auto"
          />
        </div>
      )}
      <div className="mb-4">
        <button
          type="submit"
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        >
          Upload
        </button>
      </div>
    </form>
  );
};

export default UploadForm;
