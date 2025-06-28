const request = require('supertest');
const app = require('../index');
require('dotenv').config();
const mongoose = require('mongoose');


beforeAll(async () => {
    await mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true });
    await mongoose.connection.collection('profiles').deleteMany({});

});

afterAll(async () => {
    await mongoose.connection.close();
});

describe('Auth API Tests', () => {

    const testUser = {
        username: 'testuser@example.com',
        password: 'testpass',
        color: '#000000'
    };

    it('should register a new user', async () => {
    const res = await request(app).post('/api/register').send(testUser);
    expect(res.statusCode).toBe(200);
    expect(res.body.username).toBe(testUser.username);
    });

    it('should not allow duplicate registration', async () => {
        const res = await request(app).post('/api/register').send(testUser);
        expect(res.statusCode).toBe(500);
    });

    it('should login existing user', async () => {
        const res = await request(app).post('/api/login').send({
            username: testUser.username,
            password: testUser.password
        });
        expect(res.statusCode).toBe(200);
        expect(res.body.username).toBe(testUser.username);
    });

    it('should reject login with wrong password', async () => {
        const res = await request(app).post('/api/login').send({
            username: testUser.username,
            password: 'wrongpassword'
        });
        expect(res.statusCode).toBe(401);
    });

    it('should reject login with non-existent user', async () => {
        const res = await request(app).post('/api/login').send({
            username: 'nonexistent@example.com',
            password: 'somepassword'
        });
        expect(res.statusCode).toBe(404);
    });

});
