# Wizard Form (Laravel Project)

## 🧰 Requirements

- PHP 8.0 or higher
- MySQL or MariaDB
- Node.js 22.13 and npm 10.9
- Git (optional)
- Composer 2.8 or higher
- Webpack (via Laravel Mix)

## ⚙️ Installation

### 1. Clone the Repository

```bash
git clone https://github.com/pavliqqq/wizard-form-laravel-vue.git
cd wizard-form-laravel-vue
```

### 2. Install Dependencies

```bash
composer install
```

### 3. Environment Setup

```bash
cp .env.example .env
```
Edit the .env file to configure your environment variables (database, app key, etc.):

```bash
php artisan key:generate
```
### 4. Install JS dependencies

```bash
npm install
npm run dev
```

### 5. Database Setup

1) Connect to MySQL server:

```bash
mysql -u root -p
```

2) Create the database:

```bash
CREATE DATABASE wizardForm CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
```

3) Exit MySQL:

```bash
exit
```

4) Run the import command (for PowerShell):

```bash
Get-Content .\database\dump.sql | mysql -u root -p wizardForm
```

If the above command didn’t work, follow these steps:

5) Open your command prompt (cmd).

6) Navigate to the project directory, for example:

```bash
cd path\to\your\project
```

7) Run the import command:

```bash
mysql -u root -p wizardForm < database/dump.sql
```

### 6. Create the storage symbolic link

```bash
php artisan storage:link
```

### 7. Start Local Server

```bash
php artisan serve
```

Project will be accessible at:
http://localhost:8000

The database contains a default admin user seeded 
with email: admin@gmail.com and password: 12345.

You can access the admin login page at:
http://localhost:8000/admin/login
