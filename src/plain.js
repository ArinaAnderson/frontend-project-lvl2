import _ from 'lodash';

const startLine = (keyPath) => `Property '${keyPath}' was`;

const processVal = (val) => {
  if (_.isObject(val)) {
    return '[complex value]';
  }

  if (_.isString(val)) {
    return `'${val}'`;
  }

  return val;
};

const iterDiffs = (diffs, parentKey = '') => {
  const lines = diffs.map((node, idx) => {
    const { key, state, val } = node;
    const keyPath = `${parentKey}${parentKey ? '.' : ''}${key}`;
    const lineStart = startLine(keyPath);

    const statesToActions = {
      diffSubTree() {
        return iterDiffs(val, keyPath);
      },
      added() {
        return `${lineStart} added with value: ${processVal(val)}`;
      },
      deleted() {
        return `${lineStart} removed`;
      },
      unchanged() {
        return [];
      },
    };

    if (diffs[idx + 1] && key === diffs[idx + 1].key) {
      return [];
    }

    if (diffs[idx - 1] && key === diffs[idx - 1].key) {
      return `${lineStart} updated. From ${processVal(diffs[idx - 1].val)} to ${processVal(val)}`;
    }

    return statesToActions[state](val);

    /*
    if (state === 'diffSubTree') {
      return iterDiffs(val, keyPath);
    }

    if (diffs[idx + 1] && key === diffs[idx + 1].key) {
      return [];
    }

    if (diffs[idx - 1] && key === diffs[idx - 1].key) {
      return `${lineStart} updated. From ${processVal(diffs[idx - 1].val)} to ${processVal(val)}`;
    }

    if (state === 'added') {
      return `${lineStart} added with value: ${processVal(val)}`;
    }

    if (state === 'deleted') {
      return `${lineStart} removed`;
    }

    return [];
    */
  });
  return `${lines.flat().join('\n')}`;
};

const plain = (diffsTree) => iterDiffs(diffsTree);

export default plain;

/*
const plainDiff = [
  { key: 'follow', state: 'deleted', val: false },
  { key: 'host', state: 'unchanged', val: 'hexlet.io' },
  { key: 'proxy', state: 'deleted', val: '123.234.53.22' },
  { key: 'timeout', state: 'deleted', val: 50 },
  { key: 'timeout', state: 'added', val: 20 },
  { key: 'verbose', state: 'added', val: true }
];

const dif = [
  {
    "key": "common",
    "state": "diffSubTree",
    "val": [
      {
        "key": "follow",
        "state": "added",
        "val": false
      },
      {
        "key": "setting1",
        "state": "unchanged",
        "val": "Value 1"
      },
      {
        "key": "setting2",
        "state": "deleted",
        "val": 200
      },
      {
        "key": "setting3",
        "state": "deleted",
        "val": true
      },
      {
        "key": "setting3",
        "state": "added",
        "val": null
      },
      {
        "key": "setting4",
        "state": "added",
        "val": "blah blah"
      },
      {
        "key": "setting5",
        "state": "added",
        "val": {
          "key5": "value5"
        }
      },
      {
        "key": "setting6",
        "state": "diffSubTree",
        "val": [
          {
            "key": "doge",
            "state": "diffSubTree",
            "val": [
              {
                "key": "wow",
                "state": "deleted",
                "val": ""
              },
              {
                "key": "wow",
                "state": "added",
                "val": "so much"
              }
            ]
          },
          {
            "key": "key",
            "state": "unchanged",
            "val": "value"
          },
          {
            "key": "ops",
            "state": "added",
            "val": "vops"
          }
        ]
      }
    ]
  },
  {
    "key": "group1",
    "state": "diffSubTree",
    "val": [
      {
        "key": "baz",
        "state": "deleted",
        "val": "bas"
      },
      {
        "key": "baz",
        "state": "added",
        "val": "bars"
      },
      {
        "key": "foo",
        "state": "unchanged",
        "val": "bar"
      },
      {
        "key": "nest",
        "state": "deleted",
        "val": {
          "key": "value"
        }
      },
      {
        "key": "nest",
        "state": "added",
        "val": "str"
      }
    ]
  },
  {
    "key": "group2",
    "state": "deleted",
    "val": {
      "abc": 12345,
      "deep": {
        "id": 45
      }
    }
  },
  {
    "key": "group3",
    "state": "added",
    "val": {
      "deep": {
        "id": {
          "number": 45
        }
      },
      "fee": 100500
    }
  }
];

console.log(plain(dif));
*/
