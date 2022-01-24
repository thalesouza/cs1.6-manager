# cs1.6-manager

Backend application to manage Counter Strike 1.6 matches

### What is expected:
* After every match is add, the players must be 0 ✔️
* Players in match must have: Nickname, kills, deaths, mvps and ping  ✔️
* Matches should finish when time is over or team reaches 16 points. After finish, player is not allowed to join.  ✔️
* Matches should be balanced, (diff between CT and T shouldn't be more than 1) ✔️
* Players stats can be added (through api) at the moment they join the server.  - ✔️
* Routine to check every live match (1 per minute) and check every player ping. If more than 100 for 2 minutes, player
must be removed. - TODO

### Tech stack:
* Javascript
* NodeJS
* Express
* MySQL
* Sequelize

### Endpoints
* Live matches ✔️
* Add match in server ✔️
* ️Remove match from server ✔️
* Change map in server  ✔️
* Add score to CT/T; /ct/:id  ✔️
* General stats from player  ✔️
* Add player in match -  ✔️
* Remove player from match -  ✔️
