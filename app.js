const birdListElement = document.getElementById('birdList');
const searchBar = document.getElementById('searchBar');
let birdsData = [];

// 1. Charger les données JSON
async function loadBirds() {
    try {
        const response = await fetch('data.json');
        birdsData = await response.json();
        displayBirds(birdsData);
    } catch (error) {
        console.error("Erreur lors du chargement du JSON :", error);
        birdListElement.innerHTML = "<p>Erreur de chargement. Assurez-vous d'utiliser un serveur local.</p>";
    }
}

// 2. Afficher les oiseaux dans le DOM
function displayBirds(birds) {
    birdListElement.innerHTML = '';
    
    birds.forEach(bird => {
        const li = document.createElement('li');
        li.className = 'bird-card';
        
        // Gestion de l'image (si absente, on affiche un fond gris)
        const imageStyle = bird.image_url 
            ? `background-image: url('${bird.image_url}');` 
            : '';
        const imageContent = bird.image_url ? '' : 'Image manquante';

        li.innerHTML = `
            <div class="bird-image-placeholder" style="${imageStyle}">
                ${imageContent}
            </div>
            <div class="bird-name">${bird.Nom}</div>
            <div class="bird-latin">${bird.Nom_latin}</div>
            <div class="bird-status">${bird.Statut || 'Inconnu'}</div>
        `;
        birdListElement.appendChild(li);
    });
}

// 3. Logique de la barre de recherche
searchBar.addEventListener('input', (e) => {
    const searchString = e.target.value.toLowerCase();
    
    const filteredBirds = birdsData.filter(bird => {
        return (
            bird.Nom.toLowerCase().includes(searchString) ||
            (bird.Nom_latin && bird.Nom_latin.toLowerCase().includes(searchString))
        );
    });
    
    displayBirds(filteredBirds);
});

// Lancement au démarrage
loadBirds();
