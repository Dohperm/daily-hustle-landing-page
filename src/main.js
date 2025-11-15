import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap-icons/font/bootstrap-icons.css'
import './style.css'
import 'bootstrap/dist/js/bootstrap.bundle.min.js'

document.addEventListener("DOMContentLoaded", function () {
  // Footer year
  document.getElementById("year").textContent = new Date().getFullYear();

  // Hero text animation with enhanced effects
  const words = ["Jobs", "Cashback", "Bounties", "Growth"];
  let curr = 0;
  const heroElement = document.getElementById("hero-dyn");
  
  function changeWord() {
    heroElement.style.opacity = '0';
    heroElement.style.transform = 'translateY(-10px)';
    
    setTimeout(() => {
      curr = (curr + 1) % words.length;
      heroElement.textContent = words[curr];
      heroElement.style.opacity = '1';
      heroElement.style.transform = 'translateY(0)';
    }, 300);
  }
  
  setInterval(changeWord, 2000);

  // Campaign modal
  window.openFC = function (card) {
    const title = card.getAttribute("data-name");
    const desc = card.getAttribute("data-desc") || "";
    document.getElementById("fcModalTitle").textContent = title || "Campaign";
    document.getElementById("fcModalBody").textContent = desc || "";
    new bootstrap.Modal(document.getElementById("fcModal")).show();
  };

  // Enhanced fade-in animations with stagger effect
  const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry, index) => {
      if (entry.isIntersecting) {
        setTimeout(() => {
          entry.target.classList.add('visible');
        }, index * 100);
      }
    });
  }, observerOptions);

  document.querySelectorAll('.fadein').forEach(el => {
    observer.observe(el);
  });

  // Scroll to top button with smooth animation
  const scrollTopBtn = document.getElementById("scrollTopBtn");
  window.onscroll = function () {
    if (document.body.scrollTop > 100 || document.documentElement.scrollTop > 100) {
      scrollTopBtn.style.display = "flex";
      scrollTopBtn.style.opacity = "1";
    } else {
      scrollTopBtn.style.opacity = "0";
      setTimeout(() => {
        if (scrollTopBtn.style.opacity === "0") {
          scrollTopBtn.style.display = "none";
        }
      }, 300);
    }
  };

  // Enhanced stats counter with easing
  function easeOutQuart(t) {
    return 1 - (--t) * t * t * t;
  }

  function animateValue(obj, start, end, duration, isCurrency = false) {
    let startTimestamp = null;
    const step = (timestamp) => {
      if (!startTimestamp) startTimestamp = timestamp;
      const progress = Math.min((timestamp - startTimestamp) / duration, 1);
      const easedProgress = easeOutQuart(progress);
      let currentValue = Math.floor(easedProgress * (end - start) + start);
      
      if (isCurrency) {
        obj.innerHTML = "₦" + currentValue.toLocaleString('en-US');
      } else {
        obj.innerHTML = currentValue.toLocaleString('en-US');
      }

      if (progress < 1) {
        window.requestAnimationFrame(step);
      } else {
        obj.innerHTML = obj.dataset.targetText;
      }
    };
    window.requestAnimationFrame(step);
  }

  // Stats animation observer
  const statSection = document.getElementById("stats");
  let statsObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          document.querySelectorAll(".stat-number").forEach((el, index) => {
            setTimeout(() => {
              const targetNum = parseInt(el.dataset.targetNum);
              const isCurrency = el.dataset.targetText.startsWith("₦");
              animateValue(el, 0, targetNum, 2000, isCurrency);
            }, index * 200);
          });
          statsObserver.unobserve(statSection);
        }
      });
    },
    { threshold: 0.5 }
  );

  statsObserver.observe(statSection);

  // Parallax effect for hero section
  window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const parallax = document.querySelector('.hero-parallax');
    if (parallax) {
      const speed = scrolled * 0.5;
      parallax.style.transform = `translateY(${speed}px)`;
    }
  });

  // Enhanced navbar scroll effect
  const navbar = document.querySelector('.navbar');
  window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
  });
});