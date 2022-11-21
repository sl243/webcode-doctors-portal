import { format } from 'date-fns';
import React, { useContext } from 'react';
import toast from 'react-hot-toast';
import { AuthContext } from '../../../context/AuthProvider';

const BookingModal = ({ treatment,setTreatment, selectedDate, refetch }) => {
    const { name, slots, price } = treatment;
    const date = format(selectedDate, 'PP');
    const {user} = useContext(AuthContext)

    const handleBooking = event => {
        event.preventDefault();
        const form = event.target;

        const slot = form.slot.value;
        const patient = form.patient.value;
        const email = form.email.value;
        const phone = form.phone.value;

        const booking = {
            appointmentDate: date,
            treatment: name,
            patient,
            slot,
            email,
            phone,
            price
        }

        fetch('https://webcode-doctors-server.vercel.app/bookings', {
            method: 'POST',
            headers: {
                'content-type' : 'application/json'
            },
            body: JSON.stringify(booking)
        })
        .then( res => res.json())
        .then( data => {
            console.log(data)
            if(data.acknowledged) {
                setTreatment(null)
                toast.success('Booking Confirmed')
                refetch()
            }
            else {
                toast.error(data.message)
            }
        })

        
    }
    return (
        <>
            <input type="checkbox" id="booking-modal" className="modal-toggle" />
            <div className="modal">
                <div className="modal-box relative">
                    <label htmlFor="booking-modal" className="btn btn-sm btn-circle absolute right-2 top-2">✕</label>
                    <h3 className="text-lg font-bold">{name}</h3>
                    <form onSubmit={handleBooking} className='grid grid-cols-1 gap-3'>
                        <input type="text" disabled value={date} className="input input-bordered w-full mt-10" />
                        <select name='slot' className="select select-bordered w-full">

                            {
                                slots.map((slot, i) => <option 
                                value={slot}
                                key={i}
                                >{slot}</option>)
                            }

                        </select>
                        <input
                            name='patient'
                            type="text"
                            defaultValue={user?.displayName}
                            disabled
                            placeholder="Your Name Here"
                            className="input input-bordered w-full"
                        />
                        <input
                            name='email'
                            type="text"
                            defaultValue={user?.email}
                            disabled
                            placeholder="Your Email Address"
                            className="input input-bordered w-full"
                            required
                        />
                        <input
                            name='phone'
                            type="text"
                            placeholder="Your Phone Number"
                            className="input input-bordered w-full"
                            required
                        />
                        <input
                            name='submit'
                            type="submit"
                            value="Submit"
                            className="btn"
                        />
                    </form>
                </div>
            </div>
        </>
    );
};

export default BookingModal;