import { Service } from "@/types/services";
import {
  FaDumbbell,
  FaFutbol,
  FaRunning,
  FaSpa,
  FaTheaterMasks,
  FaUsers,
  FaUtensils,
} from "react-icons/fa";

export const services: Service[] = [
  {
    id: 1,
    title: "Sports facilities",
    description:
      "We offer a range of state-of-the-art sports facilities, including basketball and tennis courts, swimming pools, and more.",
    icon: FaFutbol,
  },
  {
    id: 2,
    title: "Fitness classes",
    description:
      "Our fitness classes are led by experienced trainers and cover a range of disciplines, including yoga, Pilates, and strength training.",
    icon: FaDumbbell,
  },
  {
    id: 3,
    title: "Social events",
    description:
      "We host a variety of social events throughout the year, including parties, concerts, and cultural events.",
    icon: FaTheaterMasks,
  },
  {
    id: 4,
    title: "Entertainment",
    description:
      "We offer a range of entertainment options, including live music, movies, and theater performances.",
    icon: FaUsers,
  },
  {
    id: 5,
    title: "Dining",
    description:
      "Our dining options include a variety of restaurants and cafes serving everything from casual snacks to gourmet cuisine.",
    icon: FaUtensils,
  },
  {
    id: 6,
    title: "Sports teams",
    description:
      "We offer a range of sports teams for members to join, including basketball, soccer, and volleyball.",
    icon: FaFutbol,
  },
  {
    id: 7,
    title: "Spa services",
    description:
      "Our spa offers a range of treatments, including massages, facials, and body wraps, to help you relax and unwind.",
    icon: FaSpa,
  },
  {
    id: 8,
    title: "Personal training",
    description:
      "Our experienced personal trainers will work with you to create a custom fitness plan and help you achieve your goals.",
    icon: FaRunning,
  },
];
