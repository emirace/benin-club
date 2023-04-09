import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { buttonStyle } from '@/constants/styles';

const MembershipForm = () => {
  const router = useRouter();
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({ email: '', name: '' });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState({ general: '', email: '' });

  useEffect(() => {
    // Load saved form data from database when the component mounts
    const fetchSavedData = async () => {
      const response = await fetch('/api/membership');
      if (response.ok) {
        const savedData = await response.json();
        setFormData(savedData);
      }
    };
    fetchSavedData();
  }, []);

  const handleSubmit = async () => {
    setLoading(true);
    const response = await fetch('/api/membership', {
      method: 'POST',
      body: JSON.stringify(formData),
      headers: {
        'Content-Type': 'application/json',
      },
    });
    if (response.ok) {
      router.push('/membership/success');
    } else {
      alert('Error submitting form');
    }
    setLoading(false);
  };

  const handleNext = async () => {
    setLoading(true);
    if (step === 1) {
      if (!formData.email) {
        handleError('email', 'Please enter a valid email');
        setLoading(false);
        return;
      }
      const response = await fetch('/api/auth/verify-email', {
        method: 'POST',
        body: JSON.stringify({ email: formData.email }),
        headers: {
          'Content-Type': 'application/json',
        },
      });
      console.log(response);
      if (response.ok) {
        // setStep(step + 1);
      } else {
        handleError('general', 'Error saving form data');
      }
      setLoading(false);
      return;
    } else if (step === 6) {
      handleSubmit();
    } else {
      const response = await fetch('/api/membership', {
        method: 'POST',
        body: JSON.stringify(formData),
        headers: {
          'Content-Type': 'application/json',
        },
      });
      if (response.ok) {
        setStep(step + 1);
      } else {
        alert('Error saving form data');
      }
      setLoading(false);
    }
  };

  const handlePrevious = () => {
    setStep(step - 1);
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
    handleError('general', '');
  };

  const handleError = (name: string, value: string) => {
    setError((prev) => ({ ...prev, [name]: value }));
  };

  const renderStep = () => {
    switch (step) {
      case 1:
        return (
          <div>
            {error.general ? (
              <div className="text-red text-sm">{error.general}</div>
            ) : (
              <div className="h-5" />
            )}
            <label
              htmlFor="email"
              className="block text-gray-700 font-medium mb-1"
            >
              Email
            </label>
            <input
              className="mt-1 block w-full md:w-96 rounded-md p-2  shadow-lg  focus:border-red focus:ring-red focus:outline-red"
              type="email"
              name="email"
              onChange={handleChange}
              value={formData.email || ''}
              onFocus={() => handleError('email', '')}
            />
            {error.email ? (
              <div className="text-red text-sm">{error.email}</div>
            ) : (
              <div className="h-5" />
            )}
            <div className="flex justify-end ml-6 mt-4">
              <button className={buttonStyle} onClick={handleNext}>
                verify
              </button>
            </div>
          </div>
        );

      case 2:
        return (
          <div>
            <label
              htmlFor="email"
              className="block text-gray-700 font-medium mb-1"
            >
              Name
            </label>
            <input
              className="mt-1 block w-full rounded-md p-2 mb-2  shadow-lg  focus:border-red focus:ring-red focus:outline-red"
              type="text"
              name="name"
              onChange={handleChange}
              value={formData.name || ''}
            />
            <button className={buttonStyle} onClick={handleNext}>
              Next
            </button>
          </div>
        );
      // more form sections...
    }
  };

  return (
    <div className="flex  mx-auto lg:max-w-7xl px-4 md:px-8 justify-center items-center my-10 md:my-20  w-full">
      <div className="bg-white px-4 md:px-8 pt-5 pb-4 sm:p-6 sm:pb-4">
        {renderStep()}
        {loading && <p>Loading...</p>}
      </div>
    </div>
  );
};

export default MembershipForm;
