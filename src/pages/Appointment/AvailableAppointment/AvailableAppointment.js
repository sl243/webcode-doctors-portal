import { useQuery } from '@tanstack/react-query';
import { format } from 'date-fns';
import React, { useState } from 'react';
import Loading from '../../Shared/Loading/Loading';
import BookingModal from '../BookingModal/BookingModal';
import AppointmentOption from './AppointmentOption';

const AvailableAppointment = ({ selectedDate }) => {
    // const [appointmentOptions, setAppointmentOptions] = useState([])
    const [treatment, setTreatment] = useState(null)
    const date = format(selectedDate, 'PP')

    const {data : appointmentOptions = [], refetch, isLoading} = useQuery({
        queryKey: ['appointmentOptions', date],
        queryFn: async () => {
            const res = await fetch(`https://webcode-doctors-server.vercel.app/appointmentOptions?date=${date}`);
            const data = await res.json();
            return data;
        }
    })

    if(isLoading){
        return <Loading></Loading>
    }

    // const {data:appointmentOptions = []} = useQuery({
    //     queryKey: ['appointmentOptions'],
    //     queryFn: () => fetch('https://webcode-doctors-server.vercel.app/appointmentOptions')
    //     .then(res => res.json())
    // })

    // useEffect(() => {
    //     fetch('https://webcode-doctors-server.vercel.app/appointmentOptions')
    //         .then(res => res.json())
    //         .then(data => setAppointmentOptions(data))
    // }, [])

    return (
        <section className='mt-12'>
            <p className='text-center text-secondary font-bold'>Available Appointments on {format(selectedDate, 'PP')}</p>
            <div className='grid gap-5 grid-cols-1 md:grid-cols-2 lg:grid-cols-3 mt-10'>
                {
                    appointmentOptions.map(appointmentOption => <AppointmentOption
                        key={appointmentOption._id}
                        appointmentOption={appointmentOption}
                        setTreatment={setTreatment}
                    ></AppointmentOption>)
                }
            </div>
            {
                treatment &&
                <BookingModal
                    treatment={treatment}
                    selectedDate = {selectedDate}
                    setTreatment = {setTreatment}
                    refetch = {refetch}
                ></BookingModal>
            }
        </section>
    );
};

export default AvailableAppointment;