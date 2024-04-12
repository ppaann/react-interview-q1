import "./App.css";
import Form from "./components/Form/Form";
import Table from "./components/Table/Table";
import { FormDataProvider } from "./context/FormDataContext";

function App() {
  return (
    <div className="App">
      <main className="container">
        <FormDataProvider>
          <Form />
          <Table />
        </FormDataProvider>
      </main>
    </div>
  );
}

export default App;
