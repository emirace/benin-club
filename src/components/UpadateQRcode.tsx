'use client';
import { buttonStyle } from '@/constants/styles';
import { IVehicle } from '@/models/vehicle.model';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import { FaUpload } from 'react-icons/fa';
import QRCode from 'qrcode';
import { generateSecureCode } from './QRCodeGenerator';

interface UpdateQRcodeProps {
  vehicle: IVehicle | undefined;
  handleCloseModal: () => void;
}

const UpdateQRcode: React.FC<UpdateQRcodeProps> = (
  vehicle,
  handleCloseModal
) => {
  const [dataUrl, setDataUrl] = useState('');
  const [error, setError] = useState<Error | null>(null);
  const [carPlateNumber, setCarPlateNumber] = useState(
    vehicle?.vehicle?.carPlateNumber
  );
  const [vehicleType, setVehicleType] = useState(vehicle?.vehicle?.vehicleType);
  const [vehicleColor, setVehicleColor] = useState(
    vehicle?.vehicle?.vehicleColor
  );
  const [purposeOfVehicle, setPurposeOfVehicle] = useState(
    vehicle?.vehicle?.purposeOfVehicle
  );
  const [regNumber, setRegNumber] = useState(vehicle?.vehicle?.regNumber);
  const [imagePreview, setImagePreview] = useState('');

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    } else {
      setImagePreview('');
    }
  };

  useEffect(() => {
    generateQRCode();
  }, [vehicle]);

  const generateQRCode = () => {
    const link = generateSecureCode(Math.random());
    QRCode.toDataURL(
      'https://beninclub1931.com/' + vehicle?.vehicle?.qrCodeUrl,
      {
        errorCorrectionLevel: 'H',
      }
    )
      .then((dataUrl: string) => {
        setDataUrl(dataUrl);
        setError(null);
      })
      .catch((error: any) => {
        console.error(error);
        setError(error);
      });
  };

  const updateQRCode = async () => {
    const data = {
      carPlateNumber,
      vehicleType,
      vehicleColor,
      purposeOfVehicle,
      regNumber,
      imagePreview,
    };

    try {
      const response = await fetch(`/api/vehicles/${vehicle?.vehicle?._id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        const dataUrl = await response.json();
        handleCloseModal();
        setDataUrl(dataUrl.dataUrl);
      } else {
        setError(new Error(`Failed to update QR code: ${response.statusText}`));
      }
    } catch (error) {
      setError(error as Error | null);
    }
  };

  return (
    <div className="flex flex-col  mr-auto ">
      <div className="flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-4 bg-gray-50 p-8 rounded-lg">
        <div className="w-full md:w-1/2 flex flex-col items-center space-y-4">
          <label htmlFor="url-input" className="text-lg font-medium">
            ID: {vehicle?.vehicle?.vehicleId}
          </label>

          <input
            type="text"
            id="car-plate-input"
            placeholder="Enter car plate number"
            value={carPlateNumber}
            onChange={(event) => setCarPlateNumber(event.target.value)}
            className="border border-gray-300 rounded-lg px-4 py-2 w-72 focus:outline-none  focus:border-red"
          />
          <input
            type="text"
            id="vehicle-type-input"
            value={vehicleType}
            onChange={(event) => setVehicleType(event.target.value)}
            placeholder="Enter vehicle type"
            className="border border-gray-300 rounded-lg px-4 py-2 w-72 focus:outline-none  focus:border-red"
          />
          <input
            type="text"
            id="vehicle-color-input"
            value={vehicleColor}
            onChange={(event) => setVehicleColor(event.target.value)}
            placeholder="Enter vehicle color"
            className="border border-gray-300 rounded-lg px-4 py-2 w-72 focus:outline-none  focus:border-red"
          />
          <input
            type="text"
            id="vehicle-purpose-input"
            value={purposeOfVehicle}
            onChange={(event) => setPurposeOfVehicle(event.target.value)}
            placeholder="Enter purpose of vehicle"
            className="border border-gray-300 rounded-lg px-4 py-2 w-72 focus:outline-none  focus:border-red"
          />
          <input
            type="text"
            id="reg-number-input"
            value={regNumber}
            onChange={(event) => setRegNumber(event.target.value)}
            placeholder="Enter registration number"
            className="border border-gray-300 rounded-lg px-4 py-2 w-72 focus:outline-none  focus:border-red"
          />
        </div>
        <div className="w-full md:w-1/2 flex flex-col items-center space-y-4">
          <div className="flex flex-col items-center">
            <label htmlFor="image-upload" className="text-lg font-medium">
              Upload vehicle image:
            </label>
            {imagePreview ? (
              <Image
                src={imagePreview}
                alt="Vehicle Preview"
                className="w-64 h-64 object-contain mt-4"
                width={250}
                height={250}
              />
            ) : (
              <div className="w-64 h-64 border-2 border-gray-300 rounded-lg mt-4 flex items-center justify-center cursor-pointer">
                <label htmlFor="image-upload">
                  <FaUpload className="text-gray-500 text-4xl cursor-pointer" />
                </label>
              </div>
            )}
            <input
              type="file"
              id="image-upload"
              onChange={handleImageChange}
              className="hidden"
            />
            {dataUrl && (
              <Image
                src={dataUrl}
                alt="Vehicle Preview"
                className="w-64 h-64 object-contain mt-4"
                width={250}
                height={250}
              />
            )}
          </div>
        </div>
      </div>
      <button onClick={updateQRCode} className={buttonStyle}>
        Update
      </button>
      {error && (
        <div className="text-red-500">{`Error generating QR code: ${error.message}`}</div>
      )}
    </div>
  );
};

export default UpdateQRcode;
