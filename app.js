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

function loadProducts(filteredProducts = products) {
    const grid = document.getElementById('productsGrid');
    grid.innerHTML = '';

    filteredProducts.forEach(product => {
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
    const farmFilter = document.getElementById('farmFilter').value;

    let filtered = products;

    if (categoryFilter !== 'all') {
        filtered = filtered.filter(p => p.category === categoryFilter);
    }

    if (farmFilter !== 'all') {
        filtered = filtered.filter(p => p.farm === farmFilter);
    }

    loadProducts(filtered);
}

// ========================================
// AFFICHAGE D'UN PRODUIT
// ========================================

function showProduct(productId) {
    selectedProduct = products.find(p => p.id === productId);
    
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

    // Affichage des variétés
    const varietiesList = document.getElementById('varietiesList');
    varietiesList.innerHTML = '';
    
    selectedProduct.varieties.forEach(variety => {
        const varietyItem = document.createElement('div');
        varietyItem.className = 'variety-item';
        varietyItem.textContent = variety;
        varietiesList.appendChild(varietyItem);
    });

    // Affichage des prix
    const pricesList = document.getElementById('pricesList');
    pricesList.innerHTML = '';
    
    selectedProduct.prices.forEach(price => {
        const priceTag = document.createElement('div');
        priceTag.className = 'price-tag';
        priceTag.textContent = price.amount;
        pricesList.appendChild(priceTag);
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

        // Construction du message pré-rempli
        const message = `🛒 NOUVELLE COMMANDE
        
📦 Produit : ${selectedProduct.name}

🌿 Variétés disponibles :
${selectedProduct.varieties.map(v => `• ${v}`).join('\n')}

💰 Prix :
${selectedProduct.prices.map(p => `• ${p.amount} - ${p.quantity}`).join('\n')}

---
Merci de préciser la variété et la quantité souhaitées !`;

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
    loadProducts();
});

// Configuration des couleurs Telegram
tg.setHeaderColor('#1a0033');
tg.setBackgroundColor('#1a0033');
