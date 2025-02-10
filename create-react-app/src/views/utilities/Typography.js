// import { Grid, Link } from '@mui/material';
// import MuiTypography from '@mui/material/Typography';

// // project imports
// import SubCard from 'ui-component/cards/SubCard';
// import MainCard from 'ui-component/cards/MainCard';
// import SecondaryAction from 'ui-component/cards/CardSecondaryAction';
// import { gridSpacing } from 'store/constant';

// // ==============================|| TYPOGRAPHY ||============================== //

// const Typography = () => (
//   <MainCard title="Basic Typography" secondary={<SecondaryAction link="https://next.material-ui.com/system/typography/" />}>
//     <Grid container spacing={gridSpacing}>
//       {/* <Grid item xs={12} sm={6}>
//         <SubCard title="Heading">
//           <Grid container direction="column" spacing={1}>
//             <Grid item>
//               <MuiTypography variant="h1" gutterBottom>
//                 h1. Heading
//               </MuiTypography>
//             </Grid>
//             <Grid item>
//               <MuiTypography variant="h2" gutterBottom>
//                 h2. Heading
//               </MuiTypography>
//             </Grid>
//             <Grid item>
//               <MuiTypography variant="h3" gutterBottom>
//                 h3. Heading
//               </MuiTypography>
//             </Grid>
//             <Grid item>
//               <MuiTypography variant="h4" gutterBottom>
//                 h4. Heading
//               </MuiTypography>
//             </Grid>
//             <Grid item>
//               <MuiTypography variant="h5" gutterBottom>
//                 h5. Heading
//               </MuiTypography>
//             </Grid>
//             <Grid item>
//               <MuiTypography variant="h6" gutterBottom>
//                 h6. Heading
//               </MuiTypography>
//             </Grid>
//           </Grid>
//         </SubCard>
//       </Grid> */}
//       {/* <Grid item xs={12} sm={6}>
//         <SubCard title="Sub title">
//           <Grid container direction="column" spacing={1}>
//             <Grid item>
//               <MuiTypography variant="subtitle1" gutterBottom>
//                 subtitle1. Lorem ipsum dolor sit connecter adieu siccing eliot. Quos blanditiis tenetur
//               </MuiTypography>
//             </Grid>
//             <Grid item>
//               <MuiTypography variant="subtitle2" gutterBottom>
//                 subtitle2. Lorem ipsum dolor sit connecter adieu siccing eliot. Quos blanditiis tenetur
//               </MuiTypography>
//             </Grid>
//           </Grid>
//         </SubCard>
//       </Grid> */}
//       <Grid item xs={12} sm={6}>
//         <SubCard title="Body">
//           <Grid container direction="column" spacing={1}>
//             <Grid item>
//               <MuiTypography variant="body1" gutterBottom>
//                 body1. Lorem ipsum dolor sit connecter adieu siccing eliot. Quos blanditiis tenetur unde suscipit, quam beatae rerum
//                 inventore consectetur, neque doloribus, cupiditate numquam dignissimos laborum fugiat deleniti? Eum quasi quidem quibusdam.
//               </MuiTypography>
//             </Grid>
//             <Grid item>
//               <MuiTypography variant="body2" gutterBottom>
//                 body2. Lorem ipsum dolor sit connecter adieu siccing eliot. Quos blanditiis tenetur unde suscipit, quam beatae rerum
//                 inventore consectetur, neque doloribus, cupiditate numquam dignissimos laborum fugiat deleniti? Eum quasi quidem quibusdam.
//               </MuiTypography>
//             </Grid>
//           </Grid>
//         </SubCard>
//       </Grid>
//       <Grid item xs={12} sm={6}>
//         <SubCard title="Extra">
//           <Grid container direction="column" spacing={1}>
//             <Grid item>
//               <MuiTypography variant="button" display="block" gutterBottom>
//                 button text
//               </MuiTypography>
//             </Grid>
//             <Grid item>
//               <MuiTypography variant="caption" display="block" gutterBottom>
//                 caption text
//               </MuiTypography>
//             </Grid>
//             <Grid item>
//               <MuiTypography variant="overline" display="block" gutterBottom>
//                 overline text
//               </MuiTypography>
//             </Grid>
//             <Grid item>
//               <MuiTypography
//                 variant="body2"
//                 color="primary"
//                 component={Link}
//                 href="https://berrydashboard.io"
//                 target="_blank"
//                 display="block"
//                 underline="hover"
//                 gutterBottom
//               >
//                 https://berrydashboard.io
//               </MuiTypography>
//             </Grid>
//           </Grid>
//         </SubCard>
//       </Grid>
//     </Grid>
//   </MainCard>
// );

// export default Typography;
import React, { useState, useEffect } from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { fetchData } from '../../service/parent_service.js'; // Import hàm fetchData

export default function BasicTable() {
  const [data, setData] = useState([]);

  useEffect(() => {
    const getData = async () => {
      const result = await fetchData();
      setData(result); // Lưu dữ liệu vào state
    };
    getData();
  }, []);

  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Email</TableCell>
            <TableCell align="right">Full Name</TableCell>
            <TableCell align="right">Name</TableCell>
            <TableCell align="right">Gender</TableCell>
            <TableCell align="right">Phone</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {data.map((row, index) => (
            <TableRow key={index}>
              <TableCell>{row.email}</TableCell>
              <TableCell align="right">{row.fullName}</TableCell>
              <TableCell align="right">{row.name}</TableCell>
              <TableCell align="right">{row.gender}</TableCell>
              <TableCell align="right">{row.phone}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}