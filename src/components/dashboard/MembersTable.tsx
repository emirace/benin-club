import { useEffect, useState } from 'react';
import { FiEdit2, FiPlus, FiTrash2 } from 'react-icons/fi';
import Image from 'next/image';
import MemberTableRow from './MemberTableRow';
import { buttonStyle } from '@/constants/styles';

export interface Member {
  id: number;
  firstName: string;
  lastName: string;
  level: string;
  position: string;
  occupation: string;
  email: string;
  phone: string;
  gender: string;
  status: string;
  picture: string;
}

interface MembersTableProps {
  members: Member[];
}

function MembersTable({ members }: MembersTableProps): JSX.Element {
  const [filteredMembers, setFilteredMembers] = useState<Member[]>([]);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [membersPerPage] = useState<number>(2);

  useEffect(() => {
    setFilteredMembers(members);
  }, [members]);

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    const searchTerm = event.target.value.toLowerCase();
    const filtered = members.filter((member) => {
      const fullName = `${member.firstName} ${member.lastName}`.toLowerCase();
      return fullName.includes(searchTerm);
    });
    setFilteredMembers(filtered);
  };

  const indexOfLastMember = currentPage * membersPerPage;
  const indexOfFirstMember = indexOfLastMember - membersPerPage;
  const currentMembers = filteredMembers.slice(
    indexOfFirstMember,
    indexOfLastMember
  );

  const pageNumbers = [];
  for (
    let i = 1;
    i <= Math.ceil(filteredMembers.length / membersPerPage);
    i++
  ) {
    pageNumbers.push(i);
  }

  const handlePageChange = (pageNumber: number) => {
    setCurrentPage(pageNumber);
  };

  const handleAddMember = () => {};

  const isMobile = window.matchMedia('(max-width: 640px)').matches;

  return (
    <div className="w-full">
      <div className="flex flex-col md:flex-row justify-between items-center mb-4">
        <h2 className="text-xl font-bold mb-4 md:mb-0 text-left w-full">
          Members
        </h2>
        <div className="flex items-center">
          <input
            type="text"
            placeholder="Search members"
            className="border border-gray-200 rounded py-2 px-4 w-full md:w-64 focus:outline-none focus:border-red mb-0 md:ml-4"
            onChange={handleSearch}
          />
          {isMobile ? (
            <div className="bg-red text-white mx-4 p-2 rounded">
              <FiPlus
                className="text-2xl cursor-pointer"
                onClick={() => {
                  // your code to handle the add member action
                }}
              />
            </div>
          ) : (
            <button className={`${buttonStyle} mx-4`} onClick={handleAddMember}>
              Add Member
            </button>
          )}
        </div>
      </div>
      <div className="w-[calc(100vw_-_75px)] md:w-auto text-xs">
        <div className="overflow-x-scroll">
          <table className="w-full border-collapse">
            <Header />
            <tbody>
              {currentMembers.map((member) => (
                <MemberTableRow key={member.id} member={member} />
              ))}
            </tbody>
          </table>
        </div>
      </div>
      <div className="flex  items-center mt-4">
        <ul className="flex">
          {pageNumbers.map((number) => (
            <li key={number}>
              <button
                className={`${
                  currentPage === number ? 'bg-red text-white' : ' text-red'
                } py-2 px-4 rounded`}
                onClick={() => handlePageChange(number)}
              >
                {number}
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default MembersTable;

const Header = () => (
  <thead>
    <tr className="bg-gray-200 whitespace-nowrap">
      <th className="py-2 px-4 text-left">Member ID</th>
      <th className="py-2 px-4 text-left">Member Name</th>
      <th className="py-2 px-4 text-left">Level</th>
      <th className="py-2 px-4 text-left">Position</th>
      <th className="py-2 px-4 text-left">Occupation</th>
      <th className="py-2 px-4 text-left">Email</th>
      <th className="py-2 px-4 text-left">Phone Number</th>
      <th className="py-2 px-4 text-left">Gender</th>
      <th className="py-2 px-4 text-left">Status</th>
      <th className="py-2 px-4 text-left">Actions</th>
    </tr>
  </thead>
);
