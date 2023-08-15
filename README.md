# Get started

🙏 If you encounter any problem following the README, please open an Issue !
https://github.com/adufou/GameStonk/issues/new/

## Requirements

- **Unix** (Windows not entirely supported, mainly hot reload. Need to be able to run `make` for optimal dev experience too)
- **Node** `18`
- **Docker**

## Install repo and initialize

📣 Here, `GAMESTONK_ROOT` refers to the result of `pwd` in the `GameStonk` folder created by the `git clone` command

### Clone the repo
```
git clone https://github.com/adufou/GameStonk.git
```

### Create your `.env` file:
1. Duplicate the `.env.template` file in the same location.
2. Update the `GAMESTONK_LOCATION` variable to `GAMESTONK_ROOT`

### Installation
📑 For more information, see https://github.com/adufou/GameStonk/blob/master/api/README.md (FR only at the moment)

💡 If you want to see all `make` commands, simply run
```
make
```

In `GAMESTONK_ROOT`, run
```
make init-volumes && make install
```

Then, run the app 🚀

```
make run
```

Once the app is up and running, you can see logs by running
```
make logs
```

You can access : 
- Front: http://localhost:4000/
- Pgadmin: http://localhost:5050/ (see [Setup Pgadmin](https://github.com/adufou/GameStonk#setup-pgadmin))
- API URL is http://localhost:3000/

### Setup Pgadmin
Go to http://localhost:5050/, and login with
- email: `admin@admin.com`
- password: `admin`

Refer to [this guide](https://dev.to/chukwutosin_/step-by-step-guide-setting-up-a-nestjs-application-with-docker-and-postgresql-5hei), mainly the `Setting up pgAdmin and PostgreSQL Server` part at the end

Basically:
- Right click `Servers` (top left of Pgadmin), then `Register > Server...`
- Name: Whatever you want
- Then in `Connection` tab
  - Host name/address: `DB_HOST` of your `.env`
  - Port: `DB_PORT` of your `.env`
  - Maintenance database: `postgres`
  - Username: `DB_USER` of your `.env`
  - Password: `DB_PASSWORD` of your `.env`

Now pgadmin will be configured to use the DB until you remove the `volumes` folder in `GAMESTONK_ROOT`, or run `make init-pgadmin` or `make init-volumes` commands

# Ressources

Trello: https://trello.com/b/F5yH0slC/stonkofus

Serveur: https://www.ovh.com/manager/#/dedicated/server/ns399800.ip-5-196-67.eu

# Doc

https://dzone.com/articles/a-new-way-to-implement-redux-like-global-store-wit

https://dev.to/chukwutosin_/step-by-step-guide-setting-up-a-nestjs-application-with-docker-and-postgresql-5hei
