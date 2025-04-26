import { sql } from '../config/config.ts';
import { nanoid } from 'nanoid';
import type { ILink, errorResponse } from '../types/TypeLink.ts';

const HASH_LENGTH = 8;

export async function createShortUrl(originalUrl: string, authCode?: string): Promise<ILink> {
    const errors: errorResponse = [];

    // Validación de URL
    if (!originalUrl) {
        errors.push({ field: 'originalUrl', message: 'Empty URL' });
    } else {
        try {
            new URL(originalUrl); // lanza si es inválida
        } catch (_) {
            errors.push({ field: 'originalUrl', message: 'Invalid URL' });
        }
    }

    // Validación del código de autenticación
    const isValid = await isValidAuthCode(authCode || '');
    if (!isValid) {
        errors.push({ field: 'authCode', message: 'Invalid AuthCode' });
    }

    if (errors.length > 0) {
        throw errors;
    }

    const hash = nanoid(HASH_LENGTH);
    const createdAt = new Date();

    await sql.query(`
        WITH set AS (
          SELECT set_config('request.auth_code', $1, true)
        )
        INSERT INTO links (original_url, hash, created_at)
        VALUES ($2, $3, $4);
      `, [
        authCode,
        originalUrl,
        hash,
        createdAt
    ]);



    return { originalUrl, hash, createdAt };
}


export async function getAllUrls(): Promise<ILink[]> {
    try {

        // Si la política de lectura RLS está habilitada, se debe establecer el código de autenticación
        // Luego, ejecutas la consulta SELECT
        const result = await sql.query(`
            SELECT
                original_url as "originalUrl",
                hash,
                created_at as "createdAt"
            FROM links
        `);
        

        // Si el resultado tiene un valor, devuelve solo la URL como string
        return result.rows || [];
    } catch (error) {
        console.error('Error obteniendo URLs:', error);
        return [];
    }
}

export async function isValidAuthCode(authCode: string): Promise<boolean> {
    try {
        const result = await sql.query(`
            SELECT EXISTS(
                SELECT 1 FROM auth
                WHERE code = $1 
                AND expires_at > NOW()
            ) AS is_valid
        `, [authCode]);
        return result.rows[0]?.is_valid;
    } catch (error) {
        console.error('Error validando auth code:', error);
        return false;
    }
}

// Redireccionar a la URL original
export async function getUrlByHash(hash: string): Promise<string | null> {
    try {
        const result = await sql.query(`
            SELECT
                original_url as "originalUrl",
                hash,
                created_at as "createdAt"
            FROM links
            WHERE hash = $1
        `, [hash]);
        
        // Si el resultado tiene un valor, devuelve solo la URL como string
        return result.rows[0]?.originalUrl || null;
    } catch (error) {
        console.error('Error obteniendo URL por hash:', error);
        return null;
    }
}

// Delete URL by hash
export async function deleteUrlByHash(hash: string): Promise<void> {
    try {
        await sql.query(`
            DELETE FROM links
            WHERE hash = $1
        `, [hash]);
    } catch (error) {
        console.error('Error eliminando URL por hash:', error);
    }
}


export const dashboardService = {
    createShortUrl,
    getAllUrls,
    isValidAuthCode,
    getUrlByHash,
    deleteUrlByHash,
};