set -e

until $(node bin/testNeo4j.js); do echo '=> Waiting for Neo4j to start...'; sleep 2; done

exec "$@"
