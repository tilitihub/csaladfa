
/* File: csaladfa
* Author: Tiliczki Tibor
* Copyright: 2024, Tiliczki Tibor
* Group: Szoft II/I/E
* Date: 2024-01-15
* Github: https://github.com/tilitihub
* Licenc: GNU GPL
*
* This program is free software; you can redistribute it and/or
* modify it under the terms of the GNU General Public License
* as published by the Free Software Foundation; either version 2
* of the License, or (at your option) any later version.
*
* This program is distributed in the hope that it will be useful,
* but WITHOUT ANY WARRANTY; without even the implied warranty of
* MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the
* GNU General Public License for more details:
* http://www.gnu.org/licenses/gpl.html
*/

const express = require('express');
const sqlite3 = require('sqlite3').verbose();
const path = require('path');
const bodyParser = require('body-parser');

const app = express();
const port = 3000;

// Adatbázis inicializálása
const dbPath = path.resolve(__dirname, 'csaladfa.db');
const db = new sqlite3.Database(dbPath, (err) => {
    if (err) {
        return console.error(err.message);
    }
    console.log('Connected to the SQlite database.');
 });

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
app.listen(port.toString(), () => {
    console.log(`A szerver fut a http://localhost:${port} címen.`);
});

// Adatbázis lezárása
process.on('exit', () => {
    db.close((err) => {
        if (err) {
            return console.error(err.message);
        }
        console.log('Adatbázis lezárása.');
    });
 });