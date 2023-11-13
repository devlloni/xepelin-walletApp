# XepelinApp

Este es un proyecto de prueba técnica para la empresa Xepelin. Consta con un servidor backend en NestJS, base de datos MySQL y un cliente frontend NextJS (Typescript)

Basicamente es una aplicación que simula una entidad bancaria, dandole manejo al usuario de su dinero.

Consta con funcionalidades básicas como creación de cuenta, log-in, autenticación, ingreso y extracción de dinero, y transferencia entre cuentas. Además de esto, mediante el frontend se puede ejecutar cada consulta y verificar las transacciones realizadas de una manera user-friendly.

### Prerrequisitos

Qué cosas necesitas instalar el software y cómo instalarlas.

```bash
node.js (versión +18.0)
npm
XAMPP (O algun servidor MySQL)
```

## Empezando

Para comenzar a usar/probar la app, debemos clonar el repositorio mediante el comando
```bash
git clone https://github.com/devlloni/xepelin-walletApp.git
```

Una vez bajado el repo, necesitamos instalar las dependencias de cada proyecto (Frontend & Backend)

Para ello, ingresaremos a nuestro repositorio vía terminal
```bash
cd xepelin-walletApp/
```
y dentro del directorio, encontraremos dos carpetas, 'client' y 'server'. (Siendo client el frontend, nextjs, y server el backend, nestjs)
Al ingresar en cada carpeta, utilizaremos el comando **npm install**
```bash
cd client
npm install
```
```bash
cd server
npm install
```
