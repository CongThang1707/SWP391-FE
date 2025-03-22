import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getMembershipByType } from '../../service/membership_services/get_membership.js';
import { Card, CardContent, Typography, Chip, Box, CircularProgress, Stack } from '@mui/material';
import MonetizationOnIcon from '@mui/icons-material/MonetizationOn';
import WorkspacePremiumIcon from '@mui/icons-material/WorkspacePremium';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';

const MembershipDetail = () => {
  const { id } = useParams();
  const [membership, setMembership] = useState(null);

  useEffect(() => {
    const fetchMembership = async () => {
      const data = await getMembershipByType(id);
      setMembership(data);
    };
    fetchMembership();
  }, [id]);

  if (!membership) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" minHeight="60vh">
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Box display="flex" justifyContent="center" alignItems="center" minHeight="80vh" p={2}>
      <Card sx={{ maxWidth: 500, width: '100%', borderRadius: '16px', boxShadow: 4 }}>
        <CardContent>
          <Stack direction="row" alignItems="center" spacing={1} mb={2}>
            <WorkspacePremiumIcon color="primary" />
            <Typography variant="h5" fontWeight="bold" fontSize={20}>
              {membership.type} Membership
            </Typography>
          </Stack>

          <Typography variant="subtitle1" fontWeight="bold" mb={1}>
            Description:
          </Typography>

          {/* Description split + Check icon */}
          <Stack spacing={1} mb={2}>
            {(membership.description || '').split(',').map((desc, i) => (
              <Typography
                key={i}
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  color: 'text.secondary'
                }}
              >
                <CheckCircleIcon sx={{ color: 'success.main', mr: 1 }} />
                {desc.trim()}
              </Typography>
            ))}
          </Stack>

          <Stack direction="row" spacing={2}>
            <Chip 
              icon={<MonetizationOnIcon />} 
              label={`Price: $${membership.price}`} 
              color="success" 
              variant="outlined"
            />
          </Stack>
        </CardContent>
      </Card>
    </Box>
  );
};

export default MembershipDetail;
