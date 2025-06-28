import React, { useState } from "react";
import axios from "axios";

function RegistrationPage() {
  const [RegisterData,setRegisterData]=useState({
    firstName:'',
    lastName:'',
    dob:{day:'',month:'',year:''},
    gender:'',
    emailOrMobile:'',
    password:''
  })
  const handleChange=(e)=>{
    const {name,value}=e.target
    if(['day','month','year'].includes(name)){
      setRegisterData(prev=>({
        ...prev,
        dob:{
          ...prev.dob,
          [name]:value
        }
      }))
    }else{
      setRegisterData(prev=>({
        ...prev,
        [name]:value
      }))
    }
  }

  const handleSubmit=async (e)=>{
    e.preventDefault()
    try{
      const res=await axios.post('http://localhost:5000/register',RegisterData)
      alert(res.data.message || 'Registration Successful')
    }catch(e){
      console.error('Registration Failed ',e)
      alert(e.response?.data?.error || 'Registration failed')

    }
  }


  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md bg-white p-6 rounded-lg shadow-md">
        <div className="text-center mb-4">
          <h1 className="text-blue-600 text-4xl font-bold mb-2">facebook</h1>
          <h2 className="text-xl font-semibold">Create a new account</h2>
          <p className="text-sm text-gray-600">It's quick and easy.</p>
        </div>
        <form onSubmit={handleSubmit} >
          <div className="flex space-x-2 mb-3">
            <input
              type="text"
              name="firstName"
              placeholder="First name"
              value={RegisterData.firstName}
              onChange={handleChange}
              required
              className="w-1/2 p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <input
              type="text"
              name="lastName"
              placeholder="Last Name"
              value={RegisterData.lastName}
              onChange={handleChange}
              required
              className="w-1/2 p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <label className="block text-xs text-gray-600 mb-1">Date of birth</label>
          <div className="flex space-x-2 mb-3">
            <select value={RegisterData.dob.day} name="day" onChange={handleChange} required  className="w-1/3 p-2 border rounded">
              <option>Day</option>
              {[...Array(31).keys()].map(i => (
                <option key={i+1} value={i+1}>{i+1}</option>
              ))}
            </select>
            <select value={RegisterData.dob.month} name="month" onChange={handleChange} required  className="w-1/3 p-2 border rounded">
              <option>Month</option>
              {["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"].map(m => (
                <option key={m} value={m}>{m}</option>
              ))}
            </select>
            <select value={RegisterData.dob.year} name="year" onChange={handleChange} required  className="w-1/3 p-2 border rounded">
              <option>Year</option>
              {[...Array(100).keys()].map(i => {
                const y = new Date().getFullYear() - i;
                return <option key={y} value={y}>{y}</option>
              })}
            </select>
          </div>
          <label className="block text-xs text-gray-600 mb-1">Gender</label>
          <div className="flex space-x-2 mb-3">
            {["Female", "Male", "Custom"].map(g => (
              <label key={g} className="flex items-center w-1/3 p-2 border rounded cursor-pointer">
                <span className="mr-1">{g}</span>
                <input type="radio" name="gender" value={g} checked={RegisterData.gender === g} onChange={handleChange} required/>
              </label>
            ))}
          </div>
          <input
            type="text"
            name="emailOrMobile"
            placeholder="Mobile number or email address"
            value={RegisterData.emailOrMobile}
            onChange={handleChange}
            required
            className="w-full p-2 border rounded mb-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <input
            type="password"
            name="password"
            placeholder="New password"
            value={RegisterData.password}
            onChange={handleChange}
            className="w-full p-2 border rounded mb-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        
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
