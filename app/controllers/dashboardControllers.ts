import type { Request, Response } from 'express';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const viewsPath = join(__dirname, '..', 'views');

export const getDashboard = (req: Request, res:Response) => {
  res.render(join(viewsPath, 'dashboard.ejs'));
};

