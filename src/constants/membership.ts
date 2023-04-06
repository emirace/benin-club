import { Membership } from "@/types/membership";

export const membership: Membership = {
  id: 123456,
  firstName: "John",
  lastName: "Doe",
  email: "johndoe@example.com",
  status: "Active",
  level: "Premium",
  joinDate: "2022-01-01T00:00:00Z",
  renewalDate: "2023-01-01T00:00:00Z",
  paymentInfo: "**** **** **** 1234",
  wallet: {
    balance: 500,
    transactions: [
      {
        id: 1,
        date: "2022-01-01T00:00:00Z",
        description: "Initial deposit",
        amount: 500,
      },
      {
        id: 2,
        date: "2022-02-01T00:00:00Z",
        description: "Monthly membership fee",
        amount: -50,
      },
      {
        id: 3,
        date: "2022-03-01T00:00:00Z",
        description: "Purchase of merchandise",
        amount: -25,
      },
      {
        id: 4,
        date: "2022-04-01T00:00:00Z",
        description: "Refund for cancelled event",
        amount: 75,
      },
    ],
  },
};
