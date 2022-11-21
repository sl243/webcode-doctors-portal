import React from 'react';
import PrimaryButton from '../../../Components/PrimaryButton/PrimaryButton';
import doctor from '../../../assets/images/doctor-small.png'
import appointment from '../../../assets/images/appointment.png'

const MakeAppointment = () => {
    return (
        <section className='mt-48' 
        style={{
            background: `url(${appointment})`
        }} 
        
        >
            <div className="hero">
                <div className="hero-content flex-col lg:flex-row">
                    <img
                        alt=''
                        src={doctor}
                        className="-mt-40 lg:w-1/2 hidden md:block"
                    />
                    <div>
                        <h1 className="text-xl font-bold text-primary">Appointment</h1>
                        <h1 className="text-4xl font-bold text-white mt-3">Make an appointment Today</h1>
                        <p className="py-6 text-white">It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsumis that it has a more-or-less normal distribution of letters,as opposed to using 'Content here, content here', making it look like readable English. Many desktop publishing packages and web page.</p>
                        <PrimaryButton>Get Started</PrimaryButton>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default MakeAppointment;