import * as bodyParser from "body-parser";
import cookieParser = require("cookie-parser");
import express = require("express");
import logger = require("morgan");
import * as path from "path";
import errorHandler = require("errorhandler");

import  ShortUrlRoute  from "./routes/shorturlroute";
import { redisCache } from "./cache/redis"
import { DatabaseProvider } from "./db/databaseprovider";
import { unCoughtErrorHandler } from "./exception/errorcode"

/**
 * The server.
 *
 * @class Server
 */
export class Server {

  public app: express.Application;
  /**
   * Bootstrap the application.
   *
   * @class Server
   * @method bootstrap
   * @static
   * @return {ng.auto.IInjectorService} Returns the newly created injector for this app.
   */
  public static bootstrap(): Server {
    return new Server();
  }

  /**
   * Constructor.
   *
   * @class Server   
   * @constructor
   */
  constructor() {
    //create expressjs application
    this.app = express();

    //configure application
    this.config();

    //add routes
    this.routes();
  }


  /**
   * Configure application
   *
   * @class Server
   * @method config
   */
  public config() {
    //add static paths
    this.app.use(express.static(path.join(__dirname, "public")));

    //configure pug
    this.app.set("views", path.join(__dirname, "views"));
    this.app.set("view engine", "pug");

    //mount logger
    this.app.use(logger("dev"));

    //mount json form parser
    this.app.use(bodyParser.json());

    //mount query string parser
    this.app.use(bodyParser.urlencoded({
      extended: true
    }));

    //mount cookie parser middleware
    this.app.use(cookieParser("SECRET_GOES_HERE"));

    //error handling
    this.app.use(unCoughtErrorHandler);
  }

  /**
   * Create and return Router.
   *
   * @class Server
   * @method routes
   * @return void
   */
  private routes() {
    let router: express.Router;
    router = express.Router();

    //use router middleware
    this.app.use(ShortUrlRoute);
  }

  public static async InitServer() {
    await Promise.all([redisCache.initCache(), DatabaseProvider.InitDB()]);
  }

  public static async UnitServer() {
    await Promise.all([redisCache.UnitCache(), DatabaseProvider.UnitDB()]);
  }
}

