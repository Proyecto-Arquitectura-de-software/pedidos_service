const mysql = require('mysql');
const { database } = require('./keys');

// const pool = mysql.createPool(database);

var mysqlConection = mysql.createConnection(database);


mysqlConection.connect ((err) => {
  if(!err)
      {
          console.log("connected");
          var createDatabase = "DROP DATABASE IF EXISTS dbpedidos;";
          createDatabase += "CREATE DATABASE dbpedidos;";          

          // Nuevo
          //createDatabase += "ALTER USER 'root'@'localhost' IDENTIFIED WITH mysql_native_password BY 'password';";
          //createDatabase += "FLUSH PRIVILEGES;";   

          // Nuevo

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
          query += "ALTER TABLE estado_pedido ADD PRIMARY KEY (id);";

          // Seeds for estado_pedido table
          query += "INSERT INTO estado_pedido VALUES (1, 'Creado', 'El pedido esta en estado creado cuando el usuario esta agregando productos pero no ha solicitado el envio del pedido');";
          query += "INSERT INTO estado_pedido VALUES (2, 'En curso', 'El pedido esta en estado en curso cuando el domiciliario ya esta llevando el pedido al cliente');";
          query += "INSERT INTO estado_pedido VALUES (3, 'Finalizado', 'El pedido esta en estado finalizado cuando el cliente ya ha recibido el pedido');";

          // Setting up pedido table
          query += "CREATE TABLE pedido ( id INT(11) NOT NULL AUTO_INCREMENT, id_cliente VARCHAR(400) NOT NULL, id_establecimiento VARCHAR(400) NOT NULL, id_estado INT(11) NOT NULL, observaciones VARCHAR(4000), destino VARCHAR(400), metodo_pago VARCHAR(400), fecha_inicio timestamp DEFAULT current_timestamp, fecha_fin timestamp DEFAULT current_timestamp, PRIMARY KEY (id), CONSTRAINT fk_estado FOREIGN KEY(id_estado) REFERENCES estado_pedido(id));";          

          // Seeds for pedido table
          query += "INSERT INTO pedido VALUES (null, '5dc22701c7900c00135e604c', '5dc22802c7900c00135e604d', 1, 'Pedido en creacion para el cliente con nombre Test name 1 y establecimiento test restaurant 1', 'Universidad Nacional entrada 45', 'Debito', now(), now());";
          query += "INSERT INTO pedido VALUES (null, '5dc229d7c7900c00135e604e', '5dc229f1c7900c00135e604f', 2, 'Pedido en curso para el cliente con nombre Test name 2 y establecimiento test restaurant 2', 'Calle 40 #88-99', 'Efectivo', now(), now());";

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
          console.log("Codigo " + err.code);
          console.log("Nombre " + err.name);
          console.log("SQL " + err.sql);
          console.log("State " + err.sqlState);
          console.log("Stack " + err.stack);
          
      }

});

module.exports = mysqlConection;



