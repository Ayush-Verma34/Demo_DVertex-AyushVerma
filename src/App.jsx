import "./App.css"
import { useEffect, useState } from "react";
import StudentForm from "./Components/StudentAddForm";
import StudentTable from "./Components/StudentTable";
import {
  getStudents,
  addStudent as addAPI,
  deleteStudent,
  updateStudent
} from "./api/studentsApi";
import SearchStudent from "./Components/SearchStudent";

const App = () => {
  const [students, setStudents] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");

useEffect(() => {
  const saveScroll = () => {
    localStorage.setItem("scroll-position", window.scrollY.toString());
  };
  window.addEventListener("scroll", saveScroll);
  return () => window.removeEventListener("scroll", saveScroll);
}, []);

useEffect(() => {
  const savedY = localStorage.getItem("scroll-position");
  if (savedY) {
    setTimeout(() => {
      window.scrollTo(0, parseInt(savedY));
    }, 100);
  }
}, []);

  useEffect(() => {
    getStudents().then((res) => setStudents(res.data));
  }, []);

  const addStudent = async (student) => {
    const exists = students.some((s) => s.id === student.studentNo);
    if (exists) {
      alert("⚠️Student with same Student number already exists!");
      return;
    }

    const newStudent = {
      ...student,
      id: student.studentNo,
      hidden: false
    };

    const res = await addAPI(newStudent);
    setStudents([...students, res.data]);
  };
  // console.log(students);
  const handleDelete = async (id) => {
    await deleteStudent(id);
    setStudents(students.filter((s) => s.id !== id));
  };

  const handleUpdate = async (id, updated) => {
    const res = await updateStudent(id, updated);
    setStudents(students.map((s) => (s.id === id ? res.data : s)));
  };

  const toggleHide = (id) => {
    const student = students.find((s) => s.id === id);
    handleUpdate(id, { ...student, hidden: !student.hidden });
  };

  return (
    <div className="md:p-6 p-2 bg-gray-100 min-h-screen">
      <h1 className="text-3xl font-bold text-center mb-6">Student Management</h1>
      <SearchStudent searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
      <StudentForm addStudent={addStudent} />
      <StudentTable
        students={students.filter((s) =>
          s.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          s.studentNo.includes(searchQuery) ||
          s.email.toLowerCase().includes(searchQuery.toLowerCase())
        )}
        updateStudent={handleUpdate}
        deleteStudent={handleDelete}
        toggleHide={toggleHide}
      />


    </div>
  );
};

export default App;
