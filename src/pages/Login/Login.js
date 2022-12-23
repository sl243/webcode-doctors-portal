import React, { useContext, useState } from 'react';
import { useForm } from "react-hook-form";
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { AuthContext } from '../../context/AuthProvider';
import useToken from '../../hooks/useToken';

const Login = () => {
    const { register, formState: { errors }, handleSubmit } = useForm();
    const { signIn, googleSignIn } = useContext(AuthContext)
    const [loginError, setLoginError] = useState('')

    const [loginUserEmail, setLoginUserEmail] = useState('')
    const [token] = useToken(loginUserEmail)

    const location = useLocation();
    const navigate = useNavigate();
    const from = location.state?.from?.pathname || '/'

    if(token) {
        navigate(from, { replace: true })
    }

    const handleLogin = data => {
        console.log(data)
        setLoginError('')

        signIn(data.email, data.password)
            .then(result => {
                const user = result.user;
                console.log(user)
                navigate(from, {replace: true})
                setLoginUserEmail(data.email)
                
            })
            .catch(error => {
                console.error(error.message);
                setLoginError(error.message)
            })
    }

    // Google Sign in
    const handleGoogleSignIn = () => {
        googleSignIn()
        .then( result => {
            const user = result.user;
            console.log(user)
        })
        .catch( error => {
            console.error(error)
        })
    }

    return (
        <div className='h-[800px] flex justify-center items-center'>
            <div className='w-96 m-7'>
                <h1 className='text-3xl'>Login</h1>
                <form onSubmit={handleSubmit(handleLogin)}>
                    <div className="form-control w-full max-w-xs">
                        <label className="label">
                            <span className="label-text">Email</span>
                        </label>
                        <input
                            {...register("email", {
                                required: 'Email Address Required'
                            })}
                            type="text"
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
                                required: 'Password is Required',
                                minLength: { value: 6, message: 'Password at least 6 character' }
                            })}
                            type="password"
                            placeholder="Your is Password"
                            className="input input-bordered w-full"
                        />
                        {errors.password && <p className='text-red-500'>{errors.password?.message}</p>}
                        <label className="label">
                            <span className="label-text-alt">Forgate Password ?</span>
                        </label>

                        <input className='btn btn-accent w-full' value='Login' type="submit" />
                        <div>
                            {
                                loginError && <p className='text-red-500'>{loginError}</p>
                            }
                        </div>
                    </div>
                </form>
                <p className='text-sm mt-3 '>New to Doctors Portal?
                    <Link className='text-secondary' to='/signup'> Create new account</Link>
                </p>

                <div className="divider max-w-xs">OR</div>

                <button
                    onClick={handleGoogleSignIn}
                    className='btn btn-outline w-full max-w-xs'>CONTINUE WITH GOOGLE
                </button>
            </div>
        </div>
    );
};

export default Login;