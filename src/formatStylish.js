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

const defineIndent = (indentSize, replacer, markerLength = 2) => {
  const indent = `${replacer.repeat(indentSize - markerLength)}`;
  return indent;
};

const createLine = (key, value, margin) => `${margin}${key}: ${value}`;

const formatStylish = (diffsTree, indentBase = 4, replacer = ' ') => {
  const iter = (diffs, depth) => {
    const indent = defineIndent(depth * indentBase, replacer);

    const lines = diffs.map((node) => {
      const lineKey = node.key;
      const lineMarker = defineMarker(node.state, replacer);
      const lineMargin = `${indent}${lineMarker}`;

      if (node.state === 'diffSubTree') {
        return createLine(lineKey, iter(node.val, depth + 1), lineMargin);
      }

      return createLine(lineKey, stringify(node.val, indentBase, depth + 1, replacer), lineMargin);
    });

    return `{\n${lines.join('\n')}\n${replacer.repeat(depth * indentBase - indentBase)}}`;
  };

  return iter(diffsTree, 1);
};

export default formatStylish;
/*
const dif = [
  {
    "key": "common",
    "state": "diffSubTree",
    "diffSubTree": [
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
        "val1": true
      },
      {
        "key": "setting3",
        "state": "added",
        "val2": null
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
        "diffSubTree": [
          {
            "key": "doge",
            "state": "diffSubTree",
            "diffSubTree": [
              {
                "key": "wow",
                "state": "deleted",
                "val1": ""
              },
              {
                "key": "wow",
                "state": "added",
                "val2": "so much"
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
    "diffSubTree": [
      {
        "key": "baz",
        "state": "deleted",
        "val1": "bas"
      },
      {
        "key": "baz",
        "state": "added",
        "val2": "bars"
      },
      {
        "key": "foo",
        "state": "unchanged",
        "val": "bar"
      },
      {
        "key": "nest",
        "state": "deleted",
        "val1": {
          "key": "value"
        }
      },
      {
        "key": "nest",
        "state": "added",
        "val2": "str"
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

console.log(formatStylish(dif));
*/
