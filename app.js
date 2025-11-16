const app = document.getElementById('app');
const API_URL_ALL = 'https://restcountries.com/v3.1/all';
const API_URL_NAME = 'https://restcountries.com/v3.1/name/';
// MUDANÇA 1: Nova URL da API para busca por capital
const API_URL_CAPITAL = 'https://restcountries.com/v3.1/capital/';

function renderBase() {
    app.innerHTML = `
    <div class="search-box">
        <input id="country-search" type="text"
            placeholder="Digite o nome do país ou capital (em inglês)..." />
        <button id="btn-search">Buscar</button>
    </div>

    <div class="search-options">
        <input type="radio" id="search-by-name" name="search-type" value="name" checked>
        <label for="search-by-name">Buscar por País</label>
        
        <input type="radio" id="search-by-capital" name="search-type" value="capital">
        <label for="search-by-capital">Buscar por Capital</label>
    </div>
    
    <div id="content">
        <p>Bem-vindo! Digite um nome de país ou capital e clique em "Buscar".</p>
    </div>

    <p>Dados da <strong> Country API</strong>(restcountries.com)</p>
    `;
}

function renderContent(html) {
    const contentDiv = document.getElementById('content');
    if (contentDiv) {
        contentDiv.innerHTML = html;
    }
}

function formatCountryDetail(country) {
    const c = country[0]; 
    return `
        <div class="country-detail">
            <h2>${c.name.common} (${c.cca3})</h2>
            <img src="${c.flags.svg}" alt="Bandeira de ${c.name.common}" width="150">
            <p><strong>Capital:</strong> ${c.capital ? c.capital[0] : 'N/A'}</p>
            <p><strong>População:</strong> ${c.population.toLocaleString('pt-BR')}</p>
            <p><strong>Continente:</strong> ${c.continents ? c.continents[0] : 'N/A'}</p>
        </div>
    `;
}

async function loadCountryByCapital(term) {
    renderContent(`Buscando pela capital "${term}"...`);
    try {
        const res = await fetch(`${API_URL_CAPITAL}${term}`);
        
        if (!res.ok) {
            if (res.status === 404) {
                throw new Error('Capital não encontrada.');
            }
            throw new Error('Erro na busca.');
        }
        
        const data = await res.json();
        const html = formatCountryDetail(data);
        renderContent(html);

    } catch (error) {
        renderContent(`<p class="error">Erro: ${error.message}</p>`);
    }
}


async function loadCountryByName(term) {
    renderContent(`Buscando por "${term}"...`);
    try {
        const res = await fetch(`${API_URL_NAME}${term}`);
        if (!res.ok) {
            if (res.status === 404) {
                throw new Error('País não encontrado.');
            }
            throw new Error('Erro na busca.');
        }
        
        const data = await res.json();
        const html = formatCountryDetail(data);
        renderContent(html);

    } catch (error) {
        renderContent(`<p class="error">Erro: ${error.message}</p>`);
    }
}



renderBase();

document.getElementById('btn-search').addEventListener('click', () => {
    const term = document.getElementById('country-search').value.toLowerCase().trim();
    
    // Verifica qual botão de rádio está checado
    const searchType = document.querySelector('input[name="search-type"]:checked').value;

    if (!term) {
        renderContent('<p>Por favor, digite um termo para buscar.</p>');
        return;
    }

    if (searchType === 'name') {
        loadCountryByName(term);
    } else { 
        loadCountryByCapital(term);
    }
});