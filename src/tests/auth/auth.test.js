const api = require('../../services/v0/auth/controllers/auth.controller');

const mockRequest = (reqBody) => {
  return {
    body: reqBody,
  };
};

const mockResponse = () => {
  const res = {};

  res.status = jest.fn().mockReturnValue(res);
  res.send = jest.fn().mockReturnValue(res);

  return res;
};

// Test registrtion
describe('Register', () => {
  test('should 400 if last name is not set', async() => {
    const req = mockRequest({firstName: 'First', lastName: null, username: 'first-test', password: 'secret'});
    const res = mockResponse();

    await api.register(req, res);

    expect(res.status).toHaveBeenCalledWith(400);
  });

  test('should 400 if username is not set', async() => {
    const req = mockRequest({firstName: 'First', lastName: 'Test', username: null, password: 'secret'});
    const res = mockResponse();

    await api.register(req, res);

    expect(res.status).toHaveBeenCalledWith(400);
  });

  test('should 400 if password is not set', async() => {
    const req = mockRequest({firstName: 'First', lastName: 'Test', username: 'first-test', password: null});
    const res = mockResponse();

    await api.register(req, res);

    expect(res.status).toHaveBeenCalledWith(400);
  });

  test('should 400 if username is taken', async() => {
    const req = mockRequest({firstName: 'First', lastName: 'Test', username: 'test1', password: 'secret'});
    const res = mockResponse();

    await api.register(req, res);

    expect(res.status).toHaveBeenCalledWith(400);
  });

  test('should 200 if request body is set properly', async() => {
    const req = mockRequest({firstName: 'First', lastName: 'Test', username: 'test2', password: 'secret'});
    const res = mockResponse();

    await api.login(req, res);

    expect(res.send).toHaveBeenCalled();
  });
});

// Test login
describe('Login', () => {
  test('should 400 if username is not set', async() => {
    const req = mockRequest({username: null, password: 'secret'});
    const res = mockResponse();

    await api.login(req, res);

    expect(res.status).toHaveBeenCalledWith(400);
  });

  test('should 400 if password is not set', async() => {
    const req = mockRequest({username: 'test1', password: null});
    const res = mockResponse();

    await api.login(req, res);

    expect(res.status).toHaveBeenCalledWith(400);
  });

  test('should 401 if request body credentials are not registered', async() => {
    const req = mockRequest({username: 'off', password: 'wrong'});
    const res = mockResponse();

    await api.login(req, res);

    expect(res.status).toHaveBeenCalledWith(401);
  });

  test('should 401 if request body password is invalid', async() => {
    const req = mockRequest({username: 'test1', password: 'secrets'});
    const res = mockResponse();

    await api.login(req, res);

    expect(res.status).toHaveBeenCalledWith(401);
  });

  test('should 200 if request body is set properly', async() => {
    const req = mockRequest({username: 'test1', password: 'secret'});
    const res = mockResponse();

    await api.login(req, res);

    expect(res.send).toHaveBeenCalled();
  });
});
