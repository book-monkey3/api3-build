"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const graphql_tools_1 = require("graphql-tools");
const resolvers_1 = require("./resolvers");
const types_1 = require("./types");
exports.executableSchema = graphql_tools_1.makeExecutableSchema({
    typeDefs: types_1.typeDefs,
    resolvers: resolvers_1.resolvers,
});
//# sourceMappingURL=schema.js.map