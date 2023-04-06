import { useState } from "react";
import QRCode from "qrcode";
import Image from "next/image";
import { buttonStyle } from "@/constants/styles";
import { FaUpload } from "react-icons/fa";
import { createHash } from "crypto";

interface QRCodeGeneratorProps {}

const QRCodeGenerator: React.FC<QRCodeGeneratorProps> = () => {
  const [url, setUrl] = useState("");
  const [dataUrl, setDataUrl] = useState("");
  const [error, setError] = useState<Error | null>(null);
  const [carPlateNumber, setCarPlateNumber] = useState("");
  const [vehicleType, setVehicleType] = useState("");
  const [vehicleColor, setVehicleColor] = useState("");
  const [purposeOfVehicle, setPurposeOfVehicle] = useState("");
  const [regNumber, setRegNumber] = useState("");
  const [imagePreview, setImagePreview] = useState("");

  const handleSubmit = async () => {
    const formData = new FormData();
    formData.append("carPlateNumber", carPlateNumber);
    formData.append("vehicleType", vehicleType);
    formData.append("vehicleColor", vehicleColor);
    formData.append("purposeOfVehicle", purposeOfVehicle);
    formData.append("regNumber", regNumber);
    formData.append("image", imagePreview);
    try {
      const response = await fetch("/api/vehicles", {
        method: "POST",
        body: formData,
      });

      if (response.ok) {
        // Show success message
        console.log("Vehicle details saved successfully!");
      } else {
        // Show error message
        console.error("Failed to save vehicle details.");
      }
    } catch (error) {
      console.error("Error saving vehicle details: ", error);
    }
  };
  const generateSecureCode = (string: string): string => {
    const salt = "510fc1829cccd49d72bca0d3df84c054"; // you can use any string as a salt
    const hash = createHash("sha256");
    hash.update(string + salt); // add salt to the string before hashing
    return hash.digest("hex");
  };

  const generateQRCode = () => {
    QRCode.toDataURL("https://beninclub1931.com/" + generateSecureCode(url), {
      errorCorrectionLevel: "H",
    })
      .then((dataUrl) => {
        handleSubmit();
        setDataUrl(dataUrl);
        setError(null);
      })
      .catch((error) => {
        console.error(error);
        setError(error);
      });
  };

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    } else {
      setImagePreview("");
    }
  };

  return (
    <div className="flex flex-col  mr-auto ">
      <div className="flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-4 bg-gray-50 p-8 rounded-lg">
        <div className="w-full md:w-1/2 flex flex-col items-center space-y-4">
          <label htmlFor="url-input" className="text-lg font-medium">
            Enter Vehicle Details:
          </label>
          <input
            type="text"
            id="url-input"
            value={url}
            placeholder="Enter car sticker id"
            onChange={(event) => setUrl(event.target.value)}
            className="border border-gray-300 rounded-lg px-4 py-2 w-72 focus:outline-none  focus:border-red"
          />
          <input
            type="text"
            id="car-plate-input"
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
          </div>
        </div>
      </div>
      <button onClick={generateQRCode} className={buttonStyle}>
        Generate
      </button>
      {error && (
        <div className="text-red-500">{`Error generating QR code: ${error.message}`}</div>
      )}
      {dataUrl && (
        <div className="mt-4 mx-auto">
          <Image src={dataUrl} alt="QR code" width={300} height={300} />
        </div>
      )}
    </div>
  );
};
export default QRCodeGenerator;
