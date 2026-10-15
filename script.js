// ---------- Typing effect ----------
const roles = ["Python Developer", "Backend Engineer", "Automation Lover", "Data Enthusiast"];
const typingEl = document.getElementById("typing");
let roleIdx = 0, charIdx = 0, deleting = false;

function type() {
  const word = roles[roleIdx];
  typingEl.textContent = word.substring(0, charIdx);

  if (!deleting && charIdx < word.length) {
    charIdx++;
    setTimeout(type, 90);
  } else if (!deleting) {
    deleting = true;
    setTimeout(type, 1400);
  } else if (charIdx > 0) {
    charIdx--;
    setTimeout(type, 45);
  } else {
    deleting = false;
    roleIdx = (roleIdx + 1) % roles.length;
    setTimeout(type, 300);
  }
}
type();

// ---------- Mobile menu ----------
const menuBtn = document.getElementById("menu-btn");
const nav = document.querySelector(".navbar nav");
menuBtn.addEventListener("click", () => nav.classList.toggle("open"));
document.querySelectorAll("#menu a").forEach(a =>
  a.addEventListener("click", () => nav.classList.remove("open"))
);

// ---------- Active link on scroll ----------
const sections = document.querySelectorAll("section[id]");
const links = document.querySelectorAll("#menu a");
window.addEventListener("scroll", () => {
  let current = "";
  sections.forEach(sec => {
    if (window.scrollY >= sec.offsetTop - 140) current = sec.id;
  });
  links.forEach(l => l.classList.toggle("active", l.getAttribute("href") === "#" + current));
});

// ---------- Reveal on scroll + skill bars + counters ----------
document.querySelectorAll(".section .card, .section .stat, .about-grid > p, .skill")
  .forEach(el => el.classList.add("reveal"));

function animateCount(el) {
  const target = +el.dataset.count;
  let n = 0;
  const step = Math.max(1, Math.ceil(target / 40));
  const timer = setInterval(() => {
    n += step;
    if (n >= target) { n = target; clearInterval(timer); }
    el.textContent = n;
  }, 40);
}

const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (!entry.isIntersecting) return;
    const el = entry.target;
    el.classList.add("show");

    const fill = el.querySelector(".fill");
    if (fill) fill.style.width = fill.dataset.width + "%";

    const counter = el.querySelector("[data-count]");
    if (counter) animateCount(counter);

    observer.unobserve(el);
  });
}, { threshold: 0.2 });

document.querySelectorAll(".reveal").forEach(el => observer.observe(el));

// ---------- Contact form (demo) ----------
document.getElementById("contact-form").addEventListener("submit", e => {
  e.preventDefault();
  const name = document.getElementById("name").value.trim();
  document.getElementById("form-msg").textContent =
    `Thanks ${name}! Your message has been received (demo).`;
  e.target.reset();
});

// ---------- Footer year ----------
document.getElementById("year").textContent = new Date().getFullYear();
