// Single source of truth for portfolio content.
// Add a project by appending to `projects`; set featured: true to show it on the home page.

window.SITE = {
  name: "Vedant Bhadri",
  email: "vedantbhadri5@gmail.com",
  github: "https://github.com/vedantbhadri",
  linkedin: "https://www.linkedin.com/in/vedant-bhadri/",
  cv: "assets/cv/vedant-bhadri-cv.pdf?v=2026-10-21"
};

// `visual` picks the generative card illustration: signal | network | route | grid | terminal | menu
window.PROJECTS = [
  {
    title: "Non-Invasive Blood Glucose Estimation from PPG",
    slug: "ppg-blood-glucose",
    category: "Research",
    tags: ["AI/ML", "Research"],
    featured: true,
    highlight: true,
    status: "Master's thesis · Ongoing",
    date: "2026",
    visual: "signal",
    description: "An end-to-end deep-learning pipeline that estimates blood glucose from wrist-worn PPG/BVP signals: signal-quality assessment, physiological feature extraction and a hybrid CNN–Transformer model, evaluated subject-independently and prepared for real-time testing on a Raspberry Pi.",
    stack: ["PyTorch", "Signal Processing", "CNN–Transformer", "Raspberry Pi", "Empatica"],
    links: {}
  },
  {
    title: "AI Allergen Compliance & Menu Translation",
    slug: "ai-allergen-menu-translation",
    category: "Software",
    tags: ["AI/ML", "Software"],
    featured: true,
    status: "AWS AI Innovation Mentorship · 3rd place",
    date: "Sept 2026",
    visual: "menu",
    description: "A team-built web app that turns uploaded restaurant menus into multilingual digital menus with allergen information based on New Zealand food-labelling standards. I built the Textract OCR workflow and dish-parsing logic.",
    stack: ["AWS", "Amazon Bedrock", "Textract", "Flask", "OCR"],
    links: { github: "https://github.com/vedantbhadri/AI-Powered-Allergen-Compliance-and-Menu-Translation" }
  },
  {
    title: "Mini AI Coding Agent",
    slug: "mini-ai-coding-agent",
    category: "Software",
    tags: ["AI/ML", "Software"],
    featured: true,
    status: "Personal project",
    date: "Sept 2026",
    visual: "terminal",
    description: "A terminal coding assistant built on OpenAI function calling. The model picks a tool, Python executes it, and the result feeds the next step. Includes file inspection, editing, confirmed shell commands and session history.",
    stack: ["Python", "OpenAI API", "Tool Calling", "CLI"],
    links: { github: "https://github.com/vedantbhadri/mini-ai-coding-agent" }
  },
  {
    title: "AI Kanban Board",
    slug: "kanban-board",
    category: "Vibe Coding",
    tags: ["Vibe Coding", "Software", "AI/ML"],
    featured: false,
    status: "Vibe coded · AI-assisted",
    date: "Oct 2026",
    visual: "kanban",
    description: "A Kanban app with sign-in, drag-and-drop cards, renamable columns and SQLite persistence, plus an AI chat assistant that can create, edit and move multiple cards on request. Tested with Vitest and Playwright and shipped in Docker.",
    stack: ["Next.js", "React", "FastAPI", "SQLite", "OpenRouter", "Docker"],
    links: { github: "https://github.com/vedantbhadri/kanban-board" }
  },
  {
    title: "Arena One",
    slug: "arena-one",
    category: "Vibe Coding",
    tags: ["Vibe Coding", "Software"],
    featured: false,
    status: "Vibe coded · AI-assisted",
    date: "Oct 2026",
    visual: "arena",
    description: "A browser-based first-person arena shooter: duel a computer-controlled drone around obstacles, with hit damage, randomly placed healing stations and touch controls on mobile. I directed the concept, rules, visual style and revisions.",
    stack: ["JavaScript", "HTML Canvas", "CSS"],
    links: { github: "https://github.com/vedantbhadri/arena-one" }
  },
  {
    title: "Image Captioning with BLIP on MS COCO",
    slug: "blip-image-captioning",
    category: "Coursework",
    tags: ["AI/ML", "Research", "Coursework"],
    featured: false,
    status: "Deep Learning · AUT",
    date: "June 2026",
    visual: "caption",
    description: "Evaluated a pretrained BLIP Transformer captioner on all 5,000 MS COCO val2017 images against five human references each, reaching a CIDEr of 0.837 and BLEU-4 of 0.286. Compared performance across object supercategories and used attention maps to show that weak captions often fixate on background details like sky or grass.",
    stack: ["PyTorch", "Hugging Face", "BLIP", "MS COCO", "Google Colab"],
    links: {}
  },
  {
    title: "ASL Sign Recognition for Robot Navigation",
    slug: "asl-sign-robot-navigation",
    category: "Coursework",
    tags: ["AI/ML", "Research", "Coursework"],
    featured: false,
    status: "Deep Learning · AUT",
    date: "June 2026",
    visual: "signs",
    description: "Mapped six static ASL signs (B, F, L, R, S and \"nothing\") to robot-navigation commands and compared a CNN baseline with MobileNetV3-Small transfer learning. MobileNetV3-Small reached 99.44% test accuracy against 71.11% for the baseline, while webcam testing (73.3%) exposed the gap between dataset images and real-world conditions.",
    stack: ["MobileNetV3-Small", "CNN", "Transfer Learning", "Computer Vision"],
    links: {}
  },
  {
    title: "Spiking Neural Networks for EEG-Based ADHD Classification",
    slug: "snn-eeg-adhd-classification",
    category: "Coursework",
    tags: ["AI/ML", "Research", "Coursework"],
    featured: true,
    status: "Neuroinformatics · AUT",
    date: "Sept 2025",
    visual: "network",
    description: "Encoded 19-channel EEG theta-band power into spike trains with BSA, mapped them onto a 3D brain model in NeuCube, and classified ADHD vs. control with deSNN, compared on hold-out data against classical models.",
    stack: ["NeuCube", "SNN", "EEG", "BSA Encoding"],
    links: { report: "assets/coursework/snn-eeg-adhd-classification.pdf" }
  },
  {
    title: "EEG Theta Band Power for ADHD Classification",
    slug: "eeg-theta-adhd-ml-classification",
    category: "Coursework",
    tags: ["AI/ML", "Research", "Coursework"],
    featured: false,
    status: "Neuroinformatics · AUT",
    date: "Sept 2025",
    visual: "signal",
    description: "Classified ADHD and control subjects from EEG theta-band features using SVM, MLP and an Evolving Classification Function in NeuCom, and compared which generalised best rather than assuming the most complex model wins.",
    stack: ["scikit-learn", "NeuCom", "SVM", "MLP"],
    links: { report: "assets/coursework/eeg-theta-adhd-ml-classification.pdf" }
  },
  {
    title: "Smart-City Delivery Routes with Genetic Algorithms",
    slug: "genetic-algorithm-urban-delivery-routes",
    category: "Coursework",
    tags: ["Software", "Research", "Coursework"],
    featured: true,
    status: "Nature Inspired Computing · AUT",
    date: "Oct 2025",
    visual: "route",
    description: "Tackled the Capacitated Vehicle Routing Problem with Time Windows under realistic city constraints, using an enhanced GA with adaptive mutation and 2-Opt local search, benchmarked against a baseline GA.",
    stack: ["Python", "NumPy", "Metaheuristics", "CVRPTW"],
    links: { report: "assets/coursework/genetic-algorithm-urban-delivery-routes.pdf" }
  },
  {
    title: "Semantic Image Retrieval with CNN Embeddings & FAISS",
    slug: "image-retrieval-cnn-embeddings",
    category: "Coursework",
    tags: ["AI/ML", "Research", "Coursework"],
    featured: false,
    status: "Artificial Intelligence · AUT",
    date: "Oct 2025",
    visual: "grid",
    description: "Content-based image retrieval on CIFAR-10 using ResNet-50 embeddings indexed with FAISS, with an ablation comparing cosine similarity, L2 distance and a colour-histogram baseline.",
    stack: ["TensorFlow", "ResNet-50", "FAISS", "CIFAR-10"],
    links: { report: "assets/coursework/image-retrieval-cnn-embeddings.pdf" }
  }
];
