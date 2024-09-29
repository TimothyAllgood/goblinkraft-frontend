/**
 * Converts a data grid to JSON format.
 * @param {Array} dataGrid - The data grid to convert.
 * @returns {string} The JSON string representation of the data grid.
 */
export const dataGridToJson = (dataGrid) => {
  if (!Array.isArray(dataGrid)) {
    throw new Error("Input must be an array");
  }

  const jsonArray = dataGrid.map((row) => {
    const jsonObject = {};
    for (const [key, value] of Object.entries(row)) {
      if (value !== undefined && value !== null) {
        jsonObject[key] = value;
      }
    }
    return jsonObject;
  });

  return JSON.stringify(jsonArray, null, 2);
};

/**
 * Parses a JSON string back into a data grid format.
 * @param {string} jsonString - The JSON string to parse.
 * @returns {Array} The parsed data grid.
 */
export const jsonToDataGrid = (jsonString) => {
  try {
    const parsedData = JSON.parse(jsonString);
    if (!Array.isArray(parsedData)) {
      throw new Error("Parsed JSON must be an array");
    }
    return parsedData;
  } catch (error) {
    console.error("Error parsing JSON:", error);
    return [];
  }
};

/**
 * Converts a data grid to a formatted CSV string.
 * @param {Array} dataGrid - The data grid to convert.
 * @returns {string} The CSV string representation of the data grid.
 */
export const dataGridToCsv = (dataGrid) => {
  if (!Array.isArray(dataGrid) || dataGrid.length === 0) {
    return "";
  }

  const headers = Object.keys(dataGrid[0]);
  const csvRows = [
    headers.join(","),
    ...dataGrid.map((row) =>
      headers.map((header) => JSON.stringify(row[header] ?? "")).join(",")
    ),
  ];

  return csvRows.join("\n");
};
