import CalculatorHub from '@/components/calculators/CalculatorHub';

const Calculators = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-cactus-50 to-cerulean-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-cactus-800 mb-4">
            Financial Calculators
          </h1>
          <p className="text-xl text-cactus-600 max-w-3xl mx-auto">
            Interactive tools to help you plan your financial future and make informed decisions
          </p>
        </div>
        
        <CalculatorHub />
      </div>
    </div>
  );
};

export default Calculators;