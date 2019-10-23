const mysql = require('mysql');
const { database } = require('./keys');

// const pool = mysql.createPool(database);

var mysqlConection = mysql.createConnection(database);


mysqlConection.connect ((err) => {
  if(!err)
      {
          console.log("connected");
          var createDatabase = "DROP DATABASE IF EXISTS dbpedidos;";
          createDatabase = createDatabase + "CREATE DATABASE IF NOT EXISTS dbpedidos;";          

          mysqlConection.query(createDatabase, (err) => {
              if(err)
              {
                  console.log("No se pudo crear la base de datos " + err.message);
              }
              else
              {
                  console.log("Base de datos creada exitosamente");
              }
          });
          mysqlConection.query("use dbpedidos");
          
          var query = "CREATE TABLE if not exists estado_pedido (id INT(11) NOT NULL, nombre VARCHAR(150) NOT NULL, descripcion VARCHAR(150));";    
          query = query + "ALTER TABLE estado_pedido ADD PRIMARY KEY (id);";
          query = query + "INSERT INTO estado_pedido VALUES (1, 'En curso', 'Este estado de codigo 1, es para los pedidos en curso');";
          query = query + "CREATE TABLE pedido ( id INT(11) NOT NULL, id_cliente INT(11) NOT NULL, id_estado INT(11) NOT NULL, observaciones VARCHAR(4000), fecha_inicio timestamp NOT NULL DEFAULT current_timestamp, fecha_fin timestamp NOT NULL DEFAULT current_timestamp, CONSTRAINT fk_estado FOREIGN KEY(id_estado) REFERENCES estado_pedido(id));";
          query = query + "ALTER TABLE pedido ADD PRIMARY KEY (id);";
          query = query + "INSERT INTO pedido VALUES (1, 12, 1, 'Es el pedido para el cliente 12, y esta en estado en curso (1)', null, null);";
          query = query + "INSERT INTO pedido VALUES (2, 5, 1, 'Es el pedido para el cliente 15, y esta en estado en curso (1)', null, null);";

          mysqlConection.query(query, function (err,result){
              if(err)
                  {
                      console.log("Algo fallo al inicializar " + err.message);
                  }
              else
                  {
                      console.log ("Base de datos inicializada correctamente");
                      console.log ("Todo listo... \n");
                  }    
          });
          
      }
  else
      {
          console.log("Connection failed " + err.message);
      }

});

module.exports = mysqlConection;


