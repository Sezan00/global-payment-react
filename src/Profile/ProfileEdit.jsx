import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';

export const ProfileEdit = () => {
    const [userInfo, setUserInfo] = useState({});
    const [error, setError] = useState(null);
    const [formData, setFormData] = useState({
        dob: '',
        phone: '',
        address_line1: '',
        city: '',
        post_code: ''
    })

    useEffect(()=>{
        setFormData({
            dob:   userInfo.dob || '',
            phone: userInfo.phone || '',
            address_line1: userInfo.address_line1 || '',
            city: userInfo.city || '',
            post_code: userInfo.post_code || ''
        })
    }, [userInfo])

    const { id } = useParams({});
    useEffect(() => {
        const fetchUserInfo = async () => {
            try {
                const token = localStorage.getItem('token');
                const res = await axios.get(`https://global-backend.sezan.xyz/api/edit-profile/${id}`, {
                    headers: { Authorization: `Bearer ${token}` }
                })
                setUserInfo(res.data.userinfo);
                console.log(res.data.userinfo);
                
            } catch (error) {
                console.log(error)
            }
        }
        fetchUserInfo();
    }, [id])

    const handleSubmit = async () => {
        try{
            const token = localStorage.getItem('token');
            const res   = await axios.put(`https://global-backend.sezan.xyz/api/update-profile`,
                formData,
                {headers: {Authorization: `Bearer ${token}`}}
            );
            alert(res.data.message);
        } catch(err){
            console.log(err);
            alert('Update failed')
        }
    }

    return (
        <>
            <div className="min-h-screen  from-gray-100 to-gray-200 flex justify-center items-center px-4">
                <div className="w-full max-w-3xl bg-white p-8 rounded-2xl shadow-xl border border-gray-200">

                    <h2 className="text-2xl font-semibold text-gray-700 mb-6">
                        Profile Details
                    </h2>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

                        {/* Name */}
                        <div>
                            <label className="block text-sm font-medium text-gray-600 mb-1">
                                Name
                            </label>
                            <input
                                type="text"
                                value={userInfo.name || ''}
                                readOnly
                                className="w-full rounded-lg border border-gray-200 bg-gray-100 
                                           px-4 py-2 text-gray-500 cursor-not-allowed"
                            />
                        </div>

                        {/* Email - Read Only */}
                        <div>
                            <label className="block text-sm font-medium text-gray-600 mb-1">
                                Email
                            </label>
                            <input
                                type="email"
                                value={userInfo.email || ''}
                                readOnly
                                className="w-full rounded-lg border border-gray-200 bg-gray-100 
                     px-4 py-2 text-gray-500 cursor-not-allowed"
                            />
                            <p className="mt-1 text-xs text-gray-400">
                                Email address cannot be changed
                            </p>
                        </div>

                        {/* Country - Editable */}
                        <div>
                            <label className="block text-sm font-medium text-gray-600 mb-1">
                                Country
                            </label>
                            <input
                                type="text"
                                value={userInfo.country?.name || ''}
                                readOnly
                                className="w-full rounded-lg border border-gray-200 bg-gray-100 
                     px-4 py-2 text-gray-500 cursor-not-allowed"
                            />
                            <p className='mt-1 text-xs text-gray-400'>Country address cannot be changed</p>
                        </div>
                        {/* date of birth  */}
                     <div>
                        <label className="block text-sm font-medium text-gray-600 mb-1">
                            Date of Birth
                        </label>

                        <input
                            type="date"
                            value={formData.dob || ''}
                            name="date_of_birth"
                            max={new Date().toISOString().split("T")[0]}
                            className="w-full rounded-lg border border-gray-300 px-4 py-2
                            focus:outline-none focus:ring-2 focus:ring-indigo-400"
                            onChange={(e)=> setFormData({...formData, dob: e.target.value})}
                        />
                        </div>

                        {/* Phone - Editable */}
                        <div>
                            <label className="block text-sm font-medium text-gray-600 mb-1">
                                Phone
                            </label>
                            <input
                                type="text"
                                value={formData.phone || ''}
                                placeholder="0175******"
                                className="w-full rounded-lg border border-gray-300 px-4 py-2 
                                focus:outline-none focus:ring-2 focus:ring-indigo-400"
                                onChange={(e) => setFormData({...formData, phone: e.target.value})}
                            />
                        </div>
                        {/* Address line  */}
                        <div>
                            <label className="block text-sm font-medium text-gray-600 mb-1">
                                Address
                            </label>
                            <input
                                type="text"
                                value={formData.address_line1 || ''}
                                placeholder="Location"
                                className="w-full rounded-lg border border-gray-300 px-4 py-2 
                                focus:outline-none focus:ring-2 focus:ring-indigo-400"
                                onChange={(e)=> setFormData({...formData, address_line1: e.target.value})}
                            />
                        </div>
                        {/* city name  */}
                        <div>
                            <label className="block text-sm font-medium text-gray-600 mb-1">
                                City
                            </label>
                            <input
                                type="text"
                                value={formData.city || ''}
                                placeholder="Current City"
                                className="w-full rounded-lg border border-gray-300 px-4 py-2 
                                focus:outline-none focus:ring-2 focus:ring-indigo-400"
                                onChange={(e) => setFormData({...formData, city: e.target.value})}
                            />
                        </div>

                        {/* post code  */}
                        <div>
                            <label className="block text-sm font-medium text-gray-600 mb-1">
                                Post Code
                            </label>
                            <input
                                type="text"
                                value={formData.post_code || ''}
                                placeholder="12*****"
                                className="w-full rounded-lg border border-gray-300 px-4 py-2 
                                focus:outline-none focus:ring-2 focus:ring-indigo-400"
                                onChange={(e)=> setFormData({...formData, post_code: e.target.value})}
                            />
                        </div>

                    </div>

                    {/* Buttons */}
                    <div className="mt-8 flex justify-end gap-4">
                        <button className="px-6 py-2 rounded-lg border border-gray-300 text-gray-600 hover:bg-gray-100">
                            Cancel
                        </button>
                        <button className="px-6 py-2 rounded-lg bg-indigo-600 text-white hover:bg-indigo-700"
                            onClick={handleSubmit}
                        >
                            Save Changes
                        </button>
                    </div>

                </div>
            </div>

        </>
    )
}

export default ProfileEdit;