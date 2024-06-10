// server.js
const express = require('express');
const mysql = require('mysql2');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const port = 3001;

app.use(cors());
app.use(bodyParser.json());

const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'password', // Remplacez par votre mot de passe
    database: 'forward'
});

db.connect(err => {
    if (err) {
        console.error('error connecting: ' + err.stack);
        return;
    }
    console.log('connected as id ' + db.threadId);
});

app.get('/projects', (req, res) => {
    db.query('SELECT * FROM projet', (err, results) => {
        if (err) throw err;
        res.send(results);
    });
});

app.post('/projects', (req, res) => {
    const project = req.body;
    db.query('INSERT INTO projet SET ?', project, (err, result) => {
        if (err) throw err;
        res.send(result);
    });
});

app.delete('/projects/:id', (req, res) => {
    const { id } = req.params;
    db.query('DELETE FROM projet WHERE id_projet = ?', id, (err, result) => {
        if (err) throw err;
        res.send(result);
    });
});

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
