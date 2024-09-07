var express = require('express');
var cors = require('cors');
var multer  = require('multer');
require('dotenv').config();

var app = express();

// Configure multer for file uploads
var upload = multer({ 
  limits: { fileSize: 10 * 1024 * 1024 } // 10MB file size limit
});

app.use(cors());
app.use('/public', express.static(process.cwd() + '/public'));

app.get('/', function (req, res) {
  res.sendFile(process.cwd() + '/views/index.html');
});

// Route to handle file uploads
app.post('/api/fileanalyse', upload.single('upfile'), function (req, res) {
  if (!req.file) {
    return res.status(400).json({ error: 'No file uploaded' });
  }
  res.json({
    name: req.file.originalname,
    type: req.file.mimetype,
    size: req.file.size
  });
});

const port = process.env.PORT || 3000;
app.listen(port, function () {
  console.log('Your app is listening on port ' + port);
});
