import { Kind } from "graphql";
import { scalarType } from "nexus";

export const DateScalar = scalarType({
  name: "dateTime",
  asNexusMethod: "dateTime",
  description: "Date custom scalar type",
  parseValue(value) {
    const date = new Date(value);
    return date.getTime();
  },
  serialize(value) {
    return new Date(value);
  },
  parseLiteral(ast) {
    if (ast.kind === Kind.INT) {
      return new Date(ast.value);
    }
    return null;
  },
});