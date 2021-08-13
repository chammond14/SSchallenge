import express from 'express';
import cors from 'cors';
import { redirectInvalidRoute } from './middleware/requestValidation';

import routes from './Routes';

const app: express.Express = express();

app.use(cors());
app.use(express.static(__dirname));
app.use(express.json());

app.use(routes);
app.use(redirectInvalidRoute);

const port: number = 3000;
app.listen(port, (() => {
  console.log('Server', process.pid, 'listening on port', port);
}));
