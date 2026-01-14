import { BACKEND_URL } from '../../config/constants';
import { downloadAsCSV } from '../../utils/exportUtils';

function SolarReport() {
    const handleExport = async () => {
        const response = await fetch(`${BACKEND_URL}/api/solar/data`);
        const data = await response.json();
        downloadAsCSV(data, "solar-report.csv");
    };

    return <button onClick={handleExport}>Export Solar Data</button>;
}