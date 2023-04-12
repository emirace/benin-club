import { Child, FormData, SetFormData } from '@/types/signup';
import { useState } from 'react';
import Modal from '../Modal';
import { buttonStyle, buttonStyleOutline } from '@/constants/styles';

type ChildrenFieldProps = {
  setFormData: SetFormData;
  formData: FormData;
};

const ChildrenField = ({ setFormData, formData }: ChildrenFieldProps) => {
  const [childFields, setChildFields] = useState<Child>({
    name: '',
    age: 0,
    school: '',
    sex: 'male',
  });
  const [error, setError] = useState({});
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const handleChange = (
    event: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => {
    const { name, value } = event.target;
    setChildFields({ ...childFields, [name]: value });
    handleError('general', '');
  };

  const handleError = (name: string, value: string) => {
    setError((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = () => {
    setFormData((prevFormData) => ({
      ...prevFormData,
      children: [...prevFormData.children, childFields],
    }));
    closeModal();
  };

  const handleRemove = (index: number) => {
    setFormData((prevFormData) => ({
      ...prevFormData,
      children: prevFormData.children.filter((_, i) => i !== index),
    }));
  };

  return (
    <>
      {formData.children.map((child, index) => (
        <li key={index} className="flex">
          {child.name}, {child.age} years old, goes to {child.school},{' '}
          {child.sex}{' '}
          <span onClick={() => handleRemove(index)}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-8 w-8 text-white"
              viewBox="0 0 20 20"
              fill="#000000"
            >
              <path
                fillRule="evenodd"
                d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.293-9.293a1 1 0 00-1.414-1.414L10 8.586 7.121 5.707a1 1 0 00-1.414 1.414L8.586 10l-2.879 2.879a1 1 0 101.414 1.414L10 11.414l2.879 2.879a1 1 0 001.414-1.414L11.414 10l2.879-2.879z"
                clipRule="evenodd"
              />
            </svg>
          </span>
        </li>
      ))}
      <button className="text-red" onClick={openModal}>
        Add Child
      </button>
      {isModalOpen && (
        <div
          className="fixed top-0 left-0 right-0 bottom-0 bg-black opacity-50 z-10"
          onClick={closeModal}
        ></div>
      )}
      <Modal isOpen={isModalOpen} onClose={closeModal}>
        <div>
          <h2 className="text-2xl font-bold mb-4">Add Child</h2>
          <div className="mb-4">
            <label
              htmlFor={`name`}
              className="block text-gray-700 font-medium mb-2"
            >
              Child&apos;s Name
            </label>
            <input
              type="text"
              id={`name`}
              name={`name`}
              placeholder="Enter child's name"
              className="mt-1 block w-full md:w-96 rounded-md p-2 shadow-lg focus:border-red focus:ring-red focus:outline-red"
              onChange={(event) => handleChange(event)}
              value={childFields.name}
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor={`age`}
              className="block text-gray-700 font-medium mb-2"
            >
              Child&apos;s Age
            </label>
            <input
              type="number"
              id={`age`}
              name={`age`}
              placeholder="Enter child's age"
              className="mt-1 block w-full md:w-96 rounded-md p-2 shadow-lg focus:border-red focus:ring-red focus:outline-red"
              onChange={(event) => handleChange(event)}
              value={childFields.age}
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor={`school`}
              className="block text-gray-700 font-medium mb-2"
            >
              Child&apos;s School
            </label>
            <input
              type="text"
              id={`school`}
              name={`school`}
              placeholder="Enter child's school"
              className="mt-1 block w-full md:w-96 rounded-md p-2 shadow-lg focus:border-red focus:ring-red focus:outline-red"
              onChange={(event) => handleChange(event)}
              value={childFields.school}
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor={`sex`}
              className="block text-gray-700 font-medium mb-2"
            >
              Child&apos;s Sex
            </label>
            <select
              id={`sex`}
              name={`sex`}
              className="mt-1 block w-full md:w-96 rounded-md p-2 shadow-lg focus:border-red focus:ring-redfocus:outline-red"
              onChange={(event) => handleChange(event)}
              value={childFields.sex}
            >
              <option value="male">Male</option>
              <option value="female">Female</option>
            </select>
          </div>
          <div className="flex gap-4 justify-end ml-6 mt-4">
            <button className={buttonStyleOutline} onClick={closeModal}>
              Cancel
            </button>
            <button className={buttonStyle} onClick={handleSubmit}>
              Add
            </button>
          </div>
        </div>
      </Modal>
    </>
  );
};

export default ChildrenField;
