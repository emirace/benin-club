import React, { useState } from 'react';
import Sidebar from './Sidebar';
import MainSection from './MainSection';
import MembersTable from './MembersTable';
import Dashboard from './Dashboard';
import Event from './Event';
import Post from './Post';
import { news } from '@/constants/newsCard';
import Transaction from './Transaction';
import { transactions } from '@/constants/transactions';
import { IUser } from '@/models/user.model';

interface DashboardLayoutProps {
  user: IUser;
}

function DashboardLayout(props: DashboardLayoutProps): JSX.Element {
  const { user } = props;
  const [activePage, setActivePage] = useState('Dashboard');
  const [isOpen, setIsOpen] = useState(true);

  const handleNavClick = (page: string) => {
    setActivePage(page);
  };

  const onClose = () => {
    setIsOpen(false);
  };

  let content;

  switch (activePage) {
    case 'Dashboard':
      content = <Dashboard />;
      break;
    case 'Members':
      content = <MembersTable />;
      break;
    case 'Events':
      content = <Event />;
      break;
    case 'Posts':
      content = <Post />;
      break;
    case 'Transactions':
      content = <Transaction />;
      break;
    case 'Vehicles':
      content = <p>Here is a list of all upcoming events.</p>;
      break;
    case 'Settings':
      content = <p>Here you can change your settings.</p>;
      break;
    default:
      content = null;
  }

  return (
    <div className="flex h-screen ">
      <Sidebar
        user={user}
        onNavClick={handleNavClick}
        activeMenuItem={activePage}
      />
      <MainSection>{content}</MainSection>
    </div>
  );
}

export default DashboardLayout;
