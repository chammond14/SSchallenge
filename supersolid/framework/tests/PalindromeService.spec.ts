import PalindromeService from '../src/Services/PalindromeService';
import {
  validPalindromeEntry, invalidPalindromeEntry, validUnformattedPalindrome,
  mandarinPalindrome, capitalisedPalindrome, numberPalindrome, emptyStringEntry,
} from './mockData/mockPalindromeData';

describe('PalindromeService', () => {
  describe('Testing Method: validateAndScoreEntry', () => {
    test('Submit a valid palindrome will correctly score and validate the palindrome', () => {
      const palindromeService = new PalindromeService();

      try {
        const result: number = palindromeService.validateAndScoreEntry(validPalindromeEntry);
        expect(result).toEqual(validPalindromeEntry.word.length);
      } catch (error) {
        expect(error).toEqual('Should not reach here');
      }
    });

    test('Submit an invalid palindrome will return a score of 0', () => {
      const palindromeService = new PalindromeService();

      try {
        const result: number = palindromeService.validateAndScoreEntry(invalidPalindromeEntry);
        expect(result).toEqual(0);
      } catch (error) {
        expect(error).toEqual('Should not reach here');
      }
    });

    test('Submit a valid palindrome with punctuation in it will correctly identify the palindrome and score it', () => {
      const palindromeService = new PalindromeService();

      try {
        // Same word (racecar, scores 7) filled with punctuation
        const result: number = palindromeService.validateAndScoreEntry(validUnformattedPalindrome);
        expect(result).toEqual(7);
      } catch (error) {
        expect(error).toEqual('Should not reach here');
      }
    });

    test('Submit a valid palindrome in non english language will correctly identify the palindrome and score it', () => {
      const palindromeService = new PalindromeService();

      try {
        const result: number = palindromeService.validateAndScoreEntry(mandarinPalindrome);
        expect(result).toEqual(mandarinPalindrome.word.length);
      } catch (error) {
        expect(error).toEqual('Should not reach here');
      }
    });

    test('Submit a valid palindrome with some capitalisations will correctly identify the palindrome and score it', () => {
      const palindromeService = new PalindromeService();

      try {
        const result: number = palindromeService.validateAndScoreEntry(capitalisedPalindrome);
        expect(result).toEqual(capitalisedPalindrome.word.length);
      } catch (error) {
        expect(error).toEqual('Should not reach here');
      }
    });

    test('Submit a palindrome with numbers will not be accepted', () => {
      const palindromeService = new PalindromeService();

      try {
        const result: number = palindromeService.validateAndScoreEntry(numberPalindrome);
        expect(result).toEqual(0);
      } catch (error) {
        expect(error).toEqual('Should not reach here');
      }
    });

    test('Submit the empty string will return a score of 0', () => {
      const palindromeService = new PalindromeService();

      try {
        const result: number = palindromeService.validateAndScoreEntry(emptyStringEntry);
        expect(result).toEqual(0);
      } catch (error) {
        expect(error).toEqual('Should not reach here');
      }
    });
  });
});
