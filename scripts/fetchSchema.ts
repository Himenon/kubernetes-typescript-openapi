import * as fs from "fs";
import * as path from "path";
import fetch from "node-fetch";

const outputDir = "api-spec";

const versions = ["master", "v1.22.3", "v1.15.12"];

export const getKubernetesSwaggerSchema = async (version: string): Promise<any> => {
  const url = `https://raw.githubusercontent.com/kubernetes/kubernetes/${version}/api/openapi-spec/swagger.json`;
  try {
    const res = await fetch(url);
    return res.json();
  } catch (error) {
    throw error as any;
  }
};

const main = async () => {
  fs.mkdirSync(outputDir, { recursive: true });
  const tasks = versions.map(async version => {
    const result = await getKubernetesSwaggerSchema(version);
    const filename = path.join(outputDir, `swagger-${version}.json`);
    fs.writeFileSync(filename, JSON.stringify(result, null, 2), { encoding: "utf-8" });
  });
  await Promise.all(tasks);
};

main().catch(error => {
  console.error(error);
  process.exit(1);
});
