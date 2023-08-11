const {createProxyMiddleware} = require('http-proxy-middleware');

module.exports = function (app) {
    app.use(
        '/api',
        createProxyMiddleware({
            target: 'https://datacollection.education.vermont.gov',
            changeOrigin: true,
            pathRewrite: {
                '^/api': '/api/lists',
            },
        })
    );
};