import { IUser } from '@/models/user.model';
import Image from 'next/image';
import { FiEdit2, FiTrash2 } from 'react-icons/fi';
import Modal from '../Modal';
import MembershipForm from './MembershipForm';
import { useState } from 'react';

interface MemberTableRowProps {
  member: IUser;
  onDelete: (id: string) => void;
  handleUpdateMemberTable: () => void;
}

function MemberTableRow({
  member,
  onDelete,
  handleUpdateMemberTable,
}: MemberTableRowProps): JSX.Element {
  let statusClassName = '';
  const [showModal, setShowModal] = useState<boolean>(false);
  const [showConfirm, setShowConfirm] = useState(false);

  const handleDelete = () => {
    setShowConfirm(true);
  };

  const handleConfirmDelete = () => {
    onDelete(member._id);
    setShowConfirm(false);
  };

  const handleCancelDelete = () => {
    setShowConfirm(false);
  };

  const onClose = () => {
    setShowModal(false); // <-- update state variable to show modal
    handleUpdateMemberTable();
  };

  const onOpen = () => {
    setShowModal(true); // <-- update state variable to show modal
  };

  switch (member.status) {
    case 'Active':
      statusClassName = 'text-green';
      break;
    case 'Inactive':
      statusClassName = 'text-red';
      break;
    default:
      statusClassName = 'text-gray';
      break;
  }
  return (
    <>
      <tr className="border-t">
        <td className="py-2 px-4">{member.memberId}</td>
        <td className="py-2 px-4 flex items-center">
          <div className="w-10 h-10 relative mr-4">
            <Image
              src={member.image}
              alt={`${member.firstName} ${member.lastName}`}
              layout="fill"
              objectFit="cover"
              objectPosition="center"
              className="rounded-full"
            />
          </div>
          <div>
            <p className="font-semibold">
              {member.firstName} {member.lastName}
            </p>
            <p className="hidden md:block">{member.level}</p>
          </div>
        </td>
        <td className="py-2 px-4">{member.level}</td>
        <td className="py-2 px-4">{member.position}</td>
        <td className="py-2 px-4">{member?.occupation?.address}</td>
        <td className="py-2 px-4">{member.email}</td>
        <td className="py-2 px-4">{member?.home?.tel}</td>
        <td className="py-2 px-4">{member.gender}</td>
        <td className={`py-2 px-4 ${statusClassName}`}>{member.status}</td>
        <td className="py-2 px-4">
          {!showConfirm ? (
            <div className="flex items-center">
              <button className="mr-2 " onClick={onOpen}>
                <FiEdit2 />
              </button>
              <button className="text-red" onClick={handleDelete}>
                <FiTrash2 />
              </button>
            </div>
          ) : (
            <div className="flex items-center">
              <button className="mr-2 text-red " onClick={handleConfirmDelete}>
                Yes
              </button>
              <button onClick={handleCancelDelete}>No</button>
            </div>
          )}
        </td>
      </tr>

      <Modal isOpen={showModal} onClose={onClose}>
        <MembershipForm onClose={onClose} id={member._id} />
      </Modal>
    </>
  );
}

export default MemberTableRow;
