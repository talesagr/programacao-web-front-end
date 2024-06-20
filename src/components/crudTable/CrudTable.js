import React from 'react';
import './CrudTable.css';

const CrudTable = ({ data, columns, onEdit, onDelete }) => {
  const renderAdminIcon = (isAdmin) => {
    return isAdmin? (
      <span role="img" aria-label="Admin" style={{ color: 'green' }}>✔️</span>
    ) : (
      <span role="img" aria-label="Not Admin" style={{ color: 'red' }}>❌</span>
    )
  }
  return (
    <table>
      <thead>
        <tr>
          {columns.map((col) => (
            <th key={col}>{col}</th>
          ))}
          <th>Ações</th>
        </tr>
      </thead>
      <tbody>
        {data.map((item) => (
          <tr key={item.id}>
            {columns.map((col) => (
              <td key={col}>{item[col]}</td>
            ))}
            <td>
              <button onClick={() => onEdit(item.id)}>Editar</button>
              <button onClick={() => onDelete(item.id)}>Excluir</button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default CrudTable;
