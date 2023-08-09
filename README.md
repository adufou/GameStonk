⚠️ J'ai refacto une grosse partie de l'app, je mettrai bientôt le README à jour ⚠️
⚠️ UPDATE - J'insisite ⚠️
### Stonkofus

## Je veux y accéder

URL: stonkofus.fr
URL: http://ns399800.ip-5-196-67.eu:4000/

## Je veux participer au dev

# PREREQUIS

- Docker
- Linux / Unix pour Hot Reload (buggué sous WSL)
- Signer ses commits, sinon les PR ne sont pas mergeables

# Lancement de l'application

Dans un terminal :
- cd dans le dossier Stonkofus/
- `docker compose build`
- `docker compose up`
- Aller à http://localhost:8000/

# Quand changement sur les modèles

Dans un terminal :
- cd dans le dossier Stonkofus/
- `.\venv\Scripts\activate`
- `cd back/`
- `python .\manage.py makemigrations`

# Créer superuser

Dans un terminal :
- cd dans le dossier Stonkofus/
- `.\venv\Scripts\activate`
- `cd back/`
- `python manage.py createsuperuser`

# Ressources

Trello: https://trello.com/b/F5yH0slC/stonkofus
Serveur: https://www.ovh.com/manager/#/dedicated/server/ns399800.ip-5-196-67.eu

# Doc

https://dzone.com/articles/a-new-way-to-implement-redux-like-global-store-wit
