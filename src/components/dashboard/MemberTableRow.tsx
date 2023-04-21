import Image from 'next/image';
import { FiEdit2, FiTrash2 } from 'react-icons/fi';
import { Member } from './MembersTable';

interface MemberTableRowProps {
  member: Member;
}

function MemberTableRow({ member }: MemberTableRowProps): JSX.Element {
  let statusClassName = '';

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
    <tr className="border-t">
      <td className="py-2 px-4">{member.id}</td>
      <td className="py-2 px-4 flex items-center">
        <div className="w-10 h-10 relative mr-4">
          <Image
            src={member.picture}
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
      <td className="py-2 px-4">{member.occupation}</td>
      <td className="py-2 px-4">{member.email}</td>
      <td className="py-2 px-4">{member.phone}</td>
      <td className="py-2 px-4">{member.gender}</td>
      <td className={`py-2 px-4 ${statusClassName}`}>{member.status}</td>
      <td className="py-2 px-4">
        <div className="flex items-center">
          <button className="mr-2 ">
            <FiEdit2 />
          </button>
          <button className="text-red">
            <FiTrash2 />
          </button>
        </div>
      </td>
    </tr>
  );
}

export default MemberTableRow;
