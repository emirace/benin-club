import React, { useState } from 'react';
import Sidebar from './Sidebar';
import MainSection from './MainSection';
import MembersTable from './MembersTable';
import { members } from '@/constants/membership';
import Dashboard from './Dashboard';
import { events } from '@/constants/events';
import Event from './Event';
import Post from './Post';
import { news } from '@/constants/newsCard';

function DashboardLayout(): JSX.Element {
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
      content = <MembersTable members={members} />;
      break;
    case 'Events':
      content = <Event events={events} />;
      break;
    case 'Posts':
      content = <Post posts={news} />;
      break;
    case 'Transactions':
      content = <p>Here is a list of all upcoming events.</p>;
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
      <Sidebar onNavClick={handleNavClick} activeMenuItem={activePage} />
      <MainSection>{content}</MainSection>
    </div>
  );
}

export default DashboardLayout;
