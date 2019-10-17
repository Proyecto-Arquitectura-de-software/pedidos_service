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


INSERT INTO estado_pedido VALUES (1, 'En curso', 'Este estado de codigo 1, es para los pedidos en curso');


CREATE TABLE pedido (
  id INT(11) NOT NULL,
  id_cliente INT(11) NOT NULL,
  id_estado INT(11) NOT NULL,
  observaciones VARCHAR(4000),
  fecha_inicio timestamp NOT NULL DEFAULT current_timestamp,
  fecha_fin timestamp NOT NULL DEFAULT current_timestamp,
  CONSTRAINT fk_estado FOREIGN KEY(id_estado) REFERENCES estado_pedido(id)
);

ALTER TABLE pedido
  ADD PRIMARY KEY (id);

--ALTER TABLE pedido
  --MODIFY id INT(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT = 2;

-- DESCRIBE users;

INSERT INTO pedido VALUES (1, 12, 1, 'Es el pedido para el cliente 12, y esta en estado en curso (1)', null, null);

--INSERT INTO pedido (id,id_cliente,id_estado,observaciones) VALUES (2, 12, 1, 'Es el pedido para el cliente 12, y esta en estado en curso (1)');




