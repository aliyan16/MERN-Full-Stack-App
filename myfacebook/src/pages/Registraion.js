import React from "react";

function RegistrationPage() {
  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md bg-white p-6 rounded-lg shadow-md">
        <div className="text-center mb-4">
          <h1 className="text-blue-600 text-4xl font-bold mb-2">facebook</h1>
          <h2 className="text-xl font-semibold">Create a new account</h2>
          <p className="text-sm text-gray-600">It's quick and easy.</p>
        </div>
        <form>
          <div className="flex space-x-2 mb-3">
            <input
              type="text"
              placeholder="First name"
              className="w-1/2 p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <input
              type="text"
              placeholder="Surname"
              className="w-1/2 p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <label className="block text-xs text-gray-600 mb-1">Date of birth</label>
          <div className="flex space-x-2 mb-3">
            <select className="w-1/3 p-2 border rounded">
              <option>27</option>
              {/* Add more options */}
            </select>
            <select className="w-1/3 p-2 border rounded">
              <option>Jun</option>
              {/* Add more options */}
            </select>
            <select className="w-1/3 p-2 border rounded">
              <option>2025</option>
              {/* Add more options */}
            </select>
          </div>
          <label className="block text-xs text-gray-600 mb-1">Gender</label>
          <div className="flex space-x-2 mb-3">
            <label className="flex items-center w-1/3 p-2 border rounded cursor-pointer">
              <span className="mr-1">Female</span>
              <input type="radio" name="gender" />
            </label>
            <label className="flex items-center w-1/3 p-2 border rounded cursor-pointer">
              <span className="mr-1">Male</span>
              <input type="radio" name="gender" />
            </label>
            <label className="flex items-center w-1/3 p-2 border rounded cursor-pointer">
              <span className="mr-1">Custom</span>
              <input type="radio" name="gender" />
            </label>
          </div>
          <input
            type="text"
            placeholder="Mobile number or email address"
            className="w-full p-2 border rounded mb-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <input
            type="password"
            placeholder="New password"
            className="w-full p-2 border rounded mb-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <p className="text-xs text-gray-600 mb-3">
            People who use our service may have uploaded your contact information to Facebook.{" "}
            <a href="#" className="text-blue-600 hover:underline">Learn more.</a>
          </p>
          <p className="text-xs text-gray-600 mb-3">
            By clicking Sign Up, you agree to our{" "}
            <a href="#" className="text-blue-600 hover:underline">Terms</a>,{" "}
            <a href="#" className="text-blue-600 hover:underline">Privacy Policy</a> and{" "}
            <a href="#" className="text-blue-600 hover:underline">Cookies Policy</a>. 
            You may receive SMS notifications from us and can opt out at any time.
          </p>
          <button className="w-full bg-green-600 text-white p-2 rounded font-semibold hover:bg-green-700">
            Sign Up
          </button>
          <div className="text-center mt-3">
            <a href="#" className="text-blue-600 hover:underline">Already have an account?</a>
          </div>
        </form>
      </div>
    </div>
  );
}

export default RegistrationPage;
