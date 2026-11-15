# SEA — Site web de présentation

Site vitrine **Shooter Entre Amis (SEA)**, en français, conçu pour être hébergé sur un serveur personnel. Il fonctionne sans base de données, sans abonnement et sans dépendance JavaScript externe.

## Démarrage (Mac)

1. Décompresser l'archive ZIP.
2. Ouvrir `index.html` avec Safari ou Chrome pour découvrir le site.
3. Pour tester en mode serveur local, ouvrir Terminal dans le dossier du site et lancer :

   ```bash
   python3 -m http.server 8080
   ```

4. Dans le navigateur, visiter `http://localhost:8080`.

Pour arrêter le serveur local : **Ctrl + C** dans le Terminal.

## Arborescence

- `index.html` — structure de la page, textes, contenus, sections.
- `css/styles.css` — l'intégralité du design responsive.
- `js/main.js` — menu mobile, filtres de héros, fiches interactives et barre de progression.
- `assets/sea-mark.svg` — symbole graphique temporaire SEA.
- `assets/favicon.svg` — icône de l'onglet.

## Personnalisation

- **Textes et modes de jeu** : éditer `index.html`.
- **Couleurs** : modifier les variables CSS dans `:root` au début de `css/styles.css`.
- **Fiches des héros** : modifier l'objet `characters` au début de `js/main.js`.
- **Logo** : remplacer `assets/sea-mark.svg` et `assets/favicon.svg` par les fichiers définitifs (mêmes noms).
- **Illustration principale et cartes de héros** : sont actuellement des visuels abstraits, construits en SVG/CSS. Il ne s'agit pas de captures du jeu. Tu peux les remplacer par tes propres captures / renders lorsque tu voudras.
- **Autres jeux** : dupliquer un bloc `.project-card` dans la section `#projets` de `index.html`, puis ajouter l'image / le lien de la future page de jeu.

## Hébergement personnel — plus tard sur Mac mini M1

Le dossier entier peut être servi via **Caddy**, **Nginx** ou un simple serveur statique. Pour un vrai site public, privilégier un nom de domaine, HTTPS automatique et un serveur maintenu à jour.

- Sur ta connexion **fibre** actuelle : l'accès depuis Internet suppose un routeur correctement configuré, une IP publique joignable (ou une solution tunnel) et des règles réseau adaptées.
- Avec **Starlink** : selon l'offre, les connexions entrantes peuvent être compliquées par le CGNAT. Un tunnel sortant ou un hébergement externe de fichiers statiques peut alors être préférable ; pas besoin d'ouvrir des ports publics sur le Mac.
- Évite d'exposer directement le serveur de développement `python3 -m http.server` sur Internet : il sert seulement aux tests locaux.

### Exemple minimal avec Caddy (après installation)

```caddyfile
sea.example.com {
    root * /chemin/absolu/vers/SEA_site_web
    file_server
    encode zstd gzip
}
```

Remplacer le domaine et le chemin par les vrais. Ce fichier est **un exemple**, pas un serveur prêt à publier sans configuration réseau et DNS.

## Ce qui est inclus / exclu

✅ Design responsive, navigation, héros filtrables, fiches de personnages, modes, journal de développement, section des futurs jeux, FAQ, métadonnées SEO et accessibilité de base.

❌ Pas de compte joueur, paiement, téléchargement du jeu, actualisation automatique des nouvelles ou stockage des données. Ces fonctionnalités nécessiteraient une conception supplémentaire et potentiellement un backend.

**Important :** les libellés "en conception", "prévu" et "gameplay validé" reflètent l'état de travail communiqué pour les éléments de SEA au moment de la création du site, pas une promesse publique de fonctionnalité disponible.
