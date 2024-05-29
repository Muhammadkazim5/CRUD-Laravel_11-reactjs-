import React, { useEffect, useState } from "react";
import Api from "../Api/Handle";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const navigate = useNavigate();
  const { http } = Api();
  const [data, setData] = useState([]);
  const handleData = async () => {
    const res = await http.get("/show");
    setData(res.data);
    console.log(data);
  };
  const handleDelete = async (id) => {
    try {
      const res = await http.delete(`/delete/${id}`);
      if (res.status === 200) {
        // Handle successful deletion, e.g., update UI, notify user, etc.
        navigate("/");
        console.log("Delete successful:", res.data);
        setData((prevData) => prevData.filter((item) => item.id !== id));
      } else {
        // Handle unexpected status codes
        console.error("Unexpected response status:", res.status);
      }
    } catch (error) {
      // Handle errors, e.g., network issues, server errors, etc.
      console.error("Error deleting resource:", error);
    }
  };
  const handleUpdate = (id) => {
    navigate(`/update/${id}`);
  };
  useEffect(() => {
    handleData();
  }, []);
  return (
    <div className="container mt-2">
      <h2 className="text-center py-3">Show Data from Api</h2>
      <div>
        <table className="table table-light table-striped">
          <thead>
            <tr>
              <th scope="col">Name</th>
              <th scope="col">Email</th>
              <th scope="col">Age</th>
              <th scope="col">Phone</th>
              <th scope="col">Address</th>
              <th scope="col" colSpan={2} className="text-center">
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {data.map((item) => (
              <tr key={item.id}>
                <td>{item.name}</td>
                <td>{item.email}</td>
                <td>{item.age}</td>
                <td>{item.phone}</td>
                <td>{item.address}</td>
                <td>
                  <button
                    type="button"
                    className="btn btn-sm btn-outline-info"
                    onClick={() => handleUpdate(item.id)}
                  >
                    Update
                  </button>
                </td>
                <td>
                  <button
                    type="button"
                    className="btn btn-sm btn-outline-danger"
                    onClick={() => handleDelete(item.id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Home;
