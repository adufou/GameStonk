### Stonkofus

# PREREQUIS

Installer Docker

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