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
    // const indent = replacer.repeat(depth * indentBase - generalMarker.length);
    const indent = defineIndent(depth * indentBase, replacer);
    const keys = _.keys(diffs);

    const lines = keys.map((key) => {
      const node = diffs[key];
      if (node.state === 'added') {
        const marker = defineMarker(node.state, replacer);
        const margin = `${indent}${marker}`;
        // const line = `${indent}${marker}${key}:
        // ${stringify(node.val, indentBase, depth + 1, replacer)}`;
        const line = createLine(key, stringify(node.val, indentBase, depth + 1, replacer), margin);
        return [line];
      }

      if (node.state === 'deleted') {
        const marker = defineMarker(node.state, replacer);
        const margin = `${indent}${marker}`;
        // const line = `${indent}${marker}${key}:
        // ${stringify(node.val, indentBase, depth + 1, replacer)}`;
        const line = createLine(key, stringify(node.val, indentBase, depth + 1, replacer), margin);
        return [line];
      }

      if (node.state === 'changed') {
        const marker1 = defineMarker('deleted', replacer);
        const marker2 = defineMarker('added', replacer);
        const margin1 = `${indent}${marker1}`;
        const margin2 = `${indent}${marker2}`;
        const line1 = createLine(
          key,
          stringify(node.val1, indentBase, depth + 1, replacer),
          margin1,
        );

        const line2 = createLine(
          key,
          stringify(node.val2, indentBase, depth + 1, replacer),
          margin2,
        );
        // const line1 = `${indent}${defineMarker('deleted', replacer)}${key}:
        // ${stringify(node.val1, indentBase, depth + 1, replacer)}`;
        // const line2 = `${indent}${defineMarker('added', replacer)}${key}:
        // ${stringify(node.val2, indentBase, depth + 1, replacer)}`;
        return [line1, line2];
      }

      if (node.state === 'unchanged') {
        const marker = defineMarker(node.state, replacer);
        const margin = `${indent}${marker}`;
        // const line = `${indent}${marker}${key}:
        // ${stringify(node.val, indentBase, depth + 1, replacer)}`;
        const line = createLine(key, stringify(node.val, indentBase, depth + 1, replacer), margin);
        return [line];
      }

      const marker = defineMarker('unchanged', replacer);
      const margin = `${indent}${marker}`;
      // const line = `${indent}${defineMarker('unchanged', replacer)}${key}:
      // ${iter(node.diffSubTree, depth + 1)}`;
      const line = createLine(key, iter(node.diffSubTree, depth + 1), margin);
      return [line];
    });
    return `{\n${lines.flat().join('\n')}\n${replacer.repeat(depth * indentBase - indentBase)}}`;
  };
  return iter(diffsTree, 1);
};

export default formatStylish;

/*
const dif = {
  "common": {
    "state": "diffSubTree",
    "diffSubTree": {
      "follow": {
        "state": "added",
        "val": false
      },
      "setting1": {
        "state": "unchanged",
        "val": "Value 1"
      },
      "setting2": {
        "state": "deleted",
        "val": 200
      },
      "setting3": {
        "state": "changed",
        "val1": true,
        "val2": null
      },
      "setting4": {
        "state": "added",
        "val": "blah blah"
      },
      "setting5": {
        "state": "added",
        "val": {
          "key5": "value5"
        }
      },
      "setting6": {
        "state": "diffSubTree",
        "diffSubTree": {
          "doge": {
            "state": "diffSubTree",
            "diffSubTree": {
              "wow": {
                "state": "changed",
                "val1": "",
                "val2": "so much"
              }
            }
          },
          "key": {
            "state": "unchanged",
            "val": "value"
          },
          "ops": {
            "state": "added",
            "val": "vops"
          }
        }
      }
    }
  },
  "group1": {
    "state": "diffSubTree",
    "diffSubTree": {
      "baz": {
        "state": "changed",
        "val1": "bas",
        "val2": "bars"
      },
      "foo": {
        "state": "unchanged",
        "val": "bar"
      },
      "nest": {
        "state": "changed",
        "val1": {
          "key": "value"
        },
        "val2": "str"
      }
    }
  },
  "group2": {
    "state": "deleted",
    "val": {
      "abc": 12345,
      "deep": {
        "id": 45
      }
    }
  },
  "group3": {
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
};

console.log(formatStylish(dif));
*/
