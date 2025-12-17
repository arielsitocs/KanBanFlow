DROP TABLE IF EXISTS tasks;
DROP TABLE IF EXISTS boards;
DROP TABLE IF EXISTS users;

CREATE TABLE users(
	userId SERIAL PRIMARY KEY,
	username VARCHAR NOT NULL,
	email VARCHAR NOT NULL,
	password VARCHAR NOT NULL
);

CREATE TABLE boards(
	boardId SERIAL PRIMARY KEY,
	title VARCHAR NOT NULL,
	removed BOOL,
	userId INT,
	FOREIGN KEY (useriD) REFERENCES users(userId) ON DELETE CASCADE
);

CREATE TABLE tasks(
	taskId SERIAL PRIMARY KEY,
	taskName VARCHAR NOT NULL,
	limitDate DATE NOT NULL,
	priority VARCHAR NOT NULL,
	status VARCHAR NOT NULL,
	boardId INT,
	userId INT,
	FOREIGN KEY (boardId) REFERENCES boards(boardId) ON DELETE CASCADE
);

INSERT INTO users (username, email, password) VALUES 
    ('ana.garcia', 'ana.garcia@test.com', 'clave123'),
    ('carlos.perez', 'carlos.perez@test.com', 'segura456'),
    ('maria.lopez', 'maria.lopez@test.com', 'qwerty789'),
    ('juan.rodriguez', 'juan.rodriguez@test.com', 'admin2025'),
    ('sofia.martinez', 'sofia.martinez@test.com', 'kanban_pro');

INSERT INTO boards (title, userid) VALUES 
    ('Proyecto KanbanFlow', 3), 
    ('Cosas de Casa', 4),         
    ('Desarrollo Web', 2),        
    ('Marketing 2025', 2),
    ('Ideas de Negocio', 3),
    ('Viaje a Japón', 4),
    ('Rutina de Gym', 5);
	

INSERT INTO tasks (taskName, limitDate, priority, status, boardId, userId) VALUES

-- Board 8: Proyecto KanbanFlow (Dueño: User 3)
('Configurar autenticación JWT', '2025-12-15', 'Alta', 'completed', 1, 3),
('Diseñar esquema de base de datos', '2025-12-20', 'Alta', 'in progress', 1, 3),
('Crear componente Drag & Drop', '2026-01-05', 'Media', 'pending', 1, 3),
('Implementar modo oscuro', '2026-01-10', 'Baja', 'pending', 1, 3),
('Configurar CI/CD en GitHub', '2025-12-18', 'Alta', 'completed', 1, 3),
('Redactar documentación API', '2026-01-20', 'Media', 'pending', 1, 3),

-- Board 9: Cosas de Casa (Dueño: User 4)
('Pagar cuenta de electricidad', '2025-12-12', 'Alta', 'pending', 2, 4),
('Comprar comida para el gato', '2025-12-14', 'Alta', 'in progress', 2, 4),
('Llamar al técnico de la lavadora', '2025-12-16', 'Media', 'pending', 2, 4),
('Organizar despensa', '2025-12-20', 'Baja', 'pending', 2, 4),
('Cotizar seguro de hogar', '2026-01-15', 'Media', 'pending', 2, 4),

-- Board 10: Desarrollo Web (Dueño: User 2)
('Terminar módulo de Server Actions', '2025-12-22', 'Alta', 'in progress', 3, 2),
('Actualizar foto de perfil LinkedIn', '2025-12-25', 'Baja', 'completed', 3, 2),
('Optimizar SEO del portafolio', '2026-01-05', 'Media', 'pending', 3, 2),
('Investigar Tailwind v4', '2026-01-10', 'Baja', 'pending', 3, 2),
('Refactorizar componentes viejos', '2026-01-12', 'Media', 'pending', 3, 2),

-- Board 11: Marketing 2025 (Dueño: User 2)
('Definir presupuesto anual', '2026-01-02', 'Alta', 'pending', 4, 2),
('Crear calendario de contenidos Q1', '2025-12-28', 'Media', 'in progress', 4, 2),
('Diseñar plantillas para Instagram', '2026-01-15', 'Baja', 'pending', 4, 2),
('Analizar métricas 2024', '2025-12-30', 'Alta', 'completed', 4, 2),

-- Board 12: Ideas de Negocio (Dueño: User 3)
('Validar idea con encuesta', '2026-02-01', 'Alta', 'pending', 5, 3),
('Investigar competencia directa', '2026-01-20', 'Media', 'completed', 5, 3),
('Crear landing page básica', '2026-02-15', 'Media', 'pending', 5, 3),
('Registrar dominio .com', '2026-01-10', 'Baja', 'pending', 5, 3),

-- Board 13: Viaje a Japón (Dueño: User 4)
('Comprar Japan Rail Pass', '2026-02-20', 'Alta', 'pending', 6, 4),
('Reservar hotel en Tokyo (Shinjuku)', '2026-02-25', 'Alta', 'completed', 6, 4),
('Armar itinerario para Kyoto', '2026-03-01', 'Media', 'in progress', 6, 4),
('Comprar tarjeta SIM (eSIM)', '2026-03-10', 'Baja', 'pending', 6, 4),
('Cambiar dólares a yenes', '2026-03-12', 'Media', 'pending', 6, 4);

SELECT * FROM users;
SELECT * FROM boards;
SELECT * FROM tasks;