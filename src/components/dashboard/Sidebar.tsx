import {
  FiHome,
  FiUsers,
  FiCalendar,
  FiSettings,
  FiFileText,
  FiDollarSign,
  FiTruck,
} from 'react-icons/fi';
import Link from 'next/link';

interface SidebarProps {
  onNavClick: (page: string) => void;
  activeMenuItem: string;
}

function Sidebar(props: SidebarProps): JSX.Element {
  const { onNavClick, activeMenuItem } = props;

  const menuItems = [
    { label: 'Dashboard', icon: <FiHome /> },
    { label: 'Members', icon: <FiUsers /> },
    { label: 'Events', icon: <FiCalendar /> },
    { label: 'Posts', icon: <FiFileText /> },
    { label: 'Transactions', icon: <FiDollarSign /> },
    { label: 'Vehicles', icon: <FiTruck /> },
    { label: 'Settings', icon: <FiSettings /> },
  ];

  return (
    <aside className="flex flex-col w-10 md:w-64 ">
      <h2 className="p-4 text-lg font-semibold hidden md:block ">
        Admin Dashboard
      </h2>
      <nav className="flex-grow">
        <ul className="flex flex-col py-2 space-y-2">
          {menuItems.map((menuItem) => (
            <li
              key={menuItem.label}
              className={`flex items-center justify-center md:justify-normal md:px-4 w-full md:w-auto py-2 ${
                activeMenuItem === menuItem.label
                  ? 'bg-pink text-red'
                  : 'hover:text-red'
              }`}
              onClick={() => onNavClick(menuItem.label)}
            >
              <span className="mr-2">{menuItem.icon}</span>
              <span className="hidden md:block">{menuItem.label}</span>
            </li>
          ))}
        </ul>
      </nav>
    </aside>
  );
}

export default Sidebar;
