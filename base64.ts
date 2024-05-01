import express, { Request, Response } from 'express';
import multer from 'multer';
import { v4 as uuidv4 } from 'uuid';
import path from 'path';
import { sequelize } from './sequelize'; // Import your Sequelize instance
import { Image } from './models/Image'; // Import your Sequelize Image model
import { Document } from './models/Document'; // Import your Sequelize Document model

const app = express();

// Multer configuration for images
const imageStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/images/'); // Specify the directory where image files will be stored
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = uuidv4(); // Generate a unique filename
    cb(null, uniqueSuffix + path.extname(file.originalname)); // Append unique suffix to the original filename
  }
});

const imageUpload = multer({ storage: imageStorage });

// Multer configuration for PDF documents
const documentStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/documents/'); // Specify the directory where PDF files will be stored
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = uuidv4(); // Generate a unique filename
    cb(null, uniqueSuffix + path.extname(file.originalname)); // Append unique suffix to the original filename
  }
});

const documentUpload = multer({ storage: documentStorage });

// Upload image endpoint using Multer
app.post('/upload/image', imageUpload.single('image'), async (req: Request, res: Response) => {
  try {
    // Create a new record in the database for the uploaded image
    const imageUrl = req.file.path; // File path where the image is stored
    const image = await Image.create({ url: imageUrl });

    return res.status(201).json({ image });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Server error' });
  }
});

// Upload document endpoint using Multer
app.post('/upload/document', documentUpload.single('document'), async (req: Request, res: Response) => {
  try {
    // Create a new record in the database for the uploaded document
    const documentUrl = req.file.path; // File path where the document is stored
    const document = await Document.create({ url: documentUrl });

    return res.status(201).json({ document });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Server error' });
  }
});

// Start the Express server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});


// Open Postman and create a new request.
// Set the request method to POST.
// Enter the URL for your upload endpoint (/upload/image for images and /upload/document for documents).
// Go to the "Body" tab.
// Select "form-data" as the body type.
// Add a key-value pair for the file upload:
// For images, set the key to "image" and select the image file you want to upload.
// For documents, set the key to "document" and select the PDF document you want to upload.
// Click on the "Send" button to make the request.
