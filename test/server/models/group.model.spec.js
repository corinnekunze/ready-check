const expect = require('chai').expect;

const Group = require('../../../src/server/models/group.model.js');

describe('group', () => {
  it('should be invalid if name is empty', () => {
    const newGroup = new Group();

    newGroup.validate((model) => {
      expect(model.errors.name).to.exist;
    });
  });
});
