import { Request, Response, NextFunction } from 'express';
import PalindromeService from '../Services/PalindromeService';
import TopScoreService from '../Services/TopScoreService';
import { IEntry } from '../Types/IEntry';
import { IScore } from '../Types/IScore';

export default class PalindromeController {
  palindromeService: PalindromeService;

  topScoreService: TopScoreService

  constructor(palindromeService: PalindromeService, topScoreService: TopScoreService) {
    this.palindromeService = palindromeService;
    this.topScoreService = topScoreService;

    this.handleGetTopScores = this.handleGetTopScores.bind(this);
    this.handleSubmitEntry = this.handleSubmitEntry.bind(this);
  }

  public handleGetTopScores(req: Request, res: Response, next: NextFunction): void {
    try {
      const topScores: IScore[] = this.topScoreService.retrieveScores();
      res.status(200).json(topScores);
    } catch (error) {
      next(error);
    }
  }

  public handleSubmitEntry(req: Request, res: Response, next: NextFunction): void {
    try {
      const entry: IEntry = req.body;
      const thisPalindromeScore: number = this.palindromeService.validateAndScoreEntry(entry);
      if (thisPalindromeScore > 0) {
        const scoreToSave: IScore = {
          name: entry.name,
          points: thisPalindromeScore,
        };
        this.topScoreService.saveNewScore(scoreToSave);
      }
      res.status(200).json(thisPalindromeScore);
    } catch (error) {
      next(error);
    }
  }
}
