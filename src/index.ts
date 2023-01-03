import './index.html';
import 'reset-css';
import 'bootstrap/dist/css/bootstrap.min.css';
import './global.scss';
import initRouter from './rout';
import start from './controller/controller';
// import start from './controller/controllerBasket';

initRouter();
start();
