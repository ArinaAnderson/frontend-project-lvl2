import reverseName from '../src/startTesting.js';

test('reverseName function', () => {
  expect(reverseName('cat Gvenya')).toBe('aynevG tac');
});
