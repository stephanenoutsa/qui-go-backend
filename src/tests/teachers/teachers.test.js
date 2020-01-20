const api = require('../../services/v0/teachers/controllers/teacher.controller');

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

// Test retrieval of all teachers
describe('Find all teachers', () => {
  test('should 200', async() => {
    const req = mockRequest();
    const res = mockResponse();

    await api.findAll(req, res);

    expect(res.send).toHaveBeenCalled();
  });
});

// Test retrieval of single teacher
describe('Find teacher by ID', () => {
  test('should 200', async() => {
    const req = mockRequest({id: 1}, null);
    const res = mockResponse();

    await api.findById(req, res);

    expect(res.send).toHaveBeenCalled();
  });
});

// Test creation of teacher
describe('Create teacher', () => {
  test('should 400 if last name is not set', async() => {
    const req = mockRequest({id: null}, {firstName: 'First', lastName: null, classrooms: []});
    const res = mockResponse();

    await api.save(req, res);

    expect(res.status).toHaveBeenCalledWith(400);
  });

  test('should 400 if classrooms are not set', async() => {
    const req = mockRequest({id: null}, {firstName: 'First', lastName: 'Teacher', classrooms: []});
    const res = mockResponse();

    await api.save(req, res);

    expect(res.status).toHaveBeenCalledWith(400);
  });

  test('should 200 if request body is set properly', async() => {
    const req = mockRequest({id: null}, {firstName: 'First', lastName: 'Teacher', classrooms: [1]});
    const res = mockResponse();

    await api.save(req, res);

    expect(res.send).toHaveBeenCalled();
  });
});

// Test update of teacher
describe('Update teacher', () => {
  test('should 400 if last name is not set', async() => {
    const req = mockRequest({id: 1}, {firstName: 'First', lastName: null, classrooms: []});
    const res = mockResponse();

    await api.save(req, res);

    expect(res.status).toHaveBeenCalledWith(400);
  });

  test('should 400 if classrooms are not set', async() => {
    const req = mockRequest({id: 1}, {firstName: 'First', lastName: 'Teacher', classrooms: []});
    const res = mockResponse();

    await api.save(req, res);

    expect(res.status).toHaveBeenCalledWith(400);
  });

  test('should 404 if teacher to update was not found', async() => {
    const req = mockRequest({id: 4}, {firstName: 'First', lastName: 'Teacher', classrooms: [1]});
    const res = mockResponse();

    await api.save(req, res);

    expect(res.status).toHaveBeenCalledWith(404);
  });

  test('should 200 if request body is set properly', async() => {
    const req = mockRequest({id: 1}, {firstName: 'Next', lastName: 'Teacher', classrooms: [1]});
    const res = mockResponse();

    await api.save(req, res);

    expect(res.send).toHaveBeenCalled();
  });
});

// Test deletion of teacher
describe('Delete teacher', () => {
  test('should 200', async() => {
    const req = mockRequest({id: 1}, null);
    const res = mockResponse();

    await api.deleteById(req, res);

    expect(res.send).toHaveBeenCalled();
  });
});
