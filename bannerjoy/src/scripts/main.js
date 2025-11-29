const cta = document.querySelector('.cta');

function pulseButton(button) {
  button.animate(
    [
      { transform: 'translateY(0)', boxShadow: '0 10px 30px rgba(125, 226, 209, 0.25)' },
      { transform: 'translateY(-4px)', boxShadow: '0 14px 36px rgba(125, 226, 209, 0.35)' },
      { transform: 'translateY(0)', boxShadow: '0 10px 30px rgba(125, 226, 209, 0.25)' },
    ],
    {
      duration: 900,
      iterations: 1,
      easing: 'ease-in-out',
    },
  );
}

if (cta) {
  cta.addEventListener('click', () => {
    pulseButton(cta);
  });
}
