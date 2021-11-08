import * as fs from "fs";
import * as path from "path";
import rimraf from "rimraf";
import { outputDir, versions, sourceOutputDir } from "./config";

import { CodeGenerator } from "@himenon/openapi-typescript-code-generator";
import * as Templates from "@himenon/openapi-typescript-code-generator/templates";

const task = async (filename: string, outputFilename: string): Promise<void> => {
  const codeGenerator = new CodeGenerator(filename);
  const code = codeGenerator.generateTypeDefinition([
    codeGenerator.getAdditionalTypeDefinitionCustomCodeGenerator(),
    {
      generator: Templates.ApiClient.generator,
      option: {},
    },
  ]);
  fs.writeFileSync(outputFilename, code, { encoding: "utf-8" });
};

const main = async () => {
  rimraf.sync(sourceOutputDir);
  fs.mkdirSync(sourceOutputDir, { recursive: true });
  versions.map(version => {
    const openapiSchemaFilename = path.join(outputDir, `openapi-${version}.json`);
    const outputFilename = path.join(sourceOutputDir, `${version}.ts`);
    task(openapiSchemaFilename, outputFilename);
  });
};

main().catch(error => {
  console.error(error);
  process.exit(1);
});
