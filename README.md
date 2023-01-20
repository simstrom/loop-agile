# Loop Agile Now

Loop Agile Now is a web-based communications platform acting as a forum for signed in users.
Functionality includes API handling authentication and authorization as well as CRUD operations for posts, comments and reactions.
Built for the purpose to learn full-stack React development and its design patterns.

## Technologies

Frontend: React
Middle layer: Node.js, Express.js and Sequelize ORM
Backend Database: MySQL

## Libraries & Packages

Here is a list of third party libraries/packages I've used and why.

### Client

- chakra UI
  Used as component library. It was easy to pick-up. Great documentation. Felt professional to work with native components and pass styling as props. Fastest growing react ui library currently. Well supported.
- axios
  Used to handle fetch requests easier.
- firebase
  Used to store images related to posts.
- react-quill
  Used to create rich text formatted posts.
- sanitize-html
  Used to sanitize rich text formatted posts before rendering in UI.

### Server

- dotenv
  Makes it possible to hide environment variables such as DB credentials.
- nodemon
  Makes development easier since server restarts automatically on file save.
- cors
  Makes it possible to communicate between localhost 3000 & 4000 (client / server).
- argon2
  Used for password hashing.

## Instructions

### Config

1. Go to `./client/src/utils/firebase.config.js`
2. Update credentials.
3. Go to `./server`
4. Create `.env` file and match content of `./server/config/db.config.js`

### How to Run

1. `cd client`
2. `npm install`
3. `npm start`
4. open new terminal window/tab.
5. `cd server`
6. `npm install`
7. `npm start`

### Database Design
