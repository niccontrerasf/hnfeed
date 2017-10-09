# hnfeed
Little web to show hacker news feed from [https://hn.algolia.com/api](https://hn.algolia.com/api/v1/search_by_date?query=nodejs) api.

## Exceptions:
Validation of same story and different author (comments at same post) is not descriminated (_tags[2], "story_id")

If you delete a post it wont be banned (_tags[2], "story_id"), so it will be reinserted in the next hour refresh.

## Before start
`mongodb` have to be running. Te connection string is set by default (`port 27017`). If you want to edit it you can find the connection string in the file `connection.js`

All dependencies included in `package.json`

You need an active internet connection.

Coded in node version 4.2.6

## How to run
After downloaded the project run `npm install` inside proyect folder
```sh
npm install
```
App will run in `port 80`
```sh
node app.js
```
[localhost:80](http://localhost:80/)

## Populate Data Base
App will create database and collection on first run and also check every restart of the app if it is created.

When you start the app `node app.js` automatically it will check if there is new post available in the api an insert them and a count will start to check for new post every 60 minutes. You can change this in the file `app.js` variable `minutes`.

If you need to force the check for new posts just restart the app. `node app.js`

You can read node logs for every db transaction (deletes and inserts) and the time of the last check for new posts.


## Preview
![alt text](https://raw.githubusercontent.com/niccontrerasf/hnfeed/master/Captura.PNG)

