const parseCSV = (csvText) => {
  const rows = csvText.split(/\r?\n/).filter(row => row.trim() !== ''); // delete row
  let headers = rows[0].split(',').map(header => header.trim());

  // timestamp condition that we not using
  if (headers[0].toLowerCase().includes('timestamp')) {
    headers = headers.slice(1); // skip first column
  }

  const data = [];
  for (let i = 1; i < rows.length; i++) {
    const rowData = rows[i].split(',').map(cell => cell.trim());

    // ถ้าข้อมูลมีคอลัมน์แรกเป็นวันที่หรือเวลา
    if (rowData[0].match(/^\d{2}\/\d{2}\/\d{4}/)) {
      rowData.shift(); // delete first column bc it input multiple data that insert other column and error
    }

    if (rowData.length !== headers.length) {
      console.warn(`Row ${i} has an incorrect number of columns. Skipping this row.`);
      continue; // Skipping this row when it incorrect with label
    }

    const rowObject = {};
    for (let j = 0; j < headers.length; j++) {
      rowObject[headers[j]] = rowData[j];
    }
    data.push(rowObject);
  }

  console.log("Parsed Data:", data); // check data input on consol at google dev or F12
  return data;
};
