import React, { useEffect, useState, useRef } from 'react';
import IMask from 'imask';
import "./VaccineStatus.css";
import axios from 'axios';

function VaccineStatus() {
  const [personalId, setPersonalId] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [csvData, setCsvData] = useState([]);
  const inputRef = useRef(null);

  useEffect(() => {
    const maskOptions = {
      mask: '0-0000-00000-00-0',
    };

    const mask = IMask(inputRef.current, maskOptions);

    mask.on('accept', () => {
      setPersonalId(mask.unmaskedValue);
    });

    const fetchCSVData = () => {
      const csvUrl = 'https://docs.google.com/spreadsheets/d/e/2PACX-1vT9Okc9J17JI00MNQhrIrvWV2wIJ5p4uqwRanr-3vNBQuPj2EZ91TuX1mzO0EhiTuoSRX7gAvIaE0fx/pub?output=csv';
      axios.get(csvUrl)
        .then((response) => {
          const parsedData = parseCSV(response.data);
          console.log('CSV Data:', parsedData);
          setCsvData(parsedData);
        })
        .catch((error) => {
          console.error('Error fetching CSV data:', error);
        });
    };

    fetchCSVData();

    return () => {
      mask.destroy();
    };
  }, []);

  const parseCSV = (csvText) => {
    const rows = csvText.split(/\r?\n/);
    const headers = rows[0].split(',');
    const data = [];
    for (let i = 1; i < rows.length; i++) {
      const rowData = rows[i].split(',');
      const rowObject = {};
      for (let j = 0; j < headers.length; j++) {
        rowObject[headers[j]] = rowData[j];
      }
      data.push(rowObject);
    }
    return data;
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    const found = csvData.some(row => row['Personal ID']?.replace(/-/g, '') === personalId);

    console.log('Personal ID:', personalId);
    console.log('Found in CSV:', found);

    if (found) {
      setSuccessMessage('Personal ID is valid and eligible.');
      setErrorMessage('');
    } else {
      setErrorMessage('Personal ID not found or not eligible.');
      setSuccessMessage('');
    }
  };

  return (
    <div className="vaccine-status-background">
      <div className="vaccine-status-container">
        <h3>ตรวจสอบสิทธิ</h3>
        <form onSubmit={handleSubmit}>
          <label htmlFor="personalid">Personal ID:</label>
          <input
            type="text"
            id="personalid"
            value={personalId}
            aria-invalid={false}
            ref={inputRef}
            className="personal-id-input"
          />
          <button type="submit" className="submit-button">
            ยืนยัน
          </button>
        </form>
        {errorMessage && <div className="error-message">{errorMessage}</div>}
        {successMessage && <div className="success-message">{successMessage}</div>}
        <a href='https://docs.google.com/forms/d/1VGI9Q1Ns8ITWgyTAaQzZ4_fucaL0lCJZ0jCw5iyXFIk/edit'>
          <button className='registervaccine'>
            สมัครรับวัคซีน
          </button>
        </a>
      </div>
    </div>
  );
}

export default VaccineStatus;
