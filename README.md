# hnfeed
Little web to show hacker news feed from [https://hn.algolia.com/api](https://hn.algolia.com/api/v1/search_by_date?query=nodejs) api.

## Exceptions:
Validation of same story and different author (comments at same post) is not descriminated (_tags[2], "story_id")
If you delete a post it wont be banned (_tags[2], "story_id"), so it will be reinserted in the next hour refresh.

## Before start
`mongodb` have to be running. Te connection string is set by default (`port 27017`). If you want to edit it you can find the connection string in the file `connection.js`
Coded in node version 4.2.6

## How to run

All dependencies included in `package.json`
After downloaded the project run `npm install` inside proyect folder
```sh
npm install
```
App will run in `port 80`
```sh
node app.js
```
[localhost:80](http://localhost:80/)


![alt text](https://raw.githubusercontent.com/niccontrerasf/calidadaire/master/Captura.PNG)








