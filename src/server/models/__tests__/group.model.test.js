const Group = require('../group.model');

describe('group', () => {
  it('should be invalid if name is empty', () => {
    const newGroup = new Group();

    newGroup.validate((modelError) => {
      expect(modelError.errors.name).not.toBeNull();
    });
  });

  it('should be valid if name is present', () => {
    const newGroup = new Group({
      name: 'Test Name',
    });
    newGroup.validate((modelError) => {
      expect(modelError).toBeNull();
    });
  });
});
