export default function decorate(block) {
    const divs = Array.from(block.children);
    console.log(divs[0]);

    const productMediaWrapper = document.createElement("div");
    productMediaWrapper.classList.add("product-media-wrapper");

    productMediaWrapper.appendChild(divs[0]);
    productMediaWrapper.appendChild(divs[1]);

    divs[0].classList.add("product-images");
    divs[1].classList.add("main-image");

    block.insertBefore(productMediaWrapper, divs[2]);

    divs[2].classList.add("product-info");

    const productInfoDivs = divs[2].querySelectorAll("div");
    productInfoDivs[0].classList.add("product-title");
    productInfoDivs[1].classList.add("size-selector");
    productInfoDivs[2].classList.add("quantity-selector");
    productInfoDivs[3].classList.add("cart-actions");

    // Size Selection Feature
    const sizeContainer = document.createElement("div");
    sizeContainer.classList.add("size-buttons-wrapper");

    const availableSizes = ['S', 'M', 'L'];
    const selectedSizeText = productInfoDivs[1].querySelector("p:nth-child(2)");

    availableSizes.forEach(size => {
        const sizeBtn = document.createElement("button");
        sizeBtn.textContent = size;
        sizeBtn.classList.add("size-button");

        sizeBtn.addEventListener("click", () => {
            selectedSizeText.innerHTML = `Selected Size: <strong>${size}</strong>`;
            document.querySelectorAll(".size-button").forEach(btn => btn.classList.remove("selected"));
            sizeBtn.classList.add("selected");
        });

        sizeContainer.appendChild(sizeBtn);
    });

    productInfoDivs[1].appendChild(sizeContainer);

    // Quantity Selection Feature
    const quantityWrapper = document.createElement("div");
    quantityWrapper.classList.add("quantity-controls");

    const decrementBtn = document.createElement("button");
    decrementBtn.textContent = "-";
    decrementBtn.classList.add("quantity-btn");
    decrementBtn.disabled = true;

    const quantityDisplay = document.createElement("input");
    quantityDisplay.type = "text";
    quantityDisplay.value = "1";
    quantityDisplay.classList.add("quantity-display");
    quantityDisplay.readOnly = true;

    const incrementBtn = document.createElement("button");
    incrementBtn.textContent = "+";
    incrementBtn.classList.add("quantity-btn");

    decrementBtn.addEventListener("click", () => {
        let qty = parseInt(quantityDisplay.value);
        qty--;
        quantityDisplay.value = qty;
        decrementBtn.disabled = qty === 1;
    });

    incrementBtn.addEventListener("click", () => {
        let qty = parseInt(quantityDisplay.value);
        qty++;
        quantityDisplay.value = qty;
        decrementBtn.disabled = false;
    });

    quantityWrapper.appendChild(decrementBtn);
    quantityWrapper.appendChild(quantityDisplay);
    quantityWrapper.appendChild(incrementBtn);
    productInfoDivs[2].appendChild(quantityWrapper);

   
}
