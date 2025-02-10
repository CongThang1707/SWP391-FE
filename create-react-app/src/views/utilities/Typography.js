import { Grid } from '@mui/material';
import MainCard from 'ui-component/cards/MainCard';
import React, { useState, useEffect } from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';
import { Paper } from '@mui/material';
import { getUserByRoleId } from '../../service/api_service.js';

// ==============================|| TYPOGRAPHY ||============================== //

const Typography = () => {
  const [parentData, setParentData] = useState([]);

  useEffect(() => {
    const fetchUserData = async () => {
      const data = await getUserByRoleId(1);
      setParentData(data);
    };
    fetchUserData();
  }, []);

  return (
    <MainCard title="Typography" content={false}>
      <Grid container>
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650 }}>
            <TableHead>
              <TableRow>
                <TableCell>Username</TableCell>
                <TableCell>Fullname</TableCell>
                <TableCell>Email</TableCell>
                <TableCell>Gender</TableCell>
                <TableCell>Phone</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {parentData.map((parent) => (
                <TableRow key={parent.user_id}>
                  <TableCell>{parent.username}</TableCell>
                  <TableCell>{parent.fullName}</TableCell>
                  <TableCell>{parent.email}</TableCell>
                  <TableCell>{parent.gender}</TableCell>
                  <TableCell sx={{ display: 'flex', gap: 1 }}>{parent.phone}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Grid>
    </MainCard>
  );
};

export default Typography;
