
# Carambar API

Une API pour gérer et afficher des blagues Carambar, développée avec Node.js, Express, Sequelize et SQLite. 

---

## **Prérequis**
Avant de commencer, assurez-vous d’avoir installé :
- **Node.js**
- **Yarn**
- **Git**

---

## **Déploiement sur Render**

### 1. **Créer un compte Render**
- Inscrivez-vous sur [Render.com](https://render.com).

### 2. **Ajouter le projet**
- Connectez votre dépôt GitHub à Render.
- Créez un **nouveau service web** :
  - Runtime : **Node.js**
  - Build command : `yarn --frozen-lockfile install`
  - Pre-Deploy Command (pour avoir des blagues par défaut, optionnel) : `yarn postbuild`
  - Start Command : `yarn start`

### 3. **Initialisation de la base de données sur Render**
Render utilisera automatiquement le fichier `dbInit.js` pour créer et remplir la base si vous n'avez pas de disque monté.

### 4. **Configurer l'environnement**
- Dans l'onglet 'Environnement' de Render, ajouter la variable correspondant à l'URL de votre déploiement :
  ```env
  SITE_URL_PROD=http://<votre-url-de-déploiement-render>
  ```

---

## **Installation en local**

### 1. **Cloner le dépôt**
```bash
git clone https://github.com/Heymow/carambar-backend.git
cd carambar-backend
```

### 2. **Installer les dépendances**
```bash
yarn install
```

---

## **Déploiement local**

### 1. **Configurer l'environnement**
- Créez un fichier `.env` à la racine avec les variables suivantes :
  ```env
  PORT=3000
  SITE_URL_DEV=http://localhost
  SITE_URL_TEST=http://localhost
  SITE_URL_PROD=http://localhost
  ```

### 2. **Initialiser la base de données**
Vous pouvez choisir de démarrer avec des blagues par défaut ou une base vierge.

- **Base avec blagues de départ :**
  ```bash
  yarn postbuild
  ```

- **Base vierge :**
  ```bash
  yarn cleardb
  yarn migrate
  ```

### 3. **Lancer le serveur**
En mode développement :
```bash
yarn dev
```

Le serveur sera accessible à l’adresse suivante :
```
http://localhost:3000
```

---



## **Tests**

### 1. **Lancer les tests**
Les tests utilisent **Jest** et **Supertest**. Pour les exécuter, lancez :
```bash
yarn test
```

### 2. **Exemples de tests**
- **POST /jokes** : Ajoute une blague, retourne un statut 201.
- **GET /jokes** : Récupère toutes les blagues, retourne un tableau.
- **GET /jokes/:id** : Retourne une blague spécifique ou une erreur 404.
- **GET /jokes/random** : Retourne une blague aléatoire.

---

## **Endpoints principaux**

### Blagues
- **`POST /jokes`** : Ajouter une nouvelle blague.
- **`GET /jokes`** : Récupérer toutes les blagues.
- **`GET /jokes/:id`** : Récupérer une blague par ID.
- **`GET /jokes/random`** : Récupérer une blague aléatoire.

La documentation complète des endpoints est disponible à l’URL `/api-docs` via Swagger.

---

## **Structure du projet**

```
carambar-backend/
├── controllers/         # Logique métier
├── routes/              # Définition des routes
├── models/              # Modèles Sequelize
├── migrations/          # Scripts pour créer/modifier la base
├── seeders/             # Données initiales (blagues par défaut)
├── init/                # Fichiers d'initialisation
├── tests/               # Tests unitaires et d'intégration
├── config/              # Configuration de Sequelize
├── index.js             # Point d’entrée principal
└── package.json         # Scripts et dépendances
```

---

## **Scripts disponibles**

| Commande               | Description                                   |
|------------------------|-----------------------------------------------|
| `yarn dev`             | Démarre le serveur en mode développement.    |
| `yarn start`           | Démarre le serveur en mode production.       |
| `yarn test`            | Exécute les tests avec Jest.                 |
| `yarn migrate`         | Applique les migrations à la base.           |
| `yarn seed`            | Ajoute des blagues initiales.                |
| `yarn cleardb`         | Supprime toutes les migrations.              |
| `yarn migrate:rollback`| Annule la dernière migration.                |