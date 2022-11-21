import { useQuery } from '@tanstack/react-query';
import React, { useState } from 'react';
import toast from 'react-hot-toast';
import ConfirmationModal from '../../Shared/ConfirmationModal/ConfirmationModal';
import Loading from '../../Shared/Loading/Loading';

const ManageDoctors = () => {
    const [deleteDoctor, setDeleteDoctor] = useState(null);
    
    const closeModal = () => {
        setDeleteDoctor(null)
    }


    const { data: doctors, isLoading, refetch } = useQuery({
        queryKey: ['doctors'],
        queryFn: async () => {
            try {
                const res = await fetch('https://webcode-doctors-server.vercel.app/doctors', {
                    headers: {
                        authorization: `bearer ${localStorage.getItem('access-token')}`
                    }
                })
                const data = await res.json();
                return data;
            }
            catch {

            }
        }
    })

    // delete doctor
    const handleDeleteDoctor = doctor => {
        fetch( `https://webcode-doctors-server.vercel.app/doctors/${doctor._id}`, {
            method: 'DELETE',
            headers: {
                authorization: `bearer ${localStorage.getItem('access-token')}`
            }
        })
        .then(res => res.json())
        .then(data => {
            if(data.deletedCount > 0){
                refetch();
                toast.success(`Doctor ${doctor.name} deleted successfully`)
            }
            
        })
    }

    if(isLoading){
        return <Loading></Loading>
    }

    return (
        <div>
            <h2 className='text-3xl mt-10'>Manage Doctors: {doctors?.length}</h2>
            <div className="overflow-x-auto mt-5">
                <table className="table w-full">
                    <thead>
                        <tr>
                            <th></th>
                            <th>Avatar</th>
                            <th>Name</th>
                            <th>Email</th>
                            <th>Specialty</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            doctors?.map((doctor, i) => <tr key={doctor._id}>
                                <th>{i + 1}</th>
                                <td>
                                    <div className="avatar">
                                        <div className="w-24 rounded-full">
                                            <img src={doctor.image} alt='' />
                                        </div>
                                    </div>
                                </td>
                                <td>{doctor.name}</td>
                                <td>{doctor.email}</td>
                                <td>{doctor.specialty}</td>
                                <td>
                                    <label
                                        onClick={() => setDeleteDoctor(doctor)}
                                        htmlFor="confirmation-modal"
                                        className="btn btn-error btn-circle">
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" /></svg>
                                    </label>
                                </td>
                            </tr>)
                        }
                    </tbody>
                </table>
            </div>
            {
                deleteDoctor && 
                <ConfirmationModal
                    title={`Are you sure want to delete`}
                    message={`If you delete ${deleteDoctor.name}. It cannot be undone`}
                    successAction={handleDeleteDoctor}
                    modalData={deleteDoctor}
                    closeModal={closeModal}
                ></ConfirmationModal>
            }
        </div>
    );
};

export default ManageDoctors;