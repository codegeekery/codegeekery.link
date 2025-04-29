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
                const authCode = document.getElementById('authCode').value;
        
                document.querySelectorAll('.error-message').forEach(e => e.remove());
                document.querySelectorAll('.form-group').forEach(e => e.classList.remove('error'));
        
                try {
                    await deleteUrl(item.hash, authCode);
                    fetchAllUrls();
                } catch (errors) {
                    errors.forEach(error => {
                        const el = document.getElementById(error.field);
                        if (el) {
                            const div = document.createElement('div');
                            div.className = 'error-message';
                            div.textContent = error.message;
                            el.parentNode.appendChild(div);
                            el.parentNode.classList.add('error');
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
