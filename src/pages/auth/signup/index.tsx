import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { buttonStyle } from '@/constants/styles';
import EmailSection from '@/components/signup/EmailSection';
import PersonalInfo from '@/components/signup/PersonalInfo';
import StepsIndicator from '@/components/signup/StepsIndicator';
import { initialErrorData, initialFormData, steps } from '@/constants/signup';
import { ErrorData, FormData } from '@/types/signup';
import SectionB from '@/components/signup/SectionB';
import SectionC from '@/components/signup/SectionC';

const MembershipForm = () => {
  const router = useRouter();
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState<FormData>(initialFormData);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<ErrorData>(initialErrorData);

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
    if (step === 1) return setStep(step + 1);

    setLoading(true);
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
      handleError('general', 'Error saving form data');
    }
    setLoading(false);
  };

  const handlePrevious = () => {
    setStep(step - 1);
  };

  const handleChange = (
    event: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => {
    console.log(event);
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
          <EmailSection
            formData={formData}
            setFormData={setFormData}
            error={error}
            loading={loading}
            onPrevious={handlePrevious}
            onChange={handleChange}
            onNext={handleNext}
            handleError={handleError}
          />
        );

      case 2:
        return (
          <PersonalInfo
            formData={formData}
            error={error}
            setFormData={setFormData}
            loading={loading}
            onPrevious={handlePrevious}
            onChange={handleChange}
            onNext={handleNext}
            handleError={handleError}
          />
        );

      case 3:
        return (
          <SectionB
            formData={formData}
            error={error}
            loading={loading}
            onPrevious={handlePrevious}
            setFormData={setFormData}
            onChange={handleChange}
            onNext={handleNext}
            handleError={handleError}
          />
        );
      case 4:
        return (
          <SectionC
            formData={formData}
            error={error}
            loading={loading}
            onPrevious={handlePrevious}
            onChange={handleChange}
            onNext={handleNext}
            handleError={handleError}
            setFormData={setFormData}
          />
        );
      // more form sections...
    }
  };

  return (
    <>
      <div className="h-20 w-full bg-black" />
      <div className="mt-4 flex flex-col w-full justify-center items-center">
        <StepsIndicator
          currentStep={step}
          setCurrentStep={setStep}
          steps={steps}
        />
      </div>
      <div className="flex  mx-auto lg:max-w-7xl px-4 md:px-8 justify-center items-center mt-5 mb-10  w-full">
        <div className="bg-white px-4 md:px-8 pt-5 pb-4 sm:p-6 sm:pb-4">
          {renderStep()}
          <div className="flex flex-col w-full justify-center items-center">
            {error?.general ? (
              <div className="text-red text-sm">{error.general}</div>
            ) : (
              <div className="h-5" />
            )}
            {loading && <p>Loading...</p>}
          </div>
        </div>
      </div>
    </>
  );
};

export default MembershipForm;
