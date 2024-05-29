// import React, { useEffect, useState } from "react";
// import Api from "../Api/Handle";
// const Table = () => {
//   const { http } = Api();
//   const [data, setData] = useState([]);
//   const handleData = async () => {
//     const res = await http.get("/show");
//     setData(res.data);
//   };
//   useEffect(() => {
//     handleData();
//   }, []);
//   // console.log(data);
//   return (
//     <div>
//       <table className="table table-dark table-striped">
//         <thead>
//           <tr>
//             <th scope="col">Name</th>
//             <th scope="col">Email</th>
//             <th scope="col">Age</th>
//             <th scope="col">Phone</th>
//             <th scope="col">Address</th>
//           </tr>
//         </thead>
//         <tbody>
//           {data.map((item) => (
//             <tr key={item.id}>
//               <td>{item.name}</td>
//               <td>{item.email}</td>
//               <td>{item.age}</td>
//               <td>{item.phone}</td>
//               <td>{item.address}</td>
//             </tr>
//           ))}
//         </tbody>
//       </table>
//     </div>
//   );
// };

// export default Table;
