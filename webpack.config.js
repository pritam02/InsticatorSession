const path = require('path');

module.exports = {
    entry: './src/app/app.js',
    output: {
        filename: 'insticator_session_bundle.js',
        path: path.resolve(__dirname, 'dist'),
    },
    target: ['web', 'es5'],
    module: {
        rules: [
            {
                test: /\.(js)$/,
                exclude: /node_modules/,
                use: "babel-loader",
            },
        ],
    }
};
