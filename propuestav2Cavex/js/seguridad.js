document.addEventListener('DOMContentLoaded', function () {
  const diffContainer = document.querySelector('.diff-container');
  if (!diffContainer) return;

  const slides = Array.from(diffContainer.querySelectorAll('.diff-slide'));
  const progressBars = Array.from(diffContainer.querySelectorAll('.progress-bar'));
  if (!slides.length || !progressBars.length) return;

  let index = 0;
  const INTERVAL = 5000; // 5 segundos
  let timer = null;
  let remainingTime = INTERVAL;
  let startTime = Date.now();

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
    remainingTime = INTERVAL;
    startTime = Date.now();
  }

  function next() {
    const nextIndex = (index + 1) % slides.length;
    if (nextIndex === 0) {
      resetFills();
      // Force reflow before activating the first bar again
      void progressBars[0].offsetWidth;
    }
    activate(nextIndex);
    start();
  }

  function start() {
    if (timer) clearTimeout(timer);
    startTime = Date.now();
    
    // Resume progress bar CSS
    const activeBar = progressBars[index];
    if (activeBar) {
      const fill = activeBar.querySelector('.progress-fill');
      if (fill) {
        fill.style.transition = `width ${remainingTime}ms linear`;
        fill.style.width = '100%';
      }
    }
    
    timer = setTimeout(next, remainingTime);
  }

  function stop() {
    if (timer) {
      clearTimeout(timer);
      timer = null;
      
      remainingTime -= (Date.now() - startTime);
      if (remainingTime < 0) remainingTime = 0;
      
      // Freeze progress bar CSS
      const activeBar = progressBars[index];
      if (activeBar) {
        const fill = activeBar.querySelector('.progress-fill');
        if (fill) {
          const currentWidth = window.getComputedStyle(fill).width;
          fill.style.transition = 'none';
          fill.style.width = currentWidth;
        }
      }
    }
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
      start();
    });
    bar.style.cursor = 'pointer';
  });

  // Pause on hover
  diffContainer.addEventListener('mouseenter', stop);
  diffContainer.addEventListener('mouseleave', start);

  // Initialize
  activate(0);
  start();
});
