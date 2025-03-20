import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getChildrenById } from '../../service/children_services/get_children.js';
import { Card, CardContent, Typography, CircularProgress, Grid, Container, Avatar, Box, Paper, Divider } from '@mui/material';
import ChildCareIcon from '@mui/icons-material/ChildCare';
import { motion } from 'framer-motion';

const ChildrenDetail = () => {
  const { id } = useParams();
  const [children, setChildren] = useState(null);

  useEffect(() => {
    const fetchChildren = async () => {
      const data = await getChildrenById(id);
      setChildren(data);
    };
    fetchChildren();
  }, [id]);

  if (!children) return <CircularProgress sx={{ display: 'block', margin: '20px auto' }} />;

  return (
    <Container maxWidth="sm" sx={{ mt: 4 }}>
      <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
        <Paper elevation={10} sx={{ borderRadius: 8, overflow: 'hidden', boxShadow: '0 8px 30px rgba(0,0,0,0.2)' }}>
          <Box sx={{ background: 'linear-gradient(135deg, #388E3C, #81C784)', color: 'white', textAlign: 'center', py: 6 }}>
            <motion.div whileHover={{ scale: 1.2 }}>
              <Avatar sx={{ width: 110, height: 110, margin: '0 auto', bgcolor: 'white', boxShadow: 4 }}>
                <ChildCareIcon sx={{ fontSize: 80, color: '#388E3C' }} />
              </Avatar>
            </motion.div>
            <motion.div whileHover={{ scale: 1.05 }}>
              <Typography variant="h4" sx={{ mt: 2, fontWeight: 'bold', fontSize: '1.5rem' }}>
                {children.childrenName}
              </Typography>
            </motion.div>
            <motion.div whileHover={{ scale: 1.05 }}>
              <Typography variant="h6" sx={{ opacity: 0.8, fontWeight: 100, fontSize: '0.8rem' }}>
                Child Profile
              </Typography>
            </motion.div>
          </Box>

          <Card sx={{ boxShadow: 0, borderRadius: 0, px: 5, py: 4, backgroundColor: '#fafafa' }}>
            <CardContent>
              <Grid container spacing={3}>
                {[
                  ['Name', children.childrenName],
                  ['Age', children.age],
                  ['Gender', children.gender],
                  ['Parent Name', children.parentName],
                ].map(([label, value]) => (
                  <Grid item xs={12} key={label}>
                    <motion.div whileHover={{ scale: 1.03, backgroundColor: '#c8e6c9', borderRadius: '10px', padding: '6px' }}>
                      <Typography variant="body1" sx={{ fontSize: '1.2rem', fontWeight: 700, color: '#2e7d32' }}>
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

export default ChildrenDetail;
