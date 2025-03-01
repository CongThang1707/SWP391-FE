import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { BarChart } from '@mui/x-charts/BarChart';
import { axisClasses } from '@mui/x-charts/ChartsAxis';
import { getChildrenById } from '../../service/children_services/get_children.js';
import { getHealthRecordByChildId } from '../../service/healthrecord_services/get_healthrecord.js';

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

  // Lọc dữ liệu theo năm được chọn
  const filteredHealthRecord = healthRecord.filter(record =>
    new Date(record.date).getFullYear() === selectedYear
  );

  // Điều chỉnh độ rộng của biểu đồ dựa trên số lượng dữ liệu
  const chartWidth = Math.max(500, Math.min(1100, filteredHealthRecord.length * 90));

  return (
    <div>
      <h2>Children Detail</h2>
      <p><strong>Children Name:</strong> {children.childrenName}</p>
      <p><strong>Age:</strong> {children.age}</p>
      <p><strong>Gender:</strong> {children.gender}</p>
      <p><strong>Parent Name:</strong> {children.parentName}</p>

      {/* Dropdown chọn năm */}
      <div style={{ marginBottom: '15px' }}>
        <label htmlFor="yearSelect"><strong>Select Year:</strong> </label>
        <select
          id="yearSelect"
          value={selectedYear}
          onChange={(e) => setSelectedYear(parseInt(e.target.value))}
        >
          {[...new Set(healthRecord.map(record => new Date(record.date).getFullYear()))]
            .sort((a, b) => b - a) // Sắp xếp giảm dần
            .map(year => (
              <option key={year} value={year}>{year}</option>
            ))}
        </select>
      </div>

      {filteredHealthRecord.length > 0 ? (
        <div style={{ textAlign: 'center' }}>
          <h3>Health Record ({selectedYear})</h3>
          <div style={{ display: 'flex', justifyContent: 'center' }}>
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
              width={chartWidth} // Cập nhật width động
              height={450}
              yAxis={[
                {
                  label: 'Health Data',
                  min: 0,
                  max: 160,
                },
              ]}
              sx={{
                [`.${axisClasses.left} .${axisClasses.label}`]: {
                  transform: 'translate(-20px, 0)',
                },
              }}
            />
          </div>
        </div>
      ) : (
        <p>No health record found for {selectedYear}.</p>
      )}
    </div>
  );
};

export default ChildrenDetail;
