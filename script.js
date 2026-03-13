document.addEventListener('DOMContentLoaded', () => {
    const modal = document.getElementById('promptModal');
    const modalTitle = document.getElementById('modalTitle');
    const modalContent = document.getElementById('modalContentArea');
    const backToTop = document.getElementById('backToTop');
    const searchInput = document.getElementById('searchInput');
    const cards = document.querySelectorAll('.prompt-card');

    const library = {
        "City Heights": "Cyberpunk city drone shot, 8k, neon lights, rainy weather.",
        "Blue Skies": "Ultra-wide landscape, sunny day, cinematic clouds.",
        "Motion Blur": "Neon light trails, high speed, long exposure photography.",
        "Neon Abstract": "Macro of bioluminescent fluid, green and cyan swirls.",
        "Cyber Orchid": "Mechanical flower with glowing glass petals, macro.",
        "Space Forest": "Nebula forest, stars as leaves, ethereal lighting.",
        "Desert Oasis": "Futuristic mirror oasis in sand dunes, sunset lighting.",
        "Steampunk Gear": "Intricate brass clockwork mechanism, 8k macro.",
        "Frozen Peak": "Ice-covered mountain peak, aurora borealis background.",
        "Deep Sea": "Bioluminescent jellyfish in the abyss, deep blue lighting.",
        "Retro Future": "80s synthwave car driving on a digital grid, sunset.",
        "Emerald Valley": "Lush green fantasy valley, waterfall, morning mist.",
        "Mecha Warrior": "Giant robot standing in a ruined city, realistic textures.",
        "Golden Ratio": "Perfect spiral of golden seeds in a sunflower, macro.",
        "Vintage Portrait": "1920s film style portrait, grainy, dramatic lighting.",
        "Crystal Cave": "Glowing purple crystals in a dark cavern, sharp focus.",
        "Magma Flow": "Close up of molten lava, orange glow, obsidian crust.",
        "Cloud Kingdom": "Floating castles in the sky, white fluffy clouds.",
        "Neon Jungle": "Fluorescent tropical plants, glowing vines, dark jungle.",
        "Old Library": "Dusty bookshelf with ancient glowing books, magical aura."
    };

    // Explore Scroll
    document.getElementById('exploreLink').onclick = () => {
        document.getElementById('cards-section').scrollIntoView({ behavior: 'smooth' });
    };

    // Scroll Logic (Back to Top)
    window.onscroll = () => {
        if (window.scrollY > 500) {
            backToTop.style.display = "block";
        } else {
            backToTop.style.display = "none";
        }
    };
    backToTop.onclick = () => window.scrollTo({ top: 0, behavior: 'smooth' });

    // Modals for Coming Soon
    document.querySelectorAll('.coming-soon').forEach(link => {
        link.onclick = () => {
            modalTitle.innerText = "Coming Soon";
            modalContent.innerHTML = `<p style="color: #a0a0a0; margin: 20px 0;">We are currently building this feature. Check back later!</p>`;
            modal.style.display = 'flex';
        };
    });

    // Prompt Modal Logic
    document.querySelectorAll('.show-btn').forEach(btn => {
        btn.onclick = (e) => {
            const title = e.target.closest('.prompt-card').getAttribute('data-title');
            modalTitle.innerText = title;
            modalContent.innerHTML = `
                <div class="prompt-container"><code id="promptDisplay">${library[title]}</code></div>
                <button id="copyBtn">Copy Prompt</button>
            `;
            modal.style.display = 'flex';
            
            const copyBtn = document.getElementById('copyBtn');
            copyBtn.onclick = () => {
                navigator.clipboard.writeText(library[title]).then(() => {
                    copyBtn.innerText = "Copied!";
                    copyBtn.style.background = "#39ff14";
                    setTimeout(() => { copyBtn.innerText = "Copy Prompt"; copyBtn.style.background = ""; }, 2000);
                });
            };
        };
    });

    // Search Logic
    searchInput.oninput = (e) => {
        const query = e.target.value.toLowerCase();
        cards.forEach(card => {
            const title = card.getAttribute('data-title').toLowerCase();
            card.style.display = title.includes(query) ? 'flex' : 'none';
        });
    };

    document.querySelector('.close-btn').onclick = () => modal.style.display = 'none';
    window.onclick = (e) => { if (e.target == modal) modal.style.display = 'none'; };
});