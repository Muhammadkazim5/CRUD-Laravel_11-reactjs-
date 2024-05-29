import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Api from "../Api/Handle";

const UpdatePage = () => {
  const { id } = useParams();
  const { http } = Api();
  const navigate = useNavigate();
  // const [formData, setValues] = useState([]);
  const [errorName, setErrorName] = useState();
  const [errorEmail, setErrorEmail] = useState();
  const [errorAge, setErrorAge] = useState();
  const [errorPhone, setErrorPhone] = useState();
  const [errorAddress, setErrorAddress] = useState();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    age: "",
    phone: "",
    address: "",
  });
  const [errors, setErrors] = useState({});

  const fetchData = async () => {
    try {
      const res = await http.get(`/crud/${id}`);
      setFormData(res.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };
  // console.log(formData);
  useEffect(() => {
    fetchData();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleUpdate = async () => {
    try {
      const res = await http.put(`/edit/${id}`, formData);
      if (res.data.status == 422) {
        setErrorName(res.data.error.name);
        setErrorEmail(res.data.error.email);
        setErrorAge(res.data.error.age);
        setErrorPhone(res.data.error.phone);
        setErrorAddress(res.data.error.address);
      } else if (res.status === 200) {
        navigate("/");
      }
    } catch (error) {
      if (error.response && error.response.data && error.response.data.errors) {
        setErrors(error.response.data.errors);
      } else {
        console.error("Error updating data:", error);
      }
    }
  };
  return (
    <div>
      <div className="container mt-2 ">
        <h2 className="text-center">Update</h2>
        <div className="mb-3">
          <label className="form-label">Name</label>
          <input
            type="text"
            className="form-control"
            name="name"
            value={formData.name}
            // onChange={(e) => setFormData({ ...datas, name: e.target.value })}
            // onChange={(e) => setName(e.target.value)}
            onChange={handleChange}
          />
          <span className="text-danger">{errorName}</span>
          {/* {errors.names && <div className="error">{errors.names}</div>} */}
        </div>
        <div className="mb-3">
          <label className="form-label">Email</label>
          <input
            type="text"
            className="form-control"
            name="email"
            // onChange={(e) => setEmail(e.target.value)}
            onChange={handleChange}
            value={formData.email}
            // onChange={(e) => setFormData({ ...datas, email: e.target.value })}
          />
          <span className="text-danger">{errorEmail}</span>
          {/* {errors.email && <div className="error">{errors.email}</div>} */}
        </div>
        <div className="mb-3">
          <label className="form-label">Age</label>
          <input
            type="number"
            className="form-control"
            name="age"
            // onChange={(e) => setAge(e.target.value)}
            onChange={handleChange}
            value={formData.age}
            // onChange={(e) => setFormData({ ...datas, age: e.target.value })}
          />
          <span className="text-danger">{errorAge}</span>
          {/* {errors.age && <div className="error">{errors.age}</div>} */}
        </div>
        <div className="mb-3">
          <label className="form-label">Phone</label>
          <input
            type="number"
            className="form-control"
            name="phone"
            // onChange={(e) => setPhone(e.target.value)}
            onChange={handleChange}
            value={formData.phone}
            // onChange={(e) => setFormData({ ...datas, phone: e.target.value })}
          />
          <span className="text-danger">{errorPhone}</span>
          {/* {errors.phone && <div className="error">{errors.phone}</div>} */}
        </div>
        <div className="mb-3">
          <label className="form-label">Address</label>
          <textarea
            type="text"
            // onChange={(e) => setAddress(e.target.value)}
            onChange={handleChange}
            value={formData.address}
            // onChange={(e) => setFormData({ ...datas, address: e.target.value })}
            className="form-control"
            name="address"
            rows="2"
          ></textarea>
          <span className="text-danger">{errorAddress}</span>
          {/* {errors.address && <div className="error">{errors.address}</div>} */}
        </div>
        <div className="d-flex justify-content-center">
          <button
            type="button"
            className="btn btn-primary w-50 "
            onClick={handleUpdate}
          >
            Update
          </button>
        </div>
      </div>
    </div>
  );
};

export default UpdatePage;
