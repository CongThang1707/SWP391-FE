//parent_child_detail.js
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { BarChart } from '@mui/x-charts/BarChart';
import { axisClasses } from '@mui/x-charts/ChartsAxis';
import { getChildrenById } from '../../service/children_services/get_children.js';
import {
  getHealthRecordByChildId,
  deleteRecord_Admin,
  createRecord,
  updateRecord,
  getGrowthStatusChange
} from '../../service/healthrecord_services/get_healthrecord.js';
import { IconButton, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material';
import { AddCircleOutline, Edit, Delete } from '@mui/icons-material';
import { Dialog, DialogTitle, DialogContent, TextField, DialogActions, Button } from '@mui/material';

const ChildrenDetail = () => {
  const { id } = useParams();
  const [children, setChildren] = useState(null);
  const [healthRecord, setHealthRecord] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());
  const [openDialog, setOpenDialog] = useState(false);
  const [editRecord, setEditRecord] = useState(null);
  const [formData, setFormData] = useState({ weight: '', height: '', date: '' });
  const [growthStatusChange, setGrowthStatusChange] = useState('');

  useEffect(() => {
    fetchData();
  }, [id]);
  const fetchData = async () => {
    try {
      const childrenData = await getChildrenById(id);
      setChildren(childrenData);
      const healthData = await getHealthRecordByChildId(id);
      setHealthRecord(healthData || []);
    } catch (error) {
      console.error('Failed to fetch data:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (healthRecord.length > 1) {
      const lastRecord = healthRecord[healthRecord.length - 2];
      const currentRecord = healthRecord[healthRecord.length - 1];
      getGrowthStatusChange(id, lastRecord.bmi, currentRecord.bmi).then((response) => {
        setGrowthStatusChange(response);
      });
    } else if (healthRecord.length === 1) {
      setGrowthStatusChange('No previous record to compare.');
    } else if (healthRecord.length === 0) {
      setGrowthStatusChange('No records found.');
    }
  }, [healthRecord]);

  if (loading) return <p>Loading...</p>;
  if (!children) return <p>Children data not found!</p>;

  const filteredHealthRecord = healthRecord.filter((record) => new Date(record.date).getFullYear() === selectedYear);

  const chartData = [...filteredHealthRecord].sort((a, b) => new Date(a.date) - new Date(b.date)); // Sắp xếp theo ngày từ cũ đến mới
  const tableData = [...filteredHealthRecord].sort((a, b) => new Date(b.date) - new Date(a.date)); // Sắp xếp theo ngày từ mới đến cũ

  const chartWidth = Math.max(500, Math.min(1100, filteredHealthRecord.length * 90));

  const handleAdd = () => {
    setEditRecord(null);
    setFormData({ weight: '', height: '', date: '' });
    setOpenDialog(true);
  };

  const handleEdit = (record) => {
    console.log('Original record.date from API:', record.date);

    setEditRecord(record);
    setFormData({
      weight: record.weight,
      height: record.height,
      date: record.date ? record.date : '' // Đảm bảo giữ nguyên định dạng YYYY-MM-DD
    });

    setOpenDialog(true);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!window.confirm(editRecord ? 'Are you sure you want to update this record?' : 'Are you sure you want to create a new record?')) {
      return;
    }

    try {
      console.log('Form Data:', formData);
      const weight = parseFloat(formData.weight);
      const height = parseFloat(formData.height);

      if (!formData.date) {
        alert('Please select a date.');
        return;
      }

      if (isNaN(weight) || isNaN(height) || weight <= 0 || height <= 0) {
        alert('Please enter valid values for weight and height.');
        return;
      }

      const updatedData = {
        weight_kg: weight,
        height_m: height,
        date: formData.date
      };

      const editData = {
        weight: weight,
        height: height,
        date: formData.date
      };

      console.log('Sending Data to API:', updatedData);

      if (editRecord) {
        await updateRecord(editRecord.recordId, editData);
        await fetchData();
      } else {
        const parentId = localStorage.getItem('userId');
        await createRecord(parentId, id, updatedData);
        await fetchData();
      }

      setOpenDialog(false);
    } catch (error) {
      console.error('Failed to save record:', error);
    }
  };


  const handleDelete = async (recordId) => {
    if (window.confirm('Are you sure you want to delete this record?')) {
      try {
        await deleteRecord_Admin(recordId);
        setHealthRecord((prevRecords) => prevRecords.filter((record) => record.recordId !== recordId));
      } catch (error) {
        console.error('Failed to delete record:', error);
      }
    }
  };

  return (
    <div style={{ display: 'flex', padding: '20px' }}>
      {/* Section 1: Children Details */}
      <div
        style={{
          flex: 1,
          marginRight: '20px',
          padding: '15px',
          border: '1px solid #ecf0f1',
          borderRadius: '10px',
          boxShadow: '0 2px 5px rgba(0,0,0,0.1)'
        }}
      >
        <h2 style={{ fontSize: '24px', color: '#2c3e50', fontWeight: 'bold' }}>Children Detail</h2>
        <p>
          <strong style={{ fontWeight: '600' }}>Children Name:</strong>
          {children.childrenName}
        </p>
        <p>
          <strong style={{ fontWeight: '600' }}>Age:</strong>
          {children.age} years old
        </p>
        <p>
          <strong style={{ fontWeight: '600' }}>Gender:</strong>
          {children.gender}
        </p>
        <p>
          <strong style={{ fontWeight: '600' }}>Parent Name:</strong>
          {children.parentName}
        </p>
      </div>

      {/* Section 2: Health Record with Chart and Table */}
      <div style={{ flex: 2 }}>
        {/* Section 2: Year Selection */}
        <div style={{ marginBottom: '20px' }}>
          <label htmlFor="yearSelect">
            <strong>Select Year:</strong>
          </label>
          <select id="yearSelect" value={selectedYear} onChange={(e) => setSelectedYear(parseInt(e.target.value))}>
            {[...new Set(healthRecord.map((record) => new Date(record.date).getFullYear()))]
              .sort((a, b) => b - a)
              .map((year) => (
                <option key={year} value={year}>
                  {year}
                </option>
              ))}
          </select>
        </div>

        {/* Health Record Chart Section */}
        <div style={{ display: 'flex', alignItems: 'center', marginBottom: '10px' }}>
          <h3 style={{ marginRight: '10px' }}>Health Record ({selectedYear})</h3>
          <IconButton color="primary" onClick={handleAdd}>
            <AddCircleOutline />
          </IconButton>
        </div>

        {growthStatusChange && <p style={{ color: 'green' }}>{growthStatusChange}</p>}

        {chartData.length > 0 ? (
          <div style={{ textAlign: 'center' }}>
            <div
              style={{
                display: 'flex',
                justifyContent: 'center',
                border: '1px solid #ecf0f1',
                borderRadius: '10px',
                boxShadow: '0 2px 5px rgba(0,0,0,0.1)'
              }}
            >
              <BarChart
                dataset={filteredHealthRecord.map((record) => ({
                  date: record.date,
                  weight: record.weight,
                  height: record.height,
                  bmi: record.bmi
                }))}
                xAxis={[{ scaleType: 'band', dataKey: 'date' }]}
                series={[
                  { dataKey: 'weight', label: 'Weight (kg)' },
                  { dataKey: 'height', label: 'Height (m)' },
                  { dataKey: 'bmi', label: 'BMI' }
                ]}
                width={chartWidth}
                height={450}
                yAxis={[
                  {
                    label: 'Health Data',
                    min: 0,
                    max: 50
                  }
                ]}
                sx={{
                  [`.${axisClasses.left} .${axisClasses.label}`]: {
                    transform: 'translate(-5px, 0)'
                  }
                }}
              />
            </div>

            {/* Table using Material-UI */}
            <TableContainer
              component={Paper}
              sx={{ marginTop: '20px' }}
              style={{ border: '1px solid #ecf0f1', borderRadius: '10px', boxShadow: '0 2px 5px rgba(0,0,0,0.1)' }}
            >
              <Table sx={{ minWidth: 650 }} aria-label="health record table">
                <TableHead>
                  <TableRow>
                    <TableCell>
                      <strong>Date</strong>
                    </TableCell>
                    <TableCell align="right">
                      <strong>Weight (kg)</strong>
                    </TableCell>
                    <TableCell align="right">
                      <strong>Height (m)</strong>
                    </TableCell>
                    <TableCell align="right">
                      <strong>BMI</strong>
                    </TableCell>
                    <TableCell align="right">
                      <strong>Actions</strong>
                    </TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {tableData.map((record, index) => (
                    <TableRow key={record.recordId || record.date || index} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                      <TableCell component="th" scope="row">
                        {record.date}
                      </TableCell>
                      <TableCell align="right">{record.weight}</TableCell>
                      <TableCell align="right">{record.height}</TableCell>
                      <TableCell align="right">{record.bmi.toFixed(2)}</TableCell>
                      <TableCell align="right">
                        <IconButton color="primary" onClick={() => handleEdit(record)}>
                          <Edit />
                        </IconButton>
                        <IconButton color="secondary" onClick={() => handleDelete(record.recordId)}>
                          <Delete />
                        </IconButton>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </div>
        ) : (
          <p>No health record found for {selectedYear}.</p>
        )}
      </div>
      <Dialog open={openDialog} onClose={() => setOpenDialog(false)}>
        <DialogTitle>{editRecord ? 'Edit' : 'Add'} Health Record</DialogTitle>
        <DialogContent onKeyDown={(e) => e.key === 'Enter' && handleSubmit(e)}>
          <TextField
            label="Weight(kg)"
            name="weight"
            type="number"
            fullWidth
            margin="dense"
            value={formData.weight}
            onChange={handleInputChange}
          />
          <TextField
            label="Height(m)"
            name="height"
            type="number"
            fullWidth
            margin="dense"
            value={formData.height}
            onChange={handleInputChange}
          />
          <TextField
            label="Date"
            name="date"
            type="date"
            fullWidth
            margin="dense"
            InputLabelProps={{ shrink: true }}
            value={formData.date}
            onChange={handleInputChange}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenDialog(false)}>Cancel</Button>
          <Button onClick={handleSubmit} color="primary">
            Submit
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default ChildrenDetail;
