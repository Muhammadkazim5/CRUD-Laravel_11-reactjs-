import React, { useEffect, useState } from "react";
import Api from "../Api/Handle";
import { useNavigate } from "react-router-dom";
const Forms = () => {
  const navigate = useNavigate();
  const { http } = Api();
  // const [name, setName] = useState();
  // const [email, setEmail] = useState();
  // const [age, setAge] = useState();
  // const [phone, setPhone] = useState();
  // const [address, setAddress] = useState();
  // const [errors, setErrors] = useState({
  //   name: "",
  //   email: "",
  //   age: "",
  //   phone: "",
  //   address: "",
  // });
  const [loader, setLoader] = useState("off");
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
  // const handleChange = (e) => {
  //   const { name, value } = e.target;
  //   setFormData((prevData) => ({ ...prevData, [name]: value }));
  // Clear error message when user starts typing again
  // setErrors((prevErrors) => ({
  //   ...prevErrors,
  //   [name]: "",
  // }));
  // };

  const submitForm = () => {
    setLoader("on");
    http.post("/create", formData).then((res) => {
      if (res.data.status == 422) {
        // setErrors({
        //   name: res.data.error.name || "",
        //   email: res.data.error.email || "",
        //   age: res.data.error.age || "",
        //   phone: res.data.error.phone || "",
        //   address: res.data.error.address || "",
        // });
        setErrorName(res.data.error.name);
        setErrorEmail(res.data.error.email);
        setErrorAge(res.data.error.age);
        setErrorPhone(res.data.error.phone);
        setErrorAddress(res.data.error.address);
      } else if (res.data.status == 200) {
        navigate("/");
      }
      setLoader("off");
    });
  };
  return (
    <div>
      <div className="mb-3">
        <label htmlFor="name" className="form-label">
          Name
        </label>
        <input
          type="text"
          className="form-control"
          name="name"
          value={formData.name}
          // onChange={(e) => setName(e.target.value)}
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
        />
        <span className="text-danger">{errorName}</span>
        {/* {errors.names && <div className="error">{errors.names}</div>} */}
      </div>
      <div className="mb-3">
        <label htmlFor="email" className="form-label">
          Email
        </label>
        <input
          type="text"
          className="form-control"
          name="email"
          // onChange={(e) => setEmail(e.target.value)}
          value={formData.email}
          // onChange={handleChange}
          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
        />
        <span className="text-danger">{errorEmail}</span>
        {/* {errors.email && <div className="error">{errors.email}</div>} */}
      </div>
      <div className="mb-3">
        <label htmlFor="age" className="form-label">
          Age
        </label>
        <input
          type="number"
          className="form-control"
          name="age"
          // onChange={(e) => setAge(e.target.value)}
          onChange={(e) => setFormData({ ...formData, age: e.target.value })}
          value={formData.age}
          // onChange={handleChange}
        />
        <span className="text-danger">{errorAge}</span>
        {/* {errors.age && <div className="error">{errors.age}</div>} */}
      </div>
      <div className="mb-3">
        <label htmlFor="phone" className="form-label">
          Phone
        </label>
        <input
          type="number"
          className="form-control"
          name="phone"
          // onChange={(e) => setPhone(e.target.value)}
          onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
          value={formData.phone}
          // onChange={handleChange}
        />
        <span className="text-danger">{errorPhone}</span>
        {/* {errors.phone && <div className="error">{errors.phone}</div>} */}
      </div>
      <div className="mb-3">
        <label htmlFor="address" className="form-label">
          Address
        </label>
        <textarea
          type="text"
          // onChange={(e) => setAddress(e.target.value)}
          value={formData.address}
          onChange={(e) =>
            setFormData({ ...formData, address: e.target.value })
          }
          // value={formData.address}
          // onChange={handleChange}
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
          onClick={submitForm}
        >
          {loader == "off" && <center> Submit</center>}
          {loader == "on" && (
            <center>
              <div className="spinner-border" role="status"></div>
            </center>
          )}
        </button>
      </div>
    </div>
  );
};

export default Forms;
