# CPEL - front

Ce projet gère l'interface de notre application CPEL. Cette application fait office de plateforme interactive de cours et d'exercices pour que des professeurs puissent proposer des cours et exercices en Python à des étudiants.
Le but premier est de pouvoir éxécuter un exercice sur le navigateur.

## Installation du projet
```
yarn install
```
ou

```
npm install
```

### Lancer le projet en local
```
yarn serve
```
ou
```
vue-cli-service serve
```

Vous pourrez, après le lancement de cette commande, lancer le projet depuis l'URL http://localhost:8080/login

### Les comptes à utiliser pour se connecter
Interface professeur: 

- Username = **20192679** et mot de passe = **test**

Interface admin: 

- Username = **20162012** et mot de passe = **admin**

Interface étudiant :
 - Username = **20200001** et mot de passe = **20200001**
 
Il faut recharger la page après la connexion d'un professeur pour avoir le header (car les cookies ne sont pas automatiquement rechargés)
 

### Développé par 
DIEDHIOU Marieme, MOUTAOUKIL Soukayna et LUNDI Marion

### Outils utilisés
Partie front : VueJS, Bootstrap, Skulpt.org (pour l'éxécution de code Python)

Partie back : NodeJS, MongoDB

Déploiement : Heroku
