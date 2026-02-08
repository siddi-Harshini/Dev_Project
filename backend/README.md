# Personal Notes & Bookmark Manager API

## Setup
1. `cd backend`
2. `npm install`
3. Copy `.env.example` to `.env` and update `MONGODB_URI` if needed.
4. `npm run dev`

## Base URL
`http://localhost:5000`

## Notes
- `POST /api/notes`
- `GET /api/notes?q=searchTerm&tags=tag1,tag2`
- `GET /api/notes/:id`
- `PUT /api/notes/:id`
- `DELETE /api/notes/:id`

Body fields: `title` (required), `content` (required), `tags` (optional, array or CSV string), `favorite` (optional boolean).

## Bookmarks
- `POST /api/bookmarks`
- `GET /api/bookmarks?q=searchTerm&tags=tag1,tag2`
- `GET /api/bookmarks/:id`
- `PUT /api/bookmarks/:id`
- `DELETE /api/bookmarks/:id`

Body fields: `url` (required), `title` (optional), `description` (optional), `tags` (optional, array or CSV string), `favorite` (optional boolean).

If `title` is omitted, the API attempts to auto-fetch the page title.
