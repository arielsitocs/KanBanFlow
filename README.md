# 🌊 KanBanFlow

> **Organiza, Gestiona y Fluye.**
> Una aplicación Full-Stack de gestión de tareas estilo Kanban, diseñada para ser moderna, simple, rápida y eficiente.

![Next.js](https://img.shields.io/badge/Next.js-black?style=for-the-badge&logo=next.js&logoColor=white)
![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)
![Node.js](https://img.shields.io/badge/Node.js-43853D?style=for-the-badge&logo=node.js&logoColor=white)
![Express.js](https://img.shields.io/badge/Express.js-404D59?style=for-the-badge)
![Prisma](https://img.shields.io/badge/Prisma-3982CE?style=for-the-badge&logo=Prisma&logoColor=white)
![PostgreSQL](https://img.shields.io/badge/PostgreSQL-316192?style=for-the-badge&logo=postgresql&logoColor=white)

---

## 🚀 Características Principales

*   **⚡ Frontend Moderno:** Construido con **Next.js 15 (App Router)** y **React 19** para un rendimiento óptimo.
*   **🎨 Diseño Elegante:** Estilizado con **Tailwind CSS v4**, ofreciendo una interfaz limpia y responsiva.
*   **📊 Seguimiento Visual:** Integración de `react-circular-progressbar` para visualizar el progreso de tus tableros.
*   **🔌 Backend Robusto:** servidor API RESTful construido con **Express.js**.
*   **🗄️ Base de Datos Sólida:** Gestión de datos con **PostgreSQL** y **Prisma ORM** para una interacción type-safe.
*   **☁️ Listo para Despliegue:** Configuración lista para **Render** (Infrastructure as Code con `render.yaml`).
*   **🔔 Notificaciones:** Sistema de alertas bonitas y no intrusivas con `sonner`.

---

## 🛠️ Estructura del Proyecto

El proyecto está organizado como un monorepo híbrido (Frontend + Backend en el mismo repo):

```
KanBanFlow/
├── src/
│   ├── app/            # Frontend (Next.js App Router)
│   ├── components/     # Componentes React Reutilizables
│   ├── backend/        # Servidor Express y Lógica de API
│   │   ├── routes/     # Rutas de la API (Usuarios, Tableros, Tareas)
│   │   ├── config/     # Configuración de BD (Prisma Client)
│   │   └── server.js   # Punto de entrada del Backend
│   ├── lib/            # Utilidades y librerías
│   └── types/          # Definiciones de Tipos TypeScript
├── prisma/
│   └── schema.prisma   # Esquema de Base de Datos y Modelos
├── public/             # Assets estáticos
└── render.yaml         # Configuración de Despliegue en Render
```

---

## 🏁 Comenzando

Sigue estos pasos para ejecutar el proyecto localmente.

### Prerrequisitos

*   Node.js (v20 o superior recomendado)
*   npm o yarn
*   Una base de datos PostgreSQL local o una URL de conexión remota via Neon/Render/Supabase.

### 1. Instalación

Clona el repositorio e instala las dependencias:

```bash
git clone https://github.com/tu-usuario/kanbanflow.git
cd KanBanFlow
npm install
```

### 2. Configuración de Entorno

Crea un archivo `.env` en la raíz del proyecto y añade tu URL de conexión a la base de datos:

```env
DATABASE_URL="postgresql://usuario:password@localhost:5432/kanbanflow?schema=public"
```

### 3. Base de Datos (Prisma)

Genera el cliente de Prisma y sincroniza el esquema con tu base de datos:

```bash
# Generar cliente
npx prisma generate

# Sincronizar DB (Dev)
npx prisma db push
```

### 4. Ejecutar

Para desarrollo, necesitarás correr tanto el frontend como el backend.

**Terminal 1 (Backend):**
```bash
npm run server
```
_El servidor correrá en el puerto configurado (ej: 3001 o 5000)._

**Terminal 2 (Frontend):**
```bash
npm run dev
```
_La aplicación estará disponible en `http://localhost:3000`._

---

## 📦 Despliegue

Este proyecto incluye un archivo `render.yaml` configurado para desplegarse automáticamente en **Render**.

1.  Crea una cuenta en [Render](https://render.com).
2.  Conecta tu repositorio de GitHub.
3.  Selecciona "Blueprints" y elige este repositorio.
4.  Render detectará el archivo `render.yaml` y creará automáticamente:
    *   Una base de datos PostgreSQL.
    *   El servicio web (Backend + Frontend build).
    *   Vinculará las variables de entorno (`DATABASE_URL`) por ti.

---

## 🤝 Contribución

¡Las contribuciones son bienvenidas! Si tienes ideas para mejorar KanBanFlow:

1.  Haz un Fork del proyecto.
2.  Crea una rama (`git checkout -b feature/NuevaFeature`).
3.  Haz Commit de tus cambios (`git commit -m 'Agrega nueva feature'`).
4.  Haz Push a la rama (`git push origin feature/NuevaFeature`).
5.  Abre un Pull Request.
