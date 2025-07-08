import { useState } from 'react'

const StudentAddForm = ({ addStudent }) => {
  const [formData, setFormData] = useState({ name: "", studentNo: "", email: "", fees: "" });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (formData.studentNo && formData.name && formData.email && formData.fees) {
      addStudent(formData);
      setFormData({ studentNo: "", name: "", email: "", fees: "" });
    }
  };
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  const clearData = (e) => {
    setFormData({ studentNo: "", name: "", email: "", fees: "" })
  }
  return (
    <div className='w-full py-3'>
      <div className='bg-gray-200 md:w-[700px] w-auto p-3 m-auto'>
        <h2 className='font-semibold text-center text-2xl'>
          Add Students
        </h2>
        <form className='m-3 flex flex-col w-auto justify-center space-y-2.5' >
          <input type="text" name='name' placeholder='Students Name' className='p-2 rounded border' value={formData.name} onChange={handleChange} />
          <input type='number' name='studentNo' placeholder='Student No' className='p-2 rounded border' value={formData.studentNo} onChange={handleChange} />
          <input name='email' type='email' placeholder='Students EmailId' className='p-2 rounded border' value={formData.email} onChange={handleChange} />
          <input name='fees' type='number' placeholder='Students Fees' className='p-2 rounded border' value={formData.fees} onChange={handleChange} />
        </form>
        <div className='text-center space-x-2.5'>
          <button
            type="submit"
            onClick={handleSubmit}
            className="bg-blue-500 md:bg-blue-400 text-white px-4 py-2 rounded md:hover:bg-blue-600">Add
          </button>
          <button
            onClick={clearData}
            className="bg-red-500 md:bg-red-400 text-white px-4 py-2 rounded md:hover:bg-red-600"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  )
}

export default StudentAddForm