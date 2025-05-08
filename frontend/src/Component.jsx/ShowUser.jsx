import React, { useEffect, useState } from 'react';
import axios from 'axios';
import 'bootstrap-icons/font/bootstrap-icons.css';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function ShowUser() {
  const [user, setUser] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [editId, setEditId] = useState(null);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [age, setAge] = useState('');
  const [gender, setGender] = useState('');

  useEffect(() => {
    fetchData();
  }, []);

  async function fetchData() {
    try {
      const response = await axios.get("http://localhost:3001/gym/getuser");
      setUser(response.data);
    } catch (err) {
      console.error(err);
      setError("Failed to load data");
    } finally {
      setLoading(false);
    }
  }

  async function delete_record(id) {
    try {
      if (window.confirm("Are you sure you want to delete this record?")) {
        await axios.delete(`http://localhost:3001/gym/getuser/${id}`);
        toast.dark("Record Deleted successfully");
        fetchData();
      }
    } catch (error) {
      toast.error(error.response?.data?.msg || "Delete failed");
    }
  }

  const openEditModal = (user) => {
    setEditId(user._id);
    setName(user.name);
    setEmail(user.email);
    setAge(user.age);
    setGender(user.gender);
  };

  const handleUpdate = async () => {
    try {
      if (!name || !email || !age || !gender) {
        toast.warning("Please fill all fields");
        return;
      }

      await axios.put(`http://localhost:3001/gym/getuser/${editId}`, {
        name,
        email,
        age,
        gender,
      });

      toast.success("Record updated successfully");
      fetchData();
    } catch (err) {
      console.error(err);
      toast.error("Failed to update record");
    }
  };

  return (
    <div className="container py-4">
      <ToastContainer />
      <h2 className="mb-4 text-center fw-bold text-primary">User Records</h2>

      {loading ? (
        <div className="text-center">
          <div className="spinner-border text-primary" role="status"></div>
        </div>
      ) : error ? (
        <p className="text-danger text-center">{error}</p>
      ) : user.length === 0 ? (
        <p className="text-center">No Record Found</p>
      ) : (
        <div className="row">
          {user.map((a) => (
            <div className="col-md-4 mb-4" key={a._id}>
              <div className="card shadow-sm border-0 rounded-4 h-100 hover-card">
                <div className="card-body text-center">
                  <h5 className="card-title fw-bold text-dark">
                    {a.name}
                    <i
                      className="bi bi-pencil-square text-primary ms-2"
                      role="button"
                      data-bs-toggle="modal"
                      data-bs-target="#editModal"
                      onClick={() => openEditModal(a)}
                    ></i>
                    <i
                      className="bi bi-trash text-danger ms-2"
                      role="button"
                      onClick={() => delete_record(a._id)}
                    ></i>
                  </h5>
                  <p className="card-text text-muted">{a.email}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      <div className="modal fade" id="editModal" tabIndex="-1" aria-hidden="true">
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title">Update User</h5>
              <button type="button" className="btn-close" data-bs-dismiss="modal"></button>
            </div>
            <div className="modal-body">
              <input
                type="text"
                className="form-control mb-2"
                placeholder="Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
              <input
                type="email"
                className="form-control mb-2"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <input
                type="number"
                className="form-control mb-2"
                placeholder="Age"
                value={age}
                onChange={(e) => setAge(e.target.value)}
              />
              <div className="mb-2">
                <label className="me-2">Gender:</label>
                <input
                  type="radio"
                  name="gender"
                  value="male"
                  checked={gender === "male"}
                  onChange={(e) => setGender(e.target.value)}
                /> Male
                <input
                  type="radio"
                  name="gender"
                  className="ms-2"
                  value="female"
                  checked={gender === "female"}
                  onChange={(e) => setGender(e.target.value)}
                /> Female
                <input
                  type="radio"
                  name="gender"
                  className="ms-2"
                  value="other"
                  checked={gender === "other"}
                  onChange={(e) => setGender(e.target.value)}
                /> Other
              </div>
            </div>
            <div className="modal-footer">
              <button className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
              <button className="btn btn-primary" data-bs-dismiss="modal" onClick={handleUpdate}>Update</button>
            </div>
          </div>
        </div>
      </div>

      <style jsx="true">{`
        .hover-card {
          transition: transform 0.3s ease, box-shadow 0.3s ease;
        }
        .hover-card:hover {
          transform: translateY(-5px);
          box-shadow: 0 10px 25px rgba(0, 0, 0, 0.1);
        }
      `}</style>
    </div>
  );
}
