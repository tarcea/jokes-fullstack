# Jokes FullStack App ([task description](./task-description.md))

## How to start the application

```bash
git clone https://github.com/tarcea/jokes-fullstack
```

Turn on your Docker service (the Docker app from your computer)
and then run the command:

```bash
docker-compose up
```

or

```bash
docker-compose up -d
```

Now, you can navigate to [http://localhost:3000/](http://localhost:3000/)

To stop the application, run: `docker-compose down`

# Task Description

### Jokes endpoint to use in the assignment

The below base url is preconfigured to return safe jokes, please use it to minimize the risk of
seeing a joke you might find offensive. The endpoint has a rate limit of 120 requests per
minute per client.

```
GET https://v2.jokeapi.dev/joke/Programming,Pun?safe-mode
```

### Backend requirments

- Create an API endpoint that can fetch jokes from the above endpoint and lets the API
  user set two parameters
  - amount - the user should be allowed to get 5 to 10 jokes at a time using your
    endpoint. 10 should be the default value if not specified. [See API docs](https://sv443.net/jokeapi/v2/#amount-param).
  - type - the user should be allowed to specify the value single (single line),
    twopart (two part joke) or any (allows both) when using your endpoint. any
    should be the default value if not specified. [See API docs](https://sv443.net/jokeapi/v2/#joke-type).

### Frontend requirements

- Allows the user to search for jokes by specifying the amount of jokes and the types
  he wishes to see. Both inputs should be optional but have user friendly validation.

- Lists the fetched Jokes as some type of list

  - Render all the fetched jokes texts (the actual joke content)

  - Visibly highlight each word with the letter a in it (lower- or uppercase) in any way you want

  - Display the jokes category close to the joke itself

- Presents the data from the below specified analysis somewhere in relation to the list
  of jokes

### Analysis - performed on frontend or backend, your choice

Using the set of Jokes fetched in your backend endpoint, you should calculate the following
set of statistics and provide it to the end user.

\*Statistics are case insensitive, count both upper and lowercase characters

\*Statistics are to be calculated across the jokes

\*Consider single and twopart joke data structures when summarizing over joke texts

- Summarize the total amount of characters

- Calculate how often the third letter of the last joke occurs

- Calculate which is the most common letter

- Calculate which is the dominant category and in which percentage it occurs. If it’s a
  draw, it should be presented as such
