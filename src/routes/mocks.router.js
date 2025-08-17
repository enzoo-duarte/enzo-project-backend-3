import { Router } from 'express';

const router = Router();

// Endpoint  de prueba
router.get('/', (req, res) => {
    res.send('Mock Router running successfully');
});

export default router;
