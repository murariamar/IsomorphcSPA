import express from 'express';
import cors from 'cors';
import path from 'path';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import router from './routes';

const app = express();

app.use(cors());

app.use(bodyParser.json());
app.use(cookieParser());
app.set('views', path.join(__dirname, '../', 'views'));
app.set('view engine', 'pug');
app.use(express.static('public'));
app.use(router);

app.listen(3001, () => {
  console.log('server is listening on port 3001');
});
