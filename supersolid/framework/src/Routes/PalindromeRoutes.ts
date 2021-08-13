import { Router } from 'express';
import { validateSubmitReq, invalidHttpAction } from '../middleware/requestValidation';

import PalindromeController from '../Controllers/PalindromeController';
import PalindromeService from '../Services/PalindromeService';
import TopScoreService from '../Services/TopScoreService';

const palindromeRouter: Router = Router();

const palindromeService: PalindromeService = new PalindromeService();
const topScoreService: TopScoreService = new TopScoreService();

const palindromeController: PalindromeController = new PalindromeController(palindromeService, topScoreService);

palindromeRouter
  .route('/getScores')
  .get(palindromeController.handleGetTopScores)
  .all(invalidHttpAction);

palindromeRouter
  .route('/submitEntry')
  .post(validateSubmitReq, palindromeController.handleSubmitEntry)
  .all(invalidHttpAction);

export default palindromeRouter;
