import axios from "axios";

const API = "http://localhost:3001/students";

export const getStudents = () => axios.get(API);
export const addStudent = (student) => axios.post(API, student);
export const deleteStudent = (id) => axios.delete(`${API}/${id}`);
export const updateStudent = (id, updated) => axios.put(`${API}/${id}`, updated);
