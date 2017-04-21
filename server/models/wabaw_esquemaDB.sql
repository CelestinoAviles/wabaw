DROP SCHEMA wabaw;

CREATE SCHEMA wabaw;
DROP SEQUENCE wabaw.sqgeneral;
DROP SEQUENCE wabaw.sqempleados;
-- DROP TABLE    wabaw.series_facturas;
-- DROP TABLE    wabaw.abonos;
-- DROP TABLE    wabaw.articulos;
DROP TABLE    wabaw.empleados;


CREATE SEQUENCE wabaw.sqgeneral
  MINVALUE 1
  MAXVALUE 9223372036854775807
  START 1
  INCREMENT BY 1
  CACHE 1;

CREATE SEQUENCE wabaw.sqempleados
  MINVALUE 101
  MAXVALUE 9223372036854775807
  START 101
  INCREMENT BY 1
  CACHE 1;

CREATE TABLE wabaw.dispositivo_preferencias (
    codigo_dispositivo char(3) not null,
    nombre_dispositivo char(20) not null,
    codigo_espacio integer null,
    idioma_dispositivo char(6) not null,
    CONSTRAINT dispositivo_preferencias_pkey PRIMARY KEY (codigo_dispositivo)
);


CREATE TABLE wabaw.series_facturas (
    serie_codigo char(3) NOT NULL,
    serie_nombre CHAR(20) NOT NULL,
    CONSTRAINT series_facturas_pkey PRIMARY KEY (serie_codigo)
);


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

CREATE TABLE wabaw.imagenes (
    codigo    integer not null default nextval('wabaw.sqgeneral'),
    url       char(200) not null,
    descripcion  char(200),
    CONSTRAINT imagenes_pkey PRIMARY KEY (codigo)
);


/*

ARTICULOS

*/

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

CREATE TABLE wabaw.Articulos_Imagenes (
    codigo           integer not null default nextval('wabaw.sqgeneral'),
    codigo_articulo  integer not null,
    codigo_imagen    integer not null,
    numero_orden     integer not null,
    CONSTRAINT Articulos_imagenes_pkey PRIMARY KEY (codigo)
);


CREATE TABLE wabaw.mesas (
    codigo     integer not null,
    nombre     char(20) not null,
    estado     char(10) null,
    llamada    char(10) null,
    CONSTRAINT mesas_pkey PRIMARY KEY (codigo)
);


CREATE TABLE wabaw.ofertas (
    id               integer not null default nextval('wabaw.sqgeneral'),
    codigo_ARTICULO  INTEGER not null,
    pvp              decimal(6,2),
    fechaInicio      timestamp,
    fechaFin         timestamp,
    observaciones    char(100),
    CONSTRAINT ofertas_pkey PRIMARY KEY (id)
);


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

CREATE TABLE wabaw.familias (
    codigo       integer not null,
    descripcion  char(20) not null,
    url          char(30) not null,
    visible      boolean,
    CONSTRAINT familias_pkey PRIMARY KEY (codigo)
);

insert into wabaw.familias
( codigo_padre, codigo, nombre, estado, observaciones)
values
(0, 1, 'COMER', 'A', '');

insert into wabaw.familias
( codigo_padre, codigo, nombre, estado, observaciones)
values
(0, 2, 'BEBER', 'A', '');

insert into wabaw.familias
( codigo_padre, codigo, nombre, estado, observaciones)
values
(2, 11, 'Refrescos', 'A', '');

insert into wabaw.familias
( codigo_padre, codigo, nombre, estado, observaciones)
values
(2, 12, 'Café y Té', 'A', '');


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




/*
ALBAMC.DBF
ALBAML.DBF
ALBCLC.DBF
ALBCLL.DBF
ALBPRC.DBF
ALBPRH.DBF
ALBPRL.DBF
ART_CMP.DBF
ART_CV.DBF
ART_CV0.DBF
ART_VTA.DBF
ARTDES.DBF
ARTEST.DBF
ARTSTK.DBF
CCC.DBF
CDAYUDA.DBF
CDCAJA.DBF
CDCNTDOR.DBF
CDFACLIN.DBF
CDFACREC.DBF
CDFACTPC.DBF
CDFACTPL.DBF
CDFACTUR.DBF
CDLINPED.DBF
CDPARAME.DBF
CDPEDIDO.DBF
CDPEDPEN.DBF
CDPROVEE.DBF
CDPRVART.DBF
cdprvest.DBF
CDSEGURI.DBF
CDTIPSTT.DBF
CLIACT.DBF
CLIART.DBF
CLIFAM.DBF
CLIPTE.DBF
CLIRUT.DBF
CLITRA.DBF
CNC.DBF
CNTALM.DBF
CNTALP.DBF
CNTASI.DBF
CNTCTZ.DBF
CNTDALB.DBF
CNTDFACT.DBF
CNTPTO.DBF
CTA.DBF
CURVEN.DBF
EFECOB.DBF
EFEPAG.DBF
EMP.DBF
EURO.DBF
EXIINI.DBF
FAM.DBF
FICHEMPL.DBF
FICHEROS.DBF
FPG.DBF
PEDCTC.DBF
PEDCTL.DBF
PEDPTA.DBF
PRV_MES.DBF
PRV_RES.DBF
PTOCLC.DBF
PTOCLL.DBF
RCB.DBF
REPO.DBF
RES10T.DBF
RPR.DBF
RUT.DBF
RUTPOB.DBF
SERI.DBF
TIPIVA.DBF
*/



/*
CREATE TABLE webshop.phones (
    id integer NOT NULL DEFAULT nextval('webshop.squsers'::regclass),
    additionalFeatures character varying(288),
    android_os character varying(110),
    android_ui character varying(100),
    availability character varying(57),
    battery_standbyTime character varying(90),
    battery_talkTime character varying(70),
    battery_type character varying(91),
    camera_features character varying(50),
    camera_features_primary character varying(140),
    connectivity_bluetooth character varying(130),
    connectivity_cell character varying(178),
    connectivity_gps character varying(40),
    connectivity_infrared character varying(50),
    connectivity_wifi character varying(120),
    description character varying(1246),
    display_screenResolution character varying(160),
    display_screenSize character varying(100),
    display_touchScreen character varying(90),
    hardware_accelerometer character varying(90),
    hardware_audioJack character varying(90),
    hardware_cpu character varying(90),
    hardware_fmRadio character varying(90),
    hardware_physicalKeyboard character varying(90),
    hardware_usb character varying(90),
    identifier character varying(90),
    images character varying(90),
    name character varying(90),
    sizeAndWeight_dimensions character varying(50),
    sizeAndWeight_weight character varying(50),
    storage_flash character varying(60),
    storage_ram character varying(50),
	CONSTRAINT phones_pkey PRIMARY KEY (id)
);

CREATE TABLE webshop.phones_images (
    id integer NOT NULL DEFAULT nextval('webshop.sqphoneimages'::regclass),
	id_phone integer,
    img character varying(288),
	CONSTRAINT phonesimages_pkey PRIMARY KEY (id),
	CONSTRAINT phones_phonesimages_fk FOREIGN KEY (id_phone)
      REFERENCES webshop.phones (id)
);


CREATE TABLE webshop.users
(
  id integer NOT NULL DEFAULT nextval('webshop.squsers'::regclass),
  description character varying(450),
  email character varying(150),
  local_email  character varying(150),
  local_password character varying(255),
  facebook_id character varying(150),
  facebook_token character varying(350),
  facebook_email character varying(150),
  facebook_name character varying(150),
  twitter_id character varying(150),
  twitter_token character varying(150),
  twitter_displayname character varying(150),
  twitter_username character varying(150),
  google_id character varying(150),
  google_token character varying(150),
  google_email character varying(150),
  google_name character varying(150),
  id_user integer,
  CONSTRAINT users_pkey PRIMARY KEY (id),
  CONSTRAINT users_users_fk FOREIGN KEY (id_user)
      REFERENCES webshop.users (id)
);

*/

/*
INSERT INTO webshop.phones(additionalFeatures,android_os,android_ui,availability,battery_standbyTime,battery_talkTime,battery_type,camera_features,camera_features_primary,connectivity_bluetooth,connectivity_cell,connectivity_gps,connectivity_infrared,connectivity_wifi,description,display_screenResolution,display_screenSize,display_touchScreen,hardware_accelerometer,hardware_audioJack,hardware_cpu,hardware_fmRadio,hardware_physicalKeyboard,hardware_usb,identifier,images,name,sizeAndWeight_dimensions,sizeAndWeight_weight,storage_flash,storage_ram) VALUES ('Adobe Flash Player 10, Quadband GSM Worldphone, Advance Business Security, Complex Password Secure, Review & Edit Documents with Quick Office, Personal 3G Mobile Hotspot for up to 5 WiFi enabled Devices, Advanced Social Networking brings all social content into a single homescreen widget','Android 2.2',NULL,'Verizon','330 hours','7 hours','Lithium Ion (Li-Ion) (1400 mAH)','Video','5.0 megapixels','Bluetooth 2.1','800/1900 CDMA EVDO Rev. A with dual diversity antenna, 850/900/1800/1900MHz GSM, GPRS Class 12, EDGE Class 12, 850/1900/2100 WCDMA (category 9/10), HSDPA 10.2mbps, HSUPA 1.8 mbps','True','False','802.11 b/g/n','Access your work directory, email or calendar with DROID Pro by Motorola., an Android-for-business smartphone with corporate-level security. It features both a QWERTY keyboard and touchscreen, a speedy 1 GHz processor and Adobe® Flash® Player 10.','HVGA (480 x 320)','3.1 inches','True','True','3.5mm','1 GHz TI OMAP','False','True','USB 2.0','droid-pro-by-motorola','img/phones/droid-pro-by-motorola.1.jpg','DROID™ Pro by Motorola','11.7 mm (d)','134.0 grams','2048MB','512MB');


INSERT INTO webshop.phones(additionalFeatures,android_os,android_ui,availability,battery_standbyTime,battery_talkTime,battery_type,camera_features,camera_features_primary,connectivity_bluetooth,connectivity_cell,connectivity_gps,connectivity_infrared,connectivity_wifi,description,display_screenResolution,display_screenSize,display_touchScreen,hardware_accelerometer,hardware_audioJack,hardware_cpu,hardware_fmRadio,hardware_physicalKeyboard,hardware_usb,identifier,images,name,sizeAndWeight_dimensions,sizeAndWeight_weight,storage_flash,storage_ram) VALUES ('Gorilla Glass display, Dedicated Camera Key, Ring Silence Switch, Swype keyboard.','Android 2.2',NULL,'Dell Stage,T-Mobile','400 hours','7 hours','Lithium Ion (Li-Ion) (1400 mAH)','Video','8.0 megapixels','Bluetooth 2.1','850/1900/2100 3G; 850/900/1800/1900 GSM/GPRS/EDGE 900/1700/2100 3G; 850/900/1800/1900 GSM/GPRS/EDGE','True','False','802.11 b/g/n','The Venue is the perfect one-touch, Smart Phone providing instant access to everything you love. All of Venue''s features make it perfect for on-the-go students, mobile professionals, and active social communicators who love style and performance. Elegantly designed, the Venue offers a vibrant, curved glass display that’s perfect for viewing all types of content. The Venue’s slender form factor feels great in your hand and also slips easily into your pocket.  A mobile entertainment powerhouse that lets you download the latest tunes from Amazon MP3 or books from Kindle, watch video, or stream your favorite radio stations.  All on the go, anytime, anywhere.','WVGA (800 x 480)','4.1 inches','True','True','3.5mm','1 Ghz processor','False','False','USB 2.0','dell-venue','img/phones/dell-venue.5.jpg','Dell Venue','12.9 mm (d)','164.0 grams','1000MB','512MB');

INSERT INTO webshop.phones(additionalFeatures,android_os,android_ui,availability,battery_standbyTime,battery_talkTime,battery_type,camera_features,camera_features_primary,connectivity_bluetooth,connectivity_cell,connectivity_gps,connectivity_infrared,connectivity_wifi,description,display_screenResolution,display_screenSize,display_touchScreen,hardware_accelerometer,hardware_audioJack,hardware_cpu,hardware_fmRadio,hardware_physicalKeyboard,hardware_usb,identifier,images,name,sizeAndWeight_dimensions,sizeAndWeight_weight,storage_flash,storage_ram) VALUES ('Adobe Flash Player 10, Quadband GSM Worldphone, Advance Business Security, Complex Password Secure, Review & Edit Documents with Quick Office, Personal 3G Mobile Hotspot for up to 5 WiFi enabled Devices, Advanced Social Networking brings all social content into a single homescreen widget','Android 2.2',NULL,'Verizon','230 hours','8 hours','Lithium Ion (Li-Ion) (1400 mAH)','Video','5.0 megapixels','Bluetooth 2.1','WCDMA 850/1900/2100, CDMA 800/1900, GSM 850/900/1800/1900, HSDPA 10.2 Mbps (Category 9/10), CDMA EV-DO Release A, EDGE Class 12, GPRS Class 12, HSUPA 1.8 Mbps','True','False','802.11 b/g/n','With Quad Band GSM, the DROID 2 Global can send email and make and receive calls from more than 200 countries. It features an improved QWERTY keyboard, super-fast 1.2 GHz processor and enhanced security for all your business needs.','FWVGA (854 x 480)','3.7 inches','True','True','3.5mm','1.2 GHz TI OMAP','False','True','USB 2.0','droid-2-global-by-motorola','img/phones/droid-2-global-by-motorola.2.jpg','DROID™ 2 Global by Motorola','13.7 mm (d)','169.0 grams','8192MB','512MB');

INSERT INTO webshop.phones(additionalFeatures,android_os,android_ui,availability,battery_standbyTime,battery_talkTime,battery_type,camera_features,camera_features_primary,connectivity_bluetooth,connectivity_cell,connectivity_gps,connectivity_infrared,connectivity_wifi,description,display_screenResolution,display_screenSize,display_touchScreen,hardware_accelerometer,hardware_audioJack,hardware_cpu,hardware_fmRadio,hardware_physicalKeyboard,hardware_usb,identifier,images,name,sizeAndWeight_dimensions,sizeAndWeight_weight,storage_flash,storage_ram) VALUES ('Adobe Flash Player 10, Quadband GSM Worldphone, Advance Business Security, Complex Password Secure, Review & Edit Documents with Quick Office, Personal 3G Mobile Hotspot for up to 5 WiFi enabled Devices, Advanced Social Networking brings all social content into a single homescreen widget','Android 2.2',NULL,'Verizon','330 hours','7 hours','Lithium Ion (Li-Ion) (1400 mAH)','Video','5.0 megapixels','Bluetooth 2.1','800/1900 CDMA EVDO Rev. A with dual diversity antenna, 850/900/1800/1900MHz GSM, GPRS Class 12, EDGE Class 12, 850/1900/2100 WCDMA (category 9/10), HSDPA 10.2mbps, HSUPA 1.8 mbps','True','False','802.11 b/g/n','Access your work directory, email or calendar with DROID Pro by Motorola., an Android-for-business smartphone with corporate-level security. It features both a QWERTY keyboard and touchscreen, a speedy 1 GHz processor and Adobe® Flash® Player 10.','HVGA (480 x 320)','3.1 inches','True','True','3.5mm','1 GHz TI OMAP','False','True','USB 2.0','droid-pro-by-motorola','img/phones/droid-pro-by-motorola.1.jpg','DROID™ Pro by Motorola','11.7 mm (d)','134.0 grams','2048MB','512MB');


INSERT INTO webshop.phones(additionalFeatures,android_os,android_ui,availability,battery_standbyTime,battery_talkTime,battery_type,camera_features,camera_features_primary,connectivity_bluetooth,connectivity_cell,connectivity_gps,connectivity_infrared,connectivity_wifi,description,display_screenResolution,display_screenSize,display_touchScreen,hardware_accelerometer,hardware_audioJack,hardware_cpu,hardware_fmRadio,hardware_physicalKeyboard,hardware_usb,identifier,images,name,sizeAndWeight_dimensions,sizeAndWeight_weight,storage_flash,storage_ram) VALUES ('Accessibility features: Tactile QWERTY keyboard, four-direction keypad, start and end call buttons, dedicated number keys, camera button, TalkBack screen reader','Android 2.1',NULL,'LG Home,Cellular South','500 hours','8 hours','Lithium Ion (Li-Ion) (1500 mAH)','Video','3.0 megapixels','Bluetooth 2.1','1.9 GHz CDMA PCS, 800 MHz CDMA, EVDO Rev. A, 1xRTT','True','False','802.11 b/g','Android plus QWERTY is a powerful duo. LG Axis melds a speedy UI with the limitless micro-entertainment of 80,000+ apps including voice-activated Google. Feel the tactile vibration on its tempered glass touchscreen. Take the fuzziness out of your fun with a 3.2MP camera that does 360° panoramics. And customize your home screens with shortcuts to your apps, favorites, and widgets. It''s the centerpiece of your life.','WVGA (800 x 480)','3.2 inches','True','True',NULL,'600 MHz Qualcomm MSM7627','False','True','USB 2.0','lg-axis','img/phones/lg-axis.2.jpg','LG Axis','16.0 mm (d)','158.0 grams','126MB','256MB');




INSERT INTO webshop.phones(additionalFeatures,android_os,android_ui,availability,battery_standbyTime,battery_talkTime,battery_type,camera_features,camera_features_primary,connectivity_bluetooth,connectivity_cell,connectivity_gps,connectivity_infrared,connectivity_wifi,description,display_screenResolution,display_screenSize,display_touchScreen,hardware_accelerometer,hardware_audioJack,hardware_cpu,hardware_fmRadio,hardware_physicalKeyboard,hardware_usb,identifier,images,name,sizeAndWeight_dimensions,sizeAndWeight_weight,storage_flash,storage_ram) VALUES (NULL,'Android 2.2',NULL,'MOTOBLUR,AT&T','400 hours','5 hours','Lithium Ion (Li-Ion) (1930 mAH)',NULL,NULL,'Bluetooth 2.1','WCDMA 850/1900/2100, GSM 850/900/1800/1900, HSDPA 14Mbps (Category 10) Edge Class 12, GPRS Class 12, eCompass, AGPS','True','False','802.11 a/b/g/n','MOTOROLA ATRIX 4G gives you dual-core processing power and the revolutionary webtop application. With webtop and a compatible Motorola docking station, sold separately, you can surf the Internet with a full Firefox browser, create and edit docs, or access multimedia on a large screen almost anywhere.','QHD (960 x 540)','4.0 inches','True','True','3.5mm','1 GHz Dual Core','False','False','USB 2.0','motorola-atrix-4g','img/phones/motorola-atrix-4g.3.jpg','MOTOROLA ATRIX™ 4G','10.95 mm (d)','135.0 grams',NULL,NULL);



INSERT INTO webshop.phones(additionalFeatures,android_os,android_ui,availability,battery_standbyTime,battery_talkTime,battery_type,camera_features,camera_features_primary,connectivity_bluetooth,connectivity_cell,connectivity_gps,connectivity_infrared,connectivity_wifi,description,display_screenResolution,display_screenSize,display_touchScreen,hardware_accelerometer,hardware_audioJack,hardware_cpu,hardware_fmRadio,hardware_physicalKeyboard,hardware_usb,identifier,images,name,sizeAndWeight_dimensions,sizeAndWeight_weight,storage_flash,storage_ram) VALUES ('Adobe® Flash® Lite® 3, DNLA, CrystalTalk™ PLUS technology','Android 2.1',NULL,'MOTOBLUR™,AT&T','216 hours','6 hours','Lithium Ion (Li-Ion) (1540 mAH)','Video','3.0 megapixels','Bluetooth 2.1','WCDMA 850/1900, GSM 850/900/1800/1900, HSDPA 7.2 Mbps (Category 7/8), EDGE Class 12, GPRS Class 12, HSUPA 2.0 Mbps','True','False','802.11 b/g/n','MOTOROLA BRAVO™ with MOTOBLUR™ with its large 3.7-inch touchscreen and web-browsing capabilities is sure to make an impression.  And it keeps your life updated and secure through MOTOBLUR.','WVGA (800 x 480)','3.7 inches','True','True','3.5mm','800 Mhz','True','False','USB 2.0','motorola-bravo-with-motoblur','img/phones/motorola-bravo-with-motoblur.2.jpg','MOTOROLA BRAVO™ with MOTOBLUR™','13.3 mm (d)','130.0 grams',NULL,NULL);

INSERT INTO webshop.phones(additionalFeatures,android_os,android_ui,availability,battery_standbyTime,battery_talkTime,battery_type,camera_features,camera_features_primary,connectivity_bluetooth,connectivity_cell,connectivity_gps,connectivity_infrared,connectivity_wifi,description,display_screenResolution,display_screenSize,display_touchScreen,hardware_accelerometer,hardware_audioJack,hardware_cpu,hardware_fmRadio,hardware_physicalKeyboard,hardware_usb,identifier,images,name,sizeAndWeight_dimensions,sizeAndWeight_weight,storage_flash,storage_ram) VALUES ('MOTOBLUR-enabled; battery manager; seven home screens; customize by moving or resizing widgets; Android HTML WebKit w/Flash Lite; BACKTRACK™ navigation pad behind screen','Android 2.1',NULL,'MOTOBLUR,Telus','267 hours','5 hours','Lithium Ion (Li-Ion) (1170 mAH)','Video','3.0 megapixels','Bluetooth 2.0','WCDMA 1700/2100, GSM 850/900/1800/1900, HSDPA 3.6 Mbps (Category 5/6), EDGE Class 12, GPRS Class 12','True','False','802.11 b/g','Motorola CHARM fits easily in your pocket or palm. Includes MOTOBLUR so you can sync and merge your contacts, emails, messages and posts with continuous updates and back-ups.','QVGA (320 x 240)','2.8 inches','True','True','3.5mm','600 MHz','False','True','USB 2.0','motorola-charm-with-motoblur','img/phones/motorola-charm-with-motoblur.2.jpg','Motorola CHARM™ with MOTOBLUR™','11.4 mm (d)','110.0 grams','150MB','512MB');

INSERT INTO webshop.phones_images VALUES (1, 1, 'img/phones/droid-pro-by-motorola.1.jpg');
INSERT INTO webshop.phones_images VALUES (2, 1, 'img/phones/droid-pro-by-motorola.0.jpg');
INSERT INTO webshop.phones_images VALUES (3, 2, 'img/phones/dell-venue.0.jpg');
INSERT INTO webshop.phones_images VALUES (4, 2, 'img/phones/dell-venue.1.jpg');
INSERT INTO webshop.phones_images VALUES (5, 2, 'img/phones/dell-venue.2.jpg');
INSERT INTO webshop.phones_images VALUES (6, 2, 'img/phones/dell-venue.3.jpg');
INSERT INTO webshop.phones_images VALUES (7, 2, 'img/phones/dell-venue.4.jpg');
INSERT INTO webshop.phones_images VALUES (8, 2, 'img/phones/dell-venue.5.jpg');
INSERT INTO webshop.phones_images VALUES (9, 3, 'img/phones/dell-venue.0.jpg');
INSERT INTO webshop.phones_images VALUES (10, 3, 'img/phones/droid-2-global-by-motorola.0.jpg');
INSERT INTO webshop.phones_images VALUES (11, 3, 'img/phones/droid-2-global-by-motorola.1.jpg');
INSERT INTO webshop.phones_images VALUES (12, 3, 'img/phones/droid-2-global-by-motorola.2.jpg');
INSERT INTO webshop.phones_images VALUES (15, 5, 'img/phones/lg-axis.0.jpg');
INSERT INTO webshop.phones_images VALUES (16, 5, 'img/phones/lg-axis.1.jpg');
INSERT INTO webshop.phones_images VALUES (17, 5, 'img/phones/lg-axis.2.jpg');
INSERT INTO webshop.phones_images VALUES (18, 6, 'img/phones/motorola-atrix-4g.0.jpg');
INSERT INTO webshop.phones_images VALUES (19, 6, 'img/phones/motorola-atrix-4g.1.jpg');
INSERT INTO webshop.phones_images VALUES (20, 6, 'img/phones/motorola-atrix-4g.2.jpg');
INSERT INTO webshop.phones_images VALUES (21, 6, 'img/phones/motorola-atrix-4g.3.jpg');
INSERT INTO webshop.phones_images VALUES (22, 7, 'img/phones/motorola-bravo-with-motoblur.0.jpg');
INSERT INTO webshop.phones_images VALUES (23, 7, 'img/phones/motorola-bravo-with-motoblur.1.jpg');
INSERT INTO webshop.phones_images VALUES (24, 7, 'img/phones/motorola-bravo-with-motoblur.2.jpg');

*/
