export async function deleteUrl(hash, authCode) {
    const res = await fetch(`/${hash}`, {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ authCode }),
    });

    if (!res.ok) throw await res.json();
    return res.json();
}


