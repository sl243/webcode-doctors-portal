import React from 'react';
import treatment from '../../../assets/images/treatment.png'

const DentalCare = () => {
    return (
        <div className=" card mt-10 bg-base-100 shadow-xl">
            <div className="md:flex mb-10 mt-10">
                <div className='md:w-1/2 mx-auto'> 
                    <figure><img className='h-96 w-3/4 rounded-md' src={treatment} alt="Album" /></figure>
                </div>
                <div className="card-body md:w-1/2 mx-auto">
                    <h2 className="card-title text-5xl font-semibold">Exceptional Dental <br></br> Care, on Your Terms</h2>
                    <p className='mt-3 text-lg'>It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsumis that it has a more-or-less normal distribution of letters,as opposed to using 'Content here, content here', making it look like readable English. Many desktop publishing packages and web page</p>
                    <div className="card-actions">
                        <button className="btn btn-primary bg-gradient-to-r from-primary to-secondary text-white">GET STARTED</button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default DentalCare;