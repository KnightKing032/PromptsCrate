document.addEventListener('DOMContentLoaded', () => {
    const modal = document.getElementById('promptModal');
    const modalTitle = document.getElementById('modalTitle');
    const modalContent = document.getElementById('modalContentArea');
    const backToTop = document.getElementById('backToTop');
    const searchInput = document.getElementById('searchInput');
    const promptGrid = document.getElementById('promptGrid');
    const noResults = document.getElementById('noResults');

    const library = [
        { id: 1, title: "City Heights", model: "Midjourney v6.1", prompt: "Cyberpunk city drone shot, 8k, neon lights, rainy weather, ultra-detailed signage, reflection in puddles, cinematic lighting." },
        { id: 2, title: "Blue Skies", model: "DALL-E 3", prompt: "Ultra-wide landscape, sunny day, cinematic clouds, highly detailed photography, 8k resolution, serene mountain range." },
        { id: 3, title: "Motion Blur", model: "Stable Diffusion XL", prompt: "Neon light trails, high speed, long exposure photography, vibrant colors, futuristic highway, motion blur effect." },
        { id: 4, title: "Neon Abstract", model: "Midjourney v6", prompt: "Macro photography of bioluminescent fluid, green and cyan swirls, liquid motion, glowing abstract textures." },
        { id: 5, title: "Cyber Orchid", model: "DALL-E 3", prompt: "Mechanical flower with glowing glass petals, intricate wiring, macro shot, bioluminescent parts, black background." },
        { id: 6, title: "Space Forest", model: "Midjourney v6.1", prompt: "Nebula forest, stars as leaves, ethereal lighting, cosmic atmosphere, fantasy environment, glowing flora." },
        { id: 7, title: "Desert Oasis", model: "DALL-E 3", prompt: "Futuristic mirror oasis in sand dunes, sunset lighting, golden hour, reflective surfaces, high contrast." },
        { id: 8, title: "Steampunk Gear", model: "Stable Diffusion XL", prompt: "Intricate brass clockwork mechanism, 8k macro, copper pipes, steam vapor, cinematic lighting, mechanical depth." },
        { id: 9, title: "Frozen Peak", model: "Midjourney v6", prompt: "Ice-covered mountain peak, aurora borealis background, cold blue tones, sharp focus, majestic landscape." },
        { id: 10, title: "Deep Sea", model: "DALL-E 3", prompt: "Bioluminescent jellyfish in the abyss, deep blue lighting, floating particles, underwater photography, ethereal glow." },
        { id: 11, title: "Retro Future", model: "Midjourney v6.1", prompt: "80s synthwave car driving on a digital grid, neon sunset, retro-futurism style, vibrant pink and purple tones." },
        { id: 12, title: "Emerald Valley", model: "DALL-E 3", prompt: "Lush green fantasy valley, waterfall, morning mist, vibrant vegetation, magical atmosphere, ultra-detailed." },
        { id: 13, title: "Mecha Warrior", model: "Stable Diffusion XL", prompt: "Giant robot standing in a ruined city, realistic textures, battle-worn armor, smoke and debris, cinematic shot." },
        { id: 14, title: "Golden Ratio", model: "Midjourney v6", prompt: "Perfect spiral of golden seeds in a sunflower, macro photography, mathematical symmetry, sharp detail." },
        { id: 15, title: "Vintage Portrait", model: "DALL-E 3", prompt: "1920s film style portrait, grainy texture, dramatic shadows, vintage lighting, classic photography style." },
        { id: 16, title: "Crystal Cave", model: "Midjourney v6.1", prompt: "Glowing purple crystals in a dark cavern, sharp focus, magical aura, geological formations, subterranean light." },
        { id: 17, title: "Magma Flow", model: "DALL-E 3", prompt: "Close up of molten lava, orange glow, obsidian crust, volcanic activity, heat haze, intense colors." },
        { id: 18, title: "Cloud Kingdom", model: "Midjourney v6", prompt: "Floating castles in the sky, white fluffy clouds, heavenly lighting, fantasy architecture, wide angle shot." },
        { id: 19, title: "Neon Jungle", model: "Stable Diffusion XL", prompt: "Fluorescent tropical plants, glowing vines, dark jungle, exotic flora, vivid neon colors, nighttime forest." },
        { id: 20, title: "Old Library", model: "DALL-E 3", prompt: "Dusty bookshelf with ancient glowing books, magical aura, floating dust particles, warm lighting, mystery." }
    ];

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
            const card = document.createElement('div');
            card.className = 'prompt-card';
            card.setAttribute('data-title', item.title);
            card.innerHTML = `
                <div class="card-image-wrapper"><img src="https://picsum.photos/400/400?random=${item.id}" alt="${item.title}"></div>
                <div class="card-content"><h3>${item.title}</h3><button class="show-btn">Show Prompt</button></div>
            `;
            promptGrid.appendChild(card);
        });
        setupModalListeners();
    }

    renderCards(weeklyLibrary);

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

    // Fixed "Coming Soon" for mobile
    document.querySelectorAll('.coming-soon').forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            modalTitle.innerText = "Coming Soon";
            modalContent.innerHTML = `<p style="color: #a0a0a0; margin: 20px 0;">We are currently building this feature. Check back later!</p>`;
            modal.style.display = 'flex';
        });
    });

    searchInput.oninput = (e) => {
        const query = e.target.value.toLowerCase();
        let matches = 0;
        document.querySelectorAll('.prompt-card').forEach(card => {
            const isMatch = card.getAttribute('data-title').toLowerCase().includes(query);
            card.style.display = isMatch ? 'flex' : 'none';
            if (isMatch) matches++;
        });
        noResults.style.display = (matches === 0) ? 'block' : 'none';
    };

    document.getElementById('exploreLink').addEventListener('click', () => {
        document.getElementById('cards-section').scrollIntoView({ behavior: 'smooth' });
    });

    window.onscroll = () => backToTop.style.display = window.scrollY > 500 ? "block" : "none";
    backToTop.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));
    
    document.querySelector('.close-btn').onclick = () => modal.style.display = 'none';
    window.onclick = (e) => { if (e.target == modal) modal.style.display = 'none'; };
});
