import React from 'react';

const Reviews = ({ review }) => {
    const { name, img, testimoni, location } = review;
    return (
        <div className="card shadow-xl">
            <div className="card-body">
                <p>{testimoni}</p>
                <div className="flex mt-6">
                    <div className="avatar mr-6">
                        <div className="w-12 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2">
                            <img src={img} alt=''/>
                        </div>
                    </div>
                    <div>
                        <h4>{name}</h4>
                        <h5>{location}</h5>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Reviews;