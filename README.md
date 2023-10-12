# API DE FUTEBOL

Essa api foi criada como fonte de estudo e também para ser usada como portfólio na minha evolução como desenvolvedor backend.

## ROUTES

| NAME | METHOD | ROUTES | QUERIES |
| --- | --- | --- | --- 
| add | POST | /team |
| search  | GET | /team | name, code
| findone | GET | /team/:id |
| findbyleague | GET | /team/:leagueId/league |
| add | POST | /league |
| search  | GET | /league | name
| findone | GET | /league/:id |
| findbycountry | GET | /league/:countryId/country |
| add | POST | /fixtures |
| findbyleague | GET | /fixtures/:leagueId/league | round
| findbyteam | GET | /fixtures/:teamId/team |
| updatescore | PUT | /fixtures/:id |

