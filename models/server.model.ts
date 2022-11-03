import express, { Application } from 'express';
import userRoutes from '../routes/users.routes';
import cors from 'cors';
import db from '../db/connection';

class Server {

  private app: Application;
  private port: string;
  private paths = {
    users: '/api/users'
  };

  constructor(){
    this.app = express();
    this.port = process.env.PORT|| '8000';

    this.dbConnection();
    this.middlewares();
    //definir mis rutas
    this.routes();
  }

  //conectar base de datos
  async dbConnection(){

    try {
      await db.authenticate();
      console.log('database online')

    } catch (error) {
      throw new Error(String(error))
    }
  }

  middlewares(){
    //Cors
    this.app.use(cors());
    
    //Lectura del body
    this.app.use(express.json());

    //Carpeta publica
    this.app.use(express.static('public'));
  }

  routes(){
    this.app.use(this.paths.users, userRoutes)
  }

  listen(){
    this.app.listen(this.port, () => {
      console.log(`Server started on port ${this.port}`)
    })
  }

}

export default Server;