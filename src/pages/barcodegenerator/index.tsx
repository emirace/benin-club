'use client';
import { useState } from 'react';
import QRCodeGenerator from '@/components/QRCodeGenerator';
import Dashboard from '@/components/Dashboard';
import VehicleList from '@/sections/VehicleList';
import { GetServerSideProps } from 'next';
import connectDB from '@/utils/mongoose';
import Vehicle, { IVehicle } from '@/models/vehicle.model';

interface IBarcodeProps {
  vehicles: IVehicle[];
}

export default function Barcode({ vehicles }: IBarcodeProps) {
  const [currentPage, setCurrentPage] = useState('create');

  const renderPage = () => {
    switch (currentPage) {
      case 'create':
        return <QRCodeGenerator />;
      case 'view':
        return <VehicleList vehicles={vehicles} />;
      default:
        return <QRCodeGenerator />;
    }
  };

  return (
    <div>
      <div className="h-20 bg-black" />
      <div className="flex flex-col md:flex-row ">
        <Dashboard setCurrentPage={setCurrentPage} />
        <div className="w-full md:w-4/5 flex flex-col mb-4 ">
          {renderPage()}
        </div>
      </div>
    </div>
  );
}

export const getServerSideProps: GetServerSideProps<
  IBarcodeProps
> = async () => {
  try {
    await connectDB();

    const vehicles = await Vehicle.find();

    return {
      props: {
        vehicles: JSON.parse(JSON.stringify(vehicles)),
      },
    };
  } catch (error) {
    console.error(error);
    return {
      props: {
        vehicles: [],
      },
    };
  }
};
