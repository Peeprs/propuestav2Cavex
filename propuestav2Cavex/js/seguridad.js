document.addEventListener('DOMContentLoaded', function () {
  const diffContainer = document.querySelector('.diff-container');
  if (!diffContainer) return;

  const slides = Array.from(diffContainer.querySelectorAll('.diff-slide'));
  const progressBars = Array.from(diffContainer.querySelectorAll('.progress-bar'));
  if (!slides.length || !progressBars.length) return;

  let index = 0;
  const INTERVAL = 3000; // Increased interval for a better experience
  let timer = null;

  function resetFills() {
    progressBars.forEach(bar => {
      const fill = bar.querySelector('.progress-fill');
      if (fill) {
        fill.style.transition = 'none';
        fill.style.width = '0%';
      }
      bar.classList.remove('active', 'completed');
    });
  }

  function activate(i) {

    
    progressBars.forEach((bar, barIndex) => {
      const fill = bar.querySelector('.progress-fill');
      if (fill) {
        if (barIndex < i) {
          fill.style.transition = 'none';
          fill.style.width = '100%';
          bar.classList.add('completed');
          bar.classList.remove('active');
        } else if (barIndex === i) {
          fill.style.transition = 'none';
          fill.style.width = '0%';
          bar.classList.add('active');
          bar.classList.remove('completed');
          
          // Force reflow
          void fill.offsetWidth;
          
          fill.style.transition = `width ${INTERVAL}ms linear`;
          fill.style.width = '100%';
        } else {
          fill.style.transition = 'none';
          fill.style.width = '0%';
          bar.classList.remove('active', 'completed');
        }
      }
    });
    
    slides.forEach((s, idx) => {
      s.classList.remove('active', 'next-slide', 'prev-slide');
      if (idx === i) {
        s.classList.add('active');
      } else if (idx === (i + 1) % slides.length) {
        s.classList.add('next-slide');
      } else {
        s.classList.add('prev-slide');
      }
    });
    
    index = i;
  }

  function next() {
    const nextIndex = (index + 1) % slides.length;
    if (nextIndex === 0) {
      resetFills();
      // Force reflow before activating the first bar again
      void progressBars[0].offsetWidth;
    }
    activate(nextIndex);
  }

  function start() {
    stop();
    timer = setInterval(next, INTERVAL);
  }

  function stop() {
    if (timer) { clearInterval(timer); timer = null; }
  }

  // attach clicks to progress bars
  progressBars.forEach((bar, i) => {
    bar.addEventListener('click', function () {
      stop();
      if (i === 0) {
        resetFills();
        void bar.offsetWidth;
      }
      activate(i);
      // restart after a pause
      start();
    });
    bar.style.cursor = 'pointer';
  });

  // Initialize
  activate(0);
  start();
});
