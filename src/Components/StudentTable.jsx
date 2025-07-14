import { useState } from 'react'
import EditStudent from './EditStudent';
import { FaUserEdit } from "react-icons/fa";
import { BiSolidHide, BiSolidShow } from "react-icons/bi";
import { MdDeleteForever } from "react-icons/md";

const StudentTable = ({ students, toggleHide, deleteStudent, updateStudent }) => {

  const [editingStudent, setEditingStudent] = useState(null)
  const [isHidden, setIsHidden] = useState(false)


  return (
    <div className='bg-white shadow rounded p-2'>
      <div className='overflow-x-auto'>
      <table className='w-full min-w-[400px] shadow rounded-lg table-fixed'>
        <thead className="bg-gray-300 text-center">
          <tr>
            <th className="py-3 w-10 md:w-20">S. No.</th>
            <th className="py-3">Name</th>
            <th className="py-3">Student No.</th>
            <th className="py-3">Email</th>
            <th className="py-3">Fees</th>
            <th className='py-3 space-x-2'><span>Actions</span>
              <button
                onClick={() => setIsHidden(prev => !prev)}
                className='px-3 py-1 bg-gray-500 hover:bg-gray-600 rounded border border-gray-600'>
                {isHidden ? <BiSolidShow title='Show Visible Students' className='h-5 w-5 text-amber-50' /> : <BiSolidHide title='Show Hidden Students' className='h-5 w-5 text-amber-50' />}
              </button>
            </th>
          </tr>
        </thead>
        <tbody>
          {students
            .filter((s) => isHidden ? s.hidden : !s.hidden)
            .map((s, index) => (
              <tr key={s.id} className={s.hidden ? "opacity-70 bg-gray-200 hover:bg-gray-100 border-b border-gray-300" : "opacity-100 bg-gray-200 hover:bg-gray-100 hover:text-amber-900 border-b border-gray-300"}>
                <td className="py-3 text-center">{index + 1}</td>
                <td className="py-3 text-center">{s.name}</td>
                <td className="py-3 text-center">{s.studentNo}</td>
                <td className="py-3 text-center overflow-y-auto">{s.email}</td>
                <td className="py-3 text-center">{s.fees}</td>
                <td className='py-3 text-center space-x-2 space-y-1'>
                  {!s.hidden && (
                    <button
                      type='button'
                      title='Edit Details'
                      onClick={() => setEditingStudent(s)}
                      className='px-3 py-1 bg-green-600 hover:bg-green-700 rounded border border-green-800'>
                      <FaUserEdit className='w-5 h-5 text-amber-50' />
                    </button>
                  )
                  }
                  <button
                    type='button'
                    onClick={() => toggleHide(s.id)}
                    className='px-3 py-1 bg-yellow-600 hover:bg-yellow-700 rounded border border-yellow-800'>
                    {s.hidden ? <BiSolidShow title="Unhide" className='h-5 w-5 text-amber-50' /> : <BiSolidHide title='Hide' className='h-5 w-5 text-amber-50' />}
                  </button>
                  {!s.hidden && (
                    <button
                      type='button'
                      title='Delete Permanently'
                      onClick={() => deleteStudent(s.id)}
                      className='px-3 py-1 bg-red-600 hover:bg-red-700 rounded mr-2 border border-red-800'>
                      <MdDeleteForever className='h-5 w-5 text-amber-50' />
                    </button>
                  )}
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
    </div>
  )
}

export default StudentTable