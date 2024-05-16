import React from "react";

import { useFormDataContext } from "../../utils/context/FormDataContext";

const Table = () => {
  const formData = useFormDataContext();

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
