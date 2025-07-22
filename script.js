// Blog post data
const blogPosts = [
  {
    title: "Exploring React for Beginners",
    image: "react.jpg",
    description: "Learn the basics of React and how to build your first app.",
    date: "July 10, 2025",
    category: "Tech",
  },
  {
    title: "Top 5 Travel Spots in 2025",
    image: "travel.jpg",
    description: "Check out these must-visit travel destinations for 2025.",
    date: "July 5, 2025",
    category: "Travel",
  },
  {
    title: "Delicious Vegan Recipes to Try",
    image: "recipes.jpg",
    description: "Easy and healthy vegan recipes you can cook at home.",
    date: "July 3, 2025",
    category: "Food",
  },
  {
    title: "Understanding CSS Grid",
    image: "CSS.jpg",
    description: "Learn how to create modern layouts with CSS Grid.",
    date: "July 2, 2025",
    category: "Tech",
  },
  {
    title: "Exploring Japan: Culture & Food",
    image: "japan.jpg",
    description: "Experience the traditions and flavors of Japan.",
    date: "June 28, 2025",
    category: "Travel",
  },
  {
    title: "10-Minute Healthy Meals",
    image: "meal.png",
    description: "Fast and delicious meals to fuel your busy life.",
    date: "June 25, 2025",
    category: "Food",
  },
];

// Global variables
let currentPage = 1;
const postsPerPage = 3;
let currentPosts = blogPosts;

// DOM elements
const container = document.getElementById("blog-container");
const paginationContainer = document.getElementById("pagination");
const filterButtons = document.querySelectorAll(".filter-btn");
const searchInput = document.getElementById("searchInput");

// Get posts for current page
function getPaginatedPosts(posts, page) {
  const start = (page - 1) * postsPerPage;
  return posts.slice(start, start + postsPerPage);
}

// Render blog cards
function renderPosts(posts) {
  container.innerHTML = "";

  const paginated = getPaginatedPosts(posts, currentPage);

  if (paginated.length === 0) {
    container.innerHTML = "<p style='text-align:center;'>No posts found.</p>";
    paginationContainer.innerHTML = "";
    return;
  }

  paginated.forEach((post) => {
    const card = document.createElement("div");
    card.classList.add("blog-card");
    card.innerHTML = `
      <img src="${post.image}" alt="${post.title}">
      <div class="content">
        <h3>${post.title}</h3>
        <p>${post.description}</p>
        <div class="date">${post.date}</div>
      </div>
    `;
    container.appendChild(card);
  });

  renderPagination(posts);
}

// Render pagination buttons
function renderPagination(posts) {
  paginationContainer.innerHTML = "";
  const totalPages = Math.ceil(posts.length / postsPerPage);

  for (let i = 1; i <= totalPages; i++) {
    const btn = document.createElement("button");
    btn.innerText = i;
    btn.classList.add("page-btn");
    if (i === currentPage) btn.classList.add("active");

    btn.addEventListener("click", () => {
      currentPage = i;
      renderPosts(currentPosts);
    });

    paginationContainer.appendChild(btn);
  }
}

// Filter posts by category
filterButtons.forEach((btn) => {
  btn.addEventListener("click", () => {
    const category = btn.getAttribute("data-category");
    currentPage = 1;

    if (category === "all") {
      currentPosts = blogPosts;
    } else {
      currentPosts = blogPosts.filter(
        (post) => post.category.toLowerCase() === category.toLowerCase()
      );
    }

    renderPosts(currentPosts);
  });
});

// Search logic
searchInput.addEventListener("input", () => {
  const keyword = searchInput.value.toLowerCase();
  currentPage = 1;

  currentPosts = blogPosts.filter((post) =>
    post.title.toLowerCase().includes(keyword)
  );

  renderPosts(currentPosts);
});

// Initial load
renderPosts(currentPosts);
