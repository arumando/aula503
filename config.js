/* Aula 503 — configuración de despliegue.
   Este archivo se publica junto con la app, así que NO pongas aquí claves ni contraseñas.
   Cambiarlo y volver a publicar basta para que todos los dispositivos tomen los valores nuevos. */
window.AULA_CONFIG = {
  // URL del servidor de sincronización (carpeta servidor/). Vacío = el progreso vive solo en cada dispositivo.
  sync: '',
  // URL del tutor de IA (todavía sin servidor; ver docs/ACTUALIZACIONES.md). Vacío = tutor apagado.
  tutor: '',
  // De dónde se leen las tareas. Se actualizan con: python3 sync_moodle.py > datos/tareas.json
  tareas: 'datos/tareas.json'
};
