const multer = require('multer');
const path = require('path');
const fs = require('fs');

// Ensure the uploads folder exists
const uploadsDir = path.join(__dirname, '/../../../uploads');
if (!fs.existsSync(uploadsDir)) {
  fs.mkdirSync(uploadsDir);
}

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadsDir); // Specify the uploads folder as the destination
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`); // Set the filename with a timestamp
  },
});

const fileFilter = (req, file, cb) => {
  // Define acceptable file types and MIME types
  const filetypes = /jpeg|jpg|png|pdf|xlsx?|xls/;
  const mimetypes = [
    'application/vnd.ms-excel', // for .xls files
    'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet', // for .xlsx files
  ];
  
  const mimetype = mimetypes.includes(file.mimetype);
  const extname = filetypes.test(path.extname(file.originalname).toLowerCase());

  if (mimetype || extname) {
    return cb(null, true);
  }
  cb(`Error: File upload only supports the following filetypes - ${filetypes}`);
};

const upload = multer({
  storage,
  limits: { fileSize: 5 * 1024 * 1024 }, // 5MB limit
  fileFilter,
});

module.exports = upload;
