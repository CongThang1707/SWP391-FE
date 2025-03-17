import {
    Grid,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    TableSortLabel,
    TablePagination,
    Paper,
    Button
} from '@mui/material';
import MainCard from 'ui-component/cards/MainCard';
import React, { useState, useEffect } from 'react';
import { getAllConsulting, deleteConsulting } from '../../service/consulting_service/get_consulting.js';
import { useNavigate } from 'react-router-dom';

const ConsultingTable = () => {
    const [consultingData, setConsultingData] = useState([]);
    const [order, setOrder] = useState('asc');
    const [orderBy, setOrderBy] = useState('consultingId');
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(5);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchConsultingData = async () => {
            try {
                const data = await getAllConsulting();
                setConsultingData(data);
            } catch (error) {
                console.error('Error fetching consulting records:', error);
            }
        };
        fetchConsultingData();
    }, []);

    const handleRequestSort = (event, property) => {
        const isAsc = orderBy === property && order === 'asc';
        setOrder(isAsc ? 'desc' : 'asc');
        setOrderBy(property);
        setConsultingData((prevData) =>
            [...prevData].sort((a, b) => {
                if (a[property] < b[property]) return isAsc ? -1 : 1;
                if (a[property] > b[property]) return isAsc ? 1 : -1;
                return 0;
            })
        );
    };

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

    const handleDeleteConsulting = async (consultingId) => {
        if (window.confirm('Are you sure you want to delete this consulting record?')) {
            try {
                await deleteConsulting(consultingId);
                setConsultingData((prevData) => prevData.filter((consulting) => consulting.consultingId !== consultingId));
                alert(`Consulting record ${consultingId} deleted successfully!`);
            } catch (error) {
                console.error('Failed to delete consulting record:', error.response ? error.response.data : error.message);
                alert('Error deleting consulting record. Please try again.');
            }
        }
    };

    return (
        <MainCard title="Consulting Records" content={false}>
            <Grid container>
                <TableContainer component={Paper}>
                    <Table sx={{ minWidth: 650 }}>
                        <TableHead>
                            <TableRow>
                                {[{ id: 'consultingId', label: 'Consulting ID' },
                                { id: 'title', label: 'Title' },
                                { id: 'comment', label: 'Comment' },
                                { id: 'date', label: 'Date' },
                                { id: 'action', label: 'Action' }
                                ].map((head) => (
                                    <TableCell key={head.id}>
                                        <TableSortLabel
                                            active={orderBy === head.id}
                                            direction={orderBy === head.id ? order : 'asc'}
                                            onClick={(event) => handleRequestSort(event, head.id)}
                                        >
                                            {head.label}
                                        </TableSortLabel>
                                    </TableCell>
                                ))}
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {consultingData.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((consulting, index) => (
                                <TableRow key={consulting.consultingId || `consulting-${index}`}>
                                    <TableCell>{consulting.consultingId}</TableCell>
                                    <TableCell>{consulting.title}</TableCell>
                                    <TableCell>{consulting.comment}</TableCell>
                                    <TableCell>{consulting.date}</TableCell>
                                    <TableCell>
                                        <Button
                                            variant="contained"
                                            color="primary"
                                            size="small"
                                            onClick={() => navigate(`/consulting-detail/${consulting.consultingId}`)}
                                        >
                                            Detail
                                        </Button>
                                        <Button
                                            variant="contained"
                                            color="secondary"
                                            size="small"
                                            style={{ marginLeft: 8 }}
                                            onClick={() => handleDeleteConsulting(consulting.consultingId)}
                                        >
                                            Delete
                                        </Button>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
                <TablePagination
                    rowsPerPageOptions={[5, 10, 25]}
                    component="div"
                    count={consultingData.length}
                    rowsPerPage={rowsPerPage}
                    page={page}
                    onPageChange={handleChangePage}
                    onRowsPerPageChange={handleChangeRowsPerPage}
                />
            </Grid>
        </MainCard>
    );
};

export default ConsultingTable;
