import React, { useContext, useState } from 'react';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../../context/AuthProvider';
import useToken from '../../hooks/useToken';

const Signup = () => {
    const { register, handleSubmit, formState: { errors } } = useForm();
    const { userCreate, updateUserProfile } = useContext(AuthContext);
    const [signupError, setSignupError] = useState('')
    const [createdUserEmail, setCreatedUserEmail] = useState('');
    const [token] = useToken(createdUserEmail)

    const navigate = useNavigate();

    if(token) {
        navigate('/');
    }

    const handleSignUp = data => {
        setSignupError('')

        userCreate(data.email, data.password)
            .then(result => {
                const user = result.user;
                console.log(user)
                toast.success('Your Account Created Successfully')

                const userInfo = {
                    displayName: data.name,
                }

                updateUserProfile(userInfo)
                    .then(() => { 
                        userSaveDatabase(data.name, data.email)
                    })
                    .catch(error => {
                        console.error(error)
                    })
            })
            .catch(error => {
                console.error(error)
                setSignupError(error.message)
            })
    }

    // user save in database
    const userSaveDatabase = (name, email) => {
        const user = {name, email};
        fetch('https://webcode-doctors-server.vercel.app/users', {
            method: 'POST',
            headers: {
                'content-type' : 'application/json'
            },
            body: JSON.stringify(user) 
        })
        .then( res => res.json())
        .then( data => {
            console.log(data)
            setCreatedUserEmail(email)
        })
    }

    // get user access token jwt
    /*
    const getUserToken = email => {
        fetch(`https://webcode-doctors-server.vercel.app/jwt?email=${email}`)
        .then( res => res.json())
        .then( data => {
            if(data.accessToken) {
                localStorage.setItem('access-token', data.accessToken)
                navigate('/')
            }
        })
    }
    */

    return (
        <div className='h-[800px] flex justify-center items-center'>
            <div className='w-96 m-7'>
                <h1 className='text-3xl'>Sign Up</h1>
                <form onSubmit={handleSubmit(handleSignUp)}>
                    <div className="form-control w-full max-w-xs">
                        <label className="label">
                            <span className="label-text">Name</span>
                        </label>
                        <input
                            {...register("name", {
                                required: 'Name is required'
                            })}
                            type="name"
                            placeholder="Your Name"
                            className="input input-bordered w-full"
                        />
                    </div>
                    {errors.name && <p className='text-red-500'>{errors.name?.message}</p>}
                    <div className="form-control w-full max-w-xs">
                        <label className="label">
                            <span className="label-text">Email</span>
                        </label>
                        <input
                            {...register("email", {
                                required: 'Email is required',

                            })}
                            type="email"
                            placeholder="Your Email"
                            className="input input-bordered w-full"
                        />
                    </div>
                    {errors.email && <p className='text-red-500'>{errors.email?.message}</p>}
                    <div className="form-control w-full max-w-xs">
                        <label className="label">
                            <span className="label-text">Password</span>
                        </label>
                        <input
                            {...register("password", {
                                required: 'Password is required',
                                minLength: { value: 6, message: 'Password Must be at least 6 character' },
                                pattern: { value: /^(?=.*\d)(?=.*[A-Z])(?=.*[a-z])(?=.*[a-zA-Z!#$%&? "])[a-zA-Z0-9!#$%&?]{8,20}$/, message: 'Password Must be Strong' }

                            })}
                            type="password"
                            placeholder="Your is Password"
                            className="input input-bordered w-full"
                        />
                        {errors.password && <p className='text-red-500'>{errors.password?.message}</p>}
                        <label className="label">
                            <span className="label-text-alt">Forgate Password ?</span>
                        </label>

                        <input className='btn btn-accent w-full' value='Sign Up' type="submit" />
                    </div>
                    {
                        signupError && <p className='text-red-800'>{signupError}</p>
                    }
                </form>
                <p className='text-sm mt-3 '>Already have an account?
                    <Link className='text-secondary' to='/login'> Please Login</Link>
                </p>

                <div className="divider max-w-xs">OR</div>

                <button className='btn btn-outline w-full max-w-xs'>CONTINUE WITH GOOGLE</button>
            </div>
        </div>
    );
};

export default Signup;