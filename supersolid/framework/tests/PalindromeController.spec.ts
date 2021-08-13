import { Request } from 'jest-express/lib/request';
import { Response } from 'jest-express/lib/response';

import PalindromeController from '../src/Controllers/PalindromeController';
import PalindromeService from '../src/Services/PalindromeService';
import TopScoreService from '../src/Services/TopScoreService';

import { validPalindromeEntry, fullHighScoresList } from './mockData/mockPalindromeData';

let request: Request;
let response: Response;

jest.mock('../src/Services/PalindromeService');
jest.mock('../src/Services/TopScoreService');

const PalindromeServiceMock = PalindromeService as jest.MockedClass<typeof PalindromeService>;
const TopScoreServiceMock = TopScoreService as jest.MockedClass<typeof TopScoreService>;

describe('PalindromeController', () => {
  // Mocks for tests
  const onNextMock = jest.fn();

  beforeEach(() => {
    request = new Request();
    response = new Response();
  });

  describe('Testing Method: handleSubmitEntry', () => {
    test('Submit a valid palindrome returns the expected 200 response', () => {
      const pointsScored = validPalindromeEntry.word.length;
      PalindromeServiceMock.prototype.validateAndScoreEntry = jest.fn()
        .mockImplementation(() => pointsScored);
      TopScoreServiceMock.prototype.saveNewScore = jest.fn().mockImplementation();

      const mockPalindromeService = new PalindromeServiceMock();
      const mockTopScoreService = new TopScoreServiceMock();

      const palindromeController = new PalindromeController(mockPalindromeService, mockTopScoreService);

      request.body = validPalindromeEntry;

      try {
        palindromeController.handleSubmitEntry(request as any, response as any, onNextMock);
        expect(mockPalindromeService.validateAndScoreEntry).toBeCalledTimes(1);
        expect(mockPalindromeService.validateAndScoreEntry).toBeCalledWith(validPalindromeEntry);
        expect(response.status).toBeCalledWith(200);
        expect(response.json).toBeCalledWith(pointsScored);
      } catch (error) {
        expect(error).toEqual('Should not reach here');
      }
    });

    test('Next is called with an error if validateScoreAndEntry throws one', () => {
      PalindromeServiceMock.prototype.validateAndScoreEntry = jest.fn()
        .mockImplementation(() => { throw new Error('Unexpected error'); });
      TopScoreServiceMock.prototype.saveNewScore = jest.fn().mockImplementation();

      const mockPalindromeService = new PalindromeServiceMock();
      const mockTopScoreService = new TopScoreServiceMock();

      const palindromeController = new PalindromeController(mockPalindromeService, mockTopScoreService);

      request.body = validPalindromeEntry;

      try {
        palindromeController.handleSubmitEntry(request as any, response as any, onNextMock);
      } catch (error) {
        expect(mockPalindromeService.validateAndScoreEntry).toBeCalledTimes(1);
        expect(mockPalindromeService.validateAndScoreEntry).toBeCalledWith(validPalindromeEntry);
        expect(error).toBe('Unexpected error');
        expect(onNextMock).toBeCalledWith(error);
      }
    });
  });

  describe('Testing Method: handleGetTopScores', () => {
    test('Get request successfully returns a list of current top scores with 200 response', () => {
      TopScoreServiceMock.prototype.retrieveScores = jest.fn().mockImplementation(() => fullHighScoresList);

      const mockPalindromeService = new PalindromeServiceMock();
      const mockTopScoreService = new TopScoreServiceMock();

      const palindromeController = new PalindromeController(mockPalindromeService, mockTopScoreService);

      try {
        palindromeController.handleGetTopScores(request as any, response as any, onNextMock);
        expect(mockTopScoreService.retrieveScores).toBeCalledTimes(1);
        expect(response.status).toBeCalledWith(200);
        expect(response.json).toBeCalledWith(fullHighScoresList);
      } catch (error) {
        expect(error).toEqual('Should not reach here');
      }
    });

    test('Next is called with an error if retrieveScores throws one', () => {
      TopScoreServiceMock.prototype.retrieveScores = jest.fn().mockImplementation(() => { throw new Error('Unexpected error'); });

      const mockPalindromeService = new PalindromeServiceMock();
      const mockTopScoreService = new TopScoreServiceMock();

      const palindromeController = new PalindromeController(mockPalindromeService, mockTopScoreService);

      try {
        palindromeController.handleGetTopScores(request as any, response as any, onNextMock);
      } catch (error) {
        expect(mockTopScoreService.retrieveScores).toBeCalledTimes(1);
        expect(error).toBe('Unexpected error');
        expect(onNextMock).toBeCalledWith(error);
      }
    });
  });
});
