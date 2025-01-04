import SettelmentData from "../model/settelmen.model.js";
import multer from "multer";
import { google } from "googleapis";
import { Readable } from "stream";
// Authenticate with Google APIsfrontend
const authenticateGoogle = async () => {
  try {
    return new google.auth.GoogleAuth({
      keyFile: './Api/settelment-webpage-new-cfbfa73b628f.json',
      scopes: [
        "https://www.googleapis.com/auth/spreadsheets",
        "https://www.googleapis.com/auth/drive",
      ],
    });   
  } catch (error) {
    console.error('Error authenticating with Google:', error);
    throw new Error('Google authentication failed');
  }
};

// Helper function to convert a buffer to a stream
const bufferToStream = (buffer) => {
  const stream = new Readable();
  stream.push(buffer);
  stream.push(null);
  return stream;
};

// Multer configuration for handling file uploads
const storage = multer.memoryStorage();
const upload = multer({ storage });
const handleFileUpload = upload.array('files');  

// Check if folder exists and create it if not
const getOrCreateSubFolder = async (auth, folderName, parentFolderId) => {
  const drive = google.drive({ version: 'v3', auth });

  // Search for an existing folder with the given name in the parent folder
  const res = await drive.files.list({
    q: `'${parentFolderId}' in parents and name = '${folderName}' and mimeType = 'application/vnd.google-apps.folder'`,
    fields: 'files(id, name)',
  });

  // If the folder exists, return its ID
  if (res.data.files.length > 0) {
    return res.data.files[0].id;
  }

  // If the folder doesn't exist, create it
  const folderMetadata = {
    name: folderName,
    mimeType: 'application/vnd.google-apps.folder',
    parents: [parentFolderId],
  };

  const folder = await drive.files.create({
    resource: folderMetadata,
    fields: 'id',
  });

  return folder.data.id;
};

// Upload multiple files to Google Drive in parallel
// Upload files with folder structure: project > person name
const uploadFilesToDriveWithStructure = async (auth, files, projectName, personName, parentFolderId) => {
  const drive = google.drive({ version: 'v3', auth });

  // Get or create the project folder
  const projectFolderId = await getOrCreateSubFolder(auth, projectName, parentFolderId);

  // Get or create the person's folder within the project folder
  const personFolderId = await getOrCreateSubFolder(auth, personName, projectFolderId);

  // Upload files to the person's folder
  const uploadPromises = files.map(file => {
    const fileMetadata = {
      name: file.originalname,
      parents: [personFolderId],
    };
    const media = {
      mimeType: file.mimetype,
      body: bufferToStream(file.buffer),
    };

    return drive.files.create({
      resource: fileMetadata,
      media,
      fields: 'id',
    });
  });

  const uploadedFiles = await Promise.all(uploadPromises);
  return uploadedFiles.map(res => res.data.id); // Return file IDs
};

// Append data to Google Sheets
const appendToGoogleSheet = async (data) => {
  const auth = await authenticateGoogle();
  const sheets = google.sheets({ version: "v4", auth });

  const spreadsheetId = "1r0hlNxm7PxDDIIkvXchBsY9q6gcd0yhLpImWJ8hWHsU";
  const range = "Sheet1!A2"; // Append data below the header row

  const values = [[
    new Date().toISOString(),
    data.email,
    data.name,
    data.advSetlDate,
    data.area,
    data.placeProg,
    data.project,
    data.prjCode,
    data.coversheet,
    data.dateProg,
    data.progTitle,
    data.summary,
    data.food,
    data.travel,
    data.stationery,
    data.printing,
    data.accom,
    data.communication,
    data.resource,
    data.other,
    data.total,
    data.inword,
    data.vendor,
    data.individual,
    data.totalAdvTake,
    data.receivable,
  ]];

  await sheets.spreadsheets.values.append({
    spreadsheetId,
    range,
    valueInputOption: "USER_ENTERED",
    resource: { values },
  });
};


export const addSettelment = async (req, res) => {
  handleFileUpload(req, res, async (err) => {
    if (err) {
      return res.status(500).json({ message: "Error uploading file", error: err.message });
    }

    try {
      const {
        email, name, advSetlDate, area, placeProg, project, prjCode,
        coversheet, dateProg, progTitle, summary, food, travel,
        stationery, printing, accom, communication, resource, other, total,
        inword, vendor, individual, totalAdvTake, receivable
      } = req.body;

      // Save settlement data to the database
      const newSettlement = new SettelmentData({
        email, name, advSetlDate, area, placeProg, project, prjCode, coversheet,
        dateProg, progTitle, summary, food, travel, stationery, printing, accom,
        communication, resource, other, total, inword, vendor, individual, totalAdvTake,
        receivable, files: []  // Placeholder for file IDs
      });

      const savedSettlement = await newSettlement.save();


      // Process files and sheets update in the background
      const auth = await authenticateGoogle();
      const parentFolderId = "1qvtYTfZ_Etl5lvyuZMk_uRaJ4TBIHkha";

       // Upload files to Google Drive
       const uploadedFileIds = await uploadFilesToDriveWithStructure(auth, req.files, project, name, parentFolderId);
       savedSettlement.files = uploadedFileIds; // Save file IDs to the database
       await savedSettlement.save();

      // Google Sheets update
      await appendToGoogleSheet(savedSettlement);

      // Send a single response after everything is completed
      return res.status(201).json({
        message: "Settlement data saved,tasks processed.",
        data: savedSettlement
      });

    } catch (error) {
      console.error("Error processing settlement data:", error);
      return res.status(500).json({ message: "Error processing settlement data", error: error.message });
    }
  });
};
