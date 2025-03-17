document.addEventListener('DOMContentLoaded', function() {
    const scrollContainer = document.getElementById('eventsScroll');
    const scrollLeftBtn = document.getElementById('scrollLeft');
    const scrollRightBtn = document.getElementById('scrollRight');
    
    // Scroll amount (width of one event card + gap)
    const scrollAmount = 340; // 300px card width + 40px gap
    
    // Scroll left button click
    scrollLeftBtn.addEventListener('click', function() {
      scrollContainer.scrollBy({
        left: -scrollAmount,
        behavior: 'smooth'
      });
    });
    
    // Scroll right button click
    scrollRightBtn.addEventListener('click', function() {
      scrollContainer.scrollBy({
        left: scrollAmount,
        behavior: 'smooth'
      });
    });
    
    // Keyboard navigation
    document.addEventListener('keydown', function(e) {
      if (e.key === 'ArrowLeft') {
        scrollContainer.scrollBy({
          left: -scrollAmount,
          behavior: 'smooth'
        });
      } else if (e.key === 'ArrowRight') {
        scrollContainer.scrollBy({
          left: scrollAmount,
          behavior: 'smooth'
        });
      }
    });
    
    // Check for touch devices
    let isTouch = 'ontouchstart' in window || navigator.msMaxTouchPoints;
    
    // Hide buttons on touch devices as they can scroll naturally
    if (isTouch) {
      scrollLeftBtn.style.display = 'none';
      scrollRightBtn.style.display = 'none';
    }
  });