const { createProxyMiddleware } = require('http-proxy-middleware');
module.exports = (app) => {
    app.use(createProxyMiddleware('/verification', {
                target: 'https://tlef4axl3c.execute-api.ap-south-1.amazonaws.com/stage_/login',
                changeOrigin: true
            })
            );
  /*  app.use(createProxyMiddleware('/adduser', {
                target: 'https://tlef4axl3c.execute-api.ap-south-1.amazonaws.com/stage_/register',
                changeOrigin: true
            })
            );
    app.use(createProxyMiddleware('/addorder', {
                target: 'https://tlef4axl3c.execute-api.ap-south-1.amazonaws.com/stage_/order',
                changeOrigin: true
            })
            );
    app.use(createProxyMiddleware('/addfeedback', {
                target: 'https://tlef4axl3c.execute-api.ap-south-1.amazonaws.com/stage_/feedback',
                changeOrigin: true
            })
            );*/
        } 