import React, { useContext } from "react";

import { FormDataContext } from "../../utils/context/FormDataContext";

const Table = () => {
  const { formData } = useContext(FormDataContext);

  console.log(formData);
  return (
    <table>
      <thead>
        <tr>
          <th>Name</th>
          <th>Location</th>
        </tr>
      </thead>

      <tbody>
        {formData.map((data, index) => (
          <tr key={index}>
            <td>{data.username}</td>
            <td>{data.location}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default Table;
