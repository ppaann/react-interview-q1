import "./App.css";

function App() {
  return (
    <div className="App">
      <div className="container">
        <form className="form">
          <h2>Form</h2>
          <div className="form-control">
            <label htmlFor="name">Name:</label>
            <input type="text" id="name" name="name" />
          </div>
          <div className="form-control">
            <label htmlFor="location">Location:</label>
            <input type="text" id="location" name="location" />
          </div>
          <div className="form-actions">
            <button type="button" className="button button-secondary">
              Clear
            </button>
            <button type="submit" className="button button-primary">
              Add
            </button>
          </div>
        </form>
        <table>
          <tHead>
            <tr>
              <th>Name</th>
              <th>Location</th>
            </tr>
          </tHead>
          <tbody>
            <tr>
              <td>John Doe</td>
              <td>London</td>
            </tr>
            <tr>
              <td>Jane Doe</td>
              <td>Paris</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default App;
