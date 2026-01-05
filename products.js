// ========================================
// FICHIER DE CONFIGURATION DES PRODUITS
// ========================================
// Tu peux modifier ce fichier pour ajouter/supprimer tes produits
// Remplace les URLs des images/vidéos par les tiennes
// Change les noms, variétés, prix selon tes besoins

const TELEGRAM_USERNAME = "werebeu92"; // Ton username Telegram (sans @)

const products = [
    {
        id: 1,
        name: "Six Star",
        category: "fleurs",
        farm: "cali",
        image: "https://via.placeholder.com/300x300/4169e1/ffffff?text=Six+Star", // Remplace par ton image
        video: "", // Si tu veux une vidéo, mets l'URL ici (sinon laisse vide)
        description: "Produit premium de qualité supérieure",
        varieties: [
            "MANGO",
            "GELATO",
            "BANANA",
            "WEDDING PIE",
            "TROPICANA",
            "STRAWBERRY JAM"
        ],
        prices: [
            { amount: "10€", quantity: "1g" },
            { amount: "20€", quantity: "2g" },
            { amount: "40€", quantity: "5g" }
        ]
    },
    {
        id: 2,
        name: "Magic Waves",
        category: "fleurs",
        farm: "cali",
        image: "https://via.placeholder.com/300x300/00bfff/ffffff?text=Magic+Waves",
        video: "",
        description: "Plusieurs variétés disponibles",
        varieties: [
            "OG KUSH",
            "PURPLE HAZE",
            "LEMON HAZE"
        ],
        prices: [
            { amount: "10€", quantity: "1g" },
            { amount: "20€", quantity: "2g" },
            { amount: "40€", quantity: "5g" }
        ]
    },
    {
        id: 3,
        name: "Premium Green",
        category: "fleurs",
        farm: "spain",
        image: "https://via.placeholder.com/300x300/32cd32/ffffff?text=Premium+Green",
        video: "",
        description: "Qualité espagnole premium",
        varieties: [
            "AMNESIA",
            "CRITICAL",
            "SUPER SKUNK"
        ],
        prices: [
            { amount: "15€", quantity: "2g" },
            { amount: "25€", quantity: "3.5g" },
            { amount: "45€", quantity: "7g" }
        ]
    },
    {
        id: 4,
        name: "Cookies Cali",
        category: "fleurs",
        farm: "cali",
        image: "https://via.placeholder.com/300x300/ff69b4/ffffff?text=Cookies+Cali",
        video: "",
        description: "Edition limitée Cookies",
        varieties: [
            "GIRL SCOUT COOKIES",
            "THIN MINT",
            "SUNSET SHERBET"
        ],
        prices: [
            { amount: "12€", quantity: "1g" },
            { amount: "22€", quantity: "2g" },
            { amount: "50€", quantity: "5g" }
        ]
    },
    {
        id: 5,
        name: "Local Special",
        category: "concentres",
        farm: "local",
        image: "https://via.placeholder.com/300x300/ffd700/000000?text=Local+Special",
        video: "",
        description: "Production locale de qualité",
        varieties: [
            "WAX",
            "SHATTER",
            "LIVE RESIN"
        ],
        prices: [
            { amount: "30€", quantity: "0.5g" },
            { amount: "50€", quantity: "1g" }
        ]
    },
    {
        id: 6,
        name: "Edibles Mix",
        category: "edibles",
        farm: "cali",
        image: "https://via.placeholder.com/300x300/ff6347/ffffff?text=Edibles+Mix",
        video: "",
        description: "Délicieux edibles variés",
        varieties: [
            "GUMMIES",
            "CHOCOLAT",
            "BROWNIES"
        ],
        prices: [
            { amount: "15€", quantity: "100mg" },
            { amount: "25€", quantity: "250mg" },
            { amount: "40€", quantity: "500mg" }
        ]
    }
];

// ========================================
// INSTRUCTIONS POUR MODIFIER LES PRODUITS
// ========================================
/*

POUR AJOUTER UN NOUVEAU PRODUIT :
1. Copie un bloc de produit existant (entre les { })
2. Change l'ID (doit être unique)
3. Change le nom, catégorie, farm, etc.
4. Remplace l'URL de l'image par la tienne
5. Si tu veux une vidéo, mets son URL dans "video"
6. Modifie les variétés et prix selon tes besoins

EXEMPLE :
{
    id: 7,
    name: "Mon Nouveau Produit",
    category: "fleurs",
    farm: "cali",
    image: "https://mon-image.com/photo.jpg",
    video: "https://mon-video.com/video.mp4",  // Optionnel
    description: "Ma super description",
    varieties: [
        "VARIÉTÉ 1",
        "VARIÉTÉ 2",
        "VARIÉTÉ 3"
    ],
    prices: [
        { amount: "10€", quantity: "1g" },
        { amount: "20€", quantity: "2g" }
    ]
},

CATÉGORIES DISPONIBLES : "fleurs", "concentres", "edibles"
FARMS DISPONIBLES : "cali", "spain", "local"

*/
