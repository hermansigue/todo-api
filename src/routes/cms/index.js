const router = require('express').Router();
const qs = require('qs');
const { authenticated } = require('@middlewares/authentication');
const DashboardController = require('@modules/cms/dashboard/controllers/dashboard.controller');
const TodoController = require('@modules/cms/todo/controllers/todo.controller');
const AuthController = require('@modules/cms/auth/controllers/auth.controller');

/**
 * Async handler to reduce try-catch repetition
 * It also extracts path param if exists (e.g., :id or :slug)
 */
const asyncHandler =
  (handler, paramName = null) =>
    async (req, res, next) => {
      try {
        if (req?.query) {
          req.query = qs.parse(req._parsedUrl.query);
        }

        const paramValue = paramName ? req.params[paramName] : undefined;
        const result = await handler(req, paramValue);
        res.status(200).json(result);
      } catch (err) {
        next(err);
      }
    };

const cmsPath = '/api/v1/cms';
const cmsRoutes = [
  {
    path: 'dashboard',
    endPoint: [
      { path: 'get-quote', method: 'get', class: DashboardController.getQuote, middlewares: [authenticated] },
    ],
  },
  {
    path: 'todo',
    endPoint: [
      { path: '', method: 'get', class: TodoController.findAll, middlewares: [authenticated] },
      { path: ':id', method: 'get', class: TodoController.findOne, middlewares: [authenticated] },
      { path: '', method: 'post', class: TodoController.create, middlewares: [authenticated] },
      { path: ':id', method: 'put', class: TodoController.update, middlewares: [authenticated] },
      { path: ':id/status', method: 'put', class: TodoController.updateStatus, middlewares: [authenticated] },
      { path: ':id', method: 'delete', class: TodoController.destroy, middlewares: [authenticated] },
    ],
  },
  {
    path: 'auth',
    endPoint: [
      { path: 'login', method: 'post', class: AuthController.login },
      { path: 'register', method: 'post', class: AuthController.register },
      { path: 'logged', method: 'get', class: AuthController.loggedUser, middlewares: [authenticated] },
    ],
  },
];

cmsRoutes.forEach((cmsRoute) => {
  cmsRoute.endPoint.forEach((route) => {
    console.log(
      '\x1b[32mMapping Route\x1b[0m',
      `${({ GET: '\x1b[34m', POST: '\x1b[32m', PUT: '\x1b[36m', PATCH: '\x1b[35m', DELETE: '\x1b[31m' }[route.method.toUpperCase()] || '\x1b[37m')}[${route.method.toUpperCase()}]\x1b[0m`,
      `\x1b[33m${cmsPath}/${cmsRoute.path}/${route.path}\x1b[0m`
    );
    
    const finalPath = `/${cmsRoute.path}/${route.path}`;

    // Detect if there's a route param (e.g., :id, :slug)
    // const paramMatch = route.path.match(/^:(\w+)$/); // only match simple `:param`
    const paramMatch = route.path.match(/^:(\w+)/);
    const paramName = paramMatch ? paramMatch[1] : null;

    const middlewares = route.middlewares || [];
    switch (route.method) {
    case 'get':
      router.get(
        finalPath,
        ...middlewares,
        asyncHandler(route.class, paramName),
      );
      break;
    case 'post':
      router.post(
        finalPath,
        ...middlewares,
        asyncHandler(route.class, paramName),
      );
      break;
    case 'put':
      router.put(
        finalPath,
        ...middlewares,
        asyncHandler(route.class, paramName),
      );
      break;
    case 'delete':
      router.delete(
        finalPath,
        ...middlewares,
        asyncHandler(route.class, paramName),
      );
      break;
    }
  });
});

module.exports = router;
