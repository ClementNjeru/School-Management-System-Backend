// import request from 'supertest';
// import app from '../index';

// describe('POST /api/classes/post', () => {
//   it('should create a new class', async () => {
//     const data = { name: 'Math', teacher: 'John Doe' };
//     const response = await request(app)
//       .post('/api/classes/post')
//       .send(data)
//       .expect(201);

//     expect(response.body).toMatchObject(data);
//   });

//   it('should return an error if data is missing', async () => {
//     const data = { teacher: 'John Doe' };
//     const response = await request(app)
//       .post('/api/classes')
//       .send(data)
//       .expect(500);

//     expect(response.body).toHaveProperty('message');
//   });
// });
