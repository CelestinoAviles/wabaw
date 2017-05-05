DROP SCHEMA wabaw;

CREATE SCHEMA wabaw;

-- script para la creación de todas las tablas necesarias
-- 

DROP SEQUENCE wabaw.sqgeneral;
CREATE SEQUENCE wabaw.sqgeneral
  MINVALUE 1
  MAXVALUE 9223372036854775807
  START 1
  INCREMENT BY 1
  CACHE 1;

DROP SEQUENCE wabaw.sqempleados;
CREATE SEQUENCE wabaw.sqempleados
  MINVALUE 101
  MAXVALUE 9223372036854775807
  START 101
  INCREMENT BY 1
  CACHE 1;

DROP TABLE WABAW.dispositivo_preferencias;
CREATE TABLE wabaw.dispositivo_preferencias (
    codigo_dispositivo char(3) not null,
    nombre_dispositivo char(20) not null,
    codigo_espacio integer null,
    idioma_dispositivo char(6) not null,
    CONSTRAINT dispositivo_preferencias_pkey PRIMARY KEY (codigo_dispositivo)
);


DROP TABLE wabaw.series_facturas;
CREATE TABLE wabaw.series_facturas (
    serie_codigo char(3) NOT NULL,
    serie_nombre CHAR(20) NOT NULL,
    CONSTRAINT series_facturas_pkey PRIMARY KEY (serie_codigo)
);

DROP TABLE WABAW.ABONOS;
CREATE TABLE wabaw.abonos (
    cod_abono       integer not null default nextval('wabaw.sqgeneral'),
    cod_empleado    integer not null,
    cod_cliente     integer,
    fecha_abono     date,
    importe_abono   decimal(9,2),
    stt_abono       char(1),
    CONSTRAINT abonos_pkey PRIMARY KEY (cod_abono)
);


/*

IMAGENES

*/

DROP TABLE WABAW.IMAGENES;
CREATE TABLE wabaw.imagenes (
    codigo    integer not null default nextval('wabaw.sqgeneral'),
    url       char(200) not null,
    descripcion  char(200),
    CONSTRAINT imagenes_pkey PRIMARY KEY (codigo)
);


/*

ARTICULOS

*/

DROP TABLE WABAW.ARTICULOS;
CREATE TABLE wabaw.articulos (
    codigo    integer not null default nextval('wabaw.sqgeneral'),
    codigo_articulo    char(10) not null,
    nombre    char(30) not null,
    descripcion char(100) not null,
    cod_familia integer not null,
    stock_actual integer,
    stock_minimo integer,
    cantidad_pedir integer,
    pvp_venta decimal(6,2),
    fecha_ultima_venta date,
    fecha_ultima_compra date,
    fecha_ultima_modificacion timestamp,
    estado char(10),
    ubicacion char(10),
    cod_tipo    integer,
    observaciones char(100),
    CONSTRAINT articulos_pkey PRIMARY KEY (codigo)
);

DROP TABLE WABAW.ARTICULOS_IMAGENES;
CREATE TABLE wabaw.Articulos_Imagenes (
    codigo           integer not null default nextval('wabaw.sqgeneral'),
    codigo_articulo  integer not null,
    codigo_imagen    integer not null,
    numero_orden     integer not null,
    CONSTRAINT Articulos_imagenes_pkey PRIMARY KEY (codigo)
);


DROP TABLE WABAW.MESAS;
CREATE TABLE wabaw.mesas (
    codigo     integer not null,
    nombre     char(20) not null,
    clave      char(10) null,
    estado     char(10) null,
    llamada    char(10) null,
    CONSTRAINT mesas_pkey PRIMARY KEY (codigo)
);


DROP TABLE WABAW.OFERTAS;
CREATE TABLE wabaw.ofertas (
    id               integer not null default nextval('wabaw.sqgeneral'),
    codigo_ARTICULO  INTEGER not null,
    pvp              decimal(6,2),
    fechaInicio      timestamp,
    fechaFin         timestamp,
    observaciones    char(100),
    CONSTRAINT ofertas_pkey PRIMARY KEY (id)
);

DROP TABLE WABAW.ESTADOS;
CREATE TABLE WABAW.ESTADOS (
    codigo           integer not null,
    tipo             char(03) not null,
    nombre           char(10) not null,
    color            char(10) not null,
    CONSTRAINT estados_pkey PRIMARY KEY (codigo)
);
insert into wabaw.estados (codigo, tipo, nombre, color) values (1, 'MES', 'LIBRE',   'green');
insert into wabaw.estados (codigo, tipo, nombre, color) values (2, 'MES', 'OCUPADO', 'orange');
insert into wabaw.estados (codigo, tipo, nombre, color) values (3, 'MES', 'LLAMANDO', 'orange');
insert into wabaw.estados (codigo, tipo, nombre, color) values (4, 'MES', 'RESERVADO', 'orange');
insert into wabaw.estados (codigo, tipo, nombre, color) values (5, 'MES', 'ANULADO',  'orange');
insert into wabaw.estados (codigo, tipo, nombre, color) values (10, 'TKT', 'ABIERTO',   'green');
insert into wabaw.estados (codigo, tipo, nombre, color) values (11, 'TKT', 'PAGADO', 'green');
insert into wabaw.estados (codigo, tipo, nombre, color) values (21, 'TKL', 'EN CURSO', 'orange');
insert into wabaw.estados (codigo, tipo, nombre, color) values (22, 'TKL', 'SERVIDO', 'orange');


/*

FAMILIAS

*/

DROP TABLE wabaw.familias;
CREATE TABLE wabaw.familias (
    codigo       integer not null,
    descripcion  char(20) not null,
    url          char(30) not null,
    visible      boolean,
    CONSTRAINT familias_pkey PRIMARY KEY (codigo)
);

insert into wabaw.abonos 
(cod_empleado, cod_cliente, fecha_abono, importe_abono, stt_abono) 
values
(1, 1, current_date, 123.23, '0');


/*

USUARIOS

*/

CREATE TABLE wabaw.usuarios (
    codigo      integer  not null default nextval('wabaw.sqgeneral'),
    nombre      char(20) not null,
    pwd         char(20) not null,
    login       char(20) not null,
    email       char(40) not null,
    tfno        char(12),
    CONSTRAINT usuarios_pkey PRIMARY KEY (login)
);


CREATE TABLE wabaw.ArticulosOpiniones (
    id                integer  not null default nextval('wabaw.sqgeneral'),
    fecha               timestamp,
    login             char(20) not null,
    codigoArticulo    char(10) not null,
    valorGeneral      integer not null,
    observaciones     char(200),
    CONSTRAINT ArticulosOpiniones_pkey PRIMARY KEY (id)
);

CREATE TABLE wabaw.posts_general (
    codigo          integer  not null default nextval('wabaw.sqgeneral'),
    login           char(20) not null,
    fecha           timestamp, 
    valor_general   integer,
    valor_limpieza   integer,
    valor_servicio   integer,
    redes_sociales   boolean,
    observaciones    char(200) not null,
    CONSTRAINT post_general_pkey PRIMARY KEY (codigo)
);


CREATE TABLE wabaw.formas_pago (
    codigo          char(10) not null,
    descripcion     char(20) not null,
    tipo            char(20) not null,
    prc_primer_rec  decimal(5,2),
    prc_siguie_rec  decimal(5,2),
    prc_primer_dia  integer,
    prc_siguie_rec  integer,
    mensaje_ticket  char(100),
    mensaje_factura char(100),
    CONSTRAINT formas_pago_pkey PRIMARY KEY (codigo)
);


CREATE TABLE wabaw.tipos_iva (
    codigo          integer  not null,
    nombre          char(20) not null,
    porcentaje      decimal(5,2) not null,
    CONSTRAINT tipos_iva_pkey PRIMARY KEY (codigo)
);

CREATE TABLE wabaw.almacenes (
    codigo          char(10) not null,
    nombre          char(20) not null,
    CONSTRAINT almacenes_pkey PRIMARY KEY (codigo)
);


CREATE TABLE wabaw.tickets (
    codigo          integer  not null default nextval('wabaw.sqgeneral'),
    cod_cliente     integer not null,
    cod_empleado    integer not null,
    cod_espacio     integer not null,
    fecha_ticket    timestamp not null,
    fecha_modifica  timestamp not null,
    fecha_pago      timestamp,
    observaciones   char(100),
    subtotal        decimal(12,2),
    prc_descuento       decimal(04,2),
    tot_descuento       decimal(12,2),
    prc_impuestos       decimal(04,2),
    tot_impuestos       decimal(12,2),
    total           decimal(12,2),
    total_entrega   decimal(12,2),
    total_cambio    decimal(12,2),
    estado          varchar(10),
    llamada         varchar(10),
    CONSTRAINT tickets_pkey PRIMARY KEY (codigo)
);

CREATE TABLE wabaw.tickets_lineas (
    codigo          integer  not null default nextval('wabaw.sqgeneral'),
    cod_ticket      integer not null,
    cod_articulo    integer not null,
    cantidad        decimal(12,2) not null,
    pvu             decimal(12,2) not null,
    total           decimal(12,2) not null,
    estado          varchar(10) null,
    CONSTRAINT tktlin_pkey PRIMARY KEY (codigo)
);


CREATE TABLE wabaw.agenda (
    codigo          integer  not null default nextval('wabaw.sqgeneral'),
    tipo_doc        char(1), 
    num_doc         char(9), 
    nombre          char(20) not null,
    apellidos       char(40) not null,
    email           char(40),
    telefono1       char(15),
    telefono2       char(15),
    telefono3       char(15),
    empresa         char(20),
    cargo           char(20),
    observaciones   char(100),
    CONSTRAINT agenda_pkey PRIMARY KEY (codigo)
);

CREATE TABLE wabaw.empleados (
    codigo          integer  not null default nextval('wabaw.sqempleados'),
    numdoc          char(9), 
    nombre          char(20) not null,
    apellidos       char(40) not null,
    email           char(40),
    telefono1       char(15),
    telefono2       char(15),
    telefono3       char(15),
    numero_ss       char(20),
    direccion       char(40),
    poblacion       char(30),
    codigo_postal   char(5),
    provincia       char(20),
    pais            char(20),
    fecha_nacimiento date,
    fecha_alta      date,
    fecha_baja      date,
    observaciones   char(100),
    CONSTRAINT empleados_pkey PRIMARY KEY (codigo)
);


CREATE TABLE wabaw.clientes (
    codigo          integer  not null default nextval('wabaw.sqgeneral'),
    tipo_doc        char(1), 
    num_doc         char(9), 
    nombre          char(20) not null,
    apellidos       char(40) not null,
    email           char(40),
    telefono1       char(15),
    telefono2       char(15),
    telefono3       char(15),
    direccion       char(40),
    poblacion       char(30),
    codigo_postal   char(5),
    provincia       char(20),
    pais            char(20),
    fecha_alta      date,
    observaciones   char(100),
    CONSTRAINT clientes_pkey PRIMARY KEY (codigo)
);


CREATE TABLE wabaw.impr_configuracion (
    codigo            integer  not null default nextval('wabaw.sqgeneral'),
    codigo_impresora  char(3) not null, 
    nombre_caracter   char(9) not null, 
    cadena_activar    char(20) not null,
    cadena_desactivar char(20) not null,
    CONSTRAINT impr_configuracion_pkey PRIMARY KEY (codigo)
);

CREATE TABLE wabaw.impresoras (
    codigo            char(3) not null,
    nombre_impresora  char(10) not null, 
    CONSTRAINT impresoras_pkey PRIMARY KEY (codigo)
);

CREATE TABLE wabaw.dispositivos (
    codigo           integer not null,
    nombre           char(10) not null, 
    ubicacion        char(10) not null, 
    cod_impresora    char(3) not null, 
    cod_idioma       char(3),
    clave_activacion integer, 
    fecha_activacion date, 
    fecha_alta       date    not null, 
    fecha_baja       date    not null, 
    CONSTRAINT dispositivos_pkey PRIMARY KEY (codigo)
);


CREATE TABLE wabaw.configuracion (
    codigo           integer not null,
    icono            char(40), 
    nombre_comercial char(20) not null,
    nif              char(09) not null,
    nombre_empresa   char(40) not null,
    direccion        char(60),
    poblacion        char(20),
    codigo_postal    char(5),
    provincia        char(20),
    pais             char(20)
    tfno1            char(15),
    cod_idioma       char(3),
    clave_activacion integer, 
    fecha_activacion date, 
    fecha_alta       date    not null, 
    fecha_baja       date    not null, 
    CONSTRAINT configuracion_pkey PRIMARY KEY (codigo)
);


CREATE TABLE wabaw.parametros (
    codigo           integer not null,
    avisar_salir     boolean,
    permitir_juegos  boolean,
    permitir_posts   boolean,
    valor_iva        decimal(5,2),
    valor_req        decimal(5,2),
    texto_ticket     char(100),
    caja_inicial     decimal(5,2),
    permitit_dtos    boolean,
    CONSTRAINT parametros_pkey PRIMARY KEY (codigo)
);

CREATE TABLE wabaw.config_local (
    codigo           integer not null,
    tipo_monitor     char(10),
    tipo_conexion    char(1),
    cadena_conexion  char(40),
    CONSTRAINT config_local_pkey PRIMARY KEY (codigo)
);


