import React from 'react';

const DoctorsComponent = () => {
  return (
    <div className="flex flex-col items-center bg-gradient-to-r from-blue-100 to-blue-300 min-h-screen p-10">
      <div className="bg-white shadow-lg rounded-xl p-8 w-full max-w-4xl">
        <h1 className="text-2xl font-bold text-gray-800 text-center mb-6">
          Meet Our Expert Doctors
        </h1>
        <div className="flex justify-center space-x-8">
          <div className="flex flex-col items-center">
            <div className="w-40 h-40 bg-gray-300 rounded-full overflow-hidden">
              <img src="https://a.ppy.sh/18521788?1628914267.jpeg" alt="Doctor 1" className="w-full h-full object-cover" />
            </div>
            <p className="mt-4 font-semibold text-gray-700">Dr. John Smith</p>
            <p className="text-gray-500">Cardiologist</p>
          </div>
          <div className="flex flex-col items-center">
            <div className="w-40 h-40 bg-gray-300 rounded-full overflow-hidden">
              <img src="https://a.ppy.sh/18521788?1628914267.jpeg" alt="Doctor 2" className="w-full h-full object-cover" />
            </div>
            <p className="mt-4 font-semibold text-gray-700">Dr. Alex Johnson</p>
            <p className="text-gray-500">Neurologist</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DoctorsComponent;
