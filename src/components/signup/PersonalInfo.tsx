import { buttonStyle } from '@/constants/styles';
import { SectionProps } from '@/types/signup';

const PersonalInfo = (props: SectionProps) => {
  const { formData, onChange, onNext, error, handleError } = props;
  const handleNext = () => {
    let isValid = true;
    if (!formData?.surname) {
      handleError('surname', 'Please enter your surname');
      isValid = false;
    }
    if (!formData?.firstName) {
      handleError('firstName', 'Please enter your first name');
      isValid = false;
    }
    if (!formData?.dob) {
      handleError('dob', 'Please enter your date of birth');
      isValid = false;
    }
    if (!formData?.nationality) {
      handleError('nationality', 'Please enter your nationality');
      isValid = false;
    }
    if (!formData?.homeAddress) {
      handleError('homeAddress', 'Please enter your home address');
      isValid = false;
    }
    if (!formData?.homeAddressTel) {
      handleError('homeAddressTel', 'Please enter your home telephone number');
      isValid = false;
    }
    if (!formData?.permanentAddress) {
      handleError('permanentAddress', 'Please enter your permanent address');
      isValid = false;
    }
    if (!formData?.permanentAddressTel) {
      handleError(
        'permanentAddressTel',
        'Please enter your permanent address telephone number'
      );
      isValid = false;
    }
    if (!formData?.occupation) {
      handleError('occupation', 'Please enter your occupation');
      isValid = false;
    }
    if (!formData?.occupationTel) {
      handleError(
        'occupationTel',
        'Please enter your occupation telephone number'
      );
      isValid = false;
    }
    if (!formData?.employer) {
      handleError('employer', 'Please enter your employer');
      isValid = false;
    }
    if (!formData?.businessAddress) {
      handleError('businessAddress', 'Please enter your business address');
      isValid = false;
    }
    if (!formData?.businessAddressTel) {
      handleError(
        'businessAddressTel',
        'Please enter your business address telephone number'
      );
      isValid = false;
    }
    if (!formData?.nameOfBankers) {
      handleError('nameOfBankers', 'Please enter the name of your bankers');
      isValid = false;
    }

    // If there are no errors, call onNext
    if (isValid) {
      onNext();
    }
  };

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Personal information</h2>
      <div className="flex flex-wrap mb-4">
        <div className="w-full md:w-1/2 md:pr-2">
          <label
            htmlFor="surname"
            className="block text-gray-700 font-medium mb-1"
          >
            Surname
          </label>
          <input
            className="mt-1 block w-full md:w-96 rounded-md p-2 shadow-lg focus:border-red focus:ring-red focus:outline-red"
            type="text"
            name="surname"
            onChange={onChange}
            value={formData?.surname || ''}
            onFocus={() => handleError('surname', '')}
          />
          {error?.surname ? (
            <div className="text-red text-sm">{error.surname}</div>
          ) : (
            <div className="h-5" />
          )}
        </div>
        <div className="w-full md:w-1/2 md:pl-2 mt-4 md:mt-0">
          <label
            htmlFor="firstName"
            className="block text-gray-700 font-medium mb-1"
          >
            First Name
          </label>
          <input
            className="mt-1 block w-full md:w-96 rounded-md p-2 shadow-lg focus:border-red focus:ring-red focus:outline-red"
            type="text"
            name="firstName"
            onChange={onChange}
            value={formData?.firstName || ''}
            onFocus={() => handleError('firstName', '')}
          />
          {error?.firstName ? (
            <div className="text-red text-sm">{error.firstName}</div>
          ) : (
            <div className="h-5" />
          )}
        </div>
      </div>
      <div className="flex flex-wrap mb-4">
        <div className="w-full md:w-1/2 md:pr-2">
          <label htmlFor="dob" className="block text-gray-700 font-medium mb-1">
            Date of Birth
          </label>
          <input
            className="mt-1 block w-full md:w-96 rounded-md p-2 shadow-lg focus:border-red focus:ring-red focus:outline-red"
            type="date"
            name="dob"
            onChange={onChange}
            value={formData?.dob || ''}
            onFocus={() => handleError('dob', '')}
          />
          {error?.dob ? (
            <div className="text-red text-sm">{error.dob}</div>
          ) : (
            <div className="h-5" />
          )}
        </div>
        <div className="w-full md:w-1/2 md:pl-2 mt-4 md:mt-0">
          <label
            htmlFor="nationality"
            className="block text-gray-700 font-medium mb-1"
          >
            Nationality
          </label>
          <input
            className="mt-1 block w-full md:w-96 rounded-md p-2 shadow-lg focus:border-red focus:ring-red focus:outline-red"
            type="text"
            name="nationality"
            onChange={onChange}
            value={formData?.nationality || ''}
            onFocus={() => handleError('nationality', '')}
          />
          {error?.nationality ? (
            <div className="text-red text-sm">{error.nationality}</div>
          ) : (
            <div className="h-5" />
          )}
        </div>
      </div>

      <div className="flex flex-wrap mb-4">
        <div className="w-full md:w-2/3 md:pr-2">
          <label
            htmlFor="homeAddress"
            className="block text-gray-700 font-medium mb-1"
          >
            Home Address
          </label>
          <input
            className="mt-1 block w-full  rounded-md p-2 shadow-lg focus:border-red focus:ring-red focus:outline-red"
            type="text"
            name="homeAddress"
            onChange={onChange}
            value={formData?.homeAddress || ''}
            onFocus={() => handleError('homeAddress', '')}
          />
          {error?.homeAddress ? (
            <div className="text-red text-sm">{error.homeAddress}</div>
          ) : (
            <div className="h-5" />
          )}
        </div>
        <div className="w-full md:w-1/3 md:pl-2 mt-4 md:mt-0">
          <label
            htmlFor="homeAddressTel"
            className="block text-gray-700 font-medium mb-1"
          >
            Tel
          </label>
          <input
            className="mt-1 block w-full rounded-md p-2 shadow-lg focus:border-red focus:ring-red focus:outline-red"
            type="text"
            name="homeAddressTel"
            onChange={onChange}
            value={formData?.homeAddressTel || ''}
            onFocus={() => handleError('homeAddressTel', '')}
          />
          {error?.homeAddressTel ? (
            <div className="text-red text-sm">{error.homeAddressTel}</div>
          ) : (
            <div className="h-5" />
          )}
        </div>
      </div>

      <div className="flex flex-wrap mb-4">
        <div className="w-full md:w-2/3 md:pr-2">
          <label
            htmlFor="permanentAddress"
            className="block text-gray-700 font-medium mb-1"
          >
            Permanet Home Address
          </label>
          <input
            className="mt-1 block w-full  rounded-md p-2 shadow-lg focus:border-red focus:ring-red focus:outline-red"
            type="text"
            name="permanentAddress"
            onChange={onChange}
            value={formData?.permanentAddress || ''}
            onFocus={() => handleError('permanentAddress', '')}
          />
          {error?.permanentAddress ? (
            <div className="text-red text-sm">{error.permanentAddress}</div>
          ) : (
            <div className="h-5" />
          )}
        </div>
        <div className="w-full md:w-1/3 md:pl-2 mt-4 md:mt-0">
          <label
            htmlFor="permanentAddressTel"
            className="block text-gray-700 font-medium mb-1"
          >
            Tel
          </label>
          <input
            className="mt-1 block w-full rounded-md p-2 shadow-lg focus:border-red focus:ring-red focus:outline-red"
            type="text"
            name="permanentAddressTel"
            onChange={onChange}
            value={formData?.permanentAddressTel || ''}
            onFocus={() => handleError('permanentAddressTel', '')}
          />
          {error?.permanentAddressTel ? (
            <div className="text-red text-sm">{error.permanentAddressTel}</div>
          ) : (
            <div className="h-5" />
          )}
        </div>
      </div>

      <div className="flex flex-wrap mb-4">
        <div className="w-full md:w-2/3 md:pr-2">
          <label
            htmlFor="occupation"
            className="block text-gray-700 font-medium mb-1"
          >
            Occupation
          </label>
          <input
            className="mt-1 block w-full  rounded-md p-2 shadow-lg focus:border-red focus:ring-red focus:outline-red"
            type="text"
            name="occupation"
            onChange={onChange}
            value={formData?.occupation || ''}
            onFocus={() => handleError('occupation', '')}
          />
          {error?.occupation ? (
            <div className="text-red text-sm">{error.occupation}</div>
          ) : (
            <div className="h-5" />
          )}
        </div>
        <div className="w-full md:w-1/3 md:pl-2 mt-4 md:mt-0">
          <label
            htmlFor="occupationTel"
            className="block text-gray-700 font-medium mb-1"
          >
            Tel
          </label>
          <input
            className="mt-1 block w-full rounded-md p-2 shadow-lg focus:border-red focus:ring-red focus:outline-red"
            type="text"
            name="occupationTel"
            onChange={onChange}
            value={formData?.occupationTel || ''}
            onFocus={() => handleError('occupationTel', '')}
          />
          {error?.occupationTel ? (
            <div className="text-red text-sm">{error.occupationTel}</div>
          ) : (
            <div className="h-5" />
          )}
        </div>
      </div>

      <div className="mb-4">
        <label
          htmlFor="employer"
          className="block text-gray-700 font-medium mb-1"
        >
          Employer
        </label>
        <input
          className="mt-1 block w-full  rounded-md p-2 shadow-lg focus:border-red focus:ring-red focus:outline-red"
          type="text"
          name="employer"
          onChange={onChange}
          value={formData?.employer || ''}
          onFocus={() => handleError('employer', '')}
        />
        {error?.employer ? (
          <div className="text-red text-sm">{error.employer}</div>
        ) : (
          <div className="h-5" />
        )}
      </div>

      <div className="flex flex-wrap mb-4">
        <div className="w-full md:w-2/3 md:pr-2">
          <label
            htmlFor="bussinessAddress"
            className="block text-gray-700 font-medium mb-1"
          >
            Business Address
          </label>
          <input
            className="mt-1 block w-full  rounded-md p-2 shadow-lg focus:border-red focus:ring-red focus:outline-red"
            type="text"
            name="businessAddress"
            onChange={onChange}
            value={formData?.businessAddress || ''}
            onFocus={() => handleError('businessAddress', '')}
          />
          {error?.businessAddress ? (
            <div className="text-red text-sm">{error.businessAddress}</div>
          ) : (
            <div className="h-5" />
          )}
        </div>
        <div className="w-full md:w-1/3 md:pl-2 mt-4 md:mt-0">
          <label
            htmlFor="businessAddressTel"
            className="block text-gray-700 font-medium mb-1"
          >
            Tel
          </label>
          <input
            className="mt-1 block w-full rounded-md p-2 shadow-lg focus:border-red focus:ring-red focus:outline-red"
            type="text"
            name="businessAddressTel"
            onChange={onChange}
            value={formData?.businessAddressTel || ''}
            onFocus={() => handleError('businessAddressTel', '')}
          />
          {error?.businessAddressTel ? (
            <div className="text-red text-sm">{error.businessAddressTel}</div>
          ) : (
            <div className="h-5" />
          )}
        </div>
      </div>

      <div className="mb-4">
        <label
          htmlFor="nameOfBankers"
          className="block text-gray-700 font-medium mb-1"
        >
          Name of Bankers
        </label>
        <input
          className="mt-1 block w-full  rounded-md p-2 shadow-lg focus:border-red focus:ring-red focus:outline-red"
          type="text"
          name="nameOfBankers"
          onChange={onChange}
          value={formData?.nameOfBankers || ''}
          onFocus={() => handleError('nameOfBankers', '')}
        />
        {error?.nameOfBankers ? (
          <div className="text-red text-sm">{error.nameOfBankers}</div>
        ) : (
          <div className="h-5" />
        )}
      </div>
      <div className="flex justify-end ml-6 mt-4">
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

export default PersonalInfo;
