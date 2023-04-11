type StepsIndicatorProps = {
  steps: string[];
  currentStep: number;
  setCurrentStep: (index: number) => void;
};

const StepsIndicator = ({
  steps,
  currentStep,
  setCurrentStep,
}: StepsIndicatorProps) => {
  return (
    <>
      <div className="flex flex-wrap justify-center space-x-4 ">
        {steps.map((step, index) => (
          <div
            key={step}
            className={`${
              currentStep === index + 1 ? 'border-red' : 'border-gray'
            } border-2 p-2 rounded-full mb-4 md:mb-0 `}
          >
            <div
              className={`${
                currentStep === index + 1 ? 'bg-red' : 'bg-gray'
              } rounded-full h-10 w-10 flex items-center justify-center text-white cursor-pointer`}
              onClick={() => setCurrentStep(index + 1)}
            >
              {index + 1}
            </div>
          </div>
        ))}
      </div>
      <div className="flex flex-wrap items-center justify-center md:justify-between gap-4 mt-4">
        <h2 className="text-4xl md:text-6xl font-base mb-2 uppercase">
          Section
        </h2>
        <h2 className="text-4xl md:text-6xl font-bold mb-4 uppercase text-red">
          {currentStep}
        </h2>
      </div>
    </>
  );
};

export default StepsIndicator;
