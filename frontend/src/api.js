import axios from "axios";

const API_URL = "http://localhost:5000/api/employees";

export const getEmployees = (search = "", position = "") => {
  return axios
    .get(API_URL, { params: { search, position } })
    .then((res) => res.data);
};

export const createEmployee = (data) =>
  axios.post(API_URL, data).then((res) => res.data);

export const updateEmployee = (id, data) =>
  axios.put(`${API_URL}/${id}`, data).then((res) => res.data);

export const deleteEmployee = (id) =>
  axios.delete(`${API_URL}/${id}`).then((res) => res.data);
