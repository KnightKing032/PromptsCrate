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
  {
    id: 1,
    title: "Portfolio",
    category: "Personal",
    tags: "clean minimal dark",
    preview: "images/portfolio-preview.jpg",
    fields: [
      { label: "Your name", key: "name", placeholder: "e.g. Aryan Sharma" },
      { label: "Job title", key: "title", placeholder: "e.g. Web Developer" },
      { label: "About you", key: "about", placeholder: "Short bio..." },
    ],
    generate: (data) => `<!DOCTYPE html>
<html>...your portfolio HTML with ${data.name} injected...</html>`
  },
  // more templates...
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
