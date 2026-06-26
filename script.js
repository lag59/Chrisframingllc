const menuButton = document.querySelector('.menu-toggle');
const navLinks = document.querySelector('.nav-links');
if (menuButton && navLinks) {
  menuButton.addEventListener('click', () => navLinks.classList.toggle('open'));
}

const projectSliders = Array.from(document.querySelectorAll('.project-slider'));

projectSliders.forEach((slider) => {
  const slides = Array.from(slider.querySelectorAll('.slide'));
  const prevBtn = slider.querySelector('.slider-btn.prev');
  const nextBtn = slider.querySelector('.slider-btn.next');
  const dotsWrap = slider.querySelector('.slider-dots');
  const label = slider.dataset.label || 'Project';
  const intervalMs = Number(slider.dataset.interval) || 3200;
  let index = slides.findIndex((s) => s.classList.contains('active'));
  let timer;

  if (!slides.length || !dotsWrap) return;
  if (index < 0) index = 0;

  const dots = slides.map((_, i) => {
    const dot = document.createElement('button');
    dot.type = 'button';
    dot.ariaLabel = `Show ${label} photo ${i + 1}`;
    dot.addEventListener('click', () => {
      setActive(i);
      restartTimer();
    });
    dotsWrap.appendChild(dot);
    return dot;
  });

  function setActive(newIndex) {
    slides[index].classList.remove('active');
    dots[index].classList.remove('active');
    index = (newIndex + slides.length) % slides.length;
    slides[index].classList.add('active');
    dots[index].classList.add('active');
  }

  function next() {
    setActive(index + 1);
  }

  function restartTimer() {
    clearInterval(timer);
    timer = setInterval(next, intervalMs);
  }

  prevBtn?.addEventListener('click', () => {
    setActive(index - 1);
    restartTimer();
  });

  nextBtn?.addEventListener('click', () => {
    next();
    restartTimer();
  });

  setActive(index);
  restartTimer();
});

const quoteForm = document.querySelector('#quote-form-element');
if (quoteForm) {
  quoteForm.addEventListener('submit', (event) => {
    event.preventDefault();
    const formData = new FormData(quoteForm);
    const name = formData.get('name') || '';
    const email = formData.get('email') || '';
    const phone = formData.get('phone') || '';
    const projectType = formData.get('projectType') || '';
    const details = formData.get('details') || '';
    const subject = `Quote Request from ${name}`;
    const body = [
      `Name: ${name}`,
      `Email: ${email}`,
      `Phone: ${phone}`,
      `Project Type: ${projectType}`,
      '',
      'Project Details:',
      details,
    ].join('\n');

    const mailto = `mailto:chrisframingllc@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    window.location.href = mailto;
  });
}


