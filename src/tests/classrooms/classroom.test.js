const api = require('../../services/v0/classrooms/controllers/classroom.controller');

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

// Test retrieval of all classrooms
describe('Find all classrooms', () => {
  test('should 200', async() => {
    const req = mockRequest();
    const res = mockResponse();

    await api.findAll(req, res);

    expect(res.send).toHaveBeenCalled();
  });
});

// Test retrieval of single classroom
describe('Find classroom by ID', () => {
  test('should 200', async() => {
    const req = mockRequest({id: 1}, null);
    const res = mockResponse();

    await api.findById(req, res);

    expect(res.send).toHaveBeenCalled();
  });
});

// Test creation of classroom
describe('Create classroom', () => {
  test('should 400 if name is not set', async() => {
    const req = mockRequest({id: null}, {name: null, studentNumber: 22, maxSize: null});
    const res = mockResponse();

    await api.save(req, res);

    expect(res.status).toHaveBeenCalledWith(400);
  });

  test('should 400 if student number is not set', async() => {
    const req = mockRequest({id: null}, {name: 'Classroom1', studentNumber: null, maxSize: null});
    const res = mockResponse();

    await api.save(req, res);

    expect(res.status).toHaveBeenCalledWith(400);
  });

  test('should 400 if maxSize is greater than 24', async() => {
    const req = mockRequest({id: null}, {name: 'Classroom1', studentNumber: 20, maxSize: 26});
    const res = mockResponse();

    await api.save(req, res);

    expect(res.status).toHaveBeenCalledWith(400);
  });

  test('should 200 if request body is set properly', async() => {
    const req = mockRequest({id: null}, {name: 'Classroom1', studentNumber: 20, maxSize: null});
    const res = mockResponse();

    await api.save(req, res);

    expect(res.send).toHaveBeenCalled();
  });
});

// Test update of classroom
describe('Update classroom', () => {
  test('should 400 if name is not set', async() => {
    const req = mockRequest({id: null}, {name: null, studentNumber: 22, maxSize: null});
    const res = mockResponse();

    await api.save(req, res);

    expect(res.status).toHaveBeenCalledWith(400);
  });

  test('should 400 if student number is not set', async() => {
    const req = mockRequest({id: null}, {name: 'Classroom2', studentNumber: null, maxSize: null});
    const res = mockResponse();

    await api.save(req, res);

    expect(res.status).toHaveBeenCalledWith(400);
  });

  test('should 400 if maxSize is greater than 24', async() => {
    const req = mockRequest({id: null}, {name: 'Classroom2', studentNumber: 20, maxSize: 26});
    const res = mockResponse();

    await api.save(req, res);

    expect(res.status).toHaveBeenCalledWith(400);
  });

  test('should 404 if classroom to update was not found', async() => {
    const req = mockRequest({id: 4}, {name: 'Classroom2', studentNumber: 20, maxSize: null});
    const res = mockResponse();

    await api.save(req, res);

    expect(res.status).toHaveBeenCalledWith(404);
  });

  test('should 200 if request body is set properly', async() => {
    const req = mockRequest({id: 1}, {name: 'Classroom2', studentNumber: 20, maxSize: null});
    const res = mockResponse();

    await api.save(req, res);

    expect(res.send).toHaveBeenCalled();
  });
});

// Test deletion of classroom
describe('Delete classroom', () => {
  test('should 200', async() => {
    const req = mockRequest({id: 1}, null);
    const res = mockResponse();

    await api.deleteById(req, res);

    expect(res.send).toHaveBeenCalled();
  });
});
