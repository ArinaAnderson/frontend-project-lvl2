import _ from 'lodash';

const isObject = (val) => _.isObject(val) && !_.isArray(val);

const buildDiffTreeNode = (key, val, state) => {
  const diffTreeNode = {};

  diffTreeNode.key = key;
  diffTreeNode.state = state;
  diffTreeNode.val = val;

  return diffTreeNode;
};

const buildDiffTree = (obj1, obj2) => {
  const keys1 = _.keys(obj1);
  const keys2 = _.keys(obj2);
  const keys = _.sortBy(_.union(keys1, keys2));

  const diffTree = keys.map((key) => {
    const elem = [];

    if (!_.has(obj1, key)) {
      const diffTreeNode = buildDiffTreeNode(key, obj2[key], 'added');
      elem.push(diffTreeNode);
    } else if (!_.has(obj2, key)) {
      const diffTreeNode = buildDiffTreeNode(key, obj1[key], 'deleted');
      elem.push(diffTreeNode);
    } else if (isObject(obj1[key]) && isObject(obj2[key])) {
      const diffTreeNode = buildDiffTreeNode(
        key,
        buildDiffTree(obj1[key], obj2[key]),
        'diffSubTree',
      );
      elem.push(diffTreeNode);
    } else if (obj1[key] !== obj2[key]) {
      const diffTreeNode1 = buildDiffTreeNode(key, obj1[key], 'deleted');
      elem.push(diffTreeNode1);

      const diffTreeNode2 = buildDiffTreeNode(key, obj2[key], 'added');
      elem.push(diffTreeNode2);
    } else {
      const diffTreeNode = buildDiffTreeNode(key, obj1[key], 'unchanged');
      elem.push(diffTreeNode);
    }

    return elem;
  });

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
