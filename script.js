document.addEventListener('DOMContentLoaded', () => {
    const modal = document.getElementById('promptModal');
    const modalTitle = document.getElementById('modalTitle');
    const modalContent = document.getElementById('modalContentArea');
    const backToTop = document.getElementById('backToTop');
    const searchInput = document.getElementById('searchInput');
    const cards = document.querySelectorAll('.prompt-card');
    const noResults = document.getElementById('noResults');

    // DATABASE: All your long prompts and models go here
    const library = {
        "City Heights": {
            model: "Midjourney v6.1",
            prompt: "hey bro, how are you."
        },
        "Blue Skies": {
            model: "DALL-E 3",
            prompt: "Ultra-wide landscape, sunny day, cinematic clouds, highly detailed photography, 8k resolution, serene mountain range."
        },
        "Motion Blur": {
            model: "Stable Diffusion XL",
            prompt: "Neon light trails, high speed, long exposure photography, vibrant colors, futuristic highway, motion blur effect."
        },
        "Neon Abstract": {
            model: "Midjourney v6",
            prompt: "Macro photography of bioluminescent fluid, green and cyan swirls, liquid motion, glowing abstract textures."
        },
        "Cyber Orchid": {
            model: "DALL-E 3",
            prompt: "Mechanical flower with glowing glass petals, intricate wiring, macro shot, bioluminescent parts, black background."
        },
        "Space Forest": {
            model: "Midjourney v6.1",
            prompt: "Nebula forest, stars as leaves, ethereal lighting, cosmic atmosphere, fantasy environment, glowing flora."
        },
        "Desert Oasis": {
            model: "DALL-E 3",
            prompt: "Futuristic mirror oasis in sand dunes, sunset lighting, golden hour, reflective surfaces, high contrast."
        },
        "Steampunk Gear": {
            model: "Stable Diffusion XL",
            prompt: "Intricate brass clockwork mechanism, 8k macro, copper pipes, steam vapor, cinematic lighting, mechanical depth."
        },
        "Frozen Peak": {
            model: "Midjourney v6",
            prompt: "Ice-covered mountain peak, aurora borealis background, cold blue tones, sharp focus, majestic landscape."
        },
        "Deep Sea": {
            model: "DALL-E 3",
            prompt: "Bioluminescent jellyfish in the abyss, deep blue lighting, floating particles, underwater photography, ethereal glow."
        },
        "Retro Future": {
            model: "Midjourney v6.1",
            prompt: "80s synthwave car driving on a digital grid, neon sunset, retro-futurism style, vibrant pink and purple tones."
        },
        "Emerald Valley": {
            model: "DALL-E 3",
            prompt: "Lush green fantasy valley, waterfall, morning mist, vibrant vegetation, magical atmosphere, ultra-detailed."
        },
        "Mecha Warrior": {
            model: "Stable Diffusion XL",
            prompt: "Giant robot standing in a ruined city, realistic textures, battle-worn armor, smoke and debris, cinematic shot."
        },
        "Golden Ratio": {
            model: "Midjourney v6",
            prompt: "Perfect spiral of golden seeds in a sunflower, macro photography, mathematical symmetry, sharp detail."
        },
        "Vintage Portrait": {
            model: "DALL-E 3",
            prompt: "1920s film style portrait, grainy texture, dramatic shadows, vintage lighting, classic photography style."
        },
        "Crystal Cave": {
            model: "Midjourney v6.1",
            prompt: "Glowing purple crystals in a dark cavern, sharp focus, magical aura, geological formations, subterranean light."
        },
        "Magma Flow": {
            model: "DALL-E 3",
            prompt: "Close up of molten lava, orange glow, obsidian crust, volcanic activity, heat haze, intense colors."
        },
        "Cloud Kingdom": {
            model: "Midjourney v6",
            prompt: "Floating castles in the sky, white fluffy clouds, heavenly lighting, fantasy architecture, wide angle shot."
        },
        "Neon Jungle": {
            model: "Stable Diffusion XL",
            prompt: "Fluorescent tropical plants, glowing vines, dark jungle, exotic flora, vivid neon colors, nighttime forest."
        },
        "Old Library": {
            model: "DALL-E 3",
            prompt: "Dusty bookshelf with ancient glowing books, magical aura, floating dust particles, warm lighting, mystery."
        }
    };

    // Explore Scroll
    document.getElementById('exploreLink').onclick = () => {
        document.getElementById('cards-section').scrollIntoView({ behavior: 'smooth' });
    };

    // Scroll Logic (Back to Top)
    window.onscroll = () => {
        backToTop.style.display = window.scrollY > 500 ? "block" : "none";
    };
    backToTop.onclick = () => window.scrollTo({ top: 0, behavior: 'smooth' });

    // Coming Soon Modals
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
            const card = e.target.closest('.prompt-card');
            const title = card.getAttribute('data-title');
            const data = library[title];

            if(data) {
                modalTitle.innerText = title;
                modalContent.innerHTML = `
                    <p style="color: var(--cyan-accent); font-size: 0.7rem; font-weight: bold; margin-bottom: 5px; text-align: left;">MODEL: ${data.model}</p>
                    <div class="prompt-container"><code id="promptDisplay">${data.prompt}</code></div>
                    <button id="copyBtn">Copy Prompt</button>
                `;
                modal.style.display = 'flex';

                const copyBtn = document.getElementById('copyBtn');
                copyBtn.onclick = () => {
                    navigator.clipboard.writeText(data.prompt).then(() => {
                        copyBtn.innerText = "Copied!";
                        copyBtn.style.background = "#39ff14";
                        setTimeout(() => { 
                            copyBtn.innerText = "Copy Prompt"; 
                            copyBtn.style.background = ""; 
                        }, 2000);
                    });
                };
            }
        };
    });

    // Search Logic with No Results Fix
    searchInput.oninput = (e) => {
        const query = e.target.value.toLowerCase();
        let hasMatches = false;

        cards.forEach(card => {
            const title = card.getAttribute('data-title').toLowerCase();
            if (title.includes(query)) {
                card.style.display = 'flex';
                hasMatches = true;
            } else {
                card.style.display = 'none';
            }
        });

        noResults.style.display = hasMatches ? 'none' : 'block';
    };

    // Close Modals
    document.querySelector('.close-btn').onclick = () => modal.style.display = 'none';
    window.onclick = (e) => { if (e.target == modal) modal.style.display = 'none'; };
});
