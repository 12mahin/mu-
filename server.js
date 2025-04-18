const express = require('express');
const multer = require('multer');
const fs = require('fs');
const path = require('path');

const app = express();
const upload = multer({ dest: 'uploads/' });

app.use('/uploads', express.static('uploads'));

app.get('/', (req, res) => {
    const files = fs.existsSync('uploads') ? fs.readdirSync('uploads') : [];
    const fileList = files.map(file => {
        return `<li><a href="/uploads/${file}" download>${file}</a></li>`;
    }).join('');

    const html = `
    <!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <title>File Sharing Server</title>
        <style>
            body {
                font-family: 'Segoe UI', sans-serif;
                background-color: #f9f9f9;
                margin: 0;
                padding: 40px;
                display: flex;
                flex-direction: column;
                align-items: center;
            }
            h2 {
                color: #333;
                margin-bottom: 10px;
            }
            form {
                margin-bottom: 30px;
                padding: 20px;
                background: white;
                border-radius: 12px;
                box-shadow: 0 0 10px rgba(0,0,0,0.1);
            }
            input[type="file"] {
                margin-right: 10px;
            }
            input[type="submit"] {
                padding: 6px 14px;
                background-color: #4CAF50;
                color: white;
                border: none;
                border-radius: 6px;
                cursor: pointer;
            }
            input[type="submit"]:hover {
                background-color: #45a049;
            }
            ul {
                list-style: none;
                padding: 0;
                max-width: 500px;
                width: 100%;
            }
            li {
                margin-bottom: 8px;
            }
            a {
                text-decoration: none;
                color: #007BFF;
                font-weight: 500;
            }
            a:hover {
                text-decoration: underline;
            }
        </style>
    </head>
    <body>
        <h2>Upload a File</h2>
        <form action="/" method="post" enctype="multipart/form-data">
            <input type="file" name="file" required>
            <input type="submit" value="Upload">
        </form>
        <h3>Available Files:</h3>
        <ul>${fileList}</ul>
    </body>
    </html>
    `;
    
    res.send(html);
});

app.post('/', upload.single('file'), (req, res) => {
    res.redirect('/');
});

const PORT = 3000;
app.listen(PORT, () => {
    console.log(`🚀 File Sharing Server running at http://localhost:${PORT}`);
});
