import { Request, Response, NextFunction } from 'express';

// Redirect any invalid routes to homepage
export const redirectInvalidRoute = ((req: Request, res: Response) => {
  res.redirect('/');
});

// Middleware to ensure requests to submitEntry contain correct param names and not-null values
export const validateSubmitReq = ((req: Request, res: Response, next: NextFunction) => {
  const body = { ...req.body };
  if (!body.name || !body.word) {
    res.status(400).json('Invalid request - missing parameters');
  }
  next();
});

// Reject requests to valid endpoints with an invalid http action
export const invalidHttpAction = ((req: Request, res: Response, next: NextFunction) => {
  res.status(405).json('Method Not Allowed');
});
