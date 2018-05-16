process.on('unhandledRejection', (err) => {
  process.stderr.write(err.message + `\n`);
  process.stderr.write(err.stack + `\n`);
  process.exit(1)
})

require('ts-node').register({ transpileOnly: true });
require('winston').level = 'debug';
require('../config/web').configureWeb();