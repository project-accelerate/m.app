import { createDockerUp } from "./utils/docker";
import { createShellCmd } from "./utils/shell";

const baseDockerfile = "backend/docker/docker-compose.yml"
const devDockerfile = "backend/docker/docker-compose.development.yml"

export function developBackend() {
  const up = createDockerUp([baseDockerfile, devDockerfile])
  up()
}

export function developFrontend() {
  const reactStatic = createShellCmd('react-static', { cwd: "frontend/web" })
  reactStatic("start")
}

export function preview() {
  const up = createDockerUp([baseDockerfile])
  up()
}
