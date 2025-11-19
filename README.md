# Archivo de lectura para la inicializacion del proyecto

## Este Proyecto cuenta con una conexion a supabase que hace de api, servidor, storage y authenticacion

### Pasos a seguir:
    1- git clone del repositorio
    2- npm install - Instalacion de las dependencias
    3- crear un archivo .env con la copia de .env.template que trenda las credenciales de conexion de supabase


## Creacion de tablas en SQL Editor de Supabase

### Creamos la tabla usuarios que va a tener asodicado el rol y el id es igual al auth user de supabase
create Table usuarios (
    id uuid references auth.users(id) on delete cascade primary key
    rol text check (rol in ('admin', 'empleado')) not null default 'empleado'
)

### Creamos la tabla clientes 
create Table cliente (
    id uuid primary key
    nombre text not null
    telefono text
    dni text 
    domicilio text
    localidad text
    creado_en timestamptz default now()
)

### Creamos la tabla egreso
create table egreso (
    id uuid primary key
    importe numeric not null
    descripcion text not null
    tipoegresoid uuid references "tipoEgreso"(id) not null
    usuarioid uuid references "usuarios"(id) not null
    creado_en timestamptz default now()
)

### Creamos la tabla habitacion
create table habitacion (
    id uuid primary key
    nombre text not null
    tipo text
    capacidad numeric
    creado_en timestamptz default now()
)

### Creamos la tabla precio
create table precio (
    id uuid primary key
    base numeric not null
    aumento numeric not null
    division numeric not null
    creado_en timestamptz default now()
    actualizado_en timestamptz default now()
)

### Creamos la tabla reserva
create table reserva (
    id uuid primary key
    idcliente uuid references cliente(id)
    checkin timestamptz default now()
    checkout timestamptz default now()
    importe numeric not null
    habitacionid references habitacion(id)
    creado_en timestamptz default now()
    cant_personas numeric
    usuarioid uuid references usuarios(id)
    color text default #459d25
)