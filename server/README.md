# Server

This is an http server implementation powered by Koa + Knex. The http API allows to save chess games and list games from the database. To persist data, a postgres database is being used.

## Project pre-requisites

To run this project you will need to have installed on your machine:

- Docker
- NodeJS
- Yarn or Npm

## Database

To run the postgres database container execute the command:

`docker run --name node_websocket_poc -e POSTGRES_PASSWORD=password -p 5432:5432 -d postgres`

To run the migrations, set up the environment variables correctly (use the .env.example file as reference), and then execute the command:

`yarn migration:run`

## Running the project

After setting up the database, install dependencies using `yarn` and then execute `yarn dev` to run the server.

## Http Endpoints

### List games

- method: GET
- route: /games

This endpoint returns a list of all chess games present in the database.

Response body looks like this:

```json
[
  {
    "id": 1,
    "moves": [
      "e4",
      "e5",
      "d4",
      "exd4"
    ],
    "players": {
      "black": "Nihal Sarin",
      "white": "Alireza Firouzja"
    },
    "lastMove": "exd4"
  }
]
```

### Upsert game

- method: POST
- route: /games
- body format:
```
{
  id: number;
  moves: string[];
  players: {
    black: string;
    white: string;
  }
  lastMove: string;
}
```

This endpoint inserts a new chess game into the database or updates it if the `id` already exists. It returns a copy of the game that was just upserted.

Response body looks like this:

```json
{
  "id": 1,
  "moves": [
    "e4",
    "e5"
  ],
  "players": {
    "black": "Magnus Carlsen",
    "white": "Hikaru Nakamura"
  },
  "lastMove": "e5"
}
```
