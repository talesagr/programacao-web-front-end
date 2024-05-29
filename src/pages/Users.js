import React, { useState } from 'react';
import CrudTable from '../components/crudTable/CrudTable';
import CrudForm from '../components/crudForm/CrudForm';

const initialUsers = [
  { id: 1, nome: 'Usuario A', senha: 'senha123', isAdmin: false },
  { id: 2, nome: 'Usuario B', senha: 'senha456', isAdmin: true },
];

const Users = () => {
  const [users, setUsers] = useState(initialUsers);
  const [editingUser, setEditingUser] = useState(null);

  const handleEdit = (id) => {
    const user = users.find((u) => u.id === id);
    setEditingUser(user);
  };

  const handleDelete = (id) => {
    setUsers(users.filter((u) => u.id !== id));
  };

  const handleSave = (user) => {
    if (user.id) {
      setUsers(users.map((u) => (u.id === user.id ? user : u)));
    } else {
      user.id = users.length + 1;
      setUsers([...users, user]);
    }
    setEditingUser(null);
  };

  const handleCancel = () => {
    setEditingUser(null);
  };

  return (
    <div>
      <h1>Usuários</h1>
      <CrudTable
        data={users}
        columns={['nome', 'senha', 'isAdmin']}
        onEdit={handleEdit}
        onDelete={handleDelete}
      />
      <h2>{editingUser ? 'Editar Usuário' : 'Adicionar Usuário'}</h2>
      <CrudForm
        initialData={editingUser || { nome: '', senha: '', isAdmin: false }}
        onSave={handleSave}
        onCancel={handleCancel}
      />
    </div>
  );
};

export default Users;
