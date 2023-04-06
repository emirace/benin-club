import { useState, useEffect } from "react";
import { GetServerSideProps } from "next";
import { getSession } from "next-auth/react";
import { IVehicle } from "@/models/vehicle.model";
import Image from "next/image";
import Link from "next/link";

type Props = {
  vehicles: IVehicle[];
};

const VehicleList = ({ vehicles }: Props) => {
  const [vehicleList, setVehicleList] = useState<IVehicle[]>([]);

  useEffect(() => {
    setVehicleList(vehicles);
  }, [vehicles]);

  const handleDelete = async (id: string) => {
    try {
      const response = await fetch(`/api/vehicles/${id}`, {
        method: "DELETE",
      });

      if (response.ok) {
        const updatedVehicles = vehicleList.filter(
          (vehicle) => vehicle._id !== id
        );
        setVehicleList(updatedVehicles);
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <ul className="grid grid-cols-1 gap-6 py-8 md:grid-cols-4 ">
      {vehicles.map((vehicle) => (
        <li
          key={vehicle._id}
          className="col-span-1 bg-white rounded-lg shadow divide-y divide-gray-200 px-4"
        >
          <div className="w-full flex items-center justify-center bg-gray-200">
            <Image
              src={vehicle.imageUrl}
              alt={`Image of ${vehicle.carPlateNumber}`}
              width={500}
              height={500}
              className="object-contain"
            />
          </div>
          <div className="py-4 px-6">
            <h2 className="text-lg font-medium text-gray-900 truncate">
              {vehicle.carPlateNumber}
            </h2>
            <p className="mt-1 text-sm text-gray-500">{vehicle.vehicleType}</p>
            <p className="mt-1 text-sm text-gray-500">{vehicle.vehicleColor}</p>
            <p className="mt-1 text-sm text-gray-500">
              {vehicle.purposeOfVehicle}
            </p>
            <div className="mt-4 flex justify-end space-x-4">
              <button
                className="text-blue-600 hover:text-blue-700"
                onClick={() => handleEdit(vehicle._id)}
              >
                Edit
              </button>
              <button
                className="text-red-600 hover:text-red-700"
                onClick={() => handleDelete(vehicle._id)}
              >
                Delete
              </button>
            </div>
          </div>
        </li>
      ))}
    </ul>
  );
};

export const getServerSideProps: GetServerSideProps<Props> = async (
  context
) => {
  const session = await getSession(context);

  if (!session) {
    return {
      redirect: {
        destination: "/login",
        permanent: false,
      },
    };
  }

  try {
    const response = await fetch(`${process.env.BASE_URL}/api/vehicles`);
    const vehicles = await response.json();
    return { props: { vehicles } };
  } catch (error) {
    return { props: { vehicles: [] } };
  }
};

export default VehicleList;
