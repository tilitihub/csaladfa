const express = require('express');
const sqlite3 = require('sqlite3');
const path = require('path');
const bodyParser = require('body-parser');

const app = express();
const port = 3000;

// Adatbázis inicializálása
const dbPath = path.resolve(__dirname, 'csaladfa.db');
const db = new sqlite3.Database(dbPath);

// Middleware konfiguráció
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// 1. Adatbevitel
app.post('/adatbevitel', (req, res) => {
    const { nev, szuletesi_datum, szuletesi_hely, anya_neve, apa_neve, halal_datum, halal_hely } = req.body;

    db.run(
        'INSERT INTO csalad (nev, szuletesi_datum, szuletesi_hely, anya_neve, apa_neve, halal_datum, halal_hely) VALUES (?, ?, ?, ?, ?, ?, ?)',
        [nev, szuletesi_datum, szuletesi_hely, anya_neve, apa_neve, halal_datum, halal_hely],
        (err) => {
            if (err) {
                console.error(err);
                res.status(500).send('Hiba történt az adatok mentése közben.');
            } else {
                res.redirect('/');
            }
        }
    );
});

// 2. Tárolt, de hibás adatok módosítása
app.post('/adatmodositas', (req, res) => {
    const { nev, uj_szuletesi_datum, uj_szuletesi_hely } = req.body;

    db.run(
        'UPDATE csalad SET szuletesi_datum = ?, szuletesi_hely = ? WHERE nev = ?',
        [uj_szuletesi_datum, uj_szuletesi_hely, nev],
        (err) => {
            if (err) {
                console.error(err);
                res.status(500).send('Hiba történt az adatok módosítása közben.');
            } else {
                res.redirect('/');
            }
        }
    );
});

// 3. Adatvizualizáció
app.get('/adatok/:nev', (req, res) => {
    const nev = req.params.nev;

    db.get('SELECT * FROM csalad WHERE nev = ?', [nev], (err, row) => {
        if (err) {
            console.error(err);
            res.status(500).send('Hiba történt az adatok lekérdezése közben.');
        } else {
            if (row) {
                res.json(row);
            } else {
                res.status(404).send('Nem található ilyen nevű személy.');
            }
        }
    });
});

// Főoldal - Adatvizualizáció
app.get('/', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'index.html'));
});

// Indítás
app.listen(port, () => {
    console.log(`A szerver fut a http://localhost:${port} címen.`);
});
