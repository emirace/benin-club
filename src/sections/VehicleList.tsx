import { useState, useEffect } from 'react';
import { GetServerSideProps } from 'next';
import { getSession } from 'next-auth/react';
import { IVehicle } from '@/models/vehicle.model';
import Image from 'next/image';
import Link from 'next/link';
import Modal from '@/components/Modal';
import UpdateQRcode from '@/components/UpadateQRcode';
import Loading from '@/components/Loading';

type Props = {};

type IVehicleM = IVehicle & {
  memberId: { firstName: string; surName: string; _id: string };
};

const VehicleList = ({}: Props) => {
  const [vehicleList, setVehicleList] = useState<IVehicleM[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [currentVehicle, setCurrentVehicle] = useState<IVehicleM>(
    vehicleList[1]
  );
  const [pagination, setPagination] = useState({
    page: 1,
    limit: 24,
    total: 0,
  });

  const fetchData = async (page: number, limit: number) => {
    setIsLoading(true);
    const response = await fetch(
      `/api/dashboard/vehicles?page=${page}&limit=${limit}`
    );
    const data = await response.json();
    console.log(data);
    setVehicleList(data.vehicles);
    setPagination({ ...pagination, total: data.totalPages });
    setIsLoading(false);
  };

  useEffect(() => {
    fetchData(pagination.page, pagination.limit);
  }, [pagination.page, pagination.limit]);

  const handleDelete = async (id: string) => {
    try {
      const shouldDelete = window.confirm(
        'Are you sure you want to delete this vehicle?'
      );
      if (!shouldDelete) {
        return;
      }

      const response = await fetch(`/api/dashboard/vehicles/${id}`, {
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

  const handleEdit = (id: IVehicleM) => {
    setIsModalOpen(true);
    setCurrentVehicle(id);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleOnUpdate = () => {
    fetchData(pagination.page, pagination.limit);
    setIsModalOpen(false);
  };
  const handlePageChange = (page: number) => {
    setPagination({ ...pagination, page });
  };

  const handleLimitChange = (limit: number) => {
    setPagination({ ...pagination, limit, page: 1 });
  };

  return isLoading ? (
    <div className="h-screen flex justify-center items-center">
      <Loading />
    </div>
  ) : (
    <>
      <ul className="grid grid-cols-1 gap-6 py-8 px-4 md:grid-cols-4 ">
        {vehicleList.map((vehicle) => (
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

              {vehicle.memberId && (
                <p className="mt-1 text-sm text-gray-500">
                  {vehicle?.memberId?.surName +
                    ' ' +
                    vehicle?.memberId?.firstName}
                </p>
              )}
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
                  onClick={() => handleDelete(vehicle._id)}
                >
                  Delete
                </button>
              </div>
            </div>
          </li>
        ))}
      </ul>
      <Modal isOpen={isModalOpen} onClose={handleCloseModal}>
        <UpdateQRcode
          vehicle={currentVehicle}
          handleCloseModal={handleOnUpdate}
        />
      </Modal>
      {isModalOpen && (
        <div
          className="fixed top-0 left-0 right-0 bottom-0 bg-black opacity-50 z-10"
          onClick={handleCloseModal}
        ></div>
      )}
      <div className="flex justify-start mt-4">
        {pagination.page > 1 && (
          <button
            className=" text-red py-2 px-4 "
            onClick={() => handlePageChange(pagination.page - 1)}
          >
            Previous
          </button>
        )}

        {pagination.page > 3 && (
          <>
            <button className="py-2 px-4" onClick={() => handlePageChange(1)}>
              1
            </button>
            {pagination.page > 4 && <span className="mx-1">...</span>}
          </>
        )}

        {Array.from({ length: pagination.total }, (_, i) => i + 1).map(
          (page) =>
            page >= pagination.page - 2 &&
            page <= pagination.page + 2 && (
              <button
                key={page}
                className={`${
                  page === pagination.page
                    ? 'bg-red text-white font-bold py-2 px-4 rounded-md'
                    : 'text-red py-2 px-4'
                }`}
                onClick={() => handlePageChange(page)}
              >
                {page}
              </button>
            )
        )}

        {pagination.page < pagination.total - 2 && (
          <>
            {pagination.page < pagination.total - 3 && (
              <span className=" mx-1">...</span>
            )}
            <button
              className=" text-red py-2 px-4"
              onClick={() => handlePageChange(pagination.total)}
            >
              {pagination.total}
            </button>
          </>
        )}

        {pagination.page < pagination.total && (
          <button
            className="text-red py-2 px-4 "
            onClick={() => handlePageChange(pagination.page + 1)}
          >
            Next
          </button>
        )}
      </div>
    </>
  );
};

export default VehicleList;
