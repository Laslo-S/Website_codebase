# External AI Agent News Post Submission API Documentation

This document outlines how an external AI agent can authenticate and submit new news posts (as drafts) to the website API.

## 1. Authentication (JWT)

The API uses JSON Web Tokens (JWT) for authentication. The agent needs to obtain an access token first.

**Endpoint:** `POST /api/v1/accounts/token/`

**Request Body (JSON):**
```json
{
  "username": "ai_news_agent",
  "password": "YOUR_AGENT_PASSWORD"
}
```
*   Replace `YOUR_AGENT_PASSWORD` with the securely stored password for the `ai_news_agent` user (found in the project's `.env` file as `AI_NEWS_AGENT_PASSWORD`).

**Success Response (200 OK):**
```json
{
  "refresh": "<refresh_token>",
  "access": "<access_token>"
}
```
*   The agent should store the `access_token` (short-lived, e.g., 60 minutes) and the `refresh_token` (longer-lived, e.g., 1 day).

**Error Response (401 Unauthorized):**
```json
{
  "detail": "No active account found with the given credentials"
}
```

**Token Refresh:**
When the `access_token` expires (API calls return 401), the agent should use the `refresh_token` to get a new access token.

**Endpoint:** `POST /api/v1/accounts/token/refresh/`

**Request Body (JSON):**
```json
{
  "refresh": "<stored_refresh_token>"
}
```

**Success Response (200 OK):**
```json
{
  "access": "<new_access_token>"
}
```
*   The agent should replace its stored `access_token` with the new one.

## 2. Creating a News Post

Once authenticated with a valid access token, the agent can submit new posts.

**Endpoint:** `POST /news/api/news-posts/create/`

**Authentication:** Requires a valid JWT access token in the header:
`Authorization: Bearer <access_token>`

**Permissions:** The user associated with the token MUST be a member of the `AI-Agents` group.

**Request Body (Choose one format):**

*   **JSON (`Content-Type: application/json`):**
    ```json
    {
      "title": "Example Post Title From AI",
      "content": "<p>This is the post content, potentially including basic HTML tags.</p>"
    }
    ```
*   **Form Data (`Content-Type: multipart/form-data`):** (Use this if including a featured image)
    *   `title`: Example Post Title With Image
    *   `content`: `<p>Content for the post with an image.</p>`
    *   `featured_image`: [Attach the image file here]

**Required Fields:**
*   `title` (string, max length enforced by model)
*   `content` (string, HTML allowed)

**Optional Fields:**
*   `featured_image` (image file, only via `multipart/form-data`)

**Success Response (201 Created):**
The API returns the serialized data of the newly created `NewsPost`.
```json
{
    "title": "Example Post Title From AI",
    "content": "<p>This is the post content...</p>",
    "featured_image": null 
    // Or: "featured_image": "/media/news_images/your_image.jpg"
}
```
*   The created post will automatically have `status='draft'`.
*   The `slug` will be auto-generated.
*   It needs to be reviewed and published via the Django admin interface.

**Error Responses:**
*   **400 Bad Request:** If required fields are missing or data is invalid (e.g., title too long).
    ```json
    {
        "title": ["This field is required."]
    }
    ```
*   **401 Unauthorized:** If the access token is missing, invalid, or expired.
    ```json
    {
        "detail": "Authentication credentials were not provided."
    }
    // or
    {
        "detail": "Given token not valid for any token type", ...
    }
    ```
*   **403 Forbidden:** If the authenticated user is not in the `AI-Agents` group.
    ```json
    {
        "detail": "You do not have permission to perform this action."
    }
    ```
*   **429 Too Many Requests:** If the agent exceeds the configured rate limits.
    ```json
    {
        "detail": "Request was throttled. Expected available in X seconds."
    }
    ``` 