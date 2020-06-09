'use strict';

// Express
const express = require('express');
// Cors
const cors = require('cors');
// BodyParser
const bodyParser = require('body-parser');
// Base de Datos
const mysql = require('mysql');
const app = express();
//////////////// APP //////////////////////
app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

//Datos de Conexion

const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '123456',
  database: 'notas_db'
});

// Conexion de base de Datos
connection.connect(error => {
  if (error) throw error;
  console.log(`✔️ 🚀 >>>> DataBase working 100% <<<< 🚀 ✔️`);
});

// Config Puerto y launch del server
const PORT = 3000;
app.listen(PORT, () =>
  console.log(`✔️ 🚀 >>>> API working on PORT ${PORT}  <<<< 🚀 ✔️`)
);

// GET de Prueba

app.get('/', (request, resolve) => {
  resolve.send('Te doy la bienvenida API');
});
//////////////////// Definiendo Rutas ////////////////////////
////////////////////////////////////////////////////////////////////////////// Recogiendo Datos(NOTAS)
app.get('/notas/', (request, resolve) => {
  // Secuencia SQL
  const sql = 'SELECT * FROM lista_notas';
  // Conexion yy ejecucion de MYSQL
  connection.query(sql, (error, results) => {
    // Si hay error que lo tire
    if (error) throw error;
    // Comprobar que la respuesta no viene vacia
    if (results.length > 0) {
      resolve.json(results);
    }
    // Si esta vacia ...
    else {
      resolve.send('Lista de notas no encontrada');
    }
  });
});
/////////////////////////////////////////////////////////////////////////////// Actualizando NOTAS
app.put('/notas/update/id:/', (request, resolve) => {
  // Texto que llega del body
  const texto = request.body.texto;
  // ID que llega del body
  const id = request.body.id;
  const sql = `UPDATE lista_notas SET texto= '${texto}' WHERE id=${id}`;
  connection.query(sql, newNote, error => {
    if (error) throw error;

    resolve.send('Mi nota no ha sido Actualizada');
  });
});
/////////////////////////////////////////////////////////////////////////////// Borrando una NOTA
app.delete('/notas/delete/id:', (request, resolve) => {
  resolve.send('Mi nota x ha sido borrada');
});

///////////////////////////////////////////////////////////////////////////////  Añadiendo NOTA
app.post('/notas/add/', (request, resolve) => {
  // Secuencia MYSQL
  const sql = `INSERT INTO lista_notas SET ?`;
  // Objeto que recibe de database
  const newNote = {
    texto: request.body.texto
  };
  // Conexion y ejecucion de MYSQL
  connection.query(sql, newNote, error => {
    if (error) throw error;
    resolve.send('Nota ha sido creada');
  });
});
