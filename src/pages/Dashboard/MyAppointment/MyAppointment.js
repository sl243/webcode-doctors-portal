
import { useQuery } from '@tanstack/react-query';
import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../../../context/AuthProvider';

const MyAppointment = () => {
    const {user} = useContext(AuthContext)

    const url = `https://webcode-doctors-server.vercel.app/bookings?email=${user?.email}`

    const {data: bookings = []} = useQuery({
        queryKey: ['bookings', user?.email],
        queryFn: async () => {
            const res = await fetch(url, {
                headers: {
                    authorization: `bearer ${localStorage.getItem('access-token')}`
                }
            });
            const data = await res.json();
            return data;
        }
    })

    return (
        <div className='mb-20'>
            <h2 className='text-2xl mb-6 mt-10'>My Appointment</h2>
            <div className="overflow-x-auto">
                <table className="table w-full">
                    <thead>
                        <tr>
                            <th></th>
                            <th>Name</th>
                            <th>Treatment</th>
                            <th>Date</th>
                            <th>Time</th>
                            <th>Amount</th>
                            <th>Payment</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            bookings.length > 0 &&
                            bookings?.map((booking, i) => <tr key={booking._id}>
                                <th>{i+1}</th>
                                <td>{booking.patient}</td>
                                <td>{booking.treatment}</td>
                                <td>{booking.appointmentDate}</td>
                                <td>{booking.slot}</td>
                                <td>${booking.price}</td>
                                <td>
                                    {
                                        booking.price && !booking.paid &&
                                        <Link to={`/dashboard/payment/${booking._id}`}>
                                            <button
                                                className='btn btn-outline btn-sm'
                                            >Pay</button>
                                        </Link>
                                    }
                                    {
                                        booking.price && booking.paid && 
                                        <span className='text-blue-500 font-bold'>Paid</span>
                                    }
                                </td>
                            </tr>)
                        }
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default MyAppointment;