/* eslint-disable no-use-before-define */
/* eslint-disable prefer-destructuring */
/* eslint-disable no-underscore-dangle */
const request = require('supertest');
const app = require('../../index');
const newTodo = require('../mock-data/new-todo.json');

const endpointURL = '/todos/';

let firstTodo;
let newTodoId;
let nonExistingTodoId = '5ec478b99c443e50f16c5589';
const testData = { title: 'Make integration test for PUT', done: true };

describe(endpointURL, () => {
  it(`GET${endpointURL}`, async () => {
    const response = await request(app).get(endpointURL);
    expect(response.statusCode).toBe(200);
    expect(Array.isArray(response.body)).toBeTruthy();
    expect(response.body[0].title).toBeDefined();
    expect(response.body[0].done).toBeDefined();
    firstTodo = response.body[0];
  });
  it(`GET by id ${endpointURL}:todoId`, async () => {
    const response = await request(app).get(endpointURL + firstTodo._id);
    expect(response.statusCode).toBe(200);
    expect(response.body.title).toBe(firstTodo.title);
    expect(response.body.done).toBe(firstTodo.done);
  });
  it(`GET todo by id doesnt exist${endpointURL}:todoId`, async () => {
    const response = await request(app).get(
      `${endpointURL}5ec9d42f95c30bdc3f4f1900`
    );
    expect(response.statusCode).toBe(404);
  });
  it(`POST${endpointURL}`, async () => {
    const response = await request(app).post(endpointURL).send(newTodo);
    expect(response.statusCode).toBe(201);
    expect(response.body.title).toBe(newTodo.title);
    expect(response.body.done).toBe(newTodo.done);
    newTodoId = response.body._id;
  });
  it(`should return error 500 on malformed data with POST${endpointURL}`, async () => {
    const response = await request(app)
      .post(endpointURL)
      .send({ title: 'Missing done property' });
    expect(response.statusCode).toBe(500);
    expect(response.body).toStrictEqual({
      message: 'Todo validation failed: done: Path `done` is required.',
    });
  });
  it(`PUT${endpointURL}`, async () => {
    const response = await request(app)
      .put(endpointURL + newTodoId)
      .send(testData);
    expect(response.statusCode).toBe(200);
    expect(response.body.title).toBe(testData.title);
    expect(response.body.done).toBe(testData.done);
  });
  it(`should return 404 on PUT${endpointURL}`, async () => {
    const response = await request(app)
      .put(endpointURL + nonExistingTodoId)
      .send(testData);
    expect(response.statusCode).toBe(404);
  });
  it(`DELETE${endpointURL}`, async () => {
    const response = await request(app)
      .delete(endpointURL + newTodoId)
      .send({ message: 'Todo was deleted successfully' });
    expect(response.statusCode).toBe(200);
    expect(response.body.title).toBe(testData.title);
    expect(response.body.done).toBe(testData.done);
  });
  it(`DELETE 404 ${endpointURL}`, async () => {
    const response = await request(app)
      .delete(endpointURL + nonExistingTodoId)
      .send({ message: 'Todo was not deleted' });
    expect(response.statusCode).toBe(404);
  });
});
