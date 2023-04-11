import { Child, FormData } from '@/types/signup';
import { useState } from 'react';

type SetFormData = (prev: FormData) => FormData;

type ChildrenFieldProps = {
  setFormData: SetFormData;
  formData: FormData;
};

const ChildrenField = ({ setFormData, formData }: ChildrenFieldProps) => {
  const [childFields, setChildFields] = useState(formData.children);

  // const handleChildChange = (
  //   event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  //   index: number,
  //   field: keyof Child
  // ) => {
  //   const updatedChildren = [...childFields];
  //   if (field in updatedChildren[index]) {
  //     updatedChildren[index][field] = event.target.value;
  //   }

  //   setChildFields(updatedChildren);
  //   setFormData((prev: FormData) => ({
  //     ...prev,
  //     children: updatedChildren,
  //   }));
  // };

  const handleChildChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
    index: number,
    field: keyof Child
  ) => {};

  const addChildField = () => {
    setChildFields([
      ...childFields,
      { name: '', age: 0, school: '', sex: 'male' },
    ]);
  };

  const removeChildField = (index: number) => {
    const updatedChildFields = [...childFields];
    updatedChildFields.splice(index, 1);
    setChildFields(updatedChildFields);
    setFormData({
      ...formData,
      children: updatedChildFields,
    });
  };

  console.log('formData', formData);

  return (
    <>
      {childFields.map((child, index) => (
        <div key={index}>
          <div className="mb-4">
            <label
              htmlFor={`childName${index}`}
              className="block text-gray-700 font-medium mb-2"
            >
              Child&apos;s Name
            </label>
            <input
              type="text"
              id={`childName${index}`}
              name={`childName${index}`}
              placeholder="Enter child's name"
              className="mt-1 block w-full md:w-96 rounded-md p-2 shadow-lg focus:border-red focus:ring-red focus:outline-red"
              onChange={(event) => handleChildChange(event, index, 'name')}
              value={childFields[index].name}
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor={`childAge${index}`}
              className="block text-gray-700 font-medium mb-2"
            >
              Child&apos;s Age
            </label>
            <input
              type="number"
              id={`childAge${index}`}
              name={`childAge${index}`}
              placeholder="Enter child's age"
              className="mt-1 block w-full md:w-96 rounded-md p-2 shadow-lg focus:border-red focus:ring-red focus:outline-red"
              onChange={(event) => handleChildChange(event, index, 'age')}
              value={childFields[index].age}
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor={`childSchool${index}`}
              className="block text-gray-700 font-medium mb-2"
            >
              Child&apos;s School
            </label>
            <input
              type="text"
              id={`childSchool${index}`}
              name={`childSchool${index}`}
              placeholder="Enter child's school"
              className="mt-1 block w-full md:w-96 rounded-md p-2 shadow-lg focus:border-red focus:ring-red focus:outline-red"
              onChange={(event) => handleChildChange(event, index, 'school')}
              value={childFields[index].school}
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor={`childSex${index}`}
              className="block text-gray-700 font-medium mb-2"
            >
              Child&apos;s Sex
            </label>
            <select
              id={`childSex${index}`}
              name={`childSex${index}`}
              className="mt-1 block w-full md:w-96 rounded-md p-2 shadow-lg focus:border-red focus:ring-redfocus:outline-red"
              onChange={(event) => handleChildChange(event, index, 'sex')}
              value={childFields[index].sex}
            >
              <option value="male">Male</option>
              <option value="female">Female</option>
            </select>
          </div>
          {childFields.length > 1 && (
            <button
              className="text-red"
              onClick={() => removeChildField(index)}
            >
              Remove Child
            </button>
          )}
        </div>
      ))}
      <button className="text-red" onClick={addChildField}>
        Add Child
      </button>
    </>
  );
};

export default ChildrenField;
