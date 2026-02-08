# Personal Notes & Bookmark Manager

## Backend Setup
1. `cd backend`
2. `npm install`
3. Copy `.env.example` to `.env` and set `MONGODB_URI`.
4. `npm run dev`

The API runs on `http://localhost:5000`.

## Frontend Setup
1. `cd frontend`
2. `npm install`
3. `npm run dev`

Set `NEXT_PUBLIC_API_BASE` in `.env.local` if your backend runs on a different host or port.

## API Summary
Notes
- `POST /api/notes`
- `GET /api/notes?q=searchTerm&tags=tag1,tag2`
- `GET /api/notes/:id`
- `PUT /api/notes/:id`
- `DELETE /api/notes/:id`

Bookmarks
- `POST /api/bookmarks`
- `GET /api/bookmarks?q=searchTerm&tags=tag1,tag2`
- `GET /api/bookmarks/:id`
- `PUT /api/bookmarks/:id`
- `DELETE /api/bookmarks/:id`

Sample curl
```bash
curl -X POST http://localhost:5000/api/notes \
  -H "Content-Type: application/json" \
  -d '{"title":"My note","content":"Hello","tags":["personal"]}'
```
