// Configuração pública da comunidade.
const COMMUNITY_CONFIG = {
  channelUrl: 'https://www.youtube.com/@devryze07?sub_confirmation=1',
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

function createYoutubeButtons() {
  if (document.querySelector('#youtube-subscribe-button')) return;

  const widget = document.querySelector('.g-ytsubscribe');
  const container = widget?.parentElement || document.querySelector('.youtube-actions');
  if (!container) return;

  if (widget) widget.remove();

  const flow = document.createElement('div');
  flow.className = 'youtube-subscribe-flow';
  flow.innerHTML = `
    <a class="youtube-button" id="youtube-subscribe-button" href="${COMMUNITY_CONFIG.channelUrl}" target="_blank" rel="noopener noreferrer">
      <span>▶</span> Inscrever-se no canal
    </a>
    <button class="youtube-button" id="youtube-confirm-button" type="button" disabled>
      Já me inscrevi (5s)
    </button>
    <p id="youtube-popup-notice" class="youtube-note" aria-live="polite"></p>
  `;
  container.appendChild(flow);

  const subscribeButton = document.querySelector('#youtube-subscribe-button');
  const confirmButton = document.querySelector('#youtube-confirm-button');
  const notice = document.querySelector('#youtube-popup-notice');
  let countdown;

  subscribeButton?.addEventListener('click', () => {
    window.clearInterval(countdown);
    let remaining = 5;
    confirmButton.disabled = true;
    confirmButton.textContent = `Já me inscrevi (${remaining}s)`;

    countdown = window.setInterval(() => {
      remaining -= 1;
      confirmButton.textContent = remaining > 0 ? `Já me inscrevi (${remaining}s)` : 'Já me inscrevi';
      confirmButton.disabled = remaining > 0;
      if (remaining <= 0) window.clearInterval(countdown);
    }, 1000);
  });

  confirmButton?.addEventListener('click', () => {
    notice.textContent = 'Obrigado! Você pode continuar no site.';
  });
}

// Executa em diferentes momentos para funcionar mesmo com o widget do YouTube carregando depois.
createYoutubeButtons();
window.addEventListener('DOMContentLoaded', createYoutubeButtons);
window.addEventListener('load', () => {
  createYoutubeButtons();
  window.setTimeout(createYoutubeButtons, 500);
});
