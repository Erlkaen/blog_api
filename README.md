# API Blog

***Par Nicolas Garcia et Tilo Papin.***

### Installation et lancement :

```
> npm install
```

```
> node index.js
```

### Routes non protégées :

##### Liste des articles
```
GET https://blogapiapidaepapingarcia.herokuapp.com/articles
```

##### Afficher un article
```
GET https://blogapiapidaepapingarcia.herokuapp.com/article/:article_title
```

##### S'inscrire
```
POST https://blogapiapidaepapingarcia.herokuapp.com/register
```

##### Se connecter
```
POST https://blogapiapidaepapingarcia.herokuapp.com/login
```

### Routes protégées :

##### Créer un article
```
POST https://blogapiapidaepapingarcia.herokuapp.com/secure/articles
```
##### Supprimer un article
```
DELETE https://blogapiapidaepapingarcia.herokuapp.com/article/:article_title
```

##### Modifier un article
```
PATCH https://blogapiapidaepapingarcia.herokuapp.com/article/:article_title
```

### URL de l'application complete :

```
url
```

**Nous n'avons pas eu le temps de faire s'actualiser l'interface après connexion et déconnexion sur le site, ainsi il faudra actualiser la page après ces actions.**
