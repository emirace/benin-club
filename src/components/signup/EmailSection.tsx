import { buttonStyle } from '@/constants/styles';
import { SectionProps } from '@/types/signup';

const EmailSection = (props: SectionProps) => {
  const { formData, error, loading, onChange, onNext, handleError } = props;
  const handleNext = async () => {
    handleError('general', '');
    if (!formData?.email) {
      handleError('email', 'Please enter a valid email');
      return;
    }
    const response = await fetch('/api/auth/verify-email', {
      method: 'POST',
      body: JSON.stringify({ email: formData.email }),
      headers: {
        'Content-Type': 'application/json',
      },
    });
    if (response.ok) {
      onNext();
    } else {
      const errorMessage = await response.json();
      handleError('email', errorMessage.message);
    }
  };
  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Verifying your email</h2>
      <label htmlFor="email" className="block text-gray-700 font-medium mb-1">
        Email
      </label>
      <input
        className="mt-1 block w-full md:w-96 rounded-md p-2  shadow-lg  focus:border-red focus:ring-red focus:outline-red"
        type="email"
        name="email"
        onChange={onChange}
        value={formData?.email || ''}
        onFocus={() => handleError('email', '')}
      />
      {error?.email ? (
        <div className="text-red text-sm">{error.email}</div>
      ) : (
        <div className="h-5" />
      )}
      <div className="flex justify-end ml-6 mt-4">
        <button className={buttonStyle} onClick={handleNext} disabled={loading}>
          verify
        </button>
      </div>
    </div>
  );
};

export default EmailSection;
