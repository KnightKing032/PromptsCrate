document.addEventListener('DOMContentLoaded', () => {
    const modal = document.getElementById('promptModal');
    const modalTitle = document.getElementById('modalTitle');
    const modalContent = document.getElementById('modalContentArea');
    const backToTop = document.getElementById('backToTop');
    const searchInput = document.getElementById('searchInput');
    const promptGrid = document.getElementById('promptGrid');
    const noResults = document.getElementById('noResults');

    let favorites = JSON.parse(localStorage.getItem('crateFavs')) || [];

    // DATABASE: Updated with local image paths
    const library = [
        { id: 1, title: "City Heights", category: "Cyberpunk", model: "Lexica Aperture", image: "images/img1.jpg", prompt: "Generate a hyper-realistic, cinematic photo of a ufc weigh-in event set inside the packed barclays center in brooklyn, new york. the event features a surreal but intense face-off between khabib nurmagomedov and a towering 3-meter grizzly bear, both participating as official fighters. the crowd is roaring, fans holding flags, signs, and phones, media cameras flashing from all directions.

" },
        { id: 2, title: "Blue Skies", category: "Nature", model: "DALL-E 3", image: "images/blue_skies.jpg", prompt: "Ultra-wide landscape, sunny day, cinematic clouds, highly detailed photography, 8k resolution, serene mountain range." },
        { id: 3, title: "Motion Blur", category: "Cyberpunk", model: "Stable Diffusion XL", image: "images/motion_blur.jpg", prompt: "Neon light trails, high speed, long exposure photography, vibrant colors, futuristic highway, motion blur effect." },
        { id: 4, title: "Neon Abstract", category: "Abstract", model: "Midjourney v6", image: "images/neon_abstract.jpg", prompt: "Macro photography of bioluminescent fluid, green and cyan swirls, liquid motion, glowing abstract textures." },
        { id: 5, title: "Cyber Orchid", category: "Sci-Fi", model: "DALL-E 3", image: "images/cyber_orchid.jpg", prompt: "Mechanical flower with glowing glass petals, intricate wiring, macro shot, bioluminescent parts, black background." },
        { id: 6, title: "Space Forest", category: "Sci-Fi", model: "Midjourney v6.1", image: "images/space_forest.jpg", prompt: "Nebula forest, stars as leaves, ethereal lighting, cosmic atmosphere, fantasy environment, glowing flora." },
        { id: 7, title: "Desert Oasis", category: "Nature", model: "DALL-E 3", image: "images/desert_oasis.jpg", prompt: "Futuristic mirror oasis in sand dunes, sunset lighting, golden hour, reflective surfaces, high contrast." },
        { id: 8, title: "Steampunk Gear", category: "Sci-Fi", model: "Stable Diffusion XL", image: "images/steampunk_gear.jpg", prompt: "Intricate brass clockwork mechanism, 8k macro, copper pipes, steam vapor, cinematic lighting, mechanical depth." },
        { id: 10, title: "Deep Sea", category: "Nature", model: "DALL-E 3", image: "images/deep_sea.jpg", prompt: "Bioluminescent jellyfish in the abyss, deep blue lighting, floating particles, underwater photography, ethereal glow." },
        { id: 11, title: "Retro Future", category: "Cyberpunk", model: "Midjourney v6.1", image: "images/retro_future.jpg", prompt: "80s synthwave car driving on a digital grid, neon sunset, retro-futurism style, vibrant pink and purple tones." },
        { id: 12, title: "Emerald Valley", category: "Nature", model: "DALL-E 3", image: "images/emerald_valley.jpg", prompt: "Lush green fantasy valley, waterfall, morning mist, vibrant vegetation, magical atmosphere, ultra-detailed." },
        { id: 13, title: "Mecha Warrior", category: "Sci-Fi", model: "Stable Diffusion XL", image: "images/mecha_warrior.jpg", prompt: "Giant robot standing in a ruined city, realistic textures, battle-worn armor, smoke and debris, cinematic shot." },
        { id: 14, title: "Golden Ratio", category: "Abstract", model: "Midjourney v6", image: "images/golden_ratio.jpg", prompt: "Perfect spiral of golden seeds in a sunflower, macro photography, mathematical symmetry, sharp detail." },
        { id: 15, title: "Vintage Portrait", category: "Abstract", model: "DALL-E 3", image: "images/vintage_portrait.jpg", prompt: "1920s film style portrait, grainy texture, dramatic shadows, vintage lighting, classic photography style." },
        { id: 16, title: "Crystal Cave", category: "Nature", model: "Midjourney v6.1", image: "images/crystal_cave.jpg", prompt: "Glowing purple crystals in a dark cavern, sharp focus, magical aura, geological formations, subterranean light." },
        { id: 17, title: "Magma Flow", category: "Nature", model: "DALL-E 3", image: "images/magma_flow.jpg", prompt: "Close up of molten lava, orange glow, obsidian crust, volcanic activity, heat haze, intense colors." },
        { id: 18, title: "Cloud Kingdom", category: "Sci-Fi", model: "Midjourney v6", image: "images/cloud_kingdom.jpg", prompt: "Floating castles in the sky, white fluffy clouds, heavenly lighting, fantasy architecture, wide angle shot." },
        { id: 19, title: "Neon Jungle", category: "Cyberpunk", model: "Stable Diffusion XL", image: "images/neon_jungle.jpg", prompt: "Fluorescent tropical plants, glowing vines, dark jungle, exotic flora, vivid neon colors, nighttime forest." },
        { id: 20, title: "Old Library", category: "Abstract", model: "DALL-E 3", image: "images/old_library.jpg", prompt: "Dusty bookshelf with ancient glowing books, magical aura, floating dust particles, warm lighting, mystery." }
    ];

    let currentFilter = 'all';

    function getWeekSeed() {
        const now = new Date();
        const startOfYear = new Date(now.getFullYear(), 0, 1);
        const pastDays = (now - startOfYear) / 86400000;
        const weekNum = Math.ceil((pastDays + startOfYear.getDay() + 1) / 7);
        return now.getFullYear() + weekNum;
    }

    function seededShuffle(array, seed) {
        let m = array.length, t, i;
        while (m) {
            i = Math.floor(Math.abs(Math.sin(seed++)) * m--);
            t = array[m];
            array[m] = array[i];
            array[i] = t;
        }
        return array;
    }

    const weeklyLibrary = seededShuffle([...library], getWeekSeed());

    function renderCards(dataList) {
        promptGrid.innerHTML = '';
        dataList.forEach(item => {
            const isFav = favorites.includes(item.id);
            const card = document.createElement('div');
            card.className = 'prompt-card';
            card.setAttribute('data-id', item.id);
            card.setAttribute('data-title', item.title);
            card.setAttribute('data-category', item.category);
            card.innerHTML = `
                <button class="fav-btn ${isFav ? 'is-fav' : ''}" title="Favorite">❤</button>
                <div class="model-badge">${item.model}</div>
                <div class="card-image-wrapper"><img src="${item.image}" alt="${item.title}"></div>
                <div class="card-content"><h3>${item.title}</h3><button class="show-btn">Show Prompt</button></div>
            `;
            promptGrid.appendChild(card);
        });
        setupModalListeners();
        setupFavListeners();
    }

    renderCards(weeklyLibrary);

    function setupFavListeners() {
        document.querySelectorAll('.fav-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                e.stopPropagation();
                const card = e.target.closest('.prompt-card');
                const id = parseInt(card.getAttribute('data-id'));
                if (favorites.includes(id)) {
                    favorites = favorites.filter(favId => favId !== id);
                    btn.classList.remove('is-fav');
                } else {
                    favorites.push(id);
                    btn.classList.add('is-fav');
                }
                localStorage.setItem('crateFavs', JSON.stringify(favorites));
                if (currentFilter === 'favorites') filterAndSearch();
            });
        });
    }

    document.querySelectorAll('.filter-btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
            document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
            e.target.classList.add('active');
            currentFilter = e.target.getAttribute('data-filter');
            filterAndSearch();
        });
    });

    function filterAndSearch() {
        const query = searchInput.value.toLowerCase();
        let matches = 0;
        document.querySelectorAll('.prompt-card').forEach(card => {
            const id = parseInt(card.getAttribute('data-id'));
            const title = card.getAttribute('data-title').toLowerCase();
            const category = card.getAttribute('data-category');
            const matchesSearch = title.includes(query);
            let matchesFilter = (currentFilter === 'all' || (currentFilter === 'favorites' ? favorites.includes(id) : category === currentFilter));
            if (matchesSearch && matchesFilter) {
                card.style.display = 'flex';
                matches++;
            } else {
                card.style.display = 'none';
            }
        });
        noResults.style.display = (matches === 0) ? 'block' : 'none';
    }

    searchInput.oninput = filterAndSearch;

    function setupModalListeners() {
        document.querySelectorAll('.show-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const title = e.target.closest('.prompt-card').getAttribute('data-title');
                const data = library.find(item => item.title === title);
                if(data) {
                    modalTitle.innerText = title;
                    modalContent.innerHTML = `
                        <p style="color: var(--cyan-accent); font-size: 0.7rem; font-weight: bold; margin-bottom: 8px; text-align: left;">MODEL: ${data.model}</p>
                        <div class="prompt-container"><code id="promptDisplay">${data.prompt}</code></div>
                        <button id="copyBtn">Copy Prompt</button>
                    `;
                    modal.style.display = 'flex';
                    document.getElementById('copyBtn').addEventListener('click', function() {
                        navigator.clipboard.writeText(data.prompt).then(() => {
                            this.innerText = "Copied!";
                            this.style.background = "#39ff14";
                            setTimeout(() => { this.innerText = "Copy Prompt"; this.style.background = ""; }, 2000);
                        });
                    });
                }
            });
        });
    }

    document.querySelectorAll('.coming-soon').forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            modalTitle.innerText = "Coming Soon";
            modalContent.innerHTML = `<p style="color: #a0a0a0; margin: 20px 0;">We are currently building this feature!</p>`;
            modal.style.display = 'flex';
        });
    });

    document.getElementById('exploreLink').addEventListener('click', () => document.getElementById('cards-section').scrollIntoView({ behavior: 'smooth' }));
    window.onscroll = () => backToTop.style.display = window.scrollY > 500 ? "block" : "none";
    backToTop.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));
    document.querySelector('.close-btn').onclick = () => modal.style.display = 'none';
    window.onclick = (e) => { if (e.target == modal) modal.style.display = 'none'; };
});
