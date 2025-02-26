
function getApiUrl() {
    const linkElement = document.querySelector('.product-list a');
    return linkElement ? linkElement.href : null;
}


function updateCarousel(products,dotsContainer) {
   

    function moveCarousel(index) {
        const itemsPerRow = getItemsPerRow();
        currentIndex = index;


        document.querySelectorAll('.product-card').forEach((card, i) => {
            card.style.display = (i >= index * itemsPerRow && i < (index + 1) * itemsPerRow) ? 'block' : 'none';
        });


        document.querySelectorAll('.dot').forEach(dot => dot.classList.remove('active'));
        dotsContainer.children[index]?.classList.add('active');
    }

    function createDots() {
        const itemsPerRow = getItemsPerRow();
        const totalPages = Math.ceil(products.length / itemsPerRow);


        dotsContainer.innerHTML = '';

        for (let i = 0; i < totalPages; i++) {
            const dot = document.createElement('span');
            dot.classList.add('dot');
            if (i === 0) dot.classList.add('active');
            dot.dataset.index = i;
            dot.addEventListener('click', () => moveCarousel(i));
            dotsContainer.appendChild(dot);
        }

        moveCarousel(0);
    }

    createDots();


    window.addEventListener('resize', createDots);
}


function getItemsPerRow() {
    if (window.innerWidth >= 900) return 5;
    if (window.innerWidth >= 600) return 3;
    return 2;
}


function addEventListeners(block) {
    block.querySelectorAll('.add-to-cart').forEach(button => {
        button.addEventListener('click', (event) => {
            const productId = event.target.getAttribute('data-id');
            addToCart(productId);
        });
    });

    block.querySelectorAll('.favorite-btn').forEach(button => {
        button.addEventListener('click', (event) => {
            event.target.classList.toggle('favorited');
        });
    });
}


function addToCart(productId) {
    alert(`Product ${productId} added to cart!`);
}


export default async function decorate(block) {
    const apiUrl = getApiUrl();
    if (!apiUrl) {
        block.innerHTML = '<p>Error: API URL not found.</p>';
        return;
    }

    try {
        const response = await fetch(apiUrl);
        const data = await response.json();
        const products = data.data.filter(item => item.path.includes('/productlist'));

        block.innerHTML = '';

        if (products.length === 0) {
            block.innerHTML = '<p>No products available.</p>';
            return;
        }


        const carouselWrapper = document.createElement('div');
        carouselWrapper.classList.add('carousel-wrapper');

        const productContainer = document.createElement('div');
        productContainer.classList.add('product-grid');

        products.forEach(product => {
            const productCard = document.createElement('div');
            productCard.classList.add('product-card');

            productCard.innerHTML = `
           <a href="${product.path}">
                <div class="product-image-wrapper">
                    <img src="${product.image}" alt="${product.title}" class="product-image">
                </div>
            </a>

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


        const dotsContainer = document.createElement('div');
        dotsContainer.classList.add('carousel-dots');
        block.appendChild(dotsContainer);

        updateCarousel(products, productContainer, dotsContainer);


        addEventListeners(block);
    } catch (error) {
        console.error('Error fetching products:', error);
        block.innerHTML = '<p>Failed to load products.</p>';
    }
}
