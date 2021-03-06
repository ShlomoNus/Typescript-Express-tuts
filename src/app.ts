import * as express from 'express';
import * as bodyParser from 'body-parser';
import * as dotenv from 'dotenv'
import * as path from 'path';

import {connect} from "mongoose";


dotenv.config({path:path.join(__dirname,'..','.env')})




class App {
  public app: express.Application;
  public port: number;
 
  constructor(controllers, port:number) {
    this.app = express();
    this.port = port;
    this.connectToDB()
    this.initializeMiddlewares();
    this.initializeControllers(controllers);
  }
 
  private initializeMiddlewares() {
    this.app.use(bodyParser.json());
  }
 
  private initializeControllers(controllers) {
    controllers.forEach((controller) => {
      this.app.use('/', controller.router);
    });
  }
 
  public listen() {
    this.app.listen(this.port, () => {
      console.log(`App listening on the port ${this.port}`);
    });
  }
  private connectToDB(){
    const {MONGO_URI}= process.env;

connect(MONGO_URI!,{useNewUrlParser:true,useUnifiedTopology:true},( err=>{
  if(err) console.log('XXXXXXXX',err,'XXXXXXXXXXXX');
  console.log('DB connected');
  
}))
  }

}
 
export default App;