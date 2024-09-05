const assert = require('assert');
const app = require('../../src/app');

describe('\'collegeDetails\' service', () => {
  it('registered the service', () => {
    const service = app.service('collegeDetails');

    assert.ok(service, 'Registered the service (collegeDetails)');
  });
});
