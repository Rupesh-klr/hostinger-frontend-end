// src/utils/exportUtils.js
import * as XLSX from 'xlsx';
import { BACKEND_URL } from '../config/constants';

/**
 * Converts JSON data to CSV and triggers download
 */
export const downloadAsCSV = (data, fileName = "export.csv") => {
    const csvContent = "data:text/csv;charset=utf-8," 
        + data.map(row => Object.values(row).join(",")).join("\n");
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", fileName);
    document.body.appendChild(link);
    link.click();
};

/**
 * Converts JSON data to Excel using the XLSX library
 */
export const downloadAsExcel = (data, fileName = "export.xlsx") => {
    const worksheet = XLSX.utils.json_to_sheet(data);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Sheet1");
    XLSX.writeFile(workbook, fileName);
};


/**
 * Common bridge for all API calls
 * @param {string} endpoint - The path (e.g., '/api/solar/data')
 * @param {string} method - 'GET', 'POST', 'PUT', 'DELETE'
 * @param {object} body - Data for POST/PUT requests
 */
export const apiRequest = async (endpoint, method = 'GET', body = null) => {
    const url = `${BACKEND_URL}${endpoint}`;
    
    const options = {
        method,
        headers: {
            'Content-Type': 'application/json',
            // Add Authorization headers here if needed
        },
    };

    if (body) {
        options.body = JSON.stringify(body); // Automatically stringify body for POST
    }

    try {
        const response = await fetch(url, options);

        // Standard error handling bridge
        if (!response.ok) {
            const errorData = await response.json().catch(() => ({}));
            throw new Error(errorData.message || `HTTP Error: ${response.status}`);
        }

        return await response.json(); // Automatically parse response JSON
    } catch (error) {
        console.error(`[API BRIDGE ERROR] ${method} ${endpoint}:`, error.message);
        throw error; // Re-throw so components can handle it
    }
};