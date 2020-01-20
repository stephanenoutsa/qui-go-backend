const api = require('../../services/v0/students/controllers/student.controller');

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

// Test retrieval of all students
describe('Find all students', () => {
  test('should 200', async() => {
    const req = mockRequest();
    const res = mockResponse();

    await api.findAll(req, res);

    expect(res.send).toHaveBeenCalled();
  });
});

// Test retrieval of single student
describe('Find student by ID', () => {
  test('should 200', async() => {
    const req = mockRequest({id: 1}, null);
    const res = mockResponse();

    await api.findById(req, res);

    expect(res.send).toHaveBeenCalled();
  });
});

// Test creation of student
describe('Create student', () => {
  test('should 400 if last name is not set', async() => {
    const req = mockRequest({id: null}, {firstName: 'First', lastName: null, grade: 'B', classroomId: 1});
    const res = mockResponse();

    await api.save(req, res);

    expect(res.status).toHaveBeenCalledWith(400);
  });

  test('should 400 if grade is not set', async() => {
    const req = mockRequest({id: null}, {firstName: 'First', lastName: 'Student', grade: null, classroomId: 1});
    const res = mockResponse();

    await api.save(req, res);

    expect(res.status).toHaveBeenCalledWith(400);
  });

  test('should 400 if classroom is not set', async() => {
    const req = mockRequest({id: null}, {firstName: 'First', lastName: 'Student', grade: 'B', classroomId: null});
    const res = mockResponse();

    await api.save(req, res);

    expect(res.status).toHaveBeenCalledWith(400);
  });

  test('should 200 if request body is set properly', async() => {
    const req = mockRequest({id: null}, {firstName: 'First', lastName: 'Student', grade: 'B', classroomId: 1});
    const res = mockResponse();

    await api.save(req, res);

    expect(res.send).toHaveBeenCalled();
  });
});

// Test update of student
describe('Update student', () => {
  test('should 400 if last name is not set', async() => {
    const req = mockRequest({id: null}, {firstName: 'First', lastName: null, grade: 'B', classroomId: 1});
    const res = mockResponse();

    await api.save(req, res);

    expect(res.status).toHaveBeenCalledWith(400);
  });

  test('should 400 if grade is not set', async() => {
    const req = mockRequest({id: null}, {firstName: 'First', lastName: 'Student', grade: null, classroomId: 1});
    const res = mockResponse();

    await api.save(req, res);

    expect(res.status).toHaveBeenCalledWith(400);
  });

  test('should 400 if classroom is not set', async() => {
    const req = mockRequest({id: null}, {firstName: 'First', lastName: 'Student', grade: 'B', classroomId: null});
    const res = mockResponse();

    await api.save(req, res);

    expect(res.status).toHaveBeenCalledWith(400);
  });

  test('should 404 if student to update was not found', async() => {
    const req = mockRequest({id: 4}, {firstName: 'Next', lastName: 'Student', grade: 'B', classroomId: 1});
    const res = mockResponse();

    await api.save(req, res);

    expect(res.status).toHaveBeenCalledWith(404);
  });

  test('should 200 if request body is set properly', async() => {
    const req = mockRequest({id: 1}, {firstName: 'Next', lastName: 'Student', grade: 'B', classroomId: 1});
    const res = mockResponse();

    await api.save(req, res);

    expect(res.send).toHaveBeenCalled();
  });
});

// Test deletion of student
describe('Delete student', () => {
  test('should 200', async() => {
    const req = mockRequest({id: 1}, null);
    const res = mockResponse();

    await api.deleteById(req, res);

    expect(res.send).toHaveBeenCalled();
  });
});
