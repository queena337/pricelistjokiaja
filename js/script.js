// ========== TOGGLE MENU MOBILE ==========
const menuToggle = document.getElementById('menuToggle');
const navLinks = document.getElementById('navLinks');

menuToggle.addEventListener('click', () => {
  navLinks.classList.toggle('active');
});

document.querySelectorAll('.nav-links a').forEach(link => {
  link.addEventListener('click', () => {
    navLinks.classList.remove('active');
  });
});

// ========== FAQ ACCORDION ==========
const faqItems = document.querySelectorAll('.faq-item');

faqItems.forEach(item => {
  const question = item.querySelector('.faq-question');
  const answer = item.querySelector('.faq-answer');

  question.addEventListener('click', () => {
    const isActive = item.classList.contains('active');

    faqItems.forEach(other => {
      other.classList.remove('active');
      other.querySelector('.faq-answer').style.maxHeight = null;
    });

    if (!isActive) {
      item.classList.add('active');
      answer.style.maxHeight = answer.scrollHeight + 'px';
    }
  });
});

// ========== FAQ SEARCH ==========
const faqSearch = document.getElementById('faqSearch');
const noResult = document.getElementById('noResult');

faqSearch.addEventListener('input', (e) => {
  const keyword = e.target.value.toLowerCase().trim();
  let visibleCount = 0;

  faqItems.forEach(item => {
    const text = item.querySelector('.faq-question').textContent.toLowerCase() +
                 item.querySelector('.faq-answer').textContent.toLowerCase();
    
    if (text.includes(keyword)) {
      item.classList.remove('hide');
      visibleCount++;
    } else {
      item.classList.add('hide');
    }
  });

  noResult.style.display = visibleCount === 0 ? 'block' : 'none';
});

// ========== PRICE FILTER ==========
const filterBtns = document.querySelectorAll('.filter-btn');
const priceRows = document.querySelectorAll('#priceBody tr');

filterBtns.forEach(btn => {
  btn.addEventListener('click', () => {
    filterBtns.forEach(b => b.classList.remove('active'));
    btn.classList.add('active');

    const filter = btn.dataset.filter;

    priceRows.forEach(row => {
      if (filter === 'all' || row.dataset.category === filter) {
        row.classList.remove('hide');
      } else {
        row.classList.add('hide');
      }
    });
  });
});

// ========== SCROLL PROGRESS BAR ==========
const scrollProgress = document.getElementById('scrollProgress');

window.addEventListener('scroll', () => {
  const scrollTop = window.scrollY;
  const docHeight = document.documentElement.scrollHeight - window.innerHeight;
  const progress = (docHeight > 0) ? (scrollTop / docHeight) * 100 : 0;
  scrollProgress.style.width = progress + '%';
});

// ========== NAVBAR SHADOW + BACK TO TOP ==========
const navbar = document.querySelector('.navbar');
const backToTop = document.getElementById('backToTop');

window.addEventListener('scroll', () => {
  if (window.scrollY > 20) {
    navbar.style.boxShadow = '0 8px 30px rgba(0,0,0,0.5)';
  } else {
    navbar.style.boxShadow = 'none';
  }

  if (window.scrollY > 400) {
    backToTop.classList.add('show');
  } else {
    backToTop.classList.remove('show');
  }
});

backToTop.addEventListener('click', () => {
  window.scrollTo({ top: 0, behavior: 'smooth' });
});

// ========== REVEAL ON SCROLL ==========
const revealElements = document.querySelectorAll('.reveal');

const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      revealObserver.unobserve(entry.target);
    }
  });
}, {
  threshold: 0.1,
  rootMargin: '0px 0px -50px 0px'
});

revealElements.forEach(el => revealObserver.observe(el));
