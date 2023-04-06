"use client";
import { useState } from "react";
import QRCode from "qrcode";
import Image from "next/image";
import dynamic from "next/dynamic";
import QRCodeGenerator from "@/components/QRCodeGenerator";
import Dashboard from "@/components/Dashboard";
import Vehicle from "@/models/vehicle.model";
import VehicleList from "@/sections/VehicleList";

export default function Barcode() {
  const [currentPage, setCurrentPage] = useState("create");

  const renderPage = () => {
    switch (currentPage) {
      case "create":
        return <QRCodeGenerator />;
      case "view":
        return (
          <VehicleList
            vehicles={[
              {
                id: "1",
                carPlateNumber: "ABC-123",
                vehicleType: "Sedan",
                vehicleColor: "Black",
                purposeOfVehicle: "Personal",
                regNumber: "VH009F93",
                imageUrl: "/images/image2.jpg",
                qrCodeUrl: "https://example.com/qr-code.png",
                createdAt: "2023-04-05T10:00:00.000Z",
              },
              {
                id: "2",
                carPlateNumber: "ABC-123",
                vehicleType: "Sedan",
                vehicleColor: "Black",
                purposeOfVehicle: "Personal",
                regNumber: "VH009F93",
                imageUrl: "/images/image2.jpg",
                qrCodeUrl: "https://example.com/qr-code.png",
                createdAt: "2023-04-05T10:00:00.000Z",
              },
            ]}
          />
        );
      case "update":
        return <div>Update QR Code</div>;
      case "delete":
        return <div>Delete QR Code</div>;
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
