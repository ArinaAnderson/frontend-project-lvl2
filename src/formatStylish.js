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

const formatStylish = (diffsTree, indentBase = 4, replacer = ' ') => {
  const generalMarker = '  ';
  const plusMarker = '+ ';
  const minusMarker = '- ';

  const iter = (diffs, depth) => {
    const indent = replacer.repeat(depth * indentBase - generalMarker.length);
    const keys = _.keys(diffs);

    const lines = keys.map((key) => {
      const node = diffs[key];
      if (node.state === 'added') {
        const line = [`${indent}${plusMarker}${key}: ${stringify(node.val, indentBase, depth + 1, replacer)}`];
        return line;
      }

      if (node.state === 'deleted') {
        const line = [`${indent}${minusMarker}${key}: ${stringify(node.val, indentBase, depth + 1, replacer)}`];
        return line;
      }

      if (node.state === 'changed') {
        const line1 = `${indent}${minusMarker}${key}: ${stringify(node.val1, indentBase, depth + 1, replacer)}`;
        const line2 = `${indent}${plusMarker}${key}: ${stringify(node.val2, indentBase, depth + 1, replacer)}`;
        return [line1, line2];
      }

      if (node.state === 'unchanged') {
        const line = [`${indent}${generalMarker}${key}: ${stringify(node.val, indentBase, depth + 1, replacer)}`];
        return line;
      }

      const line = [`${indent}${generalMarker}${key}: ${iter(node.diffSubTree, depth + 1)}`];
      return line;
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
