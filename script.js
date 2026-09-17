// Configuração pública da comunidade.
// Substitua pelo endereço oficial do seu canal.
const COMMUNITY_CONFIG = {
  channelUrl: 'https://www.youtube.com/',
};

const form = document.querySelector('#register-form');
const message = document.querySelector('#form-message');

if (form && message) {
  form.addEventListener('submit', (event) => {
    event.preventDefault();

    const username = document.querySelector('#username')?.value.trim();
    if (!username) return;

    message.textContent = `Cadastro local concluído, ${username}! Acesse o canal oficial para acompanhar as novidades.`;

    const existingButton = document.querySelector('#channel-access');
    if (!existingButton) {
      const button = document.createElement('a');
      button.id = 'channel-access';
      button.className = 'primary-button';
      button.href = COMMUNITY_CONFIG.channelUrl;
      button.target = '_blank';
      button.rel = 'noopener noreferrer';
      button.textContent = 'Visitar canal oficial ↗';
      button.style.display = 'inline-block';
      button.style.marginTop = '14px';
      form.appendChild(button);
    }
  });
}
