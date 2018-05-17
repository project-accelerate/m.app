import { execSync } from "child_process";
import { printSchema } from "graphql";
import { writeFileSync } from "fs";

import { configureGraphql } from "../src/config/graphql";

async function generateTypes() {
  console.log("Loading schema...")
  const schema = await configureGraphql()
  execSync("mkdir -p tmp")
  writeFileSync("tmp/.schema", printSchema(schema), "utf8")

  console.log("Generating schema.json...")
  execSync("node_modules/.bin/apollo-codegen introspect-schema tmp/.schema --output schema.json")

  console.log("Generating query type definitions")
  execSync("node_modules/.bin/apollo-codegen generate src/frontend/**/*.graphql --schema schema.json --target typescript --output src/frontend/queries.ts")
}

generateTypes()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error)
    process.exit(1)
  })
