"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const bodyParser = require("body-parser");
const cors = require("cors");
const express = require("express");
const logger = require("morgan");
const path = require("path");
const swaggerUi = require("swagger-ui-express");
const errorHandler = require("errorhandler");
const methodOverride = require("method-override");
const index_1 = require("./routes/index");
const books_store_1 = require("./books-store");
const books_1 = require("./routes/books");
const notifications_1 = require("./routes/notifications");
const routes_1 = require("./graphql/routes");
const fake_bearer_middleware_1 = require("./fake-bearer-middleware");
const notification_service_1 = require("./notification-service");
var fs = require('fs');
class Server {
    static bootstrap() {
        return new Server();
    }
    constructor() {
        this.app = express();
        this.config();
        this.routes();
    }
    config() {
        this.app.use(express.static(path.join(__dirname, "public")));
        this.app.set("views", path.join(__dirname, "views"));
        this.app.set("view engine", "pug");
        this.app.use(logger("dev"));
        this.app.use(cors({
            methods: ['GET', 'HEAD', 'PUT', 'PATCH', 'POST', 'DELETE', 'OPTIONS']
        }));
        this.app.use(bodyParser.json());
        this.app.use(bodyParser.urlencoded({
            extended: true
        }));
        this.app.use(methodOverride());
        this.app.use(function (err, req, res, next) {
            err.status = 404;
            next(err);
        });
        this.app.use(errorHandler());
        let swaggerJson = {
            schemes: ''
        };
        if (fs.existsSync('../public/swagger.json')) {
            swaggerJson = require('../public/swagger.json');
        }
        if (fs.existsSync('./public/swagger.json')) {
            swaggerJson = require('./public/swagger.json');
        }
        if (this.app.get('env') === 'development') {
            swaggerJson.schemes = 'http';
        }
        const options = {
            explorer: false,
            customCss: `.swagger-ui .information-container {
        background: url(/images/monkey-thinking.svg) no-repeat scroll right top;
        background-size: contain;
      }`
        };
        this.app.use('/swagger-ui', swaggerUi.serve, swaggerUi.setup(swaggerJson, options));
    }
    routes() {
        const store = new books_store_1.BooksStore();
        const notificationService = new notification_service_1.NotificationService();
        const booksRouter = express.Router();
        books_1.BooksRoute.create(booksRouter, store, notificationService);
        const graphQLRouter = express.Router();
        routes_1.GraphQLRoute.create(graphQLRouter, store);
        const notificationsRouter = express.Router();
        notifications_1.NotificationsRoute.create(notificationsRouter, notificationService);
        const router = express.Router();
        index_1.IndexRoute.create(router);
        this.app.use('/book', booksRouter);
        this.app.use('/books', booksRouter);
        this.app.use('/secure/book', fake_bearer_middleware_1.fakeBearerMiddleware, booksRouter);
        this.app.use('/secure/books', fake_bearer_middleware_1.fakeBearerMiddleware, booksRouter);
        this.app.use('/graphql', graphQLRouter);
        this.app.use('/notifications', notificationsRouter);
        this.app.use(router);
    }
}
exports.Server = Server;
//# sourceMappingURL=server.js.map