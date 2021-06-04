# emoji-shortener

A URL shortener which shortens URLs to a sequence of emojis. Which is not really that interesting in itself. The interesting part is the backend being completely implemented in SQL.

## But why

Mostly just to see what’s possible. [Supabase.io](https://supabase.io) got me interested in the PostgreSQL + PostgREST combination, and what you can actually do if you push more functionality into the database. Also, emojis in URLs are mostly stupid and therefore fun, which makes it a good case for experimenting.

## Architecture

### Frontend

Just a simple HTML page. It either shows an input field, allowing you to enter a URL to shorten, or in the case of a path being supplied, queries the backend for the full URL.

### Backend

Runs completely on [Supabase.io](https://supabase.io). Shortening a URL is done through an exposed PostgreSQL function, which does all the work. Redirecting is done by querying the `redirect` table, retrieving the actual URL.

