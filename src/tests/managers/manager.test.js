const api = require('../../services/v0/managers/controllers/manager.controller');

const mockRequest = (reqParams, reqBody) => {
  return {
    params: reqParams,
    body: reqBody,
  };
};

const mockResponse = () => {
  const res = {};

  res.status = jest.fn().mockReturnValue(res);
  res.send = jest.fn().mockReturnValue(res);

  return res;
};

// Test retrieval of all managers
describe('Find all managers', () => {
  test('should 200', async() => {
    const req = mockRequest();
    const res = mockResponse();

    await api.findAll(req, res);

    expect(res.send).toHaveBeenCalled();
  });
});

// Test retrieval of single manager
describe('Find manager by ID', () => {
  test('should 200', async() => {
    const req = mockRequest({id: 1}, null);
    const res = mockResponse();

    await api.findById(req, res);

    expect(res.send).toHaveBeenCalled();
  });
});

// Test creation of manager
describe('Create manager', () => {
  test('should 400 if last name is not set', async() => {
    const req = mockRequest({id: null}, {firstName: 'First', lastName: null, username: 'test-manager'});
    const res = mockResponse();

    await api.save(req, res);

    expect(res.status).toHaveBeenCalledWith(400);
  });

  test('should 400 if username is not set', async() => {
    const req = mockRequest({id: null}, {firstName: 'First', lastName: 'Manager', username: null});
    const res = mockResponse();

    await api.save(req, res);

    expect(res.status).toHaveBeenCalledWith(400);
  });

  test('should 200 if request body is set properly', async() => {
    const req = mockRequest({id: null}, {firstName: 'First', lastName: 'Manager', username: 'test-manager'});
    const res = mockResponse();

    await api.save(req, res);

    expect(res.send).toHaveBeenCalled();
  });
});

// Test update of manager
describe('Update manager', () => {
  test('should 400 if last name is not set', async() => {
    const req = mockRequest({id: null}, {firstName: 'Next', lastName: null, username: 'test-manager'});
    const res = mockResponse();

    await api.save(req, res);

    expect(res.status).toHaveBeenCalledWith(400);
  });

  test('should 400 if username is not set', async() => {
    const req = mockRequest({id: null}, {firstName: 'Next', lastName: 'Manager', username: null});
    const res = mockResponse();

    await api.save(req, res);

    expect(res.status).toHaveBeenCalledWith(400);
  });

  test('should 404 if manager to update was not found', async() => {
    const req = mockRequest({id: 4}, {firstName: 'Next', lastName: 'Manager', username: 'test-manager'});
    const res = mockResponse();

    await api.save(req, res);

    expect(res.status).toHaveBeenCalledWith(404);
  });

  test('should 200 if request body is set properly', async() => {
    const req = mockRequest({id: 1}, {firstName: 'Next', lastName: 'Manager', username: 'test-manager'});
    const res = mockResponse();

    await api.save(req, res);

    expect(res.send).toHaveBeenCalled();
  });
});

// Test deletion of manager
describe('Delete manager', () => {
  test('should 200', async() => {
    const req = mockRequest({id: 1}, null);
    const res = mockResponse();

    await api.deleteById(req, res);

    expect(res.send).toHaveBeenCalled();
  });
});
