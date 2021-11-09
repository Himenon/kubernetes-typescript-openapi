import * as fs from "fs";
import * as path from "path";
import rimraf from "rimraf";
import { outputDir, versions, sourceOutputDir } from "./config";

import { CodeGenerator, Option } from "@himenon/openapi-typescript-code-generator";
import * as Templates from "@himenon/openapi-typescript-code-generator/templates";

const task = async (filename: string, outputFilename: string): Promise<void> => {
  const option: Option = {
    convertOption: {
      formatConversions: [
        {
          selector: {
            format: "int-or-string",
          },
          output: {
            type: ["number", "string"],
          },
        },
        {
          selector: {
            format: "byte",
          },
          output: {
            type: ["Blob"],
          },
        },
      ],
    },
  };
  const codeGenerator = new CodeGenerator(filename, option);
  const code = codeGenerator.generateTypeDefinition([
    codeGenerator.getAdditionalTypeDefinitionCustomCodeGenerator(),
    {
      generator: Templates.ApiClient.generator,
      option: {
        additionalMethodComment: true,
      },
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
