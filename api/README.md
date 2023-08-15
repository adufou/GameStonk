Ce serveur a été généré en suivant https://dev.to/chukwutosin_/step-by-step-guide-setting-up-a-nestjs-application-with-docker-and-postgresql-5hei

## Pgadmin

On peut acceder à plus d'infos sur la DB via Pgadmin.

### Comment
1. Faire `make pgadmin-init` (optionel)
2. Aller sur http://localhost:5050
3. Se référer à https://dev.to/chukwutosin_/step-by-step-guide-setting-up-a-nestjs-application-with-docker-and-postgresql-5hei
4. Le but c'est donc de se connecter a la db postgres en suivant le tuto. Quand vous allez rensigner les infos de connexion, laissez Maintenace qqch a `postgres`. Il  y a 2 db qui ont l'air de tourner, celle du `.env`, et une postgresql surement. A utiliser surement plus tard ! Mais pas de panique du coup si vous voyez 2 db :)

Normalement, le serveur sera enregistré dans un volume, qui nécessite d'être crée via le make pour garantir l'acces à l'user du process dans le container
Source: https://stackoverflow.com/questions/64781245/permission-denied-var-lib-pgadmin-sessions-in-docker

# Todo

https://wanago.io/2022/07/25/api-nestjs-database-migrations-typeorm/

# Doc

### Entity
https://docs.nestjs.com/techniques/database#repository-pattern

### Auth
https://docs.nestjs.com/security/authentication
