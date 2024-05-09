import React, { useContext } from "react";

// import { FormDataContext } from "../../utils/context/FormDataContext";

const Table = () => {
  // const { formData } = useContext(FormDataContext);

  return (
    <table>
      <thead>
        <tr>
          <th>Name</th>
          <th>Location</th>
        </tr>
      </thead>
      {/* {!formData || formData.length === 0 ? (
          <p>No data available</p>
        ) : (
          <tbody>
          formData.map((data, index) => (
            <tr key={index}>
              <td>{data.name}</td>
              <td>{data.location}</td>
            </tr>
          ))
          </tbody>
        )} */}
    </table>
  );
};

export default Table;
