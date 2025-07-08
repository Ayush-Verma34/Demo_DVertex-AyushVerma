import React, { useState } from 'react'

const EditStudent = ({ student, onClose, onSave }) => {

    const [formData, setFormData] = useState({ ...student })

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value })
    }

    return (
        <div className="fixed inset-0 bg-black bg-opacity-30 flex justify-center items-center">
            <div className="bg-white p-6 rounded shadow w-1/3">
                <h2 className="text-xl mb-4 font-semibold">Edit Student</h2>
                <input name="name" value={formData.name} onChange={handleChange} className="block w-full mb-2 border p-2 rounded" />
                <input name="email" value={formData.email} onChange={handleChange} className="block w-full mb-2 border p-2 rounded" />
                <input name="fees" value={formData.fees} onChange={handleChange} className="block w-full mb-2 border p-2 rounded" />
                <div className="flex justify-end gap-2">
                    <button onClick={onClose} className="bg-gray-500 text-white px-4 py-1 rounded">Cancel</button>
                    <button onClick={() => onSave(formData)} className="bg-blue-500 text-white px-4 py-1 rounded">Save</button>
                </div>
            </div>
        </div>
    )
}

export default EditStudent