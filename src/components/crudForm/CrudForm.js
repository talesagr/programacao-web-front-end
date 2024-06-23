import React, { useState, useEffect } from 'react';
import './CrudForm.css';

const CrudForm = ({ initialData, onSave, onCancel }) => {
  const [formData, setFormData] = useState(initialData || {});

  useEffect(() => {
    setFormData(initialData || {});
  }, [initialData]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
       ...formData,
        [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(formData);
  };

  return (
    <form onSubmit={handleSubmit}>
      {Object.keys(formData).map((key) => (
        <div key={key}>
          <label>{key}</label>
          {typeof formData[key] === 'boolean' ? (
            <input
              type="checkbox"
              name={key}
              checked={formData[key]}
              onChange={handleChange}
            />
          ) : (
            <input
              type="text"
              name={key}
              value={formData[key]}
              onChange={handleChange}
            />
          )}
        </div>
      ))}
      <div className="button-group">
        <button type="submit">Salvar</button>
        <button type="button" onClick={onCancel}>Cancelar</button>
      </div>
    </form>
  );
};

export default CrudForm;
