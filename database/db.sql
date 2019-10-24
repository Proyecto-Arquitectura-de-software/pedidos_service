
-- ATTENTION: Use this script in rancher mysql console, because when you launch a stack.. an error causes that tables doesn't create. Just database is created.

CREATE DATABASE db_pedidos;

USE db_pedidos;

-- ALTER USER 'root'@'localhost' IDENTIFIED WITH mysql_native_password BY 'password'

CREATE TABLE estado_pedido (
  id INT(11) NOT NULL,
  nombre VARCHAR(150) NOT NULL,
  descripcion VARCHAR(150)  
);


ALTER TABLE estado_pedido
  ADD PRIMARY KEY (id);



INSERT INTO estado_pedido VALUES (1, 'Creado', 'El pedido esta en estado creado cuando el usuario esta agregando productos pero no ha solicitado el envio del pedido');
INSERT INTO estado_pedido VALUES (2, 'En curso', 'El pedido esta en estado en curso cuando el domiciliario ya esta llevando el pedido al cliente');
INSERT INTO estado_pedido VALUES (3, 'Finalizado', 'El pedido esta en estado finalizado cuando el cliente ya ha recibido el pedido');



CREATE TABLE pedido ( 
  id INT(11) NOT NULL AUTO_INCREMENT, 
  id_cliente INT(11) NOT NULL, 
  id_establecimiento INT(11) NOT NULL,
  id_estado INT(11) NOT NULL, 
  observaciones VARCHAR(4000), 
  destino VARCHAR(4000), 
  fecha_inicio timestamp NOT NULL DEFAULT current_timestamp, 
  fecha_fin timestamp NOT NULL DEFAULT current_timestamp,
   PRIMARY KEY (id),
   CONSTRAINT fk_estado FOREIGN KEY(id_estado) REFERENCES estado_pedido(id)
);
  


INSERT INTO pedido VALUES (null, 12, 101, 1, 'Es el pedido del establecimiento 101 para el cliente 12, y esta en estado creado', 'Universidad Nacional entrada 45', null, null);

INSERT INTO pedido VALUES (null, 13, 102, 2, 'Es el pedido del establecimiento 102 para el cliente 13, y esta en estado en curso', 'Calle 40 #88-99', null, null);
