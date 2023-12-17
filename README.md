# free-chat

---

## standalone apps

to run all apps run the following commands in different tabs of a terminal each

#### database:

you need a postgresql installation and a database named `chat-dev` and a user and password `docker` (same for both)

#### frontend:

`cd frontend && npm i && npm run dev`

#### users service:

`cd backend/users && npm i && npm run start:dev`

#### conversations service:

`cd backend/conversations && npm i && npm run start:dev`

#### orchestrator:

`cd backend/orchestrator && npm i && npm run start:dev`

---

## Docker

to run all the apps in a docker container from the root directory execute

`docker compose up -d`

to tear down execute

`docker compose down`
