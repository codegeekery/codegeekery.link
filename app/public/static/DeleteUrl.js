export async function deleteUrl(hash) {
    try {
        await fetch(`/${hash}`, {
            method: 'DELETE'
        });
    } catch (err) {
        console.error('Error eliminando URL:', err.message);
    }
}
