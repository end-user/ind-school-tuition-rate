const path = require('path');

module.exports = {
    entry: {
        main: ['./src/index.tsx', './target/generated-sources/**/*.d.ts']
    },
    resolve: {
        modules: [path.resolve(__dirname, '../src'), 'node_modules'],
    },
};
