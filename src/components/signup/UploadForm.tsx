import { buttonStyle } from '@/constants/styles';
import { SectionProps } from '@/types/signup';
import Image from 'next/image';
import React, { useState } from 'react';
import { FaCloudUploadAlt } from 'react-icons/fa';
import { FiUpload } from 'react-icons/fi';

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
          Image
        </label>
        <div className="relative">
          <input
            className="sr-only"
            id="image"
            name="image"
            type="file"
            onChange={handleImageChange}
          />
          <div className="h-48 w-full border-dashed border-2 border-gray-300">
            {selectedImage ? (
              <div className="w-64 h-64">
                <Image
                  src={selectedImage}
                  alt={`passPort`}
                  layout="fill"
                  className="object-contain mx-auto"
                />
              </div>
            ) : (
              <label
                htmlFor="image"
                className="flex flex-col p-8 items-center justify-center h-full text-gray-400"
              >
                <p className="mb-2">
                  <FiUpload className="h-8 w-8" />
                </p>
                <p className="text-sm">Upload your passport</p>
              </label>
            )}
          </div>
          <div className="absolute bottom-0 right-0 p-2 bg-white rounded-md">
            <label
              htmlFor="image"
              className="cursor-pointer flex items-center justify-center"
            >
              <FiUpload className="h-6 w-6 mr-2" />
              Change
            </label>
          </div>
        </div>
      </div>
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
