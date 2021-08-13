import { IScore } from '../Types/IScore';
import { maxLeaderboardSize } from '../config';

export default class TopScoreService {
  topScores: IScore[];

  currentLowestScore: number;

  constructor() {
    this.topScores = [];
    this.currentLowestScore = 0;
  }

  public saveNewScore(score: IScore): void {
    if (this.topScores.length === 0) {
      this.topScores.push(score);
      this.currentLowestScore = score.points;
    } else {
      if (score.points > this.currentLowestScore || this.topScores.length < maxLeaderboardSize) {
        const indexToInsert = this.getIndexToInsertValue(score.points);
        if (indexToInsert >= 0) {
          // Splice the array to insert the current score in the correct index
          this.topScores.splice(indexToInsert, 0, score);

          // Remove the score that has been knocked to 6th place
          if (this.topScores.length > maxLeaderboardSize) {
            this.topScores.splice(maxLeaderboardSize);
          }

          // Update the lowest value to be the value of the last element in the array
          this.currentLowestScore = this.topScores[this.topScores.length - 1].points;
        } else {
          throw new Error('Could not save high score!');
        }
      }
    }
  }

  public retrieveScores(): IScore[] {
    return this.topScores;
  }

  // Given the small size of the array, linear search will suffice
  private getIndexToInsertValue(value: number): number {
    const topScoresLength = this.topScores.length;

    for (let i = 0; i < topScoresLength; i++) {
      if (value > this.topScores[i].points) {
        return i;
      }
    }

    return topScoresLength < maxLeaderboardSize ? topScoresLength : -1;
  }
}
