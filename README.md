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
Una vez instaladas las dependencias, podríamos correr nuestros proyectos en local, pero antes debemos asegurarnos de que la base de datos funcione, por lo que podremos ir al archivo **server/src/app.module.ts**


Dentro de este archivo, veremos algo como 
```bash
TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3307, // Cambiar, en Mac 3307, Windows 3306 
      username: 'root',
      password: '',
      database: 'xepelinwalletapp',
      entities: [
        Accounts,
        Transactions,
      ],
      synchronize: true,
    })
```
***Importante***: Se deberá cambiar 'port' de 3307 a 3306 (En mi caso tengo configurado XAMPP con 3307, por eso la cuestión.)
También, debemos de revisar el nombre de la base de datos en 'database': 'xepelinwalletapp'.

Recomiendo crear una base de datos en nuestro cliente MySQL o desde la terminal, con el mismo nombre ***'xepelinwalletapp'***.


Ahora sí, una vez todo configurado, podemos probar nuestro cliente y servidor de la app.

Con dos terminales distintas (Sean powershell de windows, Terminal desde Mac o la terminal integrada desde VSCode)

```bash
cd server
npm run start:dev
```

```bash
cd client
npm run dev
```

Si todo funciona bien, podemos ingresar a nuestro navegador predeterminado e ingresar en la url "http://localhost:3000". De funcionar correctamente veríamos una aplicación normal, para probar el backend, podemos clickear en la navegación sobre "Ingresar" y rellenar nuestros datos para iniciar sesión.

### ¿Cómo registro mi cuenta?

Mediante el frontend podemos registrarnos en la url "http://localhost:3000/auth/register" o bien, desde el backend, realizando una petición POST hacia "http://localhost:4000/auth/register".

## BACKEND - ENDPOINTS

#### Cuentas

- GET /accounts - Recupera una lista de todas las cuentas.
- GET /accounts/:id - Recupera los detalles de una cuenta por su ID.
- GET /accounts/:id/balance - Recupera el saldo de una cuenta mediante su ID. [NUMBER]
- GET /accounts/account/:accountNumber/balance - Recupera el saldo de una cuenta mediante su número de cuenta [NUMBER]

##### Crear cuenta

- POST /accounts - Crear una cuenta nueva con los siguientes datos como entrada: 
```bash
{
  "name":  string,
  "accountNumber": number,
  "balance": number,
  "email": string,
  "password": string
}
```

##### Ingreso de cuenta (Login)
- POST /auth/login - Retorna un usuario y su access_token con los siguientes datos como entrada:
```bash
{
    "email": string,
    "password": string,
}
```

#### Transacciones / Transferencias
Las transferencias/transacciones pueden ser de 2 tipos: 
'withdrawal' -> Retiro de dinero
'deposit' -> Depósito o transferencia (a cuenta externa)

- POST /transactions - Devuelve el registro de transacción luego de realizar la operación entre 1 o más cuentas.

```json
{
    "from": number // 0 si es deposit(sucursal) - accountNumber de la cuenta si es transferencia.
    "to": number,
    "amount": number,
    "transactionType": string // "deposit"/"withdrawal"
}
```
- GET /transactions - Devuelve un array de los registros de transacciones.

- GET /transactions/:accountNumber - Devuelve un arreglo de las transacciones de un usuario por su numero de cuenta.

- GET /transactions/from/:fromAccount - Devuelve un arreglo de las transacciones que se realizaron DESDE un número de cuenta.

- GET /transactions/to/:toAccount - Devuelve un arreglo de las transacciones que se realizaron HACIA un número de cuenta.

# FINALIZAR END.