import jsonServer from 'json-server';
import jwt from 'jsonwebtoken';
import type { Data } from './types';

const PORT = process.env.PORT || 3000;
const JWT_SECRET_KEY = process.env.JWT_SECRET_KEY || 'MySecretKey';

const server = jsonServer.create();
const router = jsonServer.router<Data>('server/db.json');
const middlewares = jsonServer.defaults();

server.use(middlewares);
server.use(jsonServer.bodyParser);

server.post('/login', (req, res) => {
  const { login, password } = req.body;
  const user = router.db.get('users').find({ login }).value();
  if (user) {
    if (user.password === password) {
      const accessToken = jwt.sign({ login, password }, JWT_SECRET_KEY);
      res.status(200).json({
        accessToken,
        user: { id: user.id, login: user.login, fullName: user.fullName, role: user.role }
      });
    } else {
      const status = 401;
      const message = 'Incorrect password';
      res.status(status).json({ status, message });
    }
  } else {
    const status = 401;
    const message = 'Incorrect login';
    res.status(status).json({ status, message });
  }
});

server.delete('/logout', (_req, res) => {
  res.sendStatus(200);
});

// Checking for the authorization header on all endpoints except /login
server.use(/^(?!\/login).*$/, (req, res, next) => {
  if (
    req.headers.authorization === undefined ||
    req.headers.authorization.split(' ')[0] !== 'Bearer'
  ) {
    const status = 401;
    const message = 'Error in authorization format';
    res.status(status).json({ status, message });
    return;
  }
  try {
    const token = req.headers.authorization.split(' ')[1];
    const verifyTokenResult = jwt.verify(token, JWT_SECRET_KEY, (err, decode) =>
      decode !== undefined ? decode : err
    ) as any;

    if (verifyTokenResult instanceof Error) {
      const status = 401;
      const message = 'Access token not provided';
      res.status(status).json({ status, message });
      return;
    }
    next();
  } catch (err) {
    const status = 401;
    const message = 'Error access token is revoked';
    res.status(status).json({ status, message });
  }
});

server.use(router);
server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
