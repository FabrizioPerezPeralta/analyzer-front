# AnalyzerBackend API

Base URL: http://localhost:5129

## Auth

### POST /api/auth/register
Creates a new user and returns a JWT.

Request (application/json):
{
  "username": "demo",
  "password": "P@ssw0rd!"
}

Response (application/json):
{
  "userId": "<guid>",
  "token": "<jwt>"
}

Possible errors:
- 409 Conflict (username already exists)

### POST /api/auth/login
Logs in an existing user and returns a JWT.

Request (application/json):
{
  "username": "demo",
  "password": "P@ssw0rd!"
}

Response (application/json):
{
  "userId": "<guid>",
  "token": "<jwt>"
}

Possible errors:
- 401 Unauthorized (invalid credentials)

## Analyzer

### POST /api/analyzer/analyze
Analyzes user input using DeepSeek. Requires JWT. Accepts text, file, or both.

Headers:
- Authorization: Bearer <jwt>

Request (multipart/form-data):
- text: optional free text written by the user
- file: optional SQL or text file

Rules:
- If both are provided, the backend concatenates `text` + two newlines + file content.
- If neither is provided, the API returns 400.

Response (application/json):
{
  "detectedDialect": "PostgreSQL",
  "observations": [
    {
      "severity": "High",
      "description": "...",
      "proposedFixSql": "..."
    }
  ],
  "reactFlow": {
    "nodes": [
      {
        "id": "table_users",
        "type": "default",
        "position": { "x": 0, "y": 0 },
        "data": { "label": "users" }
      }
    ],
    "edges": [
      {
        "id": "users_roles",
        "source": "table_users",
        "target": "table_roles",
        "label": "FK users.role_id -> roles.id"
      }
    ]
  }
}

Possible errors:
- 400 Bad Request (missing text and file)
- 401 Unauthorized (missing or invalid token)

## Notes

- The backend expects `Authorization: Bearer <token>` for protected endpoints.
- The analyzer currently expects `multipart/form-data` even for text-only submissions.
- DeepSeek configuration is read from appsettings.json.

## Example cURL

Register:
  curl -X POST http://localhost:5129/api/auth/register \
    -H "Content-Type: application/json" \
    -d "{\"username\":\"demo\",\"password\":\"P@ssw0rd!\"}"

Login:
  curl -X POST http://localhost:5129/api/auth/login \
    -H "Content-Type: application/json" \
    -d "{\"username\":\"demo\",\"password\":\"P@ssw0rd!\"}"

Analyze (text only):
  curl -X POST http://localhost:5129/api/analyzer/analyze \
    -H "Authorization: Bearer <jwt>" \
    -F "text=CREATE TABLE users (id uuid primary key);"

Analyze (file only):
  curl -X POST http://localhost:5129/api/analyzer/analyze \
    -H "Authorization: Bearer <jwt>" \
    -F "file=@schema.sql"

Analyze (text + file):
  curl -X POST http://localhost:5129/api/analyzer/analyze \
    -H "Authorization: Bearer <jwt>" \
    -F "text=Notas del usuario" \
    -F "file=@schema.sql"

## Example fetch (frontend)

Register:
  fetch("http://localhost:5129/api/auth/register", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ username: "demo", password: "P@ssw0rd!" })
  });

Analyze (text + file):
  const form = new FormData();
  form.append("text", userText);
  form.append("file", fileInput.files[0]);

  fetch("http://localhost:5129/api/analyzer/analyze", {
    method: "POST",
    headers: { Authorization: `Bearer ${token}` },
    body: form
  });
