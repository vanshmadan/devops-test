const request = require('supertest');
const app = require('../index');
require('dotenv').config();
const mongoose = require('mongoose');

beforeAll(async () => {
    await mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true });
});

afterAll(async () => {
    await mongoose.connection.close();
});

describe('Sketch API Tests', () => {

    let sketchId = '';
    const dummyUserId = new mongoose.Types.ObjectId().toHexString();

    it('should save sketch metadata', async () => {
        const res = await request(app).post('/api/metaData').send({
            name: "Test Sketch",
            base64: "initial-base64-data",
            userId: [dummyUserId]
        });
        expect(res.statusCode).toBe(200);
        expect(res.body).toHaveProperty('_id');
        sketchId = res.body._id;
    });

    it('should fetch all sketches', async () => {
        const res = await request(app).get('/api/allSketches');
        expect(res.statusCode).toBe(200);
        expect(Array.isArray(res.body.allSketches)).toBe(true);
    });

    it('should fetch sketch by ID', async () => {
        const res = await request(app).post('/api/sketchById').send({ sketchId });
        expect(res.statusCode).toBe(200);
        expect(res.body.sketch).toHaveProperty('_id', sketchId);
    });

    it('should add user to sketch', async () => {
        const res = await request(app).post('/api/addUserToSketch').send({
            sketchId,
            userId: dummyUserId
        });
        expect(res.statusCode).toBe(200);
        expect(res.body.updatedSketch).toHaveProperty('_id', sketchId);
    });

    it('should fetch sketch with user info', async () => {
        const res = await request(app).post('/api/sketchWithUserInfo').send({ sketchId });
        expect(res.statusCode).toBe(200);
        expect(res.body.sketch).toHaveProperty('_id', sketchId);
    });

    it('should update a sketch', async () => {
        const res = await request(app).post('/api/updateSketch').send({
            sketchId,
            base64: "updated-canvas-data",
            name: "Updated Sketch Name",
            userId: dummyUserId
        });
        expect(res.statusCode).toBe(200);
        expect(res.body).toHaveProperty('base64', "updated-canvas-data");
    });

});
