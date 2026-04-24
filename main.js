const API_URL = 'https://api.github.com/users/gabedossa';

const themeToggle = document.getElementById('themeToggle');

themeToggle.addEventListener('click', () => {
    const isDark = document.documentElement.getAttribute('data-theme') === 'dark';
    if (isDark) {
        document.documentElement.removeAttribute('data-theme');
        themeToggle.textContent = '🌙 Escuro';
    } else {
        document.documentElement.setAttribute('data-theme', 'dark');
        themeToggle.textContent = '☀️ Claro';
    }
});

fetch(API_URL)
    .then(response => response.json())
    .then(data => {
        document.querySelector('.profile-avatar').src = data.avatar_url;
        document.querySelector('.profile-avatar').alt = data.name || data.login;
        document.querySelector('.profile-name').textContent = data.name || data.login;
        document.querySelector('.profile-username').textContent = '@' + data.login;
        document.querySelector('.profile-link').href = data.html_url;

        const numberItems = document.querySelectorAll('.numbers-item');
        numberItems[0].innerHTML = `<h4>Repositórios</h4>${data.public_repos}`;
        numberItems[1].innerHTML = `<h4>Seguidores</h4>${data.followers}`;
        numberItems[2].innerHTML = `<h4>Seguindo</h4>${data.following}`;
    })
    .catch(error => console.error('Erro ao buscar dados do GitHub:', error));
