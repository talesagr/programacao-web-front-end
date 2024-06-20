import React, { useEffect, useState } from 'react';
import CrudTable from '../components/crudTable/CrudTable';
import CrudForm from '../components/crudForm/CrudForm';
import {getUsers, createUser, updateUser, deleteUser} from '../api';


const Users = () => {
  const [users, setUsers] = useState([]);
  const [editingUser, setEditingUser] = useState(null);

  useEffect(()=>{
    fetchUsers();
  }, [])

  const fetchUsers = async () => {
    try {
      const response = await getUsers();
      console.log(response.data)
      setUsers(response.data)
    } catch (error) {
      console.error('Erro ao buscar usuarios:', error)
    }
  }

  const handleEdit = (id) => {
    const user = users.find((u) => u.id === id);
    setEditingUser(user);
  };

  const handleDelete = async (id) => {
    try {
      await deleteUser(id);
      setUsers(users.filter((u)=> u.id !== id));
    } catch (error) {
      console.error('Erro ao deletar usuario:', error)
    }
  };

  const handleSave = async (user) => {
    try{
      if (user.id) {
        await updateUser(user.id, user);
        setUsers(users.map((u) => (u.id === user.id ? user : u)));
      } else {
        const response = await createUser(user);
        setUsers([...users, response.data])
      }
      setEditingUser(null);
    }catch (error) {
      console.error('Erro ao salvar usuario', error)
    }
  };

  const handleCancel = () => {
    setEditingUser(null);
  };

  return (
    <div>
      <h1>Usuários</h1>
      <CrudTable
        data={users}
        columns={['name', 'password', 'email', 'isAdmin']}
        onEdit={handleEdit}
        onDelete={handleDelete}
      />
      <h2>{editingUser ? 'Editar Usuário' : 'Adicionar Usuário'}</h2>
      <CrudForm
        initialData={editingUser || { name: '', password: '', email: '', isAdmin: false }}
        onSave={handleSave}
        onCancel={handleCancel}
      />
    </div>
  );
};

export default Users;
