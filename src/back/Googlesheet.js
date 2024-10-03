import React, { useEffect, useState } from 'react';
import axios from 'axios';

export default function VaccineStatus() {
  const [csvData, setCsvData] = useState([]); // State to store the CSV data
  const [personalId, setPersonalId] = useState(''); // State to store Personal ID input
  const [errorMessage, setErrorMessage] = useState(''); // State for error message
  const [successMessage, setSuccessMessage] = useState(''); // State for success message

  useEffect(() => {
    fetchCSVData(); // Fetch the CSV data when the component mounts
  }, []);

  // Function to fetch CSV data from Google Sheets
  const fetchCSVData = () => {
    const csvUrl = 'https://docs.google.com/spreadsheets/d/e/2PACX-1vT9Okc9J17JI00MNQhrIrvWV2wIJ5p4uqwRanr-3vNBQuPj2EZ91TuX1mzO0EhiTuoSRX7gAvIaE0fx/pub?output=csv'; // Google Sheets URL

    axios.get(csvUrl)
      .then((response) => {
        const parsedCsvData = parseCSV(response.data); // Parse CSV
        setCsvData(parsedCsvData); // Set parsed CSV data
        console.log(parsedCsvData); // Debug: Log CSV data
      })
      .catch((error) => {
        console.error('Error fetching CSV data:', error); // Error handling
      });
  };

  // Function to parse CSV into an array of objects
  const parseCSV = (csvText) => {
    const rows = csvText.split(/\r?\n/); // Split CSV text into rows
    const headers = rows[0].split(','); // Extract headers
    const data = [];

    for (let i = 1; i < rows.length; i++) {
      const rowData = rows[i].split(',');
      const rowObject = {};

      for (let j = 0; j < headers.length; j++) {
        rowObject[headers[j]] = rowData[j]; // Map headers to row values
      }
      data.push(rowObject);
    }

    return data;
  };

  // Function to handle form submission
  const handleSubmit = (event) => {
    event.preventDefault();
    const user = csvData.find((row) => row['Personal ID'] === personalId); // Check if Personal ID exists in CSV

    if (user) {
      setSuccessMessage('Personal ID is valid and eligible.');
      setErrorMessage('');
    } else {
      setErrorMessage('Personal ID not found or not eligible.');
      setSuccessMessage('');
    }
  };

  return (
    <div>
      <h3>ตรวจสอบสิทธิ</h3>
      <form onSubmit={handleSubmit}>
        <label htmlFor="personalid">Personal ID:</label>
        <input
          type="text"
          id="personalid"
          value={personalId}
          onChange={(e) => setPersonalId(e.target.value)} // Update Personal ID input
        />
        <button type="submit">ยืนยัน</button>
      </form>
      {errorMessage && <div style={{ color: 'red' }}>{errorMessage}</div>}
      {successMessage && <div style={{ color: 'green' }}>{successMessage}</div>}
    </div>
  );
}
