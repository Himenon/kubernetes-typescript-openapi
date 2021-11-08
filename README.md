# @himenon/kubernetes-typescript-openapi

```bash
yarn add -D @himenon/kubernetes-typescript-openapi
```

## Usage

```ts
import * as fs from "fs";
import * as yaml from "js-yaml"; // yarn add js-yaml @types/js-yaml
import type { Schemas } from "@himenon/kubernetes-typescript-openapi/v1.22.3";

const podTemplateSpec: Schemas.io$k8s$api$core$v1$PodTemplateSpec = {
  metadata: {
    labels: {
      app: "nginx",
    },
  },
  spec: {
    containers: [
      {
        name: "nginx",
        image: "nginx:1.14.2",
        ports: [
          {
            containerPort: 80,
          },
        ],
      },
    ],
  },
};

const deployment: Schemas.io$k8s$api$apps$v1$Deployment = {
  apiVersion: "apps/v1",
  kind: "Deployment",
  metadata: {
    name: "nginx-deployment",
    labels: {
      app: "nginx",
    },
  },
  spec: {
    replicas: 3,
    selector: {
      matchLabels: {
        app: "nginx",
      },
    },
    template: podTemplateSpec,
  },
};

const text = yaml.dump(deployment, { noRefs: true, lineWidth: 144 });
fs.writeFileSync("deployment.yml", text, "utf-8");
```

## Build

```ts
yarn run build
```

## OpenAPI Source for Kubernetes

- <https://github.com/kubernetes/kubernetes/blob/master/api/openapi-spec/swagger.json>

## OpenAPI TypeScript Code Generator

- [@himenon/openapi-typescript-code-generator](https://github.com/Himenon/openapi-typescript-code-generator)

You can also just use the type definition

## Use Another Version

Edit [config.ts](./scripts/config.ts)

## LICENCE

[@Himenon/kubernetes-typescript-openapi](https://github.com/Himenon/kubernetes-typescript-openapi)・MIT
