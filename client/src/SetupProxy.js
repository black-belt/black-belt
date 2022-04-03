// const { createProxyMiddleware } = require("http-proxy-middleware");

// module.exports = (app) => {
//   app.use(
//     "/api",
//     createProxyMiddleware({
//       target: process.env.REACT_APP_SERVER_URL,
//       changeOrigin: true,
//     })
//   );
//   app.use(
//     "/ws-stomp",
//     createProxyMiddleware({
//       target: process.env.REACT_APP_SERVER_URL,
//       ws: true,
//     })
//   );
// };
