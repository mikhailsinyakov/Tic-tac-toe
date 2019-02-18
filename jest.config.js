const path = require('path');

module.exports = {
    "moduleNameMapper": {
        '^@components(.*)$': path.resolve(__dirname, 'src', 'components', '$1'),
        '^@app(.*)$': path.resolve(__dirname, 'app', '$1'),
        '^@lib(.*)$': path.resolve(__dirname, 'src', 'lib', '$1')
    }
};