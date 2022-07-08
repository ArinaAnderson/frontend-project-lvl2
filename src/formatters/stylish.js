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
// lineIndent = lineMargin + lineMarker
const defineMargin = (indentSize, replacer, markerLength = 2) => {
  const margin = `${replacer.repeat(indentSize - markerLength)}`;
  return margin;
};

/*
const defineIndent = (state, indentSize, replacer) => {
  const lineMarker = defineMarker(state, replacer);
  const lineMargin = defineMargin(indentSize, replacer, lineMarker.length);

  return `${lineMargin}${lineMarker}`;
};
*/

const defineIndent = (margin, marker) => `${margin}${marker}`;

const createLine = (key, value, indent) => `${indent}${key}: ${value}`;

const stylish = (diffsTree, indentBase = 4, replacer = ' ') => {
  const iter = (diffs, depth) => {
    const lines = diffs.map((node) => {
      const { key, val, state } = node;
      const lineMargin = defineMargin(depth * indentBase, replacer);
      
      if (state === 'updated') {
        const deletedValIndent = defineIndent(lineMargin, defineMarker('deleted', replacer));
        const addedValIndent = defineIndent(lineMargin, defineMarker('added', replacer));
        return [
          createLine(key, stringify(val.deleted, indentBase, depth + 1, replacer), deletedValIndent),
          createLine(key, stringify(val.added, indentBase, depth + 1, replacer),addedValIndent),
        ];
      }

      const lineMarker = defineMarker(state, replacer);
      const lineIndent = defineIndent(lineMargin, lineMarker);


      if (state === 'diffSubTree') {
        return createLine(key, iter(val, depth + 1), lineIndent);
      }

      return createLine(key, stringify(val, indentBase, depth + 1, replacer), lineIndent);
    });

    return `{\n${lines.flat().join('\n')}\n${replacer.repeat(depth * indentBase - indentBase)}}`;
    // return `{\n${lines.join('\n')}\n${replacer.repeat(depth * indentBase - indentBase)}}`;
  };

  return iter(diffsTree, 1);
};

export default stylish;

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
        "val": {
          "deleted": true,
          "added": null
        }
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
                "val": {
                  "deleted": "",
                  "added": "so much"
                }
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
        "val": {
          "deleted": "bas",
          "added": "bars"
        }
      },
      {
        "key": "foo",
        "state": "unchanged",
        "val": "bar"
      },
      {
        "key": "nest",
        "state": "updated",
        "val": {
          "deleted": {
            "key": "value"
          },
          "added": "str"
        }
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
