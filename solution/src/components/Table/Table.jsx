import React, { useContext } from "react";

import { FormDataContext } from "../../context/FormDataContext";

const Table = () => {
  const { formData } = useContext(FormDataContext);

  return (
    <table>
      <thead>
        <tr>
          <th>Name</th>
          <th>Location</th>
        </tr>
      </thead>
      <tbody>
        {!formData || formData.length === 0 ? (
          <p>No data available</p>
        ) : (
          formData.map((data, index) => (
            <tr key={index}>
              <td>{data.name}</td>
              <td>{data.location}</td>
            </tr>
          ))
        )}
      </tbody>
    </table>
  );
};

export default Table;
