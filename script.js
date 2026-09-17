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

// Substitui o widget oficial por um fluxo simples com tempo de espera.
const youtubeWidget = document.querySelector('.g-ytsubscribe');

if (youtubeWidget) {
  youtubeWidget.outerHTML = `
    <div class="youtube-subscribe-flow">
      <a class="youtube-button" id="youtube-subscribe-button" href="${COMMUNITY_CONFIG.channelUrl}" target="_blank" rel="noopener noreferrer">
        <span>▶</span> Inscrever-se no canal
      </a>
      <button class="youtube-button" id="youtube-confirm-button" type="button" disabled>
        Já me inscrevi (5s)
      </button>
      <p id="youtube-popup-notice" class="youtube-note" aria-live="polite"></p>
    </div>
  `;

  const subscribeButton = document.querySelector('#youtube-subscribe-button');
  const confirmButton = document.querySelector('#youtube-confirm-button');
  const notice = document.querySelector('#youtube-popup-notice');
  let remainingSeconds = 5;

  subscribeButton?.addEventListener('click', () => {
    remainingSeconds = 5;
    if (confirmButton) {
      confirmButton.disabled = true;
      confirmButton.textContent = `Já me inscrevi (${remainingSeconds}s)`;
    }

    const countdown = window.setInterval(() => {
      remainingSeconds -= 1;

      if (confirmButton) {
        confirmButton.textContent = remainingSeconds > 0
          ? `Já me inscrevi (${remainingSeconds}s)`
          : 'Já me inscrevi';
        confirmButton.disabled = remainingSeconds > 0;
      }

      if (remainingSeconds <= 0) {
        window.clearInterval(countdown);
      }
    }, 1000);
  });

  confirmButton?.addEventListener('click', () => {
    if (notice) {
      notice.textContent = 'Obrigado! Você pode continuar no site.';
    }
  });
}
