import React from 'react';
import appointment from '../../../assets/images/appointment.png'
import PrimaryButton from '../../../Components/PrimaryButton/PrimaryButton';

const Contact = () => {
    return (
        <section className='mt-24'
            style={{
                background: `url(${appointment})`,
                backgroundSize: 'cover'
            }}
        >
            <div className=''>
                <div className='text-center'>
                    <h4 className='text-xl text-primary font-semibold'>Contact Us</h4>
                    <h3 className='text-2xl text-white font-semibold'>Stay connected with us</h3>
                </div>
                <div className='w-1/4 mx-auto'>
                    <form>
                        <input
                            type="name"
                            placeholder="Enter Your Name"
                            className="input w-full mb-4 mt-6"
                        />
                        <input
                            type="phone"
                            placeholder="Enter Your phone number"
                            className="input w-full mb-4"
                        />
                        <input
                            type="email"
                            placeholder="Enter Your email address"
                            className="input w-full mb-4"
                        />
                        <textarea
                            className="textarea w-full mb-4"
                            placeholder="Your Message">
                        </textarea>
                        <PrimaryButton>Submit</PrimaryButton>
                    </form>
                </div>
            </div>
        </section>
    );
};

export default Contact;