const helmet = require("helmet");
const rateLimit = require("express-rate-limit");

module.exports = function securityLoader(app) {
  app.use(helmet({ crossOriginResourcePolicy: { policy: "cross-origin" } }));

  const limiter = rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 100,
    standardHeaders: true,
  });

  app.use(limiter);
};
