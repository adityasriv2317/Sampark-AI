import React, { useState } from "react";
import Papa from "papaparse";
import { UploadCloud } from "lucide-react"; // Import an icon for the button

// Helper function to extract the first name
const getFirstName = (fullName) => {
  if (!fullName || typeof fullName !== "string") {
    return ""; // Return empty string if name is invalid
  }
  return fullName.trim().split(" ")[0]; // Get the first part after trimming
};

const CSVParser = () => {
  const [parsedData, setParsedData] = useState([]);
  const [error, setError] = useState("");
  const [fileName, setFileName] = useState(""); // State to hold the selected file name

  const handleFileUpload = (event) => {
    const file = event.target.files[0];

    if (file) {
      setFileName(file.name); // Set the file name
      setError(""); // Clear previous errors
      setParsedData([]); // Clear previous data

      Papa.parse(file, {
        header: true,
        skipEmptyLines: true, // Skip empty lines
        complete: (results) => {
          // Validate if the CSV has required columns - Changed "FirstName" to "Name"
          const requiredColumns = [
            "Name", // Changed from FirstName
            "Email",
            "Organization",
            "Achievement",
            "Role",
          ];

          const headerRow = results.meta.fields;
          if (!headerRow) {
            setError(
              "Could not detect headers in the CSV file. Ensure the first row contains headers."
            );
            setParsedData([]);
            setFileName("");
            return;
          }

          const missingColumns = requiredColumns.filter(
            (col) => !headerRow.includes(col)
          );

          if (missingColumns.length > 0) {
            // Updated error message
            setError(
              `Missing required columns: ${missingColumns.join(
                ", "
              )}. Please ensure your CSV has 'Name', 'Email', 'Organization', 'Achievement', and 'Role' columns.`
            );
            setParsedData([]);
            setFileName(""); // Clear filename on error
          } else {
            // Filter out rows where all required fields might be empty
            const validData = results.data.filter((row) =>
              requiredColumns.some((col) => row[col] && row[col].trim() !== "")
            );
            if (validData.length === 0 && results.data.length > 0) {
              setError(
                "CSV parsed, but no valid data rows found (rows might be empty or lack required fields)."
              );
              setParsedData([]);
            } else {
              setParsedData(validData);
              setError("");
            }
          }
        },
        error: (error) => {
          setError("Error parsing CSV file: " + error.message);
          setParsedData([]);
          setFileName(""); // Clear filename on error
        },
      });
    } else {
      setFileName(""); // Clear filename if no file is selected
      setParsedData([]);
      setError("");
    }
  };

  return (
    // Main container with padding and margin
    <div id="csv-parser" className="csv-parser container mx-auto px-4 py-8">
      <h2 className="text-2xl font-semibold text-center text-gray-800 mb-6">
        Upload Your Recipient List
      </h2>

      {/* File Input Section */}
      <div className="mb-6 p-6 border border-dashed border-indigo-300 rounded-lg bg-indigo-50 text-center">
        <label
          htmlFor="csv-upload"
          className="cursor-pointer inline-flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-colors duration-200"
        >
          <UploadCloud size={20} className="mr-2" />
          Choose CSV File
        </label>
        <input
          id="csv-upload"
          type="file"
          accept=".csv"
          onChange={handleFileUpload}
          className="hidden" // Hide the default input
        />
        {fileName && (
          <p className="mt-3 text-sm text-gray-600">
            Selected file: <span className="font-medium">{fileName}</span>
          </p>
        )}
        {/* Updated helper text */}
        <p className="mt-2 text-xs text-gray-500">
          Required columns: Name, Email, Organization, Achievement, Role
        </p>
      </div>

      {/* Error Message Display */}
      {error && (
        <div
          className="mb-6 p-4 bg-red-100 border border-red-400 text-red-700 rounded-md"
          role="alert"
        >
          <p className="font-bold">Error</p>
          <p>{error}</p>
        </div>
      )}

      {/* Data Table Display */}
      {parsedData.length > 0 && (
        <div className="overflow-x-auto border border-indigo-600 shadow-md shadow-indigo-200 rounded-lg">
          {" "}
          {/* Added shadow and rounded corners */}
          <h3 className="text-xl font-semibold text-gray-700 mb-4 px-4 pt-4">
            Preview Data ({parsedData.length} rows)
          </h3>
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-indigo-500 text-white">
              {" "}
              {/* Styled table header */}
              <tr>
                {/* Updated headers */}
                {["Name", "Email", "Organization", "Achievement", "Role"].map(
                  (header) => (
                    <th
                      key={header}
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider"
                    >
                      {/* Display "First Name" for the "Name" column header */}
                      {header === "Name"
                        ? "First Name"
                        : header.replace(/([A-Z])/g, " $1").trim()}
                    </th>
                  )
                )}
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {parsedData.map((row, index) => (
                <tr
                  key={index}
                  className="hover:bg-gray-50 transition-colors duration-150"
                >
                  {" "}
                  {/* Hover effect */}
                  {/* Extract and display First Name from Name column */}
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                    {getFirstName(row.Name)}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                    {row.Email}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                    {row.Organization}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                    {row.Achievement}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                    {row.Role}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default CSVParser;
