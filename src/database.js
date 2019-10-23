const mysql = require('mysql');
const { database } = require('./keys');

// const pool = mysql.createPool(database);

var mysqlConection = mysql.createConnection(database);


mysqlConection.connect ((err) => {
  if(!err)
      {
          console.log("connected");
          var createDatabase = "DROP DATABASE IF EXISTS dbpedidos;";
          createDatabase = createDatabase + "CREATE DATABASE dbpedidos;";          

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
          
          // Setting up estado_pedido table
          var query = "CREATE TABLE estado_pedido (id INT(11) NOT NULL, nombre VARCHAR(150) NOT NULL, descripcion VARCHAR(150));";    
          query = query + "ALTER TABLE estado_pedido ADD PRIMARY KEY (id);";

          // Seeds for estado_pedido table
          query = query + "INSERT INTO estado_pedido VALUES (1, 'Creado', 'El pedido esta en estado creado cuando el usuario esta agregando productos pero no ha solicitado el envio del pedido');";
          query = query + "INSERT INTO estado_pedido VALUES (2, 'En curso', 'El pedido esta en estado en curso cuando el domiciliario ya esta llevando el pedido al cliente');";
          query = query + "INSERT INTO estado_pedido VALUES (3, 'Finalizado', 'El pedido esta en estado finalizado cuando el cliente ya ha recibido el pedido');";

          // Setting up pedido table
          query = query + "CREATE TABLE pedido ( id INT(11) NOT NULL, id_cliente INT(11) NOT NULL, id_establecimiento INT(11) NOT NULL, id_estado INT(11) NOT NULL, observaciones VARCHAR(4000), destino VARCHAR(4000), fecha_inicio timestamp NOT NULL DEFAULT current_timestamp, fecha_fin timestamp NOT NULL DEFAULT current_timestamp, CONSTRAINT fk_estado FOREIGN KEY(id_estado) REFERENCES estado_pedido(id));";
          query = query + "ALTER TABLE pedido ADD PRIMARY KEY (id);";

          // Seeds for pedido table
          query = query + "INSERT INTO pedido VALUES (1, 12, 101, 1, 'Es el pedido del establecimiento 101 para el cliente 12, y esta en estado creado', 'Universidad Nacional entrada 45', null, null);";
          query = query + "INSERT INTO pedido VALUES (2, 13, 102, 2, 'Es el pedido del establecimiento 102 para el cliente 13, y esta en estado en curso', 'Calle 40 #88-99', null, null);";

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


