const request = require('supertest');
const app = require('../../index');
const newTodo = require('../mock-data/new-todo.json');

const endpointURL = '/todos/';

describe(endpointURL, () => {
  it(`POST`, async () => {
    const response = await request(app).post(endpointURL).send(newTodo);
    expect(response.statusCode).toBe(201);
    expect(response.body.title).toBe(newTodo.title);
    expect(response.body.done).toBe(newTodo.done);
  });
});
