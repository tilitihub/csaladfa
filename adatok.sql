
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

-- Beszúrja az adatokat a csalad táblába
INSERT INTO csalad (nev, szuletesi_datum, szuletesi_hely, anya_neve, apa_neve, halal_datum, halal_hely)
VALUES
    ('Nagy József', '1950-02-10', 'Szeged', 'Szűcs Kamilla', 'Nagy Elemér', '2010-07-20', 'Budapest'),
    ('Kiss Mária', '1952-06-15', 'Debrecen', 'Csőke Katalin', 'Kiss Mátyás', NULL, NULL),
    ('Nagy Katalin', '1975-12-05', 'Budapest', 'Kiss Mária', 'Nagy József', '2022-03-10', 'Szeged'),
    ('Tóth Éva', '1955-09-20', 'Debrecen', 'Kovács Éva Erzsébet', 'Tóth Árpád Géza', NULL, NULL),
    ('Kovács Péter', '1980-08-20', 'Debrecen', 'Tóth Éva', 'Kovács Géza', NULL, NULL),
    ('Kovács Patrik', '2005-04-15', 'Szeged', 'Nagy Katalin', 'Kovács Péter', NULL, NULL),
    ('Kovács Anna', '2008-10-02', 'Debrecen', 'Nagy Katalin', 'Kovács Péter', NULL, NULL);
