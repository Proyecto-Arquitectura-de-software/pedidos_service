
-- ATTENTION: Use this script in rancher mysql console, because when you launch a stack.. an error causes that tables doesn't create. Just database is created.

CREATE DATABASE db_pedidos;

USE db_pedidos;

-- ALTER USER 'root'@'localhost' IDENTIFIED WITH mysql_native_password BY 'password';
-- FLUSH PRIVILEGES;

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
  id_cliente VARCHAR(400) NOT NULL, 
  id_establecimiento VARCHAR(400) NOT NULL,
  id_estado INT(11) NOT NULL, 
  observaciones VARCHAR(4000), 
  destino VARCHAR(400), 
  metodo_pago VARCHAR(400), 
  fecha_inicio timestamp NOT NULL DEFAULT current_timestamp, 
  fecha_fin timestamp NOT NULL DEFAULT current_timestamp,
   PRIMARY KEY (id),
   CONSTRAINT fk_estado FOREIGN KEY(id_estado) REFERENCES estado_pedido(id)
);
  


INSERT INTO pedido VALUES (null, '5dc22701c7900c00135e604c', '5dc22802c7900c00135e604d', 1, 'Pedido en creacion para el cliente con nombre Test name 1 y establecimiento test restaurant 1', 'Universidad Nacional entrada 45', 'Debito' null, null);

INSERT INTO pedido VALUES (null, '5dc229d7c7900c00135e604e', '5dc229f1c7900c00135e604f', 2, 'Pedido en curso para el cliente con nombre Test name 2 y establecimiento test restaurant 2', 'Calle 40 #88-99', 'Efectivo' null, null);

-- Table many to many for pedido and producto
CREATE TABLE pedido_producto ( 
  id INT(11) NOT NULL AUTO_INCREMENT, 
  id_pedido INT(11) NOT NULL,
  id_producto INT(11) NOT NULL,
   PRIMARY KEY (id),
   CONSTRAINT fk_pedido FOREIGN KEY(id_pedido) REFERENCES pedido(id)
   -- Cannot create foraign key directly with product because his db is in another Microservice
   -- Referential integrity is ensured by logic
);