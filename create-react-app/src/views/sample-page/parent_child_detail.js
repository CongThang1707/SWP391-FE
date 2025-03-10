import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { BarChart } from '@mui/x-charts/BarChart';
import { axisClasses } from '@mui/x-charts/ChartsAxis';
import { getChildrenById } from '../../service/children_services/get_children.js';
import { getHealthRecordByChildId } from '../../service/healthrecord_services/get_healthrecord.js';
import { IconButton, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material';
import { AddCircleOutline, Edit, Delete } from '@mui/icons-material';

const ChildrenDetail = () => {
  const { id } = useParams();
  const [children, setChildren] = useState(null);
  const [healthRecord, setHealthRecord] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());

  useEffect(() => {
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
    fetchData();
  }, [id]);

  if (loading) return <p>Loading...</p>;
  if (!children) return <p>Children data not found!</p>;

  const filteredHealthRecord = healthRecord.filter(record =>
    new Date(record.date).getFullYear() === selectedYear
  );

  const chartWidth = Math.max(500, Math.min(1100, filteredHealthRecord.length * 90));

  const handleAdd = () => {
    console.log('Thêm bản ghi sức khỏe mới');
  };

  const handleEdit = (record) => {
    console.log('Chỉnh sửa bản ghi:', record);
  };

  const handleDelete = (recordId) => {
    console.log('Xóa bản ghi ID:', recordId);
  };

  return (
    <div style={{ display: 'flex', padding: '20px' }}>
      {/* Section 1: Children Details */}
      <div style={{ flex: 1, marginRight: '20px', padding: '15px', border: '1px solid #ecf0f1', borderRadius: '10px', boxShadow: '0 2px 5px rgba(0,0,0,0.1)' }}>
        <h2 style={{ fontSize: '24px', color: '#2c3e50', fontWeight: 'bold' }}>Children Detail</h2>
        <p><strong style={{ fontWeight: '600' }}>Children Name:</strong> {children.childrenName}</p>
        <p><strong style={{ fontWeight: '600' }}>Age:</strong> {children.age} years old</p>
        <p><strong style={{ fontWeight: '600' }}>Gender:</strong> {children.gender}</p>
        <p><strong style={{ fontWeight: '600' }}>Parent Name:</strong> {children.parentName}</p>
      </div>

      {/* Section 2: Health Record with Chart and Table */}
      <div style={{ flex: 2, }}>
        {/* Section 2: Year Selection */}
        <div style={{ marginBottom: '20px' }}>
          <label htmlFor="yearSelect"><strong>Select Year:</strong> </label>
          <select
            id="yearSelect"
            value={selectedYear}
            onChange={(e) => setSelectedYear(parseInt(e.target.value))}
          >
            {[...new Set(healthRecord.map(record => new Date(record.date).getFullYear()))]
              .sort((a, b) => b - a)
              .map(year => (
                <option key={year} value={year}>{year}</option>
              ))}
          </select>
        </div>

        {/* Health Record Chart Section */}
        <div style={{ display: 'flex', alignItems: 'center', marginBottom: '10px', }}>
          <h3 style={{ marginRight: '10px' }}>Health Record ({selectedYear})</h3>
          <IconButton color="primary" onClick={handleAdd}>
            <AddCircleOutline />
          </IconButton>
        </div>

        {filteredHealthRecord.length > 0 ? (
          <div style={{ textAlign: 'center' }}>
            <div style={{ display: 'flex', justifyContent: 'center', border: '1px solid #ecf0f1', borderRadius: '10px', boxShadow: '0 2px 5px rgba(0,0,0,0.1)' }}>
              <BarChart
                dataset={filteredHealthRecord.map(record => ({
                  date: record.date,
                  weight: record.weight,
                  height: record.height,
                  bmi: record.bmi
                }))}
                xAxis={[{ scaleType: 'band', dataKey: 'date' }]}
                series={[
                  { dataKey: 'weight', label: 'Weight (kg)' },
                  { dataKey: 'height', label: 'Height (cm)' },
                  { dataKey: 'bmi', label: 'BMI' }
                ]}
                width={chartWidth}
                height={450}
                yAxis={[{
                  label: 'Health Data',
                  min: 0,
                  max: 160,
                }]}
                sx={{
                  [`.${axisClasses.left} .${axisClasses.label}`]: {
                    transform: 'translate(-5px, 0)',
                  },
                }}
              />
            </div>

            {/* Table using Material-UI */}
            <TableContainer component={Paper} sx={{ marginTop: '20px' }} style={{ border: '1px solid #ecf0f1', borderRadius: '10px', boxShadow: '0 2px 5px rgba(0,0,0,0.1)' }}>
              <Table sx={{ minWidth: 650 }} aria-label="health record table">
                <TableHead>
                  <TableRow>
                    <TableCell><strong>Date</strong></TableCell>
                    <TableCell align="right"><strong>Weight (kg)</strong></TableCell>
                    <TableCell align="right"><strong>Height (cm)</strong></TableCell>
                    <TableCell align="right"><strong>BMI</strong></TableCell>
                    <TableCell align="right"><strong>Actions</strong></TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {filteredHealthRecord.map((record, index) => (
                    <TableRow key={record.record_id || record.date || index} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                      <TableCell component="th" scope="row">{record.date}</TableCell>
                      <TableCell align="right">{record.weight}</TableCell>
                      <TableCell align="right">{record.height}</TableCell>
                      <TableCell align="right">{record.bmi}</TableCell>
                      <TableCell align="right">
                        <IconButton color="primary" onClick={() => handleEdit(record)}>
                          <Edit />
                        </IconButton>
                        <IconButton color="secondary" onClick={() => handleDelete(record.record_id)}>
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
    </div>
  );
};

export default ChildrenDetail;
