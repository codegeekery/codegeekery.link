import { fetchAllUrls } from './FetcherUrl.js';

document.getElementById('urlShortenerForm').addEventListener('submit', async function (e) {
    e.preventDefault();

    const originalUrl = document.getElementById('originalUrl').value;
    const customHash = document.getElementById('customHash').value;
    const authCode = document.getElementById('authCode').value;
    const submitBtn = document.querySelector('.submit-btn');

    document.querySelectorAll('.error-message').forEach(el => el.remove());
    document.querySelectorAll('.form-group').forEach(el => el.classList.remove('error'));

    submitBtn.disabled = true;
    submitBtn.textContent = 'PROCESANDO...';

    try {
        const response = await fetch('/api/shorten', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                originalUrl,
                customHash: customHash || undefined,
                authCode: authCode || undefined
            })
        });

        const data = await response.json();

        if (!response.ok) {
            data.forEach(error => {
                const errorField = document.getElementById(error.field);
                if (errorField) {
                    const errorMessage = document.createElement('div');
                    errorMessage.className = 'error-message';
                    errorMessage.textContent = error.message;
                    errorField.parentNode.appendChild(errorMessage);
                    errorField.parentNode.classList.add('error');
                }
            });
        } else {
            fetchAllUrls();
            this.reset();
        }
    } catch (err) {
        console.error('Error:', err.message);
    } finally {
        submitBtn.disabled = false;
        submitBtn.textContent = 'ACORTAR URL';
    }
});

