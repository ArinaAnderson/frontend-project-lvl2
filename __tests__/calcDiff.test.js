import calcDiff from '../src/calcDiff.js';

const obj1 = {
  common: {
    setting1: 'Value 1',
    setting2: 200,
    setting3: true,
    setting6: {
      key: 'value',
      doge: {
        wow: '',
      },
    },
  },
  group1: {
    baz: 'bas',
    foo: 'bar',
    nest: {
      key: 'value',
    },
  },
  group2: {
    abc: 12345,
    deep: {
      id: 45,
    },
  },
};

const obj2 = {
  common: {
    follow: false,
    setting1: 'Value 1',
    setting3: null,
    setting4: 'blah blah',
    setting5: {
      key5: 'value5',
    },
    setting6: {
      key: 'value',
      ops: 'vops',
      doge: {
        wow: 'so much',
      },
    },
  },
  group1: {
    foo: 'bar',
    baz: 'bars',
    nest: 'str',
  },
  group3: {
    deep: {
      id: {
        number: 45,
      },
    },
    fee: 100500,
  },
};

const expectedResult = {
  common: {
    follow: 'added',
    setting1: 'unchanged',
    setting2: 'deleted',
    setting3: 'changed',
    setting4: 'added',
    setting5: 'added',
    setting6: {
      key: 'unchanged',
      ops: 'added',
      doge: {
        wow: 'changed',
      },
    },
  },
  group1: {
    baz: 'changed',
    foo: 'unchanged',
    nest: 'changed',
  },
  group2: 'deleted',
  group3: 'added',
};

test('compares nested objects', () => {
  const actual = calcDiff(obj1, obj2);
  expect(actual).toEqual(expectedResult);
});
