export async function deleteUrl(hash, authCode) {
    try {
        const response = await fetch(`/${hash}/${authCode}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json'
            }
        });

        const result = await response.json();

        if (!response.ok) {
            throw result.errors;
        }

        return result;
    } catch (err) {
        throw err;
    }
}

