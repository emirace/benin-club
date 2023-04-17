import { buttonStyle, buttonStyleOutline } from '@/constants/styles';
import { Education, SectionProps } from '@/types/signup';
import React, { useState } from 'react';

const SectionE = (props: SectionProps) => {
  const {
    setFormData,
    formData,
    onPrevious,
    onChange,
    onNext,
    error,
    handleError,
  } = props;

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    validation();
  };
  const validation = () => {
    let isValid = true;

    if (isValid) {
      onNext();
    }
  };

  return (
    <div className="">
      <h2 className="text-2xl font-bold mb-4">Proposer</h2>

      <form onSubmit={handleSubmit}>
        <div>
          <div className="mb-4">
            <label
              htmlFor="proposerKnown"
              className="block text-gray-700 font-medium mb-2"
            >
              How long have you known the applicant and in what capacity?
            </label>
            <textarea
              id="proposerKnown"
              name="proposerKnown"
              placeholder="Enter reason for joining"
              className="mt-1 block w-full rounded-md p-2 shadow-lg focus:border-red focus:ring-red focus:outline-red"
              onChange={onChange}
              value={formData.proposerKnown}
            />
            {/* {error?.marriageDuration ? (
              <div className="text-red-500 mt-2 text-sm">
                {error.marriageDuration}
              </div>
            ) : (
              <div className="h-5" />
            )} */}
          </div>

          <div className="mb-4">
            <label
              htmlFor="proposerPersonality"
              className="block text-gray-700 font-medium mb-2"
            >
              Please comment on the candidates personality with particular
              reference to his/her moral character, emotional stability and
              physical stability
            </label>
            <textarea
              id="proposerPersonality"
              name="proposerPersonality"
              placeholder="Enter reason for joining"
              className="mt-1 block w-full rounded-md p-2 shadow-lg focus:border-red focus:ring-red focus:outline-red"
              onChange={onChange}
              value={formData.proposerPersonality}
            />
            {/* {error?.marriageDuration ? (
              <div className="text-red-500 mt-2 text-sm">
                {error.marriageDuration}
              </div>
            ) : (
              <div className="h-5" />
            )} */}
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
          <button type="submit" className={buttonStyle}>
            Next
          </button>
        </div>
      </form>
    </div>
  );
};
export default SectionE;
