import {
  FiHome,
  FiUsers,
  FiCalendar,
  FiSettings,
  FiFileText,
  FiDollarSign,
  FiTruck,
} from 'react-icons/fi';

export const navLinks = [
  { title: 'Home', path: '/', subLinks: [] },
  {
    title: 'Sections',
    path: '/sections',
    subLinks: [
      { title: 'Billiards & Snooker', path: '/billiards' },
      { title: 'Bus Stop', path: '/busstop' },
      { title: 'Darts', path: '/darts' },
      { title: 'Golf', path: '/golf' },
      { title: 'Lawn Tennis', path: '/lawntennis' },
      { title: 'Leisure Games', path: '/leisure' },
      { title: 'Squash', path: '/squash' },
      { title: 'Swimming Pool', path: '/swimmingpool' },
      { title: 'Table Tennis', path: '/tabletennis' },
    ],
  },
  { title: 'Services', path: '/services', subLinks: [] },
  { title: 'Gallery', path: '/gallery', subLinks: [] },
  { title: 'Contact', path: '/contact', subLinks: [] },
];

export const profileNav = [
  { title: 'Profile', path: '/account', role: ['member'] },
  {
    title: 'Dashboard',
    path: '/account/dashboard',
    role: ['wallet', 'user', 'admin'],
  },
  { title: 'Settings', path: '/account/settings', role: ['member'] },
];

export const menuItems = [
  { label: 'Dashboard', icon: FiHome, role: ['admin'] },
  { label: 'Members', icon: FiUsers, role: ['admin', 'user'] },
  { label: 'Events', icon: FiCalendar, role: ['admin', 'user'] },
  { label: 'Posts', icon: FiFileText, role: ['admin', 'user'] },
  { label: 'Transactions', icon: FiDollarSign, role: ['admin', 'wallet'] },
  { label: 'Vehicles', icon: FiTruck, role: ['admin'] },
  { label: 'Settings', icon: FiSettings, role: ['admin'] },
];
