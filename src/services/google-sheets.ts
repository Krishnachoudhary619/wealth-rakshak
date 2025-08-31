import { GoogleSpreadsheet } from 'google-spreadsheet';
import { JWT } from 'google-auth-library';

// 1. Get the Sheet ID from your Google Sheet URL.
//    e.g., https://docs.google.com/spreadsheets/d/1zJoW8l0aVk6fvRAVE62jVmbINuIsGaGp-OP3NoKVW-E/edit
const GOOGLE_SHEET_ID = '1zJoW8l0aVk6fvRAVE62jVmbINuIsGaGp-OP3NoKVW-E';

// 2. Create a Google Service Account in the Google Cloud Console.
//    - Enable the Google Sheets API for your project.
//    - Create credentials for a new Service Account.
//    - Download the JSON key file.
//    - Share your Google Sheet with the service account's email address (e.g., 'your-service-account@your-project.iam.gserviceaccount.com').

// 3. Set the following environment variables in your deployment environment (e.g., Vercel).
//    - `GOOGLE_SERVICE_ACCOUNT_EMAIL`: The 'client_email' from your JSON key file.
//    - `GOOGLE_PRIVATE_KEY`: The 'private_key' from your JSON key file. Make sure to format it correctly, often by replacing '\\n' with actual newlines.
const serviceAccountAuth = new JWT({
    email: process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL,
    key: process.env.GOOGLE_PRIVATE_KEY?.replace(/\\n/g, '\n'),
    scopes: [
        'https://www.googleapis.com/auth/spreadsheets',
    ],
});

const doc = new GoogleSpreadsheet(GOOGLE_SHEET_ID, serviceAccountAuth);

type SheetRow = {
    Name: string;
    Email: string;
    Phone: string;
    [key: string]: string;
};

export async function addRowToSheet(rowData: Omit<SheetRow, 'Timestamp'>) {
    await doc.loadInfo(); 
    const sheet = doc.sheetsByIndex[0]; // or use doc.sheetsById[id] or doc.sheetsByTitle[title]
    
    const timestamp = new Date().toISOString();
    const completeRowData = { ...rowData, Timestamp: timestamp };

    await sheet.addRow(completeRowData);
}
