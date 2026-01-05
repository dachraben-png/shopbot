// ========================================
// LOGIQUE PRINCIPALE DE L'APPLICATION
// ========================================

// Initialisation Telegram Web App
let tg = window.Telegram.WebApp;
tg.expand();
tg.MainButton.hide();

// Variable pour stocker le produit sélectionné
let selectedProduct = null;

// ========================================
// CHARGEMENT DES PRODUITS
// ========================================

function loadProducts(filteredProducts = null) {
    const grid = document.getElementById('productsGrid');
    grid.innerHTML = '';

    // Utiliser filteredProducts ou window.products (qui peut venir de localStorage) ou products par défaut
    const productsToShow = filteredProducts || window.products || products;

    productsToShow.forEach(product => {
        const card = document.createElement('div');
        card.className = 'product-card';
        card.onclick = () => showProduct(product.id);

        card.innerHTML = `
            <img src="${product.image}" alt="${product.name}" class="product-image">
            <div class="product-card-info">
                <div class="product-card-name">${product.name}</div>
                <div class="product-card-varieties">Plusieurs variétés</div>
            </div>
        `;

        grid.appendChild(card);
    });
}

// ========================================
// FILTRAGE DES PRODUITS
// ========================================

function filterProducts() {
    const categoryFilter = document.getElementById('categoryFilter').value;

    let filtered = window.products || products;

    if (categoryFilter !== 'all') {
        filtered = filtered.filter(p => p.category === categoryFilter);
    }

    loadProducts(filtered);
}

// ========================================
// AFFICHAGE D'UN PRODUIT
// ========================================

function showProduct(productId) {
    const productsData = window.products || products;
    selectedProduct = productsData.find(p => p.id === productId);
    
    if (!selectedProduct) return;

    // Mise à jour du titre
    document.getElementById('productTitle').textContent = selectedProduct.name;
    document.getElementById('productName').textContent = selectedProduct.name;
    document.getElementById('productDescription').textContent = selectedProduct.description;

    // Affichage media (image ou vidéo)
    const productImage = document.getElementById('productImage');
    const productVideo = document.getElementById('productVideo');

    if (selectedProduct.video && selectedProduct.video !== '') {
        // Afficher la vidéo
        productImage.style.display = 'none';
        productVideo.style.display = 'block';
        productVideo.querySelector('source').src = selectedProduct.video;
        productVideo.load();
    } else {
        // Afficher l'image
        productVideo.style.display = 'none';
        productImage.style.display = 'block';
        productImage.src = selectedProduct.image;
    }

    // Affichage des variétés avec boutons radio
    const varietiesList = document.getElementById('varietiesList');
    varietiesList.innerHTML = '';
    
    selectedProduct.varieties.forEach((variety, index) => {
        const varietyOption = document.createElement('div');
        varietyOption.className = 'variety-option';
        if (index === 0) varietyOption.classList.add('selected'); // Première variété sélectionnée par défaut
        
        varietyOption.innerHTML = `
            <input type="radio" name="variety" id="variety-${index}" value="${variety}" ${index === 0 ? 'checked' : ''}>
            <label for="variety-${index}" class="variety-label">${variety}</label>
        `;
        
        varietyOption.onclick = (e) => {
            if (e.target.tagName !== 'INPUT') {
                varietyOption.querySelector('input').checked = true;
            }
            document.querySelectorAll('.variety-option').forEach(v => v.classList.remove('selected'));
            varietyOption.classList.add('selected');
        };
        
        varietiesList.appendChild(varietyOption);
    });

    // Affichage des prix avec boutons radio
    const pricesList = document.getElementById('pricesList');
    pricesList.innerHTML = '';
    
    selectedProduct.prices.forEach((price, index) => {
        const priceOption = document.createElement('div');
        priceOption.className = 'price-option';
        if (index === 0) priceOption.classList.add('selected'); // Premier prix sélectionné par défaut
        
        priceOption.innerHTML = `
            <input type="radio" name="price" id="price-${index}" value="${price.quantity}" data-amount="${price.amount}" ${index === 0 ? 'checked' : ''}>
            <label for="price-${index}" class="price-label">${price.quantity}</label>
            <span class="price-amount">${price.amount}</span>
        `;
        
        priceOption.onclick = (e) => {
            if (e.target.tagName !== 'INPUT') {
                priceOption.querySelector('input').checked = true;
            }
            document.querySelectorAll('.price-option').forEach(p => p.classList.remove('selected'));
            priceOption.classList.add('selected');
        };
        
        pricesList.appendChild(priceOption);
    });

    // Configuration du bouton commander
    setupOrderButton();

    // Afficher la page produit
    document.getElementById('homePage').classList.remove('active');
    document.getElementById('productPage').classList.add('active');
}

// ========================================
// BOUTON COMMANDER
// ========================================

function setupOrderButton() {
    const orderBtn = document.getElementById('orderBtn');
    
    orderBtn.onclick = () => {
        if (!selectedProduct) return;

        // Récupérer la variété sélectionnée
        const selectedVarietyInput = document.querySelector('input[name="variety"]:checked');
        const selectedVariety = selectedVarietyInput ? selectedVarietyInput.value : selectedProduct.varieties[0];

        // Récupérer le prix/quantité sélectionné
        const selectedPriceInput = document.querySelector('input[name="price"]:checked');
        const selectedQuantity = selectedPriceInput ? selectedPriceInput.value : selectedProduct.prices[0].quantity;
        const selectedAmount = selectedPriceInput ? selectedPriceInput.dataset.amount : selectedProduct.prices[0].amount;

        // Construction du message pré-rempli avec la sélection exacte
        const message = `🛒 NOUVELLE COMMANDE

📦 Produit : ${selectedProduct.name}
🌿 Variété : ${selectedVariety}
💰 Quantité : ${selectedQuantity} - ${selectedAmount}

---
Merci de confirmer votre commande !`;

        // Encodage du message pour l'URL
        const encodedMessage = encodeURIComponent(message);
        
        // Ouverture du DM Telegram
        const telegramUrl = `https://t.me/${TELEGRAM_USERNAME}?text=${encodedMessage}`;
        
        // Ouvrir le lien
        if (tg.openTelegramLink) {
            tg.openTelegramLink(telegramUrl);
        } else {
            window.open(telegramUrl, '_blank');
        }
    };
}

// ========================================
// NAVIGATION
// ========================================

function showHome() {
    document.getElementById('productPage').classList.remove('active');
    document.getElementById('infoPage').classList.remove('active');
    document.getElementById('homePage').classList.add('active');
    
    // Mise à jour des boutons de navigation
    document.querySelectorAll('.nav-btn').forEach(btn => btn.classList.remove('active'));
    document.querySelectorAll('.nav-btn')[0].classList.add('active');
}

function showInfo() {
    document.getElementById('homePage').classList.remove('active');
    document.getElementById('productPage').classList.remove('active');
    document.getElementById('infoPage').classList.add('active');
    
    // Mise à jour des boutons de navigation
    document.querySelectorAll('.nav-btn').forEach(btn => btn.classList.remove('active'));
    document.querySelectorAll('.nav-btn')[1].classList.add('active');
}

function openChannel() {
    // Remplace par l'URL de ton canal si tu en as un
    const channelUrl = 'https://t.me/ton_canal'; // À MODIFIER
    
    if (tg.openTelegramLink) {
        tg.openTelegramLink(channelUrl);
    } else {
        window.open(channelUrl, '_blank');
    }
}

function openContact() {
    // Ouverture du DM avec toi
    const contactUrl = `https://t.me/${TELEGRAM_USERNAME}`;
    
    if (tg.openTelegramLink) {
        tg.openTelegramLink(contactUrl);
    } else {
        window.open(contactUrl, '_blank');
    }
}

// ========================================
// INITIALISATION AU CHARGEMENT
// ========================================

document.addEventListener('DOMContentLoaded', () => {
    // Charger depuis localStorage si disponible (pour prévisualisation admin)
    const savedProducts = localStorage.getItem('coffeeEgan_products');
    const savedConfig = localStorage.getItem('coffeeEgan_config');
    const savedCategories = localStorage.getItem('coffeeEgan_categories');
    
    if (savedProducts) {
        window.products = JSON.parse(savedProducts);
    }
    if (savedConfig) {
        window.siteConfig = JSON.parse(savedConfig);
    }
    if (savedCategories) {
        window.categories = JSON.parse(savedCategories);
    }
    
    // Appliquer la configuration du site si elle existe
    if (typeof siteConfig !== 'undefined') {
        applySiteConfig();
    }
    
    // Charger les catégories dans le filtre
    loadCategoryFilter();
    
    // Charger les produits
    loadProducts();
});

// Configuration des couleurs Telegram
tg.setHeaderColor('#0a1628');
tg.setBackgroundColor('#0a1628');

// ========================================
// APPLIQUER LA CONFIGURATION DU SITE
// ========================================

function applySiteConfig() {
    // Changer le titre du site
    if (siteConfig.siteName) {
        document.title = siteConfig.siteName;
        document.querySelectorAll('h1').forEach(h1 => {
            h1.textContent = siteConfig.siteName;
        });
    }
    
    // Changer le logo
    if (siteConfig.logoUrl) {
        const logoImg = document.querySelector('.logo');
        if (logoImg) {
            logoImg.src = siteConfig.logoUrl;
            logoImg.alt = siteConfig.siteName + ' Logo';
        }
    }
    
    // Mettre à jour la page Info
    if (siteConfig.infoTitle) {
        const infoTitle = document.querySelector('#infoPage h2');
        if (infoTitle) infoTitle.textContent = siteConfig.infoTitle;
    }
    
    if (siteConfig.infoMainText) {
        const infoContent = document.querySelector('.info-content p');
        if (infoContent) infoContent.textContent = siteConfig.infoMainText;
    }
    
    // Mettre à jour les sections Livraison et Paiement
    const infoHeaders = document.querySelectorAll('.info-content h3');
    const infoParagraphs = document.querySelectorAll('.info-content p');
    
    if (infoHeaders[0] && siteConfig.infoDeliveryTitle) {
        infoHeaders[0].textContent = siteConfig.infoDeliveryTitle;
    }
    if (infoParagraphs[1] && siteConfig.infoDeliveryText) {
        infoParagraphs[1].textContent = siteConfig.infoDeliveryText;
    }
    if (infoHeaders[1] && siteConfig.infoPaymentTitle) {
        infoHeaders[1].textContent = siteConfig.infoPaymentTitle;
    }
    if (infoParagraphs[2] && siteConfig.infoPaymentText) {
        infoParagraphs[2].textContent = siteConfig.infoPaymentText;
    }
}

// Mettre à jour openChannel et openContact pour utiliser la config
function openChannelUpdated() {
    const channelUrl = (typeof siteConfig !== 'undefined' && siteConfig.canalUrl) 
        ? siteConfig.canalUrl 
        : 'https://t.me/ton_canal';
    
    if (tg.openTelegramLink) {
        tg.openTelegramLink(channelUrl);
    } else {
        window.open(channelUrl, '_blank');
    }
}

function openContactUpdated() {
    const username = (typeof siteConfig !== 'undefined' && siteConfig.contactUsername) 
        ? siteConfig.contactUsername 
        : TELEGRAM_USERNAME;
    const contactUrl = `https://t.me/${username}`;
    
    if (tg.openTelegramLink) {
        tg.openTelegramLink(contactUrl);
    } else {
        window.open(contactUrl, '_blank');
    }
}

// Remplacer les anciennes fonctions
window.openChannel = openChannelUpdated;
window.openContact = openContactUpdated;

// ========================================
// CHARGEMENT DYNAMIQUE DES CATÉGORIES
// ========================================

function loadCategoryFilter() {
    const categoryFilter = document.getElementById('categoryFilter');
    if (!categoryFilter) return;
    
    // Récupérer les catégories (depuis config ou localStorage)
    let categoriesToUse = [];
    
    if (window.categories && window.categories.length > 0) {
        categoriesToUse = window.categories;
    } else if (typeof siteConfig !== 'undefined' && siteConfig.categories) {
        categoriesToUse = siteConfig.categories;
    } else {
        categoriesToUse = ['fleurs', 'concentres', 'edibles']; // Valeurs par défaut
    }
    
    // Construire les options
    let optionsHTML = '<option value="all">Toutes les catégories</option>';
    categoriesToUse.forEach(cat => {
        const catLabel = cat.charAt(0).toUpperCase() + cat.slice(1).replace(/-/g, ' ');
        optionsHTML += `<option value="${cat}">${catLabel}</option>`;
    });
    
    categoryFilter.innerHTML = optionsHTML;
}


