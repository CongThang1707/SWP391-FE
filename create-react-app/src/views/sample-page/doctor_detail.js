import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getUser } from '../../service/user_service/get_user.js';
import { Card, CardContent, Typography, CircularProgress, Grid, Container, Avatar, Box, Paper, Divider } from '@mui/material';
import { Person } from '@mui/icons-material';
import { motion } from 'framer-motion';

const DoctorDetail = () => {
  const { id } = useParams();
  const [doctor, setDoctor] = useState(null);

  useEffect(() => {
    const fetchDoctor = async () => {
      const data = await getUser(id);
      setDoctor(data);
    };
    fetchDoctor();
  }, [id]);

  if (!doctor) return <CircularProgress sx={{ display: 'block', margin: '20px auto' }} />;

  return (
    <Container maxWidth="sm" sx={{ mt: 4 }}>
      <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
        <Paper elevation={10} sx={{ borderRadius: 8, overflow: 'hidden', boxShadow: '0 8px 30px rgba(0,0,0,0.2)' }}>
        <Box sx={{ background: 'linear-gradient(135deg, #43A047, #26C6DA)', color: 'white', textAlign: 'center', py: 6 }}>
        <motion.div whileHover={{ scale: 1.2 }}>
              <Avatar sx={{ width: 110, height: 110, margin: '0 auto', bgcolor: 'white', boxShadow: 4 }}>
                <Person sx={{ fontSize: 80, color: '#1976D2' }} />
              </Avatar>
            </motion.div>
            <motion.div whileHover={{ scale: 1.05 }}>
              <Typography variant="h4" sx={{ mt: 2, fontWeight: 'bold', fontSize: '1.5rem' }}>
                {doctor.fullName}
              </Typography>
            </motion.div>
            <motion.div whileHover={{ scale: 1.05 }}>
              <Typography variant="h6" sx={{ opacity: 0.8, fontWeight: 100, fontSize: '0.8rem' }}>
                {doctor.roleName || 'Doctor'}
              </Typography>
            </motion.div>
          </Box>

          <Card sx={{ boxShadow: 0, borderRadius: 0, px: 5, py: 4, backgroundColor: '#fafafa' }}>
            <CardContent>
              <Grid container spacing={3}>
                {[
                  ['Username', doctor.username],
                  ['Email', doctor.email],
                  ['Phone', doctor.phone],
                  ['Gender', doctor.gender],
                  ['Address', doctor.address],
                ].map(([label, value]) => (
                  <Grid item xs={12} key={label}>
                    <motion.div whileHover={{ scale: 1.03, backgroundColor: '#bbdefb', borderRadius: '10px', padding: '6px' }}>
                      <Typography variant="body1" sx={{ fontSize: '1.2rem', fontWeight: 700, color: '#0d47a1' }}>
                        <strong>{label}:</strong> {value}
                      </Typography>
                    </motion.div>
                    <Divider sx={{ my: 1 }} />
                  </Grid>
                ))}
              </Grid>
            </CardContent>
          </Card>
        </Paper>
      </motion.div>
    </Container>
  );
};

export default DoctorDetail;
