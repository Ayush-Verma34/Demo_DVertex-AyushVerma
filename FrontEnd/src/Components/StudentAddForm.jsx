import { useState } from 'react'
import { FiX } from "react-icons/fi";

const StudentAddForm = ({ addStudent, onClose }) => {
  const [formData, setFormData] = useState({ name: "", studentNo: "", email: "", fees: "" });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (formData.studentNo && formData.name && formData.email && formData.fees) {
      addStudent(formData);
      setFormData({ studentNo: "", name: "", email: "", fees: "" });
      onClose();
    }
  };
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  const clearData = (e) => {
    setFormData({ studentNo: "", name: "", email: "", fees: "" })
  }
  return (
    <div className='fixed inset-0 bg-black/50 backdrop-blur-sm flex justify-center items-center w-full'>
      <div className='bg-gray-200 md:w-[400px] px-8 py-6 m-auto rounded-xl'>
        <div className='flex items-center justify-between mb-6'>
          <h2 className='font-semibold text-2xl'>
            Add Students
          </h2>
          <button onClick={onClose}
            className='bg-gray-300 p-2 rounded-full hover:bg-gray-500'><FiX className=' md:text-xl' /></button>
        </div>
        <form className='flex flex-col w-auto justify-center space-y-2.5 mb-6'>
          <label className='mb-1.5'>Students Name:</label>
          <input type="text" name='name' placeholder='Enter Name' className='p-2 rounded-md border mb-3' value={formData.name} onChange={handleChange} />
          <label className='mb-1.5'>Students No.:</label>
          <input type='number' name='studentNo' placeholder='Enter Student No' className='p-2 rounded-md border mb-3' value={formData.studentNo} onChange={handleChange} />
          <label className='mb-q.5'>Students Emaild:</label>
          <input name='email' type='email' placeholder='Enter EmailId' className='p-2 rounded-md border mb-3' value={formData.email} onChange={handleChange} />
          <label className='mb-q.5'>Students Fees:</label>
          <input name='fees' type='number' placeholder='Enter Fees' className='p-2 rounded-md border' value={formData.fees} onChange={handleChange} />
        </form>
        <div className='flex items-center justify-between'>
          <button
            type="submit"
            onClick={handleSubmit}
            className="w-20 bg-blue-500 md:bg-blue-400 text-white py-2 rounded-lg md:hover:bg-blue-600">Add
          </button>
          <button
            onClick={clearData}
            className="w-20 bg-red-500 md:bg-red-400 text-white py-2 rounded-lg md:hover:bg-red-600"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  )
}

export default StudentAddForm