import TopScoreService from '../src/Services/TopScoreService';
import { validScoreToSave, fullHighScoresList, validButLowScore } from './mockData/mockPalindromeData';

describe('TopScoreService', () => {
  describe('Testing Method: saveNewScore', () => {
    test('Submitting a valid palindrome when high scores are empty will add it to the list', () => {
      const topScoreService = new TopScoreService();

      try {
        topScoreService.saveNewScore(validScoreToSave);
        const savedScores = topScoreService.retrieveScores();
        expect(savedScores).toHaveLength(1);
        expect(savedScores).toContain(validScoreToSave);
      } catch (error) {
        expect(error).toEqual('Should not reach here');
      }
    });

    test('Submitting a valid palindrome when high scores are full will add it to the list in the correct position', () => {
      const topScoreService = new TopScoreService();
      topScoreService.topScores = fullHighScoresList;

      try {
        topScoreService.saveNewScore(validScoreToSave);
        const savedScores = topScoreService.retrieveScores();
        expect(savedScores).toHaveLength(5);
        // Mock entry will be entered in the second position in the mock high score list
        expect(savedScores[2]).toBe(validScoreToSave);
      } catch (error) {
        expect(error).toEqual('Should not reach here');
      }
    });

    test('Submitting a palindrome with score lower than the current high scores will not add it to the list', () => {
      const topScoreService = new TopScoreService();
      topScoreService.topScores = fullHighScoresList;
      topScoreService.currentLowestScore = fullHighScoresList[4].points;

      try {
        topScoreService.saveNewScore(validButLowScore);
        const savedScores = topScoreService.retrieveScores();
        expect(savedScores).toHaveLength(5);
        expect(savedScores).toEqual(fullHighScoresList);
        expect(savedScores).not.toContain(validButLowScore);
      } catch (error) {
        expect(error).toEqual('Should not reach here');
      }
    });

    test('If getIndexToInsertValue returns -1, an error is thrown', () => {
      const topScoreService = new TopScoreService();
      topScoreService.topScores = fullHighScoresList;

      const getIndexFunction = jest.spyOn(TopScoreService.prototype as any, 'getIndexToInsertValue');
      getIndexFunction.mockImplementation(() => -1);

      try {
        topScoreService.saveNewScore(validScoreToSave);
        expect(true).toEqual('Should not reach here');
      } catch (error) {
        expect(error.message).toEqual('Could not save high score!');
      }
    });
  });

  describe('Testing Method: retrieveScores', () => {
    test('Retrieving high scores returns a list of high scores', () => {
      const topScoreService = new TopScoreService();
      topScoreService.topScores = fullHighScoresList;

      try {
        const savedScores = topScoreService.retrieveScores();
        expect(savedScores).toHaveLength(5);
        expect(savedScores).toEqual(fullHighScoresList);
      } catch (error) {
        expect(error).toEqual('Should not reach here');
      }
    });
  });
});
