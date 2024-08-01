const express = require('express');
const routes = require('./router');
const cookieParser = require('cookie-parser');
const { default: mongoose } = require('mongoose');
const { attachUserInRequest } = require('./middlewares/userMiddleware');
const cors = require('cors');

const handlebars = require('express-handlebars');
const path = require('path');

const server = express();

// server.use('/static', express.static(path.join(__dirname, 'static')));
// //console.log(path.join(__dirname, 'static'));
// server.use(express.urlencoded({ extended: false }));
// server.set('view engine', 'hbs');
// server.engine('hbs', handlebars.engine({
//     extname: 'hbs',
// }));


// server.use((request, response, next) => {
//     response.header('Access-Control-Allow-Origin', 'http://localhost:4200');
//     response.header("Access-Control-Allow-Credentials", "true");
//     response.header("Access-Control-Allow-Methods", "GET,HEAD,OPTIONS,POST,PUT,DELETE");
//     response.header("Access-Control-Allow-Headers", "Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers, x-authorization");
//     next();
// });
server.use(cors({
    origin: 'http://localhost:5173',
    credentials: true
  }));

server.use(express.json());
server.use(cookieParser());
server.use(attachUserInRequest);

server.use(routes);

mongoose.connect('mongodb://127.0.0.1:27017/study');
mongoose.connection.on('connected', () => console.log('Database connected'));
mongoose.connection.on('disconnected', () => console.log('Database disconnected'));
mongoose.connection.on('error', (error) => console.log(error));

// server.get('/', (request, response) => {
//     response.send('Hello');
// });

server.listen(3000);
console.log('work on port 3000');
