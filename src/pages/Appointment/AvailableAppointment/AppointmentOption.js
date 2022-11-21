import React from 'react';

const AppointmentOption = ({ appointmentOption, setTreatment }) => {
    const { name, slots, price } = appointmentOption
    return (
        <div className="card shadow-xl">
            <div className="card-body">
                <h2 className="text-2xl font-bold text-center text-secondary">{name}</h2>
                <p className='text-center'>
                    {slots.length > 0 ? slots[0] : 'Try another day'}
                </p>
                <p className='text-center'>
                    {slots.length} {slots.length > 1 ? 'spaces' : 'space'} Abailable
                </p>
                <p className='text-center'><small >Price: ${price}</small></p>
                <div className="card-actions justify-center">
                    <label
                        disabled={slots.length===0}
                        onClick={() => setTreatment(appointmentOption)}
                        htmlFor="booking-modal"
                        className="btn btn-primary bg-gradient-to-r from-primary to-secondary text-white">
                        Book Appointment
                    </label>
                </div>
            </div>
        </div>
    );
};

export default AppointmentOption;