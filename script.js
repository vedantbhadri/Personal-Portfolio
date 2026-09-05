const siteLinks = {
  github: "https://github.com/vedantbhadri",
  linkedin: "https://www.linkedin.com/in/vedant-bhadri/",
  cv: "",
  email: "vedantbhadri5@gmail.com"
};

const projects = [
  {
    title: "Image Retrieval Using Pretrained CNN Embeddings",
    slug: "image-retrieval-cnn-embeddings",
    category: "Coursework",
    featured: true,
    status: "Course paper - not peer reviewed",
    year: "Coursework",
    description: "A content-based image retrieval study using ResNet-50 embeddings, FAISS similarity search, and an ablation comparison of cosine similarity, L2 distance, and color-histogram baselines on CIFAR-10.",
    longDescription: "The report evaluates pretrained CNN embeddings for semantic image retrieval and compares similarity metrics using P@10 label consistency.",
    technologies: ["AI/ML", "Research", "Deep Learning", "Computer Vision", "ResNet-50", "FAISS", "CIFAR-10"],
    githubUrl: "",
    liveDemoUrl: "",
    paperUrl: "assets/coursework/image-retrieval-cnn-embeddings.pdf",
    contribution: "Coursework report with Harmandeep Pal.",
    problem: "Retrieving images by visual and semantic content rather than filenames or tags.",
    approach: "Extract deep embeddings with a pretrained CNN, index vectors with FAISS, and compare retrieval metrics.",
    results: "The report states CNN-cosine retrieval outperformed CNN-L2 and a color-histogram baseline on the proof-of-concept subset."
  },
  {
    title: "Optimizing Urban Delivery Routes Using Genetic Algorithms",
    slug: "genetic-algorithm-urban-delivery-routes",
    category: "Coursework",
    featured: true,
    status: "Course paper - not peer reviewed",
    year: "Coursework",
    description: "A nature-inspired computing project applying an enhanced genetic algorithm to smart-city vehicle routing with time windows, traffic factors, service times, adaptive mutation, and 2-Opt local search.",
    technologies: ["Software", "Research", "Optimization", "Genetic Algorithms", "Vehicle Routing", "Smart Cities", "Metaheuristics"],
    githubUrl: "",
    liveDemoUrl: "",
    paperUrl: "assets/coursework/genetic-algorithm-urban-delivery-routes.pdf"
  },
  {
    title: "EEG Theta Band Power for ADHD Classification",
    slug: "eeg-theta-adhd-ml-classification",
    category: "Coursework",
    featured: true,
    status: "Course report - not peer reviewed",
    year: "Coursework",
    description: "A neuroinformatics coursework report using EEG theta-band power features and machine learning approaches to classify ADHD and control subjects in the NeuCom environment.",
    technologies: ["AI/ML", "Research", "Neuroinformatics", "EEG", "Machine Learning", "ADHD", "Theta Band", "NeuCom"],
    githubUrl: "",
    liveDemoUrl: "",
    paperUrl: "assets/coursework/eeg-theta-adhd-ml-classification.pdf"
  },
  {
    title: "Spiking Neural Network Approach for EEG-Based ADHD Classification",
    slug: "snn-eeg-adhd-classification",
    category: "Coursework",
    featured: true,
    status: "Course report - not peer reviewed",
    year: "Coursework",
    description: "A neuroinformatics report exploring spiking neural networks for EEG-based ADHD classification using theta-band power, BSA spike encoding, NeuCube, SNNcube mapping, and deSNN classification.",
    technologies: ["AI/ML", "Research", "Neuroinformatics", "SNN", "EEG", "NeuCube", "ADHD", "Spiking Neural Networks"],
    githubUrl: "",
    liveDemoUrl: "",
    paperUrl: "assets/coursework/snn-eeg-adhd-classification.pdf"
  },
  {
    title: "Mini AI Coding Agent",
    slug: "mini-ai-coding-agent",
    category: "Software",
    featured: false,
    status: "Personal project",
    year: "2026",
    description: "A terminal-based AI coding agent built with Python and the OpenAI API, using tool/function calling to inspect files, edit text files, run shell commands with confirmation, and maintain session history.",
    technologies: ["Software", "AI/ML", "Python", "OpenAI API", "Tool Calling", "CLI", "Agents"],
    githubUrl: "https://github.com/vedantbhadri/mini-ai-coding-agent",
    liveDemoUrl: "",
    paperUrl: ""
  }
];

const header = document.querySelector("[data-header]");
const nav = document.querySelector("[data-nav]");
const menuToggle = document.querySelector("[data-menu-toggle]");
const projectGrid = document.querySelector("[data-project-grid]");
const projectCount = document.querySelector("[data-project-count]");

const syncHeader = () => {
  header.classList.toggle("is-scrolled", window.scrollY > 12);
};

const createAction = (label, url) => {
  if (!url) return "";

  return `<a href="${url}" target="_blank" rel="noreferrer">${label}</a>`;
};

const wireProjectHover = () => {
  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

  document.querySelectorAll(".project-card").forEach((card) => {
    card.addEventListener("pointermove", (event) => {
      const rect = card.getBoundingClientRect();
      const x = event.clientX - rect.left;
      const y = event.clientY - rect.top;
      const rotateY = ((x / rect.width) - 0.5) * 3;
      const rotateX = ((y / rect.height) - 0.5) * -3;

      card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-4px)`;
    });

    card.addEventListener("pointerleave", () => {
      card.style.transform = "";
    });
  });
};

const setupReveals = () => {
  const animatedTargets = [
    ".hero-content",
    ".archive-hero",
    ".section-heading",
    ".about-copy",
    ".interest-cloud",
    ".project-card",
    ".contact",
    ".contact-card"
  ];

  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

  document.body.classList.add("motion-ready");

  const revealItems = document.querySelectorAll(animatedTargets.join(","));

  revealItems.forEach((item, index) => {
    item.classList.add("reveal");
    item.style.setProperty("--delay", `${Math.min(index * 45, 320)}ms`);
  });

  if ("IntersectionObserver" in window) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.14 });

    revealItems.forEach((item) => observer.observe(item));
  } else {
    revealItems.forEach((item) => item.classList.add("is-visible"));
  }
};

const renderProjects = (filter = "All") => {
  if (!projectGrid) return;

  const mode = projectGrid.dataset.projectMode || "all";
  const featuredProjects = projects.filter((project) => project.featured);
  const sourceProjects = mode === "featured"
    ? (featuredProjects.length ? featuredProjects : projects).slice(0, 4)
    : projects;

  const filtered = filter === "All"
    ? sourceProjects
    : sourceProjects.filter((project) => project.category === filter || (project.technologies || []).includes(filter));

  if (projectCount) {
    projectCount.textContent = `${filtered.length} ${filtered.length === 1 ? "project" : "projects"}`;
  }

  projectGrid.innerHTML = filtered.map((project) => {
    const tags = (project.technologies || []).map((tag) => `<span>${tag}</span>`).join("");
    const meta = [...new Set([project.category, project.status, project.year].filter(Boolean))]
      .map((item) => `<span>${item}</span>`)
      .join("");
    const actions = [
      createAction("GitHub", project.githubUrl),
      createAction("Demo", project.liveDemoUrl),
      createAction("Report", project.paperUrl)
    ].filter(Boolean).join("");

    return `
      <article class="project-card" data-category="${project.category}">
        <div class="project-visual" aria-hidden="true">
          <span></span>
          <span></span>
          <span></span>
        </div>
        <div class="project-content">
          <div class="project-meta">
            ${meta}
          </div>
          <h3>${project.title}</h3>
          <p>${project.description}</p>
          <div class="tag-list">${tags}</div>
        </div>
        <div class="project-actions">${actions}</div>
      </article>
    `;
  }).join("");

  wireProjectHover();
};

if (header) syncHeader();
renderProjects();
setupReveals();

if (header) {
  window.addEventListener("scroll", syncHeader, { passive: true });
}

if (menuToggle) {
  menuToggle.addEventListener("click", () => {
    const isOpen = document.body.classList.toggle("nav-open");
    menuToggle.setAttribute("aria-expanded", String(isOpen));
  });
}

if (nav && menuToggle) {
  nav.addEventListener("click", (event) => {
    if (event.target.matches("a")) {
      document.body.classList.remove("nav-open");
      menuToggle.setAttribute("aria-expanded", "false");
    }
  });
}

document.querySelectorAll("[data-filter]").forEach((button) => {
  button.addEventListener("click", () => {
    document.querySelectorAll("[data-filter]").forEach((item) => item.classList.remove("active"));
    button.classList.add("active");
    renderProjects(button.dataset.filter);
    setupReveals();
  });
});
