/* File: csaladfa
* Author: Tiliczki Tibor
* Copyright: 2024, Tiliczki Tibor
* Group: Szoft II/I/E
* Date: 2024-01-16
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

-- Létrehozza az adatbázist
CREATE DATABASE IF NOT EXISTS csaladfa;

-- Kapcsolódás az adatbázishoz
ATTACH DATABASE 'csaladfa.db' AS csaladfa;

-- Létrehozza a csalad táblát
CREATE TABLE IF NOT EXISTS csalad (
    id INTEGER PRIMARY KEY,
    nev TEXT,
    szuletesi_datum TEXT,
    szuletesi_hely TEXT,
    anya_neve TEXT,
    apa_neve TEXT,
    halal_datum TEXT,
    halal_hely TEXT
);