import React from "react";


function SigninPage(){
    return(
        <>
        <div className="flex justify-center items-center min-h-screen bg-gray-100" >
            <div className="max-w-4xl w-full flex flex-col md:flex-row items-center justify-center space-y-6 md:space-y-0 md:space-x-12 p-6">
                <div className="text-center md:text-left" >
                    <h1 className="text-blue-600 text-5xl font-bold mb-4" >facebook</h1>
                    <p className="text-xl" >Facebook helps you connect and share <br/> with people in your life.</p>

                </div>
                <div className="bg-white p-6 rounded-lg shadow-md w-full max-w-sm">
                    <form>
                        <input type="text" placeholder="Email address or phone number" className="w-full p-3 mb-3 border rounded focus:outline-none focus:ring-blue-500" />
                        <input type="password" placeholder="Password" className="w-full p-3 mb-3 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500" />
                        <button type="submit" className="w-full bg-blue text-white p-3 rounded font-semibold hover:bg-blue-700" >
                            Log in

                        </button>
                        <div className="text-center mt-3" >
                            <a href="#" className="text-blue-600 text-sm hover:underline" >
                                Forgotten password?

                            </a>

                        </div>
                        <hr className="my-4" />
                        <button>
                            
                        </button>
                    </form>

                </div>

            </div>

        </div>
        </>
    )
}

export default SigninPage