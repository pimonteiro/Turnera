const neo4j = require('neo4j-driver')

const exit = process.exit;

(async () => {
    const driver = neo4j.driver(
        'bolt://localhost',
        neo4j.auth.basic('neo4j', 'admin')
    )

    driver.verifyConnectivity().then(() => exit(0)).catch(() => exit(1));
  })();
