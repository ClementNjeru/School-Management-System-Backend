// import request from 'supertest';
// import app from '../../src/index';
// import { PrismaClient } from '@prisma/client';

// const prisma = new PrismaClient();

// describe('POST /api/teachers/post', () => {
//   beforeAll(async () => {
//     await prisma.teacher.deleteMany({});
//   });

//   afterAll(async () => {
//     await prisma.$disconnect();
//   });

//   it('should create a new teacher', async () => {
//     const data = { name: 'John Doe', email: 'johndoe@example.com' };
//     const response = await request(app)
//       .post('/api/teachers/post')
//       .send(data)
//       .expect(201);

//     expect(response.body).toMatchObject(data);
//   });

//   it('should return an error if data is missing', async () => {
//     const data = { email: 'johndoe@example.com' };
//     const response = await request(app)
//       .post('/api/teachers/post')
//       .send(data)
//       .expect(500);

//     expect(response.body).toHaveProperty('message');
//   });
// });
