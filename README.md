# 🌐 Acortador de URL — **codegeekery.link**

**¡Gestiona, crea y administra URLs fácilmente!**  
Una proyecto construido con **Node.js + TypeScript**, **EJS**, **Docker** y **GitHub Actions**

---

## 🚀 ¿Qué hace este proyecto?

Este proyecto es un acortador de enlace que permite:

- Crear y gestionar Urls.
- Eliminar Urls.

---

## 🎯 ¿Por qué es útil?

- Centraliza la gestión de enlaces en un solo lugar.
- Base sólida para proyectos personales.
- Código limpio y modular ideal para **aprender**, **extender** o **adaptar**.
- Totalmente preparado para despliegues en **Docker** y flujos de **CI/CD** automáticos con **GitHub Actions**.

---

## 🛠️ ¿Cómo comenzar?

**1. Clonar el repositorio**

`git clone https://github.com/codegeekery/codegeekery.link.git`  
`cd codegeekery.link`

**2. Instalar dependencias**

`npm install`

**3. Configurar variables de entorno**

Crea un archivo `.env` en la raíz del proyecto con el siguiente contenido:

`DATABASE_URL=tu_supabase_url`

**4. Ejecutar la aplicación**

`npm run dev`

---

## 🧱 Estructura del proyecto

```
.
├── .github/workflows/       # CI/CD con GitHub Actions
│   └── deployment.yml
├── app/
│   ├── config/              # Configuración general
│   ├── controllers/         # Lógica de controladores
│   ├── models/              # Modelos de base de datos
│   ├── public/              # Recursos públicos (CSS, JS, imágenes)
│   │   ├── asset/
│   │   └── css/
│   ├── static/              # Scripts de cliente
│   │   ├── DeleteUrl.js
│   │   ├── FetcherUrl.js
│   │   └── Handlers.js
│   ├── routes/              # Definición de rutas
│   │   └── routes.ts
│   ├── service/             # Servicios de negocio
│   ├── types/               # Definiciones de tipos (TypeScript)
│   │   └── TypeLink.ts
│   └── views/               # Plantillas EJS
│       ├── dashboard.ejs
│       └── index.ts
├── .env                     # Variables de entorno
├── Dockerfile               # Construcción de imagen Docker
├── docker-compose.yml       # Orquestación de servicios Docker
├── package.json             # Dependencias y scripts
├── tsconfig.json            # Configuración de TypeScript
└── .gitignore               # Archivos ignorados por Git
```

---

## 📚 Documentación y ayuda

¿Tienes dudas o encontraste un problema?

- Abre un **Issue** en GitHub: [Reportar un problema](https://github.com/codegeekery/codegeekery.link/issues).
- Participa en la sección **Discussions** (si está habilitada).
- Puedes solicitar nuevas funciones o preguntar sobre la arquitectura del proyecto.

---

## 🤝 Contribuciones

¡Las contribuciones son bienvenidas!

**Para colaborar:**

    1. Haz un **fork** del repositorio.
    2. Crea una **nueva rama** (`feature/tu-cambio`).
    3. Realiza tus cambios siguiendo buenas prácticas.
    4. Envía un **Pull Request** bien documentado.
---

## 👨‍💻 Autor

🔗 **Codegeekery**  
📧 developer@codegeekery.com

---

## 🛳️ Despliegue

El proyecto incluye:

- **Dockerfile** para empaquetado en contenedores.
- **docker-compose.yml** para levantar entornos locales rápidamente.
- **GitHub Actions** para automatizar despliegues

---

# STACK
[![My Skills](https://skillicons.dev/icons?i=supabase,nodejs,ts,html,css)](https://skillicons.dev)

