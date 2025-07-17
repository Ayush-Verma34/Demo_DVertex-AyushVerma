import React from 'react'
import { useEffect, useState } from "react";
import { LuUserSearch, LuUserPlus } from "react-icons/lu";
import StudentForm from "./StudentAddForm";
import StudentTable from "./StudentTable";
import {
    getStudents,
    addStudent as addAPI,
    deleteStudent,
    updateStudent
} from "./../api/studentsApi";
import SearchStudent from "./SearchStudent";
import { logoutUser } from '../api/userApi';
import { useNavigate } from 'react-router-dom';
import "./../../public/icon.png"


const Landing = () => {

    const [students, setStudents] = useState([]);
    const [searchQuery, setSearchQuery] = useState("");
    const [addingStudent, setAddingStudent] = useState(false);
    const navigate = useNavigate();

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
    const handleLogout =async () => {
        try {
            const response =await logoutUser()

            if (response.status == 200) {
                // alert(response.data.message)
                navigate("/login");
            }
        } catch (error) {
            alert(error.response.data.message);
        }
    };
    const [searchOpen, setSearchOpen] = useState(false)

    return (
        <div className="w-full md:px-6 p-4 bg-gray-100 min-h-screen">
            <div className="flex items-center justify-between p-3 pb-6 m-auto gap-4 mb-8 border-b-4">
                <h1 className="text-xl md:text-3xl font-bold text-cyan-900 flex justify-center items-center"><img src="./../../public/icon.png" alt="icon"className='h-12 w-12 mr-2'/>Student Management</h1>
                <div className="w-auto flex items-center justify-end gap-4">
                    <button
                        onClick={() => setSearchOpen(prev => !prev)}
                        className="flex bg-gray-300 hover:bg-gray-400 p-2 px-4 rounded-md shadow-lg shadow-gray-200 gap-2 border-2 border-gray-500">
                        <LuUserSearch className="h-5 w-5 md:h-6 md:w-6" />
                        <span className="hidden md:flex items-center text-md">Search</span>
                    </button>
                    <button
                        onClick={() => setAddingStudent(true)}
                        className="flex bg-blue-500 hover:bg-blue-600 text-white p-2 px-4 rounded-md shadow-lg shadow-blue-200 gap-2 border-2 border-blue-700">
                        <LuUserPlus className="h-5 w-5 md:h-6 md:w-6" />
                        <span className="hidden md:flex">AddStudent</span>
                    </button>
                    <button
                        onClick={handleLogout}
                        className="flex bg-red-500 hover:bg-red-600 text-white p-2 px-4 rounded-md shadow-lg shadow-red-200 gap-2 border-2 border-red-700">
                        Logout
                    </button>
                </div>
            </div>
            {searchOpen && (
                <SearchStudent searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
            )}
            <StudentTable
                students={students
                    .filter((s) =>
                        s.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                        s.studentNo.includes(searchQuery) ||
                        s.email.toLowerCase().includes(searchQuery.toLowerCase())
                    )
                }
                updateStudent={handleUpdate}
                deleteStudent={handleDelete}
                toggleHide={toggleHide}
            />
            {addingStudent && (
                <StudentForm addStudent={addStudent} onClose={() => setAddingStudent(false)} />
            )}

        </div>
    )
}

export default Landing