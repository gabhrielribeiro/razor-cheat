// Configuração pública da comunidade.
const COMMUNITY_CONFIG = {
  channelUrl: 'https://www.youtube.com/@devryze07',
};

const form = document.querySelector('#register-form');
const message = document.querySelector('#form-message');

if (form && message) {
  form.addEventListener('submit', (event) => {
    event.preventDefault();

    const username = document.querySelector('#username')?.value.trim();
    if (!username) return;

    message.textContent = `Cadastro local concluído, ${username}! Acesse o canal oficial para acompanhar as novidades.`;
  });
}

// Solicita a renderização do botão oficial depois que o YouTube carregar.
window.addEventListener('load', () => {
  if (window.gapi?.ytsubscribe?.go) {
    window.gapi.ytsubscribe.go();
  }
});
