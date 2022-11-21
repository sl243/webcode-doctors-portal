import { useQuery } from '@tanstack/react-query';
import React from 'react';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import Loading from '../../Shared/Loading/Loading';

const AddDoctor = () => {
    const { register, handleSubmit, formState: { errors } } = useForm();

    const imgHostKey = process.env.REACT_APP_imgbb_Key;

    const navigate = useNavigate();

    const { data: specialities, isLoading } = useQuery({
        queryKey: 'specialty',
        queryFn: async () => {
            const res = await fetch('https://webcode-doctors-server.vercel.app/appointmentSpeciality');
            const data = await res.json();
            return data;
        }
    })

    const handleAddDoctor = data => {
        const image = (data.image[0]);
        const formData = new FormData();
        formData.append('image', image);
        const url = `https://api.imgbb.com/1/upload?key=${imgHostKey}`
        fetch(url, {
            method: 'POST',
            body: formData
        })
            .then(res => res.json())
            .then(imgData => {
                if(imgData.success){
                    console.log(imgData.data.url)
                    const doctor = {
                        name: data.name,
                        email: data.email,
                        specialty: data.specialty,
                        image: imgData.data.url
                    }

                    // save doctors infomation in the database
                    fetch('https://webcode-doctors-server.vercel.app/doctors', {
                        method: 'POST',
                        headers: {
                            'content-type' : 'application/json',
                            authorization: `bearer ${localStorage.getItem('access-token')}`
                        },
                        body: JSON.stringify(doctor)
                    })
                    .then( res => res.json())
                    .then( result => {
                        console.log(result)
                        toast.success(`${data.name} is added successfully`)
                        navigate('/dashboard/managedoctors')
                    })
                }
            })
    }

    if (isLoading) {
        return <Loading></Loading>
    }

    return (
        <div className=''>
            <div className='w-96 m-7'>
                <h1 className='text-3xl'>Add A Doctor</h1>
                <form onSubmit={handleSubmit(handleAddDoctor)}>
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
                            <span className="label-text">Specialty</span>
                        </label>
                        <select
                            {...register("specialty", {
                                required: 'specialty is required',

                            })}
                            className="select select-bordered w-full max-w-xs">

                            {
                                specialities?.map(specialty => <option
                                    key={specialty._id}
                                    value={specialty.name}
                                >{specialty.name}</option>)
                            }

                        </select>
                        <div className="form-control w-full max-w-xs">
                            <label className="label">
                                <span className="label-text">Upload Photo</span>
                            </label>
                            <input
                                {...register("image", {
                                    required: 'img is required'
                                })}
                                type="file"
                                placeholder="Your file"
                                className="input input-bordered w-full"
                            />
                        </div>
                        {errors.img && <p className='text-red-500'>{errors.img?.message}</p>}
                        <input className='btn btn-accent w-full mt-3' value='Add Doctor' type="submit" />
                    </div>

                    {/* {
                        signupError && <p className='text-red-800'>{signupError}</p>
                    } */}
                </form>
            </div>
        </div>
    );
};

export default AddDoctor;