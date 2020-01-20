# qg-back-end-sbx

QG back-end sandbox project for recruitment purpose.

## exercise

Build a secured API which allow to manage school classroom.

### Security

What is called secured is the fact that we could not access to API whithout a generated JWT Token. This token should be gerenerate during school manager authentication to our sanbox application.

### School classroom manager

- Students who have a firstname, a lastname, a grade and a classroom. The API should allow us to add, update, list and delete student.

- Classrooms which have a name, a number of student and a maximun size. Each classroom has maximum size of 24 students :smile:. We should be able to fill create, update, list and delete classroom.

- Teachers who have a firstname, lastname and one or two classroom. The API should allow us to add, update, list and delete teacher.

### Constraints

As you will notice there is linter and coverage threshold define in eslintrc and jest.conf.js files. Applicant code need to be compliant as possible to these configuration. But it should not block you to deliver your application.
