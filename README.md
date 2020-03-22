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

### Application complete :

```
https://h01ql.csb.app/#/Articles
```

**Nous n'avons pas eu le temps de terminer le front, ainsi il faut actualiser la page pour voir les changements après connexion et déconexion.**
