import { useEffect, useState } from "react";
import axios from "axios";
import "./App.css"; // Import the CSS file

function App() {
  const [students, setStudents] = useState([]);
  const [formData, setFormData] = useState({ name: "", age: "", department: "" });


  useEffect(() => {
    axios.get("http://localhost:5001/students")
      .then((res) => setStudents(res.data))
      .catch((err) => console.error("Error:", err));
  }, []);


  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:5001/students", formData);
      const updatedList = await axios.get("http://localhost:5001/students");
      setStudents(updatedList.data);
      setFormData({ name: "", age: "", department: "" }); // Reset form
    } catch (err) {
      console.error("Error:", err);
    }
  };

  return (
    <div className="app">
      <div className="glass-container">
        <h1>Student Form</h1>
        <form onSubmit={handleSubmit}>
          <input type="text" name="name" placeholder="Name" value={formData.name} onChange={handleChange} required />
          <input type="number" name="age" placeholder="Age" value={formData.age} onChange={handleChange} required />
          <input type="text" name="department" placeholder="Department" value={formData.department} onChange={handleChange} required />
          <button type="submit">Add Student</button>
        </form>
      </div>

      <div className="glass-container">
        <h2>Student List</h2>
        {students.length === 0 ? (
          <p>No students found.</p>
        ) : (
          <ul>
            {students.map((student, index) => (
              <li key={student?._id || index}>
                {student?.name || "Unknown"} - {student?.age || "N/A"} years - {student?.department || "No Dept"}
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}

export default App;
