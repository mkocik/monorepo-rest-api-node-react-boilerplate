import bodyParser from 'body-parser';
import cors from 'cors';
import express from 'express';
import helmet from 'helmet';
import morgan from 'morgan';
import apiV1 from './api/index';
import {internalServerError, notFound} from '@monorepo-boilerplate/api-middlewares';
import swaggerJSDoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';
import CONFIG from '@monorepo-boilerplate/config'

const path = require('path');

class Service {
  public express: express.Application;

  constructor() {
    this.express = express();
    this.serveFrontEnd();
    this.setUpSwagger();
    this.setMiddlewares();
    this.setRoutes();
    this.catchErrors();
  }

  private setMiddlewares(): void {
    this.express.use(cors());
    this.express.use(morgan('dev'));
    this.express.use(bodyParser.json());
    this.express.use(bodyParser.urlencoded({extended: false}));
    this.express.use(helmet());
  }

  private setRoutes(): void {
    this.express.use('/' + CONFIG.API_VERSION, apiV1);
  }

  private serveFrontEnd(): void {
    this.express.get('/', (req, res) => {
      res.sendFile(path.join(__dirname, '../../frontend/build/index.html'));
    });

    this.express.use(express.static(path.join(__dirname, '../../frontend/build')));
  }

  private setUpSwagger(): void {
    const swaggerSpec = swaggerJSDoc(CONFIG.SWAGGER_OPTIONS);

    this.express.use('/' + CONFIG.API_VERSION + '/docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec, {
      explorer: true
    }))
  }

  private catchErrors(): void {
    this.express.use(notFound);
    this.express.use(internalServerError);
    this.express.use((err, req, res, next) => {
      console.error(err.stack);
      res.status(500).send('Something went wrong!!');
    });
  }
}

export default new Service().express;
