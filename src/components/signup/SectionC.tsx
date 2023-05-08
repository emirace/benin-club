import { allSections } from '@/constants/sectionsCard';
import { buttonStyle, buttonStyleOutline } from '@/constants/styles';
import { Child, FormData, SectionProps } from '@/types/signup';
import ChildrenField from './ChildrenField';

const SectionC = (props: SectionProps) => {
  const {
    setFormData,
    formData,
    onPrevious,
    onChange,
    onNext,
    error,
    handleError,
  } = props;
  const handleNext = () => {
    let isValid = true;

    // Validate marriage duration
    // if (!formData.marriageDuration) {
    //   handleError(
    //     'marriageDuration',
    //     'Please enter the duration of your marriage'
    //   );
    //   isValid = false;
    // }

    if (isValid) {
      onNext();
    }
  };

  const onChangeMulti = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const { name, options } = event.target;
    const selectedOptions = Array.from(options)
      .filter((option) => option.selected)
      .map((option) => option.value);
    console.log(selectedOptions);
    setFormData((prev) => ({
      ...prev,
      [name]: selectedOptions,
    }));
  };

  return (
    <div>
      <div className="flex flex-col md:flex-row md:gap-8">
        <div className="flex-1">
          <div className="mb-4">
            <label
              htmlFor="marriageDuration"
              className="block text-gray-700 font-medium mb-2"
            >
              If you are married, how long have you been married?
            </label>
            <input
              type="text"
              id="marriageDuration"
              name="marriageDuration"
              placeholder="Enter duration of marriage"
              className="mt-1 block w-full md:w-96 rounded-md p-2 shadow-lg focus:border-red focus:ring-red focus:outline-red"
              onChange={onChange}
              value={formData.marriageDuration || ''}
            />
            {error?.marriageDuration ? (
              <div className="text-red-500 mt-2 text-sm">
                {error.marriageDuration}
              </div>
            ) : (
              <div className="h-5" />
            )}
          </div>
          <div className="mb-4">
            <label
              htmlFor="numberOfWives"
              className="block text-gray-700 font-medium mb-2"
            >
              How many wives do you have?
            </label>
            <input
              type="number"
              id="numberOfWives"
              name="numberOfWives"
              placeholder="Enter number of wives"
              className="mt-1 block w-full md:w-96 rounded-md p-2 shadow-lg focus:border-red focus:ring-red focus:outline-red"
              onChange={onChange}
              value={formData.numberOfWives || ''}
            />
            {error?.numberOfWives ? (
              <div className="text-red-500 mt-2 text-sm">
                {error.numberOfWives}
              </div>
            ) : (
              <div className="h-5" />
            )}
          </div>
          <div className="">
            <label
              htmlFor="numberOfChildren"
              className="block text-gray-700 font-medium mb-2"
            >
              How many children do you have?
            </label>
            <input
              type="number"
              id="numberOfChildren"
              name="numberOfChildren"
              placeholder="Enter number of children"
              className="mt-1 block w-full md:w-96 rounded-md p-2 shadow-lg focus:border-red focus:ring-red focus:outline-red"
              onChange={onChange}
              value={formData.numberOfChildren || ''}
            />
            {error?.numberOfChildren ? (
              <div className="text-red-500 mt-2 text-sm">
                {error.numberOfChildren}
              </div>
            ) : (
              <div className="h-5" />
            )}
          </div>
          <div className="mb-4">
            <ChildrenField formData={formData} setFormData={setFormData} />
          </div>
          <div className="mb-4">
            <label
              htmlFor="addressYears"
              className="block text-gray-700 font-medium mb-2"
            >
              How many years have you lived at your current address?
            </label>
            <input
              type="number"
              id="addressYears"
              name="addressYears"
              placeholder="Enter years at current address"
              className="mt-1 block w-full md:w-96 rounded-md p-2 shadow-lg focus:border-red focus:ring-red focus:outline-red"
              onChange={onChange}
              value={formData.addressYears || ''}
            />
            {error?.addressYears ? (
              <div className="text-red-500 mt-2 text-sm">
                {error.addressYears}
              </div>
            ) : (
              <div className="h-5" />
            )}
          </div>

          <div className="mb-4">
            <label
              htmlFor="emergencyContact"
              className="block text-gray-700 font-medium mb-2"
            >
              Person to contact in case of emergency
            </label>
            <input
              type="text"
              id="emergencyContact"
              name="emergencyContact"
              placeholder="Enter emergency contact"
              className="mt-1 block w-full md:w-96 rounded-md p-2 shadow-lg focus:border-red focus:ring-red focus:outline-red"
              onChange={onChange}
              value={formData.emergencyContact || ''}
            />
            {error?.emergencyContact ? (
              <div className="text-red-500 mt-2 text-sm">
                {error.emergencyContact}
              </div>
            ) : (
              <div className="h-5" />
            )}
          </div>
        </div>
        <div className="flex-1">
          <div className="mb-4">
            <label
              htmlFor="disability"
              className="block text-gray-700 font-medium mb-2"
            >
              Do you have any physical disability? If so, what is the nature of
              the disability?
            </label>
            <textarea
              id="disability"
              name="disability"
              rows={3}
              placeholder="Enter details of your disability"
              className="mt-1 block w-full md:w-96 rounded-md p-2 shadow-lg focus:border-red focus:ring-red focus:outline-red"
              onChange={onChange}
              value={formData.disability || ''}
            />
            {error?.disability ? (
              <div className="text-red-500 mt-2 text-sm">
                {error.disability}
              </div>
            ) : (
              <div className="h-5" />
            )}
          </div>

          <div className="mb-4">
            <label
              htmlFor="sportSection"
              className="block text-gray-700 font-medium mb-2"
            >
              Which sporting section(s) will you like to join?
            </label>
            <div className="text-sm text-gray hidden md:block">
              Hold down the Ctrl key to select multiple options.
            </div>
            <select
              id="sportSection"
              name="sportSection"
              multiple
              className="mt-1 block w-full rounded-md p-2 shadow-lg focus:border-red focus:ring-red focus:outline-red"
              onChange={onChangeMulti}
              value={formData.sportSection}
            >
              {allSections.map((section) => (
                <option value={section} key={section}>
                  {section}
                </option>
              ))}
            </select>
          </div>

          <div className="mb-4">
            <label
              htmlFor="reasonToJoin"
              className="block text-gray-700 font-medium mb-2"
            >
              Why do you want to be a member of Benin Club?
            </label>
            <textarea
              id="reasonToJoin"
              name="reasonToJoin"
              placeholder="Enter reason for joining"
              className="mt-1 block w-full rounded-md p-2 shadow-lg focus:border-red focus:ring-red focus:outline-red"
              onChange={onChange}
              value={formData.reasonToJoin}
            />
            {error?.reasonToJoin ? (
              <div className="text-red-500 mt-2 text-sm">
                {error.reasonToJoin}
              </div>
            ) : (
              <div className="h-5" />
            )}
          </div>
          <div className="mb-4">
            <label
              htmlFor="tribe"
              className="block text-gray-700 font-medium mb-2"
            >
              If you are a Nigerian, which tribe are you?
            </label>
            <input
              type="text"
              id="tribe"
              name="tribe"
              placeholder="Enter your tribe"
              className="mt-1 block w-full md:w-96 rounded-md p-2 shadow-lg focus:border-red focus:ring-red focus:outline-red"
              onChange={onChange}
              value={formData.tribe}
            />
            {error?.tribe ? (
              <div className="text-red-500 mt-2 text-sm">{error.tribe}</div>
            ) : (
              <div className="h-4" />
            )}
          </div>
        </div>
      </div>

      <div className="flex gap-4 justify-end ml-6 mt-4">
        <button
          className={buttonStyleOutline}
          onClick={onPrevious}
          disabled={props.loading}
        >
          Previous
        </button>
        <button
          className={buttonStyle}
          onClick={handleNext}
          disabled={props.loading}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default SectionC;
