import _ from 'lodash';

const isObject = (val) => _.isObject(val) && !_.isArray(val);
/*
const buildDiffTreeNode = (obj1, obj2, key, fn) => {
  const keyNode = {};

  if (!_.has(obj1, key)) {
    keyNode.state = 'added';
    keyNode.val = obj2[key];
  } else if (!_.has(obj2, key)) {
    keyNode.state = 'deleted';
    keyNode.val = obj1[key];
  } else if (isObject(obj1[key]) && isObject(obj2[key])) {
    keyNode.state = 'diffSubTree';
    keyNode.diffSubTree = fn(obj1[key], obj2[key]);
  } else if (obj1[key] !== obj2[key]) {
    keyNode.state = 'changed';
    keyNode.val1 = obj1[key];
    keyNode.val2 = obj2[key];
  } else {
    keyNode.state = 'unchanged';
    keyNode.val = obj1[key];
  }

  return keyNode;
};
*/

const buildDiffTree = (obj1, obj2) => {
  const keys1 = _.keys(obj1);
  const keys2 = _.keys(obj2);
  const keys = _.sortBy(_.union(keys1, keys2));

  const diffTree = keys.map((key) => {
    // console.log(key, 'BASYAA');
    const elem = [];
    const keyNode = {};
    if (!_.has(obj1, key)) {
      keyNode.key = key;
      keyNode.state = 'added';
      keyNode.val = obj2[key];
      elem.push(keyNode);
    } else if (!_.has(obj2, key)) {
      keyNode.key = key;
      keyNode.state = 'deleted';
      keyNode.val = obj1[key];
      elem.push(keyNode);
    } else if (isObject(obj1[key]) && isObject(obj2[key])) {
      keyNode.key = key;
      keyNode.state = 'diffSubTree';
      keyNode.diffSubTree = buildDiffTree(obj1[key], obj2[key]);
      elem.push(keyNode);
    } else if (obj1[key] !== obj2[key]) {
      const keyNode1 = {};
      const keyNode2 = {};
      keyNode1.key = key;
      keyNode1.state = 'deleted';
      keyNode1.val = obj1[key];
      elem.push(keyNode1);

      keyNode2.key = key;
      keyNode2.state = 'added';
      keyNode2.val = obj2[key];
      elem.push(keyNode2);
    } else {
      keyNode.key = key;
      keyNode.state = 'unchanged';
      keyNode.val = obj1[key];
      elem.push(keyNode);
    }
    return elem;
  });

  return diffTree.flat();
  /*
  const keys1 = _.keys(obj1);
  const keys2 = _.keys(obj2);
  const keys = _.sortBy(_.union(keys1, keys2));

  const diffTree = keys.reduce((acc, key) => {
    const keyNode = buildDiffTreeNode(obj1, obj2, key, buildDiffTree);
    return { ...acc, [key]: keyNode };
  }, {});

  return diffTree;
  */
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
