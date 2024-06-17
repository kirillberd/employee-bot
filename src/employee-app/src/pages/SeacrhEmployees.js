import React, { useState } from 'react';
import './AddEmployee.css'; // Добавим отдельный CSS файл для стилей компонента
import axios from 'axios';
import EmployeeModal from './EmployeeModal'; // Импортируем модальное окно

function SearchEmployees() {
  const [tags, setTags] = useState([]);
  const [tagInput, setTagInput] = useState('');
  const [employees, setEmployees] = useState([]); // Состояние для хранения найденных сотрудников
  const [editingEmployee, setEditingEmployee] = useState(null); // Состояние для отслеживания редактируемого сотрудника

  const handleTagKeyDown = (e) => {
    if (e.key === 'Enter' && tagInput.trim() !== '') {
      e.preventDefault();
      let newTag = tagInput.trim();
      // Автоматическое добавление знака #, если не введен
      if (!newTag.startsWith('#')) {
        newTag = `#${newTag}`;
      }
      // Проверка на существование тега
      if (!tags.includes(newTag)) {
        setTags([...tags, newTag]);
      }
      setTagInput('');
    }
  };

  const removeTag = (indexToRemove) => {
    setTags(tags.filter((_, index) => index !== indexToRemove));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const employee = {
      tags,
    };
    console.log(employee);
    try {
      const response = await axios.post('http://localhost:4000/api/search-employees', employee);

      console.log('Employees found:', response.data);

      // Сохранение найденных сотрудников в состоянии
      setEmployees(response.data);

      // Очистка формы после успешного добавления
      setTags([]);
    } catch (error) {
      console.error('Error searching employees:', error);
    }
  };

  const handleCardClick = (employee) => {
    setEditingEmployee(employee);
  };

  const handleEditChange = (e) => {
    const { name, value } = e.target;
    setEditingEmployee((prevEmployee) => ({
      ...prevEmployee,
      [name]: value,
    }));
  };

  const handleSave = async () => {
    try {
      await axios.put(`http://localhost:4000/api/employees/${editingEmployee._id}`, editingEmployee);
      setEmployees((prevEmployees) =>
        prevEmployees.map((emp) => (emp._id === editingEmployee._id ? editingEmployee : emp))
      );
      setEditingEmployee(null);
    } catch (error) {
      console.error('Error updating employee:', error);
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:4000/api/employees/${id}`);
      setEmployees((prevEmployees) => prevEmployees.filter((emp) => emp._id !== id));
      setEditingEmployee(null);
    } catch (error) {
      console.error('Error deleting employee:', error);
    }
  };

  const handleCloseModal = () => {
    setEditingEmployee(null);
  };

  return (
    <div className="mt-5">
      <h1>Search Employees</h1>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Tags:</label>
          <div className="tags-input-container">
            {tags.map((tag, index) => (
              <div className="tag-item" key={index}>
                <span className="tag-text">{tag}</span>
                <span className="tag-remove" onClick={() => removeTag(index)}>x</span>
              </div>
            ))}
            <input
              type="text"
              className="form-control tag-input"
              value={tagInput}
              onChange={(e) => setTagInput(e.target.value)}
              onKeyDown={handleTagKeyDown}
              placeholder="Press Enter to add a tag"
            />
          </div>
        </div>
        <button type="submit" className="btn btn-primary">Search Employees</button>
      </form>
      <div className="mt-5">
        <h2>Search Results:</h2>
        {employees.length > 0 ? (
          <div className="card-container">
            {employees.map((employee, index) => (
              <div key={index} className="employee-card" onClick={() => handleCardClick(employee)}>
                <div>
                  <div><strong>Name:</strong> {employee.name}</div>
                  <div><strong>Email:</strong> {employee.email}</div>
                  <div><strong>Tags:</strong> {employee.tags.join(', ')}</div>
                  <div><strong>Notes:</strong> {employee.notes}</div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p>No employees found.</p>
        )}
      </div>
      <EmployeeModal
        employee={editingEmployee}
        onClose={handleCloseModal}
        onChange={handleEditChange}
        onSave={handleSave}
        onDelete={handleDelete}
      />
    </div>
  );
}

export default SearchEmployees;
