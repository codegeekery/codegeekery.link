import type { Request, Response } from 'express';
import { Router } from 'express';

// importar vista dashboard
import { getDashboard } from '../controllers/dashboardControllers.ts';

import { dashboardService } from '../service/dashboardService.ts';



const router = Router();

router.get('/', getDashboard);

router.post('/api/shorten', async (req: Request, res: Response): Promise<void> => {
    try {
        const { originalUrl, authCode } = req.body;
        const result = await dashboardService.createShortUrl(originalUrl, authCode);

        res.status(200).json(result);
    } catch (error) {
        if (Array.isArray(error)) {
            res.status(400).json(error);
            return;
        }
        console.error('Error al crear la URL corta:', error);
        res.status(500).json({ message: 'Server Error Internal' });
    }
});



router.get('/api/urls', async (req: Request, res: Response) => {
    try {
        const urls = await dashboardService.getAllUrls();
        res.json(urls);
    } catch (error) {
        res.status(500).json({ error: 'Error al obtener URLs' });
    }
});

router.get('/:hash', async (req: Request, res: Response) => {
    const { hash } = req.params;
    try {
        const url = await dashboardService.getUrlByHash(hash);
        if (url) {
            // Redirige al cliente a la URL asociada con el hash
            res.redirect(url);
        } else {
            res.status(404).json({ error: 'URL not found' });
        }
    } catch (error) {
        res.status(500).json({ error: 'Error al obtener la URL' });
    }
});

router.delete('/:hash', async (req: Request, res: Response) => {
    const { hash } = req.params;
    try {
        await dashboardService.deleteUrlByHash(hash);
        res.status(204).send(); // No content
    } catch (error) {
        res.status(500).json({ error: 'Error al eliminar la URL' });
    }
});


export default router;