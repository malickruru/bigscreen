Etapes permettant de démarrer le projet


# A.	PRÉREQUIS

Assurez-vous d'avoir installé Node js, composer, 
et une distribution apache tel que xampp, wamp ou manp

# B.	INSTALLATION

**01**	Créer un dossier pour accueillir le projet, ouvrir la console et clonez le repo avec la commande :

``git clone https://github.com/malickruru/bigscreen.git``

**02** 	Aller dans le dossier backend pour le configurer avec la commande :

``cd backend``

**03**	 Installer les dépendances du projet laravel avec la commande :

``composer install``


**04** 	Démarrez le service MySQL à partir de xampp ou de votre distribution apache
 
**05**	Installer la base de données et générer des données fictives avec la commande :

``php artisan migrate --seed``

**06**	Démarrer le serveur avec la commande :

``php artisan serve``

**07**	Ouvrer un nouvel onglet dans le terminal et aller dans le dossier frontend avec la commande :

``cd frontend``
 
**08** Installer les dépendances du projet react avec la commande :

``npm install``

**09** Démarrez le serveur front avec la commande :

``npm run start``

**10** Accédez à l'interface client via l'url [http://localhost:3000/survey/1](http://localhost:3000/survey/1) 

# C. ACCÉDER À L'INTERFACE ADMINISTRATEUR

**01**	Accédez à l'interface administrateur via l'url [http://localhost:3000/administration](http://localhost:3000/administration)  
**02**	Connectez-vous avec les accès suivants :
- Email : admin@gmail.com
- Mot de passe : admin
 
