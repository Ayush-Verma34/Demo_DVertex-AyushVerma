import { useState } from 'react'
import EditStudent from './EditStudent';
import { FaUserEdit } from "react-icons/fa";
import { BiSolidHide, BiSolidShow } from "react-icons/bi";
import { MdDeleteForever } from "react-icons/md";

const StudentTable = ({ students, toggleHide, deleteStudent, updateStudent }) => {
  // console.log(students);
  const [editingStudent, setEditingStudent] = useState(null)
  return (
    <div className='w-full bg-white shadow rounded p-2'>
      <table className='w-full shadow rounded table-fixed'>
        <thead className="bg-gray-200 text-center">
          <tr>
            <th className="p-2 w-8 md:w-20">S. No.</th>
            <th className="p-2">Name</th>
            <th className="p-2 overflow-auto">Student No.</th>
            <th className="p-2">Email</th>
            <th className="p-2">Fees</th>
            <th className="p-2 overflow-auto">Actions</th>
          </tr>
        </thead>
        <tbody>
          {students.map((s, index) => (
            <tr key={s.id} className={s.hidden ? "opacity-30" : ""}>
              <td className="p-2 text-center bg-gray-100">{index + 1}</td>
              <td className="p-2 text-center bg-gray-100">{s.name}</td>
              <td className="p-2 text-center bg-gray-100">{s.studentNo}</td>
              <td className="p-2 text-center bg-gray-100 overflow-y-auto">{s.email}</td>
              <td className="p-2 text-center bg-gray-100">{s.fees}</td>
              <td className='p-2 text-center bg-gray-100 space-x-2'>
                <button
                  type='button' onClick={() => setEditingStudent(s)}
                  className='px-3 py-1 bg-green-600 rounded'>
                  <FaUserEdit className='w-5 h-5 text-amber-50' />
                </button>
                <button
                  type='button' onClick={() => toggleHide(s.id)}
                  className='px-3 py-1 bg-yellow-600 rounded '>
                  {s.hidden ? <BiSolidShow className='h-5 w-5 text-amber-50' /> : <BiSolidHide className='h-5 w-5 text-amber-50' />}
                </button>
                <button
                  type='button'
                  onClick={() => deleteStudent(s.id)}
                  className='px-3 py-1 bg-red-600 rounded'>
                  <MdDeleteForever className='h-5 w-5 text-amber-50' />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {editingStudent && (
        <EditStudent student={editingStudent} onClose={() => setEditingStudent(null)} onSave={(updatedData) => {
          updateStudent(editingStudent.id, updatedData);
          setEditingStudent(null);
        }} />
      )}
    </div>
  )
}

export default StudentTable