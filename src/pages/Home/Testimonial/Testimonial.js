import React from 'react';
import quote from '../../../assets/icons/quote.svg'
import people1 from '../../../assets/images/people1.png';
import people2 from '../../../assets/images/people2.png';
import people3 from '../../../assets/images/people3.png';
import Reviews from './Reviews';

const Testimonial = () => {

    const reviews = [
        {
            id: 1,
            testimoni: 'It is a long established fact that by the readable content of a lot layout. The point of using Lorem a more-or-less normal distribu to using Content here, content',
            img: people1,
            name: 'Md Shamim Hossain',
            location: 'Bangladesh'
        },
        {
            id: 1,
            testimoni: 'It is a long established fact that by the readable content of a lot layout. The point of using Lorem a more-or-less normal distribu to using Content here, content',
            img: people2,
            name: 'Jak Herry',
            location: 'California'
        },
        {
            id: 1,
            testimoni: 'It is a long established fact that by the readable content of a lot layout. The point of using Lorem a more-or-less normal distribu to using Content here, content',
            img: people3,
            name: 'Jannatul Ferdouse',
            location: 'Bangladesh'
        }
    ]

    return (
        <section className='mt-24'>
            <div className='flex justify-between'>
                <div>
                    <h3 className='text-xl text-primary'>Testimonial</h3>
                    <h2 className='text-2xl'>What Our Patients Says</h2>
                </div>
                <figure>
                    <img
                        className='w-24 lg:w-40'
                        src={quote}
                        alt=''
                    ></img>
                </figure>
            </div>
            <div className='grid gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-3'>
                {
                    reviews.map(review => <Reviews
                        key={review.id}
                        review={review}
                    ></Reviews>)
                }
            </div>
        </section>
    );
};

export default Testimonial;