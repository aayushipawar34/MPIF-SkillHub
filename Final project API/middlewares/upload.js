import multer from 'multer';
import path from 'path';

// Storage config
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/');
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    const ext = path.extname(file.originalname);
    cb(null, file.fieldname + '-' + uniqueSuffix + ext);
  }
});

// File type filter based on field name
const fileFilter = (req, file, cb) => {
  const imageFields = ['photo', 'aadhar','profilePicture'];
  const docFields = ['marksheet_10', 'marksheet_12', 'last_year', 'income_certificate'];

  const ext = path.extname(file.originalname).toLowerCase();
  const mime = file.mimetype;

  if (imageFields.includes(file.fieldname)) {
    if (mime === 'image/jpeg' || mime === 'image/png' || mime === 'image/jpg') {
      cb(null, true);
    } else {
      cb(new Error(`${file.fieldname} must be an image (jpg, jpeg, png)`));
    }
  } else if (docFields.includes(file.fieldname)) {
    if (mime === 'application/pdf') {
      cb(null, true);
    } else {
      cb(new Error(`${file.fieldname} must be a PDF file`));
    }
  } else {
    cb(new Error('Unknown file field!'));
  }
};

const upload = multer({ storage, fileFilter });

export default upload;
