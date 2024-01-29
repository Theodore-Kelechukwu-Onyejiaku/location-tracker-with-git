import Cookies from 'js-cookie';
import axios from 'axios';
import { toast } from 'react-toastify';
import serverURL from './urls';

const getCsvData = async (dataType) => {
  // Get the authentication token from cookies
  const authToken = Cookies.get('authToken');
  
  // Check if the authentication token is missing; if so, display an error toast and return
  if (!authToken) {
    toast.error('Please login!');
    return;
  }

  try {
    // Make an asynchronous GET request to fetch CSV data based on the specified dataType
    const response = await axios.get(`${serverURL}/${dataType}/csv-data`, {
      headers: {
        Authorization: `Bearer ${authToken}`,
      },
      responseType: 'blob', // Set the response type to blob
    });

    // Check if the HTTP status code indicates success (between 200 and 299)
    if (response.status >= 200 && response.status < 300) {
      // Create a Blob from the response data with a type of 'text/csv'
      const blob = new Blob([response.data], { type: 'text/csv' });
      
      // Create a URL for the Blob and an anchor element (a) to trigger the download
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `${dataType}.csv`; // Set the download filename
      document.body.appendChild(a);
      
      // Simulate a click on the anchor element to trigger the download
      a.click();
      
      // Remove the anchor element from the document body
      document.body.removeChild(a);
      
      // Revoke the URL to free up system resources
      window.URL.revokeObjectURL(url);
    } else {
      // Display an error toast if the HTTP status code indicates an unexpected error
      toast.error('An unexpected error occurred');
    }
  } catch (error) {
    // Handle errors by displaying an error toast with the error message
    toast.error(error.message);
  }
};

export default getCsvData;