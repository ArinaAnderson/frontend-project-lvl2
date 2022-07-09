import _ from 'lodash';

const stringify = (value, indentBase = 4, depth = 1, replacer = ' ') => {
  const iter = (val, indent) => {
    if (!_.isObject(val)) {
      return `${val}`;
    }

    const keys = _.keys(val);
    const arr = keys.map((key) => `${replacer.repeat(indent)}${key}: ${iter(val[key], indent + indentBase)}`);
    const result = arr.join('\n');
    return `{\n${result}\n${replacer.repeat(indent - indentBase)}}`;
  };
  return iter(value, depth * indentBase);
};

const defineMarker = (state, replacer) => {
  const blankMarker = `${replacer}${replacer}`;
  const plusMarker = `+${replacer}`;
  const minusMarker = `-${replacer}`;

  switch (state) {
    case 'added':
      return plusMarker;
    case 'deleted':
      return minusMarker;
    case 'unchanged':
    case 'diffSubTree':
      return blankMarker;
    case 'updated':
      return { minusMarker, plusMarker };
    default:
      throw new Error(`Unknown state: '${state}'!`);
  }
};

const defineMargin = (indentSize, replacer, markerLength = 2) => {
  const margin = `${replacer.repeat(indentSize - markerLength)}`;
  return margin;
};

const defineIndent = (margin, marker) => `${margin}${marker}`;

// const defineVal = (val) => stringify(val, )

const createLine = (key, value, indent) => `${indent}${key}: ${value}`;

const stylish = (diffsTree, indentBase = 4, replacer = ' ') => {
  const iter = (diffs, depth) => {
    const lines = diffs.map((node) => {
      const { key, val, state } = node;
      const margin = defineMargin(depth * indentBase, replacer);
      const marker = defineMarker(state, replacer);
      const defineLineVal = (value) => stringify(value, indentBase, depth + 1);

      if (state === 'updated') {
        const [oldVal, newVal] = val;
        return [
          createLine(key, defineLineVal(oldVal.val), defineIndent(margin, marker.minusMarker)),
          createLine(key, defineLineVal(newVal.val), defineIndent(margin, marker.plusMarker)),
        ];
      }

      const lineIndent = defineIndent(margin, marker);

      if (state === 'diffSubTree') {
        return createLine(key, iter(val, depth + 1), lineIndent);
      }

      return createLine(key, defineLineVal(val), lineIndent);
    });

    return `{\n${lines.flat().join('\n')}\n${replacer.repeat(depth * indentBase - indentBase)}}`;
  };

  return iter(diffsTree, 1);
};

export default stylish;

/*
const diffs = [
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
        "state": "updated",
        "val": [
          {
            "key": "setting3",
            "state": "deleted",
            "val": true
          },
          {
            "key": "setting3",
            "state": "added",
            "val": null
          }
        ]
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
                "state": "updated",
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
        "state": "updated",
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
          }
        ]
      },
      {
        "key": "foo",
        "state": "unchanged",
        "val": "bar"
      },
      {
        "key": "nest",
        "state": "updated",
        "val": [
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

console.log(stylish(diffs));
*/
