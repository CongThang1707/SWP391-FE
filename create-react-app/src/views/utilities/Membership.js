//Membership.js
import { Grid, Button, IconButton, TextField, Dialog, DialogActions, DialogContent, DialogTitle } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import MainCard from 'ui-component/cards/MainCard';
import React, { useState, useEffect } from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TableSortLabel, TablePagination, Paper } from '@mui/material';
import { getAllMembership, deleteMembership, createMembership, updateMembership } from '../../service/membership_services/get_membership.js';
import { useNavigate } from 'react-router-dom';

const EnhancedTable = () => {
    const [memberships, setMemberships] = useState([]);
    const [order, setOrder] = useState('asc');
    const [orderBy, setOrderBy] = useState('membershipId');
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(5);
    const [openDialog, setOpenDialog] = useState(false);
    const [openUpdateDialog, setOpenUpdateDialog] = useState(false);
    const [newMembership, setNewMembership] = useState({ type: '', price: '', description: '' });
    const [updateMembershipData, setUpdateMembershipData] = useState({ id: '', type: '', price: '', description: '' });

    const [errors, setErrors] = useState({});
    const [touchedFields, setTouchedFields] = useState([]);
    const [updateErrors, setUpdateErrors] = useState({});
    const [updateTouchedFields, setUpdateTouchedFields] = useState([]);

    const navigate = useNavigate();

    useEffect(() => {
        if (touchedFields.length) {
            validate();
        }
        if (updateTouchedFields.length) {
            validateUpdate();
        }
        fetchMemberships();
    }, [touchedFields, updateTouchedFields]);

    const fetchMemberships = async () => {
        const data = await getAllMembership();
        const filteredMemberships = data.filter(membership => membership.type !== 'DEFAULT');
        setMemberships(filteredMemberships);
    };

    const validate = () => {
        let tempErrors = {};
        Object.keys(newMembership).forEach((key) => {
            if (!newMembership[key]?.toString().trim()) {
                tempErrors[key] = 'This field is required';
            }
        });
        setErrors(tempErrors);
        return Object.keys(tempErrors).length === 0;
    };

    const validateUpdate = () => {
        let tempErrors = {};
        Object.keys(updateMembershipData).forEach((key) => {
            const value = updateMembershipData[key];
            if (typeof value === 'string' && !value.trim()) {
                tempErrors[key] = 'This field is required';
            } else if (value === '' || value == null) {
                tempErrors[key] = 'This field is required';
            }
        });
        setUpdateErrors(tempErrors);
        return Object.keys(tempErrors).length === 0;
    };

    const handleRequestSort = (event, property) => {
        const isAsc = orderBy === property && order === 'asc';
        setOrder(isAsc ? 'desc' : 'asc');
        setOrderBy(property);
        setMemberships((prevData) =>
            [...prevData].sort((a, b) => (a[property] < b[property] ? (isAsc ? -1 : 1) : (a[property] > b[property] ? (isAsc ? 1 : -1) : 0)))
        );
    };

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

    const handleDeleteMembership = async (type) => {
        if (window.confirm('Are you sure you want to delete this membership?')) {
            try {
                await deleteMembership(type);
                setMemberships((prevData) => prevData.filter((membership) => membership.type !== type));
                alert('Membership deleted successfully!');
            } catch (error) {
                console.error('Failed to delete membership:', error);
                alert('Error deleting membership. Please try again.');
            }
        }
    };

    const handleOpenDialog = () => {
        setOpenDialog(true);
    };

    const handleInputChange = (event) => {
        const { name, value } = event.target;

        setNewMembership((prev) => ({
            ...prev,
            [name]: name === 'type' ? value.toUpperCase() : value
        }));

        setTouchedFields((prev) => [...new Set([...prev, name])]);
    };


    const handleUpdateInputChange = (event) => {
        const { name, value } = event.target;

        setUpdateMembershipData((prev) => ({
            ...prev,
            [name]: name === 'type' ? value.toUpperCase() : value
        }));

        setUpdateTouchedFields((prev) => [...new Set([...prev, name])]);
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        setTouchedFields(Object.keys(newMembership));

        if (!validate()) return;

        try {
            await createMembership(
                newMembership.type.toUpperCase(),
                newMembership.price,
                newMembership.description
            );
            await fetchMemberships();
            setOpenDialog(false);
        } catch (error) {
            console.error('Error creating membership:', error);
            alert('Failed to create membership. Please try again.');
        }
    };

    const handleUpdateSubmit = async (event) => {
        event.preventDefault();
        setUpdateTouchedFields(Object.keys(updateMembershipData));
        if (!validateUpdate()) return;
        if (!window.confirm('Are you sure you want to update this membership?')) return;
        try {
            await updateMembership(updateMembershipData.id, {
                type: updateMembershipData.type,
                price: updateMembershipData.price,
                description: updateMembershipData.description
            });
            await fetchMemberships();
            setOpenUpdateDialog(false);
            alert('Membership updated successfully!');
        } catch (error) {
            console.error('Error updating membership:', error);
            alert('Failed to update membership. Please try again.');
        }
    };

    const handleOpenUpdateDialog = (membership) => {
        setUpdateMembershipData({
            id: membership.membershipId,
            type: membership.type,
            price: membership.price,
            description: membership.description
        });
        setOpenUpdateDialog(true);
    };

    return (
        <MainCard
            title="Memberships"
            secondary={
                <IconButton color="primary" onClick={handleOpenDialog}>
                    <AddIcon />
                </IconButton>
            }
            content={false}
        >
            <Grid container>
                <TableContainer component={Paper}>
                    <Table sx={{ minWidth: 650 }}>
                        <TableHead>
                            <TableRow>
                                {[{ id: 'type', label: 'Type' }, { id: 'price', label: 'Price' }, { id: 'action', label: 'Action' }].map((head) => (
                                    <TableCell key={head.id}>
                                        <TableSortLabel active={orderBy === head.id} direction={orderBy === head.id ? order : 'asc'} onClick={(event) => handleRequestSort(event, head.id)}>
                                            {head.label}
                                        </TableSortLabel>
                                    </TableCell>
                                ))}
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {memberships.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((membership) => (
                                <TableRow key={membership.membershipId}>
                                    <TableCell>{membership.type}</TableCell>
                                    <TableCell>{membership.price}</TableCell>
                                    <TableCell>
                                        <Button variant="contained" color="primary" size="small" onClick={() => navigate(`/membership-detail/${membership.type}`)}> Detail</Button>
                                        <Button variant="contained" color="warning" size="small" onClick={() => handleOpenUpdateDialog(membership)}>Update</Button>
                                        <Button variant="contained" color="secondary" size="small" onClick={() => handleDeleteMembership(membership.type)}>Delete </Button>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
                <TablePagination rowsPerPageOptions={[5, 10, 25]} component="div" count={memberships.length} rowsPerPage={rowsPerPage} page={page} onPageChange={handleChangePage} onRowsPerPageChange={handleChangeRowsPerPage} />
            </Grid>

            {/* Dialog Form */}
            <Dialog open={openDialog} onClose={() => setOpenDialog(false)}>
                <DialogTitle>Add New Membership</DialogTitle>
                <DialogContent>
                    {['type', 'price', 'description'].map((field) => (
                        <TextField
                            key={field}
                            margin="dense"
                            name={field}
                            label={field.charAt(0).toUpperCase() + field.slice(1)}
                            fullWidth
                            variant="outlined"
                            value={newMembership[field]}
                            onChange={handleInputChange}
                            onBlur={() => setTouchedFields((prev) => [...new Set([...prev, field])])}
                            error={touchedFields.includes(field) && !!errors[field]}
                            helperText={touchedFields.includes(field) ? errors[field] : ''}
                        />
                    ))}
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => setOpenDialog(false)}>Cancel</Button>
                    <Button onClick={handleSubmit} variant="contained" color="primary">Submit</Button>
                </DialogActions>
            </Dialog>

            <Dialog open={openUpdateDialog} onClose={() => setOpenUpdateDialog(false)}>
                <DialogTitle>Update Membership</DialogTitle>
                <DialogContent>
                    {['type', 'price', 'description'].map((field) => (
                        <TextField
                            key={field}
                            margin="dense"
                            name={field}
                            label={field.charAt(0).toUpperCase() + field.slice(1)}
                            fullWidth
                            variant="outlined"
                            value={updateMembershipData[field]}
                            onChange={handleUpdateInputChange}
                            onBlur={() => setUpdateTouchedFields((prev) => [...new Set([...prev, field])])}
                            error={updateTouchedFields.includes(field) && !!updateErrors[field]}
                            helperText={updateTouchedFields.includes(field) ? updateErrors[field] : ''}
                        />
                    ))}
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => setOpenUpdateDialog(false)}>Cancel</Button>
                    <Button onClick={handleUpdateSubmit} variant="contained" color="primary">Update</Button>
                </DialogActions>
            </Dialog>
        </MainCard>
    );
};

export default EnhancedTable;
