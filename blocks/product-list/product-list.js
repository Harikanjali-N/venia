export default async function decorate(block) {
    const response = await fetch('http://localhost:3000/query-index.json');
    const data = await response.json();
    const products = data.data;

    block.innerHTML = '';

    if (products.length === 0) {
        block.innerHTML = '<p>No products available.</p>';
        return;
    }

    // Create Carousel Wrapper
    const carouselWrapper = document.createElement('div');
    carouselWrapper.classList.add('carousel-wrapper');

    const productContainer = document.createElement('div');
    productContainer.classList.add('product-grid');

    products.forEach(product => {
        const productCard = document.createElement('div');
        productCard.classList.add('product-card');

        productCard.innerHTML = `
            <div class="product-image-wrapper">
                <img src="${product.image}" alt="${product.title}" class="product-image">
            </div>
            <h3 class="product-title">${product.title}</h3>
            <h3 class="product-price">${product.price}</h3>
            <div class="product-actions">
                <button class="add-to-cart" data-id="${product.path}">Add to Cart</button>
                <button class="favorite-btn" data-id="${product.path}">❤️</button>
            </div>
        `;

        productContainer.appendChild(productCard);
    });

    carouselWrapper.appendChild(productContainer);
    block.appendChild(carouselWrapper);

    // Create Dots Container
    const dotsContainer = document.createElement('div');
    dotsContainer.classList.add('carousel-dots');
    block.appendChild(dotsContainer);

    // Initialize Carousel
    let currentIndex = 0;

    function updateCarousel() {
        const itemsPerRow = getItemsPerRow();
        const totalPages = Math.ceil(products.length / itemsPerRow);

        // Remove old dots
        dotsContainer.innerHTML = '';

        // Create correct number of dots
        for (let i = 0; i < totalPages; i++) {
            const dot = document.createElement('span');
            dot.classList.add('dot');
            if (i === 0) dot.classList.add('active'); // First dot active
            dot.dataset.index = i;
            dot.addEventListener('click', () => moveCarousel(i));
            dotsContainer.appendChild(dot);
        }

        moveCarousel(0);
    }

    function moveCarousel(index) {
        const itemsPerRow = getItemsPerRow();
        currentIndex = index;

        // Hide all products first
        document.querySelectorAll('.product-card').forEach((card, i) => {
            card.style.display = (i >= index * itemsPerRow && i < (index + 1) * itemsPerRow) ? 'block' : 'none';
        });

        // Update Active Dot
        document.querySelectorAll('.dot').forEach(dot => dot.classList.remove('active'));
        dotsContainer.children[index]?.classList.add('active'); // Prevent errors when resizing
    }

    function getItemsPerRow() {
        if (window.innerWidth >= 900) return 5; // Desktop
        if (window.innerWidth >= 600) return 3; // Tablet
        return 2; // Mobile
    }

    // Update on Resize
    window.addEventListener('resize', updateCarousel);

    // Initial Load
    updateCarousel();

    // Add Event Listeners
    document.querySelectorAll('.add-to-cart').forEach(button => {
        button.addEventListener('click', (event) => {
            const productId = event.target.getAttribute('data-id');
            addToCart(productId);
        });
    });

    document.querySelectorAll('.favorite-btn').forEach(button => {
        button.addEventListener('click', (event) => {
            event.target.classList.toggle('favorited');
        });
    });
}

function addToCart(productId) {
    alert(`Product ${productId} added to cart!`);
}
