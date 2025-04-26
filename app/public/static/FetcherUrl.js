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
            const shortUrl = `${window.location.origin}/${item.hash}`;

            const li = document.createElement('li');
            li.classList.add('url-item');

            // Nuevo div para organizar internamente (flex)
            const contentWrapper = document.createElement('div');
            contentWrapper.className = 'url-content-wrapper';

            const span = document.createElement('span');
            span.textContent = shortUrl;
            span.className = 'short-url';

            // Al hacer clic en el enlace, copiar al portapapeles
            span.addEventListener('click', async function () {
                try {
                    await navigator.clipboard.writeText(shortUrl);
                    span.textContent = '¡Copiado!';
                    setTimeout(() => {
                        span.textContent = shortUrl;
                    }, 2000);
                } catch (err) {
                    console.error('Error al copiar:', err);
                    alert('Error al copiar el enlace. Intenta manualmente.');
                }
            });

            // Botón de eliminar
            const deleteBtn = document.createElement('button');
            deleteBtn.className = 'delete-btn';
            deleteBtn.textContent = 'Eliminar';
            deleteBtn.onclick = async () => {
                await deleteUrl(item.hash);
                fetchAllUrls();
            };

            // Insertamos el span y el botón dentro del div
            contentWrapper.appendChild(span);
            contentWrapper.appendChild(deleteBtn);

            // Insertamos el div dentro del li
            li.appendChild(contentWrapper);

            // Insertamos el li dentro de la lista
            list.appendChild(li);
        });
    } catch (err) {
        const list = document.getElementById('urlsList');
        list.innerHTML = `<li>Error al cargar las URLs: ${err.message}</li>`;
    }
}

// Cargar URLs automáticamente al cargar la página
window.addEventListener('DOMContentLoaded', fetchAllUrls);
