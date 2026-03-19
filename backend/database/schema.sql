CREATE TYPE ESTADO_PEDIDO AS ENUM ('Pendiente', 'Enviado', 'Completado', 'Cancelado');
CREATE TYPE CAT_PRODUCTO AS ENUM ('Tartas', 'Ensaladas', 'Empanadas', 'Viandas', 'Wraps', 'Burritos', 'Pizzas', 'Paninis', 'Sándwiches', 'Wenses', 'Pan fresh', 'Otros');
CREATE TYPE MEDIO_PAGO AS ENUM ('Efectivo', 'Transferencia', 'Tarjeta de crédito', 'Otros');
CREATE TYPE CAT_GASTO AS ENUM ('Materia prima', 'Servicios', 'Sueldos', 'Insumos', 'Marketing', 'Daños', 'Otros');
CREATE TYPE SECTOR AS ENUM ('Cocina', 'Ensaladas', 'Panadería', 'Empanadas', 'Reparto', 'Administración', 'Ventas', 'Otros');
CREATE TYPE TIPO_REPORTE AS ENUM ('Saldo semanal', 'Saldo mensual', 'Stock', 'Comisiones', 'Pedidos');

CREATE TABLE usuarios(
    id_usuario SERIAL PRIMARY KEY,
    nombre VARCHAR(50) NOT NULL,
    email VARCHAR(255) NOT NULL UNIQUE,
    contrasena VARCHAR(255) NOT NULL,
    rol VARCHAR(20) NOT NULL
);

CREATE TABLE clientes(
    id_cliente SERIAL PRIMARY KEY,
    nombre VARCHAR(50) NOT NULL,
    direccion VARCHAR(255),
    horarios TEXT,
    localidad VARCHAR(50) NOT NULL,
    particular BOOLEAN DEFAULT FALSE
);

CREATE TABLE pedidos(
    id_pedido SERIAL PRIMARY KEY,
    id_cliente INTEGER REFERENCES clientes(id_cliente) ON DELETE RESTRICT,
    fecha_entrega DATE NOT NULL,
    monto NUMERIC(12,2) NOT NULL DEFAULT 0,
    estado ESTADO_PEDIDO NOT NULL DEFAULT 'Pendiente'
);

CREATE TABLE productos(
    id_producto SERIAL PRIMARY KEY,
    nombre VARCHAR(255),
    categoria CAT_PRODUCTO NOT NULL,
    precio NUMERIC(12,2) NOT NULL
);

CREATE TABLE detalle(
    id_detalle SERIAL PRIMARY KEY,
    id_pedido INTEGER REFERENCES pedidos(id_pedido) ON DELETE CASCADE,
    id_producto INTEGER REFERENCES productos(id_producto),
    cantidad NUMERIC(10,2) NOT NULL,
    precio_unitario NUMERIC(12,2) NOT NULL,
    subtotal NUMERIC(12,2) GENERATED ALWAYS AS (cantidad * precio_unitario) STORED
);


CREATE TABLE compras(
    id_compra SERIAL PRIMARY KEY,
    fecha_compra DATE NOT NULL DEFAULT CURRENT_DATE,
    descripcion TEXT,
    medio_pago MEDIO_PAGO NOT NULL,
    monto NUMERIC(12,2) NOT NULL
);


CREATE TABLE gastos(
    id_gasto SERIAL PRIMARY KEY,
    fecha_gasto DATE NOT NULL DEFAULT CURRENT_DATE,
    descripcion TEXT,
    categoria CAT_GASTO NOT NULL,
    monto NUMERIC(12,2) NOT NULL
);

CREATE TABLE ventas(
    id_venta SERIAL PRIMARY KEY,
    id_pedido INTEGER REFERENCES pedidos(id_pedido) ON DELETE CASCADE,
    fecha_venta DATE NOT NULL DEFAULT CURRENT_DATE,
    medio_pago MEDIO_PAGO NOT NULL,
    monto NUMERIC(12,2) NOT NULL
);


CREATE TABLE empleados(
    id_empleado SERIAL PRIMARY KEY,
    nombre VARCHAR(50) NOT NULL,
    sector SECTOR NOT NULL,
    sueldo NUMERIC(12,2) NOT NULL
);

CREATE TABLE reportes(
    id_reporte SERIAL PRIMARY KEY,
    tipo TIPO_REPORTE NOT NULL,
    fecha_reporte TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    inicio DATE NOT NULL,
    fin DATE NOT NULL,
    archivo_url TEXT
);

ALTER TABLE productos ADD COLUMN alias_facturacion VARCHAR(255);