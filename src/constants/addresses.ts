import { Service } from "@/types/services";
import { FaMapMarkerAlt, FaHome, FaEnvelope, FaPhone } from "react-icons/fa";

export const addresses: Service[] = [
  {
    id: 1,
    title: "Sports area",
    description: "We offer a range of state-of We offer a range of state-of",
    icon: FaMapMarkerAlt,
  },
  {
    id: 2,
    title: "club",
    description: "34 dfgf lane, off upper fgfd rd, Benin city, Edo state.",
    icon: FaHome,
  },
  {
    id: 3,
    title: "write us",
    description: "info@beninclub.com support@beninclub.com",
    icon: FaEnvelope,
  },
  {
    id: 4,
    title: "call us",
    description: "+123456789423456 +876543245678",
    icon: FaPhone,
  },
];
