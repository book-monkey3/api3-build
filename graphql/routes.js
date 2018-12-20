"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const graphqlHTTP = require("express-graphql");
const schema_1 = require("./schema");
class GraphQLRoute {
    static create(router, bookStore) {
        router.use(graphqlHTTP({
            schema: schema_1.executableSchema,
            graphiql: true,
            context: {
                store: bookStore
            }
        }));
    }
}
exports.GraphQLRoute = GraphQLRoute;
//# sourceMappingURL=routes.js.map