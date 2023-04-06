import mongoose, { Document, Schema } from 'mongoose';

export interface IVehicle extends Document {
  carPlateNumber?: string;
  vehicleType?: string;
  vehicleColor?: string;
  purposeOfVehicle?: string;
  regNumber?: string;
  imageUrl?: string;
  qrCodeUrl: string;
  createdAt?: Date;
  updatedAt?: Date;
}

const vehicleSchema: Schema = new Schema(
  {
    carPlateNumber: {
      type: String,
    },
    vehicleType: {
      type: String,
    },
    vehicleColor: {
      type: String,
    },
    purposeOfVehicle: {
      type: String,
    },
    regNumber: {
      type: String,
    },
    imageUrl: {
      type: String,
    },
    qrCodeUrl: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const Vehicle = mongoose.model<IVehicle>('Vehicle', vehicleSchema);

export default Vehicle;
