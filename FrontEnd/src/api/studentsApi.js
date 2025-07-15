import axios from "axios";

const API = "http://localhost:5000/api/students";

export const getStudents = () => axios.get(API);
export const addStudent = (student) => axios.post(API, student);
export const deleteStudent = (_id) => axios.delete(`${API}/${_id}`);
export const updateStudent = (_id, updated) => axios.put(`${API}/${_id}`, updated);
