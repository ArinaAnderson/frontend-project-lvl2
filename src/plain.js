import _ from 'lodash';

const defineMarker = (state, replacer) => {
  const generalMarker = `${replacer}${replacer}`;
  const plusMarker = `+${replacer}`;
  const minusMarker = `-${replacer}`;

  switch (state) {
    case 'added':
      return plusMarker;
    case 'deleted':
      return minusMarker;
    case 'unchanged':
    case 'diffSubTree':
      return generalMarker;
    default:
      throw new Error(`Unknown state: '${state}'!`);
  }
};

const createLine = (key, value, margin) => `${margin}${key}: ${value}`;

// const isNodeUpdated = (currentNodeKey, nextNodeKey) => currentNodeKey === nextNodeKey;

const isNodeValueComplex = () => {};

const plain = (diffsTree) => {

  const iter = (diffs, parentKey = '') => {

    const lines = diffs.map((node, idx) => {
      const { key, state, val } = node;
      const keyPath = `${parentKey}${parentKey ? '.' : ''}${key}`;
      if (state === 'diffSubTree') {
        // return iter(val, `${parentKey}${parentKey ? '.' : ''}${key}`);
        return iter(val, keyPath);
      }

      // updated nodes:
      if (diffs[idx + 1] && key === diffs[idx + 1].key) {
        return [];
      }

      if (diffs[idx - 1] && key === diffs[idx - 1].key) {
        // createLine():
        // return `Property ${parentKey}.${key} was updated. From ${diffs[idx - 1].val} to ${val}`;
        return `Property '${keyPath}' was updated. From ${diffs[idx - 1].val} to ${val}`;
      }

      if (state === 'added') {
        return `Property '${keyPath}' was added with value: ${val}`;
      }

      if (state === 'deleted') {
        return `Property '${keyPath}' was removed`;
      }

      return [];
    });
    
    return `${lines.flat().join('\n')}`;
  };

  return iter(diffsTree);
};

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
