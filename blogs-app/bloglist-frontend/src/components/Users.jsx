import { useEffect, useState } from "react";
import { Link } from 'react-router-dom';

import { initializeUserList } from '../reducers/userListReducer'; 
import { useDispatch, useSelector } from 'react-redux'
import { Table, TableBody, TableCell, TableHead, TableRow, Typography } from '@mui/material'

const Users = () => {

  const users = useSelector(state => state.userList)

  if (!users) {
    return null;
  }

  return (
    <div>
      <Typography variant='h4'>Users</Typography>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell></TableCell>
            <TableCell>blogs created</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {users.map((u) => (
            <TableRow key={u.id}>
              <TableCell><Link to={`/users/${u.id}`}>{u.name}</Link></TableCell>
              <TableCell>{u.blogs.length}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default Users;
