# 🔗 Acortador de URLs en Node.js (sin frameworks)

Este proyecto es un **acortador de URLs** desarrollado con **Node.js puro**, sin utilizar frameworks como Express. Funciona como una **API REST básica** que maneja solicitudes HTTP para acortar y redireccionar URLs. No tiene frontend; todo se realiza a través de endpoints. Utiliza un archivo `.json` como base de datos ligera para almacenar los registros.

## 🛠️ Características

- 🌐 Servidor HTTP sin frameworks externos.
- 🔧 API backend sin interfaz gráfica.
- 📁 Código modular en la carpeta `src/`.
- 📝 Persistencia de datos usando un archivo `.json`.
- 🔗 Endpoints para acortar y redirigir URLs.
- 🔒 Validación básica de URLs entrantes.
- 📚 Ideal como proyecto educativo para entender cómo funciona Node.js puro.

## 🚀 Cómo ejecutar

1. Clona el repositorio:

   ```bash
   git clone https://github.com/tu-usuario/tu-repo.git
   cd tu-repo
   ```

2. Instala las dependencias e inicia el servidor:

   ```bash
   npm install
   npm start
   ```

3. El servidor estará disponible en:

   ```
   http://localhost:3000
   ```

## 📡 Endpoints disponibles

### 🔍 `GET /`

Devuelve todos los registros guardados en el archivo `.json`.

```
GET http://localhost:3000/
```

---

### ✂️ `POST /`

Crea una nueva URL acortada.

**Body (JSON):**

```json
{
  "url_base": "https://www.ejemplo.com"
}
```

**Respuesta:**

```json
{
  "url_recortada": "http://localhost:3000/redict/abc123"
}
```

---

### 🚀 `GET /redict/:code`

Redirige a la URL original correspondiente al código corto generado.

```
GET http://localhost:3000/redict/abc123
```

Esto redirigirá a:

```
https://www.ejemplo.com
```
