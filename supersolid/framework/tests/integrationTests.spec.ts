import { agent as supertest } from 'supertest';
import { invalidPalindromeEntry, validPalindromeEntry } from './mockData/mockPalindromeData';

const request = supertest('http://localhost:3000');

describe('GET /api/getScores', () => {
  it('should return a status 200 and a list of top scores', async () => {
    // Ensure we have at least one score saved to satisfy this test
    await request.post('/api/submitEntry').send(validPalindromeEntry);
    const testerScore = { name: 'tester', points: 7 };

    const res = await request.get('/api/getScores');

    expect(res.status).toEqual(200);
    expect(res.body).toContainEqual(testerScore);
  });

  it('should return a status 405 for an invalid action on the endpoint', async () => {
    const res = await request.put('/api/getScores').send({ name: 'tester', word: 'aba' });

    expect(res.status).toEqual(405);
    expect(res.body).toEqual('Method Not Allowed');
  });
});

describe('POST /api/submitEntry', () => {
  it('should return a status 200 and a score for the valid palindrome', async () => {
    const res = await request.post('/api/submitEntry').send(validPalindromeEntry);

    expect(res.status).toEqual(200);
    expect(res.body).toEqual(validPalindromeEntry.word.length);
  });

  it('should return a status 200 and a score of 0 for the invalid palindrome', async () => {
    const res = await request.post('/api/submitEntry').send(invalidPalindromeEntry);

    expect(res.status).toEqual(200);
    expect(res.body).toEqual(0);
  });

  it('should return a status 400 and error message for an invalid request body (bad param names)', async () => {
    const res = await request.post('/api/submitEntry').send({ name: 'hi', notWord: 'aba' });

    expect(res.status).toEqual(400);
    expect(res.body).toEqual('Invalid request - missing parameters');
  });

  it('should return a status 400 and error message for an invalid request body (bad param values)', async () => {
    const res = await request.post('/api/submitEntry').send({ name: 'tester', word: '' });

    expect(res.status).toEqual(400);
    expect(res.body).toEqual('Invalid request - missing parameters');
  });

  it('should return a status 405 for an invalid action on the endpoint', async () => {
    const res = await request.put('/api/submitEntry').send({ name: 'tester', word: 'aba' });

    expect(res.status).toEqual(405);
    expect(res.body).toEqual('Method Not Allowed');
  });
});
