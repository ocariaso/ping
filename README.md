# ping
A microblogging application built with AdonisJS v6, Tailwind CSS, and PostgreSQL. It features Tokenized Authentication for users, enabling full CRUD operations on micro-posts (create, read, update, delete) and post liking. Future plans include expanding engagement with comments, sharing, and media support.

## Features
### Current (Implemented):
- **User Accounts**: Secure sign-up and sign-in for users.
- **Authentication**: Robust web session and Tokenized Authentication for API access.
- **Post CRUD**: Users can create, read, update, and delete their micro-posts.
- **Post Liking**: Users can express appreciation for posts.

### Future (Planned):
- **Comment System**: Enable discussions directly on posts.
- **Share Functionality**: Allow easy content sharing.
- **Social Authentication**: Integrate sign-in via platforms like Google.
- **Media Posts**: Support for including images and videos in posts.
- **Profile Pictures**: Personalize user profiles with avatars.

## Setup and Running the Program
### 1. Install Dependencies
``` sh
npm install
```

### 2. Create a copy of the example environment file:
``` sh
cp .env.example .env
```

### 3. Update environment variables 

### 4. Generate Application Key
``` sh
node ace generate:key
```

### 5. Run Database Migrations
``` sh
node ace migration:run
```

### 6. Start Server
``` sh
node ace serve --watch
```

### 7. Access the Application
``` sh
http://localhost:3333
```
