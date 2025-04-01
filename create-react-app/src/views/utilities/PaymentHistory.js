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
    Paper
} from '@mui/material';
import MainCard from 'ui-component/cards/MainCard';
import React, { useState, useEffect } from 'react';
import { getPaymentHistory } from '../../service/vnpay_services/get_vnpay.js';

const PaymentHistoryTable = () => {
    const [paymentData, setPaymentData] = useState([]);
    const [order, setOrder] = useState('asc');
    const [orderBy, setOrderBy] = useState('paymentDate');
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(5);

    useEffect(() => {
        const fetchPayments = async () => {
            try {
                const data = await getPaymentHistory();
                setPaymentData(data);
            } catch (error) {
                console.error('Failed to fetch payment history:', error);
            }
        };
        fetchPayments();
    }, []);

    const handleRequestSort = (event, property) => {
        const isAsc = orderBy === property && order === 'asc';
        setOrder(isAsc ? 'desc' : 'asc');
        setOrderBy(property);
        setPaymentData((prevData) =>
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

    return (
        <MainCard title="Payment History" content={false}>
            <Grid container>
                <TableContainer component={Paper}>
                    <Table sx={{ minWidth: 750 }}>
                        <TableHead sx={{ bgcolor: '#f5f5f5' }}>
                            <TableRow>
                                {[
                                    { id: 'type', label: 'Type' },
                                    { id: 'price', label: 'Price' },
                                    { id: 'status', label: 'Status' },
                                    { id: 'fullName', label: 'Full Name' },
                                    { id: 'paymentDate', label: 'Payment Date' }
                                ].map((head) => (
                                    <TableCell key={head.id} sx={{ fontWeight: 'bold' }}>
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
                            {paymentData.length === 0 ? (
                                <TableRow>
                                    <TableCell colSpan={5} align="center">
                                        No payment history found.
                                    </TableCell>
                                </TableRow>
                            ) : (
                                paymentData.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((payment, index) => (
                                    <TableRow key={payment.commentId || `payment-${index}`}>
                                        <TableCell>{payment.membership.type}</TableCell>
                                        <TableCell>{payment.price}</TableCell>
                                        <TableCell>{payment.status}</TableCell>
                                        <TableCell>{payment.user.fullName}</TableCell>
                                        <TableCell>{payment.paymentDate}</TableCell>
                                    </TableRow>
                                ))
                            )}
                        </TableBody>
                    </Table>
                </TableContainer>

                <TablePagination
                    rowsPerPageOptions={[5, 10, 25]}
                    component="div"
                    rowsPerPage={rowsPerPage}
                    page={page}
                    onPageChange={handleChangePage}
                    onRowsPerPageChange={handleChangeRowsPerPage}
                />
            </Grid>
        </MainCard>
    );
};

export default PaymentHistoryTable;