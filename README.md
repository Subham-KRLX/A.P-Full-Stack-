# Full Stack Project

A modern full-stack application with React + Vite frontend and Node.js + Express + Prisma backend.

## 🚀 Tech Stack

### Frontend
- React 19
- Vite 7
- React Router DOM

### Backend
- Node.js
- Express.js
- Prisma ORM
- SQLite Database

## 📁 Project Structure

```
Full Stack/
├── Full Stack/        # Frontend (Vite + React)
└── server/           # Backend (Express + Prisma)
    ├── prisma/
    │   ├── schema.prisma
    │   └── seed.js
    └── src/
        ├── controllers/
        ├── routes/
        └── index.js
```

## 🛠️ Setup Instructions

### Backend Setup

```bash
cd server

# Install dependencies
npm install

# Run database migrations
npx prisma migrate dev

# (Optional) Seed database with sample data
npm run prisma:seed

# Start development server
npm run dev
```

Server runs on `http://localhost:5000`

### Frontend Setup

```bash
cd "Full Stack"

# Install dependencies
npm install

# Start development server
npm run dev
```

Frontend runs on `http://localhost:5173`

## 📡 API Endpoints

### Authors
- `GET /api/authors` - Get all authors
- `GET /api/authors/:id` - Get single author
- `POST /api/authors` - Create author
- `PUT /api/authors/:id` - Update author
- `DELETE /api/authors/:id` - Delete author

### Books
- `GET /api/books` - Get all books
- `GET /api/books/:id` - Get single book
- `GET /api/books/search` - Search books
- `POST /api/books` - Create book
- `PUT /api/books/:id` - Update book
- `DELETE /api/books/:id` - Delete book

## 🗄️ Database Schema

### Author
- id (Int, Primary Key)
- name (String)
- email (String, Unique)
- createdAt (DateTime)

### Book
- id (Int, Primary Key)
- title (String)
- price (Float)
- stock (Int)
- authorId (Int, Foreign Key)
- createdAt (DateTime)

**Relationship:** One Author → Many Books

## 🔑 Environment Variables

Create `.env` file in server directory:

```env
DATABASE_URL="file:./dev.db"
PORT=5000
NODE_ENV=development
```

## 📚 Useful Commands

```bash
# Prisma commands
npx prisma studio          # Open database GUI
npx prisma generate        # Generate Prisma Client
npx prisma migrate dev     # Create migration
npx prisma db push         # Push schema (without migration)
```

## 👨‍💻 Author

Subham Sangwan

## 📄 License

ISC
