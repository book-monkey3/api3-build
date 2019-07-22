"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const route_1 = require("./route");
class IndexRoute extends route_1.BaseRoute {
    static create(router) {
        const indexRoute = new IndexRoute();
        router.get('/', indexRoute.index.bind(indexRoute));
    }
    constructor() {
        super();
    }
    index(req, res, next) {
        this.title = 'BookMonkey 3 API';
        let options = {
            environment: req.app.get('env'),
            time: this.formatSeconds(process.uptime())
        };
        this.render(req, res, 'index', options);
    }
    formatSeconds(seconds) {
        const pad = function (s) {
            return (s < 10 ? '0' : '') + s;
        };
        const hours = Math.floor(seconds / (60 * 60));
        const minutes = Math.floor(seconds % (60 * 60) / 60);
        const secs = Math.floor(seconds % 60);
        return pad(hours) + ':' + pad(minutes) + ':' + pad(secs);
    }
}
exports.IndexRoute = IndexRoute;
//# sourceMappingURL=index.js.map