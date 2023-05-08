import Link from 'next/link';
import { IUser } from '@/models/user.model';
import { menuItems } from '@/constants/navbar';

interface SidebarProps {
  onNavClick: (page: string) => void;
  activeMenuItem: string;
  user: IUser;
}

function Sidebar(props: SidebarProps): JSX.Element {
  const { onNavClick, activeMenuItem, user } = props;

  const filteredMenuItems = menuItems.filter((nav) =>
    nav.role.includes(user.role)
  );

  return (
    <aside className="flex flex-col w-10 md:w-56 ">
      <h2 className="p-4 text-lg font-semibold hidden md:block ">
        Admin Dashboard
      </h2>
      <nav className="flex-grow">
        <ul className="flex flex-col py-2 space-y-2">
          {filteredMenuItems.map((menuItem) => (
            <li
              key={menuItem.label}
              className={`flex items-center justify-center md:justify-normal cursor-pointer md:px-4 w-full md:w-auto py-2 ${
                activeMenuItem === menuItem.label
                  ? 'bg-pink text-red'
                  : 'hover:text-red'
              }`}
              onClick={() => onNavClick(menuItem.label)}
            >
              <span className="mr-2">
                <menuItem.icon />
              </span>
              <span className="hidden md:block">{menuItem.label}</span>
            </li>
          ))}
        </ul>
      </nav>
    </aside>
  );
}

export default Sidebar;
