# Conecta UNT

Plataforma web para conectar estudiantes y profesores con oportunidades reales de colaboración.

---

## 🚀 Inicialización del proyecto

### 1. Clona el repositorio

```bash
git clone https://github.com/conecta-unt/backend.git
cd backend
```

### 2. Instala las dependencias

```bash
npm install
```

---

### 3. Crea la base de datos

Crea la base de datos `conectaunt`

---

### 4. Configura las variables de entorno

Crea un archivo `.env` en el root del proyecto, y configura las siguientes variables de entorno:

```env
# App Configuration
PORT=8000

# Secrets
JWT_SECRET_KEY=your-secret-key
COOKIE_SECRET=your-secret

# Client Configuration
CLIENT_1_URL=http://localhost:3000

# Email Configuration
EMAIL_HOST=smtp.gmail.com
EMAIL_PORT=465
EMAIL_SECURE=true
EMAIL_HOST_USER=your-host-user
EMAIL_HOST_PASSWORD=your-host-password

# Social
GOOGLE_CLIENT_ID=your-google-client-id
GOOGLE_CLIENT_SECRET=your-google-client-secret

# Database Configuration
MAIN_DATABASE_NAME=cerbeus
MAIN_DATABASE_USER=your-user
MAIN_DATABASE_PASSWORD=your-password
```

### Inicializa la base de datos

```bash
npm run seed
```
