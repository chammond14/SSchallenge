import XRegExp from 'xregexp';
import { IEntry } from '../Types/IEntry';

export default class PalindromeService {
  constructor() {
    this.validateAndScoreEntry = this.validateAndScoreEntry.bind(this);
  }

  // Removes any punctuation and whitespace before validating that the word is a palindrome.
  public validateAndScoreEntry(entry: IEntry): number {
    let formattedWord = this.removePunctuation(entry.word);
    formattedWord = formattedWord.toLowerCase();

    if (this.wordIsPalindrome(formattedWord)) {
      return formattedWord.length;
    }
    return 0;
  }

  private removePunctuation(unstrippedWord: string): string {
    // Matches any character which isn't present in any alphabet
    const punctuationRegEx = XRegExp('\\P{L}+', 'g');

    const strippedWord = unstrippedWord.replace(punctuationRegEx, '');
    return strippedWord;
  }

  private wordIsPalindrome(word: string): boolean {
    const length = Math.floor(word.length / 2);
    for (let i = 0; i < length; i++) {
      if (word[i] !== word[word.length - i - 1]) {
        return false;
      }
    }
    return true;
  }
}
