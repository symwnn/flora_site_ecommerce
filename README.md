# Flora - Site E-commerce Full Stack

Bienvenue sur **Flora**, mon projet de site e-commerce développé avec passion dans le cadre de ma formation à Epitech Digital School.

Ce site permet la vente de produits (ex: fleurs) avec une interface utilisateur intuitive, une gestion admin et un système de paiement sécurisé.

---

##  Fonctionnalités principales

-  Authentification et inscription des utilisateurs
-  Catalogue de produits
-  Ajout au panier et gestion en temps réel
-  Paiement sécurisé avec Stripe
-  Back-office pour gérer les produits (admin)
-  Suivi des commandes
---

##  Technologies utilisées

### Frontend

- Vue.js

### Backend

- Docker
- Phpmyadmin
- Javascipt
- mysql

### Paiement

- Stripe API

---

##  Installation du projet

### 1. Cloner le dépôt

```bash
git clone https://github.com/symwnn/rattrapage_final.git
cd rattrapage_final
```

## 2. Lancer le Backend

```bash
cd api
npm install
node index.js
```

## 3. Lancer le Frontend

```bash
cd vue-flora
npm install
npm run dev
```

##  Données de test Stripe

Utilisez ces données en mode test pour passer une commande :

- **Carte** : `4242 4242 4242 4242`
- **Date d'expiration** : 12/34
- **CVC** : 567
