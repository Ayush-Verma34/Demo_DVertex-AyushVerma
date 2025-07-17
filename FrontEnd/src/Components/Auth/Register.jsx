import { useForm } from "react-hook-form";
import { addUser, loginUser } from '../../api/userApi';
import { Link, useNavigate } from "react-router-dom";

const Register = () => {

    const {
        register,
        handleSubmit,
        formState: { errors }
    } = useForm();
    const navigate = useNavigate();

    const submitCall = async (data) => {
        try {
            const response = await addUser(data)
            await loginUser(data)
            if (response.status == 200) {
                // alert(response.data.message)
                navigate("/landing");
            }
        } catch (error) {
            alert(error.response.data.message)
        }
    }

    return (
        <div className="w-full min-h-screen bg-gray-300 p-4 flex flex-col">
            <div className="p-3 pb-6 m-auto mb-4 border-b-4 w-full">
                <h1 className="text-xl md:text-3xl font-bold text-cyan-900 flex items-center">
                    <img src="./../../public/icon.png" alt="icon" className='h-12 w-12 mr-2' />
                    Student Management
                </h1>
            </div>
            <div className="flex-grow flex items-center justify-center">
                <div className="bg-gray-100 md:w-[400px] px-8 py-6 rounded-xl">
                    <form
                        onSubmit={handleSubmit(submitCall)}
                        className='flex flex-col w-auto justify-center space-y-6 mb-6'>
                        <h2 className="font-semibold text-2xl text-center mb-6">Create Account</h2>
                        <div className="flex flex-col">
                            <label htmlFor='name' className='mb-1'>Full Name:</label>
                            <input
                                type="text"
                                id='name'
                                {...register("name", {
                                    required: "Name is required",
                                    minLength: {
                                        value: 3,
                                        message: "Name must be at least 3 characters long"
                                    }
                                })}
                                placeholder='Enter Name'
                                className='p-2 rounded-md border'
                            />
                            {errors.name && <div className='text-red-700 opacity-70'>{errors.name.message}</div>}
                        </div>
                        <div className="flex flex-col">
                            <label htmlFor='email' className='mb-1'>Email id:</label>
                            <input
                                type="text"
                                id='email'
                                {...register("email", {
                                    required: "Email is required",
                                    pattern: {
                                        value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                                        message: "Please enter valid email"
                                    }
                                })}
                                placeholder='Enter Email'
                                className='p-2 rounded-md border'
                            />
                            {errors.email && <div className='text-red-700 opacity-70'>{errors.email.message}</div>}
                        </div>
                        <div className="flex flex-col mb-8">
                            <label htmlFor='password' className='mb-1'>Password:</label>
                            <input
                                type="password"
                                id='password'
                                {...register("password", {
                                    required: "Password is required",
                                    pattern: {
                                        value: /^(?=.*[A-Z])(?=.*[^a-zA-Z0-9]).{8,}$/,
                                        message: "Please enter a valid Password"
                                    }
                                })}
                                placeholder='Password must be strong'
                                className='p-2 rounded-md border'
                            />
                            {errors.password && <div className='text-red-700 opacity-70'>{errors.password.message}</div>}
                        </div>
                        <button
                            type="submit"
                            className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600">Register
                        </button>
                    </form>
                    <p className='text-center'>Already have an Account?
                        <Link to="/login" className="text-blue-800 underline ml-1">Login</Link></p>
                </div>
            </div>
        </div>
    )
}

export default Register