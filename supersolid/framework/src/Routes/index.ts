import {
  NextFunction, Request, Response, Router,
} from 'express';

import palindromeRouter from './PalindromeRoutes';

const router: Router = Router();

router
  .route('/')
  .all((req: Request, res: Response, next: NextFunction) => {
    res.render('../index.html');
  });

router.use('/api', palindromeRouter);

export default router;
