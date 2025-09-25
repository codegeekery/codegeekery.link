import { deleteUrl } from './DeleteUrl.js';

export async function fetchAllUrls() {
    try {
        const res = await fetch('/api/urls');
        const data = await res.json();

        const list = document.getElementById('urlsList');
        list.innerHTML = '';

        if (!res.ok) throw new Error(data.error || 'Error al obtener las URLs');

        if (data.length === 0) {
            const li = document.createElement('li');
            li.textContent = 'No hay URLs acortadas aún';
            list.appendChild(li);
            return;
        }

        data.forEach(item => {
            const shortUrl = `link.codegeekery.com/${item.hash}`;

            const li = document.createElement('li');
            li.classList.add('url-item');

            // Div wrapper
            const contentWrapper = document.createElement('div');
            contentWrapper.className = 'url-content-wrapper'; // clase flex

            // El span
            const span = document.createElement('span');
            span.textContent = item.hash;
            span.className = 'short-url';

            span.addEventListener('click', async function () {
                try {
                    await navigator.clipboard.writeText(shortUrl);
                    span.textContent = '¡Copiado!';
                    setTimeout(() => {
                        span.textContent = item.hash;
                    }, 2000);
                } catch (err) {
                    console.error('Error al copiar:', err);
                    alert('Error al copiar el enlace. Intenta manualmente.');
                }
            });

            // Botón eliminar
            const deleteBtn = document.createElement('button');
            deleteBtn.className = 'delete-btn';
            deleteBtn.textContent = 'Eliminar';
            deleteBtn.onclick = async () => {
                const authCodeEl = document.getElementById('authCode');
                const authCode = authCodeEl.value;

                // Limpiar mensajes previos
                document.querySelectorAll('.error-message, .success-message').forEach(e => e.remove());
                authCodeEl.parentNode.classList.remove('error');

                try {
                    const result = await deleteUrl(item.hash, authCode);

                    const successDiv = document.createElement('div');
                    successDiv.className = 'success-message';
                    successDiv.textContent = result.message;
                    authCodeEl.parentNode.appendChild(successDiv);

                    fetchAllUrls();
                } catch (err) {
                    const errors = err.errors || [{ field: 'general', message: 'Internal Server Error' }];

                    errors.forEach(e => {
                        const div = document.createElement('div');
                        div.className = 'error-message';
                        div.textContent = e.message;
                        authCodeEl.parentNode.appendChild(div);

                        if (e.field === 'authCode') {
                            authCodeEl.parentNode.classList.add('error');
                        }
                    });
                }

            };


            // Insertamos el span y el botón dentro del mismo contentWrapper
            contentWrapper.appendChild(span);
            contentWrapper.appendChild(deleteBtn);

            // Insertamos el contentWrapper dentro del li
            li.appendChild(contentWrapper);

            // Insertamos el li en la lista
            list.appendChild(li);
        });

    } catch (err) {
        const list = document.getElementById('urlsList');
        list.innerHTML = `<li>Error al cargar las URLs: ${err.message}</li>`;
    }
}


// Cargar URLs automáticamente al cargar la página
window.addEventListener('DOMContentLoaded', fetchAllUrls);
