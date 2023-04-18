import { useState, useEffect } from 'react';
import { GetServerSideProps } from 'next';
import { getSession } from 'next-auth/react';
import { IVehicle } from '@/models/vehicle.model';
import Image from 'next/image';
import Link from 'next/link';
import Modal from '@/components/Modal';
import UpdateQRcode from '@/components/UpadateQRcode';

type Props = {
  vehicles: IVehicle[];
};

const VehicleList = ({ vehicles }: Props) => {
  const [vehicleList, setVehicleList] = useState<IVehicle[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentVehicle, setCurrentVehicle] = useState<IVehicle>(
    vehicles[3001]
  );

  useEffect(() => {
    setVehicleList(vehicles);
  }, [vehicles]);

  const handleDelete = async (id: string) => {
    try {
      const response = await fetch(`/api/vehicles/${id}`, {
        method: 'DELETE',
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

  const handleEdit = (id: IVehicle) => {
    setIsModalOpen(true);
    setCurrentVehicle(id);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  return (
    <>
      <ul className="grid grid-cols-1 gap-6 py-8 px-4 md:grid-cols-4 ">
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
                {vehicle.vehicleId}
              </h2>
              <p className="mt-1 text-sm text-gray-500">
                {vehicle.vehicleType}
              </p>
              <p className="mt-1 text-sm text-gray-500">
                {vehicle.vehicleColor}
              </p>
              <p className="mt-1 text-sm text-gray-500">
                {vehicle.purposeOfVehicle}
              </p>
              <div className="mt-4 flex justify-end space-x-4">
                <button
                  className="text-blue-600 hover:text-blue-700"
                  onClick={() => handleEdit(vehicle)}
                >
                  Edit
                </button>
                <button
                  className="text-red-600 hover:text-red-700"
                  onClick={() => console.log('delete')}
                >
                  Delete
                </button>
              </div>
            </div>
          </li>
        ))}

        <Modal isOpen={isModalOpen} onClose={handleCloseModal}>
          <UpdateQRcode
            vehicle={currentVehicle}
            handleCloseModal={handleCloseModal}
          />
        </Modal>
        {isModalOpen && (
          <div
            className="fixed top-0 left-0 right-0 bottom-0 bg-black opacity-50 z-10"
            onClick={handleCloseModal}
          ></div>
        )}
      </ul>
    </>
  );
};

export const getServerSideProps: GetServerSideProps<Props> = async (
  context
) => {
  const session = await getSession(context);

  if (!session) {
    return {
      redirect: {
        destination: '/login',
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
