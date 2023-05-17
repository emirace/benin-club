import { IVehicle } from "@/models/vehicle.model";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

const VehicleDetailsPage: React.FC = () => {
  const router = useRouter();
  const { token } = router.query;
  const [vehicle, setVehicle] = useState<IVehicle | null>(null);

  useEffect(() => {
    const fetchVehicleDetails = async () => {
      try {
        const response = await fetch(`/api/vehicles/${token}`);
        if (response.ok) {
          const vehicleData = await response.json();
          setVehicle(vehicleData);
        } else {
          console.log("Invalid token");
        }
      } catch (error) {
        console.error("Error fetching vehicle details:", error);
      }
    };

    if (token) {
      fetchVehicleDetails();
    }
  }, [token]);

  if (!vehicle) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h1>Vehicle Details</h1>
      <p>Car Plate Number: {vehicle.carPlateNumber}</p>
      <p>Vehicle ID: {vehicle.vehicleId}</p>
      <p>Vehicle Type: {vehicle.vehicleType}</p>
      <p>Vehicle Color: {vehicle.vehicleColor}</p>
      <p>Purpose of Vehicle: {vehicle.purposeOfVehicle}</p>
      <p>Registration Number: {vehicle.regNumber}</p>
      <p>Image URL: {vehicle.imageUrl}</p>
      <p>QR Code URL: {vehicle.qrCodeUrl}</p>
      {/* Add more details as needed */}
    </div>
  );
};

export default VehicleDetailsPage;
