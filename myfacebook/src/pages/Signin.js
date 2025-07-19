import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function SigninPage({setCurrentUser}){
    const navigate=useNavigate()
    const [SigninData,setSigninData]=useState({
        emailOrMobile:'',
        password:''
    })

    const handleChange=(e)=>{
        setSigninData(prev=>({
            ...prev,
            [e.target.name]:e.target.value,
        }))
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await axios.post('http://localhost:5000/signin', SigninData);
            alert(res.data.message);
            
            // Store the complete user object
            setCurrentUser(res.data.user);
            
            // Optional: Store in localStorage for persistence
            // localStorage.setItem('currentUser', JSON.stringify(res.data.user));
            
            navigate('/home');
        } catch (e) {
            console.error('Error logging in', e);
            alert(e.response?.data?.error || 'Sign in failed');
        }
        };

    return(
        <>
        <div className="flex justify-center items-center min-h-screen bg-gray-100" >
            <div className="max-w-4xl w-full flex flex-col md:flex-row items-center justify-center space-y-6 md:space-y-0 md:space-x-12 p-6">
                <div className="text-center md:text-left" >
                    <h1 className="text-blue-600 text-5xl font-bold mb-4" >facebook</h1>
                    <p className="text-xl" >Facebook helps you connect and share <br/> with people in your life.</p>

                </div>
                <div className="bg-white p-6 rounded-lg shadow-md w-full max-w-sm">
                    <form onSubmit={handleSubmit}>
                        <input name="emailOrMobile" value={SigninData.emailOrMobile} onChange={handleChange} type="text" placeholder="Email address or phone number" className="w-full p-3 mb-3 border rounded focus:outline-none focus:ring-blue-500" />
                        <input name="password" value={SigninData.password} onChange={handleChange} type="password" placeholder="Password" className="w-full p-3 mb-3 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500" />
                        <button type="submit" className="w-full bg-blue-600 text-white p-3 rounded font-semibold hover:bg-blue-700" >
                            Log in

                        </button>
                        <div className="text-center mt-3" >
                            <a href="#" className="text-blue-600 text-sm hover:underline" >
                                Forgotten password?

                            </a>

                        </div>
                        <hr className="my-4" />
                        <button onClick={()=>navigate('/registration')}  type="button" className="w-full bg-green-600 text-white p-3 rounded font-semibold hover:bg-green-700" >
                            Create new account

                        </button>
                    </form>
                    <div className="text-center text-sm mt-4" >
                        <a href="#" className="font-semibold hover:underline">
                            Create a Page

                        </a>{' '}
                        for a celebrity,brand or business

                    </div>
                </div>

            </div>

        </div>
        </>
    )
}

export default SigninPage