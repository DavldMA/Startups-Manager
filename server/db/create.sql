alter user 'root'@'localhost' identified with mysql_native_password by 'xdxdxd';
flush privileges;

CREATE DATABASE IF NOT EXISTS restproject;
USE restproject;

CREATE TABLE Startup (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nome VARCHAR(255) NOT NULL
);

CREATE TABLE Utilizador (
    id INT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(50) UNIQUE NOT NULL,
    password VARCHAR(100) NOT NULL,
    role VARCHAR(50)
);

CREATE TABLE Favoritos (
    id_utilizador INT,
    id_startup INT,
    FOREIGN KEY (id_utilizador) REFERENCES Utilizador(id),
    FOREIGN KEY (id_startup) REFERENCES Startup(id)
);
