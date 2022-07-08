import _ from 'lodash';

const buildTreeNode = (key, val, state) => {
  // const keyNameForValues = state === 'updated' ? 'vals' : 'val';
  const diffTreeNode = {
    key,
    state,
    val,
    // [keyNameForValues]: val,
  };

  return diffTreeNode;
};

const processObjectsKey = (obj1, obj2, key, buildDiffTreeFunc) => {
  if (!_.has(obj1, key)) {
    return buildTreeNode(key, obj2[key], 'added');
  }
  if (!_.has(obj2, key)) {
    return buildTreeNode(key, obj1[key], 'deleted');
  }
  if (_.isPlainObject(obj1[key]) && _.isPlainObject(obj2[key])) {
    return buildTreeNode(key, buildDiffTreeFunc(obj1[key], obj2[key]), 'diffSubTree');
  }
  if (obj1[key] !== obj2[key]) {
    return buildTreeNode(key, [
      buildTreeNode(key, obj1[key], 'deleted'),
      buildTreeNode(key, obj2[key], 'added'),
    ], 'updated');
  }
  return buildTreeNode(key, obj1[key], 'unchanged');
};

const buildDiffTree = (obj1, obj2) => {
  const keys1 = _.keys(obj1);
  const keys2 = _.keys(obj2);
  const keys = _.sortBy(_.union(keys1, keys2));

  const diffTree = keys.map((key) => processObjectsKey(obj1, obj2, key, buildDiffTree));

  return diffTree.flat();
};

export default buildDiffTree;

/*
const objAA = {
  "common": {
    "setting1": "Value 1",
    "setting2": 200,
    "setting3": true,
    "setting6": {
      "key": "value",
      "doge": {
        "wow": "",
      }
    }
  },
  "group1": {
    "baz": "bas",
    "foo": "bar",
    "nest": {
      "key": "value"
    }
  },
  "group2": {
    "abc": 12345,
    "deep": {
      "id": 45
    }
  }
};

const objBB = {
  "common": {
    "follow": false,
    "setting1": "Value 1",
    "setting3": null,
    "setting4": "blah blah",
    "setting5": {
      "key5": "value5"
    },
    "setting6": {
      "key": "value",
      "ops": "vops",
      "doge": {
        "wow": "so much",
      }
    }
  },
  "group1": {
    "foo": "bar",
    "baz": "bars",
    "nest": "str"
  },
  "group3": {
    "deep": {
      "id": {
        "number": 45
      }
    },
    "fee": 100500
  }
};

console.log(JSON.stringify(buildDiffTree(objAA, objBB), null, '  '));
*/
