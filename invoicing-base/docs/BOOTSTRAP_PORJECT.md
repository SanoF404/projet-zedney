# Development Environment Setup Guide

Welcome! This guide will help you set up the development environment required to run the project locally.

---

# 1. Recommended Operating System

We strongly recommend using **Ubuntu** as your development environment.

Why Ubuntu?

- Excellent developer experience
- Better filesystem performance compared to Windows
- Fewer compatibility issues
- Most production servers run Linux, making your local environment closer to production

If you're currently using **Windows**, consider one of the following:

- Install **Ubuntu** as your primary OS (recommended)
- Use **WSL2 with Ubuntu**
- Continue with Windows if necessary

macOS is also fully supported and acceptable

---

# 2. Install Docker

## Windows / macOS

Install **Docker Desktop**.

After installation, verify:

```bash
docker --version
```

---

## Ubuntu Linux

Install Docker Engine and Docker Compose, we also recommend using this [guide](https://www.digitalocean.com/community/tutorials/how-to-install-and-use-docker-on-ubuntu-20-04)

We also recommend installing **Portainer** to manage containers through a web interface.

Verify installation:

```bash
docker --version
```

---

# 3. Create the MySQL Database

- Run the container:

```bash
docker run -d \
  --name invoicing-mysql \
  -e MYSQL_ROOT_PASSWORD=password \
  -p 3036:3306 \
  mysql:latest
```

- Verify it is running:

```bash
docker ps
```

- Enter the container:

```bash
docker exec -it invoicing-mysql bash
```

- Launch mysql using this command, you will be prompted to enter the password

```
mysql -u root -p
```

Create the project database:

```sql
CREATE DATABASE invoicing;
EXIT;
```

---

# 4. Create the MinIO Container

Run a MinIO container using the same credentials defined in the backend `.env` file.

Example:

```bash
docker run -d \
  --name invoicing-minio \
  -p 9000:9000 \
  -p 9001:9001 \
  -e MINIO_ROOT_USER=<MINIO_ROOT_USER> \
  -e MINIO_ROOT_PASSWORD=<MINIO_ROOT_PASSWORD> \
  quay.io/minio/minio server /data --console-address ":9001"
```

Replace:

- `<MINIO_ROOT_USER>`
- `<MINIO_ROOT_PASSWORD>`

with the values found in the backend environment file.

---

# 5. Install Node.js Using NVM

Do **not** install Node.js directly.

If Node.js is already installed globally, uninstall it first.

Install **NVM (Node Version Manager)**.

Once installed:

```bash
nvm install 22
```

Use Node 22:

```bash
nvm use 22
```

Verify:

```bash
node -v
npm -v
```

---

# 6. Extract the Projects

Extract both project archives into your preferred workspace.

Example structure:

```
workspace/

├── backend/
└── frontend/
```

---

# 7. Install Dependencies

## Backend

```bash
yarn install
```

## Frontend

```bash
npm install
```

---

# 8. Configure Environment Variables

Both projects contain an example environment file.

For each project:

```bash
cp .env.example .env
```

Open the `.env` files and verify:

- Database connection
- MinIO credentials
- API URLs
- Any required secrets

---

# 9. Seed the Database

From the backend project:

```bash
yarn seed:all
```

Wait until the seed completes successfully.

---

# 10. Start the Projects

## Backend

```bash
yarn start:dev
```

---

## Frontend

```bash
yarn dev
```

Ensure both applications start without errors.

---

# 11. First Login

Open the frontend in your browser.

Log in using the **Super Admin** account provided by your mentor or found in the seeded data.

Once logged in:

- Explore the dashboard
- Browse the different modules
- Create and edit records
- Familiarize yourself with the application's workflow

The goal is to understand the project before starting development tasks.

---

# Setup Checklist

- ✅ Ubuntu installed (recommended)
- ✅ Docker installed
- ✅ MySQL container running on port **3036**
- ✅ `invoicing` database created
- ✅ MinIO container running
- ✅ Node.js installed using **NVM**
- ✅ Node version **22**
- ✅ Backend dependencies installed
- ✅ Frontend dependencies installed
- ✅ `.env` configured
- ✅ Database seeded
- ✅ Backend running
- ✅ Frontend running
- ✅ Successfully logged in as **Super Admin**
- ✅ Explored the application
