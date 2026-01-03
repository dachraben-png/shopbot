# 🐰 CALI RABBIT SHOP - MINI APP TELEGRAM

## 📋 GUIDE COMPLET D'INSTALLATION

### ÉTAPE 1 : DÉPLOYER SUR GITHUB PAGES (5 MIN)

1. **Créer un compte GitHub** (si tu n'en as pas déjà un)
   - Va sur https://github.com
   - Clique sur "Sign up"
   - Suis les instructions

2. **Créer un nouveau repository**
   - Clique sur le bouton "+" en haut à droite
   - Choisis "New repository"
   - Nom du repository : `cali-rabbit-shop` (ou ce que tu veux)
   - Coche "Public"
   - Clique sur "Create repository"

3. **Uploader les fichiers**
   - Dans ton repository, clique sur "uploading an existing file"
   - Glisse-dépose TOUS les fichiers :
     * index.html
     * style.css
     * app.js
     * products.js
     * logo.png
   - Clique sur "Commit changes"

4. **Activer GitHub Pages**
   - Va dans Settings (en haut du repository)
   - Dans le menu de gauche, clique sur "Pages"
   - Dans "Source", sélectionne "main" ou "master"
   - Clique sur "Save"
   - Attends 2-3 minutes
   - Ton site sera accessible à : `https://TON-USERNAME.github.io/cali-rabbit-shop/`

---

### ÉTAPE 2 : CRÉER TON BOT TELEGRAM (3 MIN)

1. **Ouvrir Telegram et chercher @BotFather**

2. **Créer ton bot**
   - Envoie `/newbot`
   - Choisis un nom : "Cali Rabbit Shop"
   - Choisis un username : `CaliRabbitShopBot` (doit finir par "bot")
   - BotFather te donne un TOKEN → **GARDE-LE PRÉCIEUSEMENT**

3. **Configurer le Web App**
   - Envoie `/newapp` à BotFather
   - Sélectionne ton bot
   - Nom court : "shop"
   - Titre : "Cali Rabbit Shop"
   - Description : "Shop premium de produits sélectionnés"
   - Photo : Envoie ton logo (le fichier logo.png)
   - Demo GIF : Skip (envoie /empty)
   - **URL du Web App** : Colle l'URL de ton GitHub Pages
     Exemple : `https://TON-USERNAME.github.io/cali-rabbit-shop/`

4. **Tester ton bot**
   - Cherche ton bot dans Telegram
   - Clique sur le bouton du menu en bas
   - Ton shop devrait s'ouvrir ! 🎉

---

### ÉTAPE 3 : MODIFIER TES PRODUITS (TRÈS FACILE)

1. **Ouvrir le fichier products.js** (dans GitHub ou sur ton PC)

2. **Pour modifier un produit existant** :
   - Change le `name`, la `description`
   - Remplace l'URL de l'`image` par ton image hébergée
   - Si tu veux une vidéo, mets l'URL dans `video`
   - Modifie les `varieties` (variétés)
   - Change les `prices`

3. **Pour ajouter un nouveau produit** :
   - Copie un bloc de produit complet (de `{` à `},`)
   - Colle-le à la fin de la liste
   - Change l'`id` (doit être unique : 7, 8, 9...)
   - Modifie toutes les infos

4. **Héberger tes images/vidéos** :
   - Option 1 : Utilise Imgur (https://imgur.com) - gratuit
   - Option 2 : Mets les images dans ton repository GitHub
     URL sera : `https://TON-USERNAME.github.io/cali-rabbit-shop/nom-image.jpg`

5. **Sauvegarder** :
   - Dans GitHub : Clique sur "Commit changes"
   - Attends 1-2 minutes que ça se mette à jour

---

### STRUCTURE DES FICHIERS

```
cali-rabbit-shop/
│
├── index.html          → Page principale (NE PAS MODIFIER)
├── style.css           → Styles (tu peux changer les couleurs si tu veux)
├── app.js              → Logique de l'app (NE PAS MODIFIER sauf si tu sais coder)
├── products.js         → TES PRODUITS (À MODIFIER ICI)
└── logo.png            → Ton logo (remplace par le tien)
```

---

### PERSONNALISATION RAPIDE

**Changer les couleurs :**
Ouvre `style.css` et cherche :
- `#ff69b4` → Couleur rose principale
- `#4169e1` → Couleur bleue
- `#1a0033` → Fond violet foncé

**Changer ton username Telegram :**
Dans `products.js`, ligne 9 :
```javascript
const TELEGRAM_USERNAME = "werebeu92"; // Change ici
```

**Ajouter ton canal Telegram :**
Dans `app.js`, cherche `openChannel()` et change l'URL

---

### EXEMPLE D'AJOUT DE PRODUIT

```javascript
{
    id: 7,
    name: "Mon Nouveau Produit",
    category: "fleurs",
    farm: "cali",
    image: "https://i.imgur.com/ABC123.jpg",
    video: "", // Laisse vide si pas de vidéo
    description: "Description de mon produit",
    varieties: [
        "VARIÉTÉ 1",
        "VARIÉTÉ 2"
    ],
    prices: [
        { amount: "10€", quantity: "1g" },
        { amount: "20€", quantity: "2g" }
    ]
},
```

---

### CATÉGORIES ET FARMS DISPONIBLES

**Catégories :**
- `fleurs`
- `concentres`
- `edibles`

**Farms :**
- `cali`
- `spain`
- `local`

---

### DÉPANNAGE

**Le shop ne s'affiche pas :**
- Vérifie que GitHub Pages est activé
- Attends 2-3 minutes après chaque modification
- Vérifie l'URL dans BotFather (elle doit être exacte)

**Les images ne s'affichent pas :**
- Vérifie que les URLs des images sont correctes
- Utilise des URLs complètes (https://...)
- Teste l'URL de l'image dans ton navigateur

**Le bouton Commander ne marche pas :**
- Vérifie ton `TELEGRAM_USERNAME` dans products.js
- Il ne doit PAS avoir de @ devant

---

### HÉBERGER TES IMAGES

**Option 1 : Imgur** (Recommandé - Simple)
1. Va sur https://imgur.com
2. Clique sur "New post"
3. Upload ton image
4. Clic droit sur l'image → "Copier l'adresse de l'image"
5. Utilise cette URL dans products.js

**Option 2 : GitHub** (Plus stable)
1. Upload l'image dans ton repository
2. URL sera : `https://TON-USERNAME.github.io/cali-rabbit-shop/ton-image.jpg`

---

### ASTUCES

✅ Teste toujours après chaque modification
✅ Garde des sauvegardes de ton fichier products.js
✅ Utilise des images optimisées (pas trop lourdes)
✅ Vérifie l'orthographe avant de sauvegarder

---

### CONTACT

Pour toute question, DM : @werebeu92

---

**BON BUSINESS MON REUF ! 🚀💰**
