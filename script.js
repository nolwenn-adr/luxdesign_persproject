// ______ DOM______ //

const itemCounterTarget = document.querySelector(".item_counter-target");
const itemCounterMessage = document.querySelector(".item_counter");

const quantityInputs = Array.from(document.querySelectorAll(".quantity-input"));
const quantityButtons = Array.from(document.querySelectorAll(".quantity-button"));


const shopProducts = Array.from(document.querySelectorAll(".shop-item"));
const productPrice = Array.from(document.querySelectorAll(".target-price"));
const products = Array.from(document.querySelectorAll(".quantity-input-frame"));
const productNames = Array.from(document.querySelectorAll(".product-name"));
const productSubTotal = Array.from(document.querySelectorAll(".sub-total"));
const productIllu = Array.from(document.querySelectorAll(".img-products"));

const cartPreview = document.querySelector(".cart-preview");

const cartItem = Array.from(document.querySelectorAll(".item-cart"));

const navlink = Array.from(document.querySelectorAll(".nav-link"));
const underline = Array.from(document.querySelectorAll(".underline"))


// ______ PRODUCT DATA______ //

const productDatas = [
    {
        name: "Cinched Lights",
        price: 149.90,
        quantity: 0,
        illu : "illustrations/lampes_1a.jpg",
        subtotal: 0
    },
    {
        name: "Tulip Lights",
        price: 129.90,
        quantity: 0,
        illu : "illustrations/lampes-2b.jpg",
        subtotal: 0
    },
    {
        name: "Grenade Lights",
        price: 129.90,
        quantity: 0,
        illu : "illustrations/lampes_3.jpg",
        subtotal: 0
    },
    {
        name: "Ellipse Lights",
        price: 189.9,
        quantity: 0,
        illu : "illustrations/lampes_4.jpg",
        subtotal: 0
    },
    {
        name: "Torsade Lightbulb",
        price: 14.9,
        quantity: 0,
        illu : "illustrations/ampoule_1.webp",
        subtotal: 0
    },
    {
        name: "Smoke Lightbulb",
        price: 14.9,
        quantity: 0,
        illu : "illustrations/ampoule_2.webp",
        subtotal: 0
    },
    {
        name: "Evanescent Lightbulb",
        price: 19.9,
        quantity: 0,
        illu : "illustrations/ampoule_3.webp",
        subtotal: 0
    },
    {
        name: "Abyss Lightbulb",
        price: 14.9,
        quantity: 0,
        illu : "illustrations/ampoule_4.webp",
        subtotal: 0
    },
    {
        name: "Gold Cable Rose",
        price: 19.9,
        quantity: 0,
        illu : "illustrations/accessory_1.webp",
        subtotal: 0
    },
    {
        name: "Copper Cable Attach",
        price: 9.9,
        quantity: 0,
        illu : "illustrations/accessory_2.webp",
        subtotal: 0
    },
    {
        name: "Gold Cable Guides",
        price: 4.9,
        quantity: 0,
        illu : "illustrations/accessory_4.webp",
        subtotal: 0
    },
    {
        name: "Braided Copper Cable",
        price: 29.9,
        quantity: 0,
        illu : "illustrations/accessory_3.webp",
        subtotal: 0
    },
];



// ______CART______ //

let cart = JSON.parse(localStorage.getItem("myCart")) || [];

const cartInStorage = localStorage.getItem("myCart")?.toString();
if (cartInStorage) {
    cart = JSON.parse(cartInStorage);
    cart.forEach(createCartItemPreview);
    itemCounterTarget.style.display = "";
}


// ______INITIALISATION______ //

underline.forEach((element) => {
    element.style.display = "none";
})

navlink.forEach((element, i) => {
    element.addEventListener("mouseenter", () => {
        underline[i].style.display = "";
        underline[i].classList.add("scale-up-hor-left");
    })
    element.addEventListener("mouseleave", () => {
        underline[i].style.display = "none";
        underline[i].classList.remove("scale-up-hor-left");
    })
})

const title = document.getElementById("title-text");

title.addEventListener("mouseenter", () => {
    title.classList.add("blink-1")
})

title.addEventListener("mouseleave", () => {
    title.classList.remove("blink-1")
})


let cartTotal = 0;
itemCounterTarget.style.display = "none";
itemCounterMessage.innerText = `${cart.length}`;
cartPreview.style.display = "none"; 

productNames.forEach((h4, i) => {
    productNames[i].innerText=productDatas[i].name
})

productPrice.forEach((p, i) => {
    productPrice[i].innerText=productDatas[i].price.toFixed(2)
})

productIllu.forEach((img, i) => {
    productIllu[i].src=productDatas[i].illu;
    productIllu[i].addEventListener("mouseenter", () => {
        img.classList.add("kenburns-top")
   })
   
   productIllu[i].addEventListener("mouseleave", () => {
        img.classList.remove("kenburns-top")
   })
})


let cartPreviewDisplay = 0;

itemCounterTarget.addEventListener("click", () => {
if (cartPreviewDisplay == 0) {
    cartPreviewDisplay += 1;
    cartPreview.style.display = "";
} else if (cartPreviewDisplay == 1)  {
    cartPreviewDisplay -= 1;
    cartPreview.style.display = "none";
}});



// ______ADD TO CART______ //

quantityButtons.forEach((button, i) => {
    button.addEventListener("click", () => {
        if (quantityInputs[i].value > 0) {
            let nbItemsCart = cart.length;
            cartTotal += Number(quantityInputs[i].value);
            productDatas[i].quantity += Number(quantityInputs[i].value);
            
            const productIndex = cart.findIndex(item => item.name === productDatas[i].name);
            if (productIndex > -1) {
                cart[productIndex].quantity += Number(quantityInputs[i].value);
            } else {
                cart.push(productDatas[i])
                nbItemsCart ++;
                createCartItemPreview();
            };
            itemCounterTarget.style.display = "";
            itemCounterMessage.innerText = `${nbItemsCart}`;
            quantityInputs[i].value = "";
            productSubTotal[i].innerText = "";
            updatePreview();
            localStorage.setItem("myCart", JSON.stringify(cart))
        }
    });
});


// ______ CART PREVIEW______ //

function createCartItemPreview() {
    const cartItemHTML = `<figure class="item-cart preview">
    <div class="img-products-frame img-preview-frame from-shop">
        <img class="img-products img-preview" alt="Broadway Lights Illustration">
    </div>
    <figcaption class="product-details-preview-frame">
        <div class="product-details-preview">
            <h4 class="product-name-preview"></h4>
            <p class="target-price-preview"></p>
            <p class="sub-total-preview"></p>
        </div>
        <div class="product-quantity-preview">
            <div>Quantity :</div>
            <div>
                <button class="substract-button secondary-button button-preview">-</button>
                <span class="preview-quantity"></span>
                <button class="add-button secondary-button button-preview">+</button>
            </div>
            <div>
                <button class="delete-button secondary-button button-preview">Delete</button>
                <a href="cart.html"><button class="gocart-button secondary-button button-preview">Go to cart</button></a>
            </div>
        </div>
    </figcaption>
    </figure>`;
    const cartItemTemplate = document.createElement("template");
    cartItemTemplate.innerHTML = cartItemHTML.trim();
    cartPreview.append(cartItemTemplate.content);
};


const updatePreview = () => {
    const productPricePreview = Array.from(document.querySelectorAll(".target-price-preview"));
    const productNamePreview = Array.from(document.querySelectorAll(".product-name-preview"));
    const productSubTotalPreview = Array.from(document.querySelectorAll(".sub-total-preview"));
    const productQuantityPreview = Array.from(document.querySelectorAll(".preview-quantity"));
    const productIlluPreview = Array.from(document.querySelectorAll(".img-preview"));
    const deleteButtonPreview = Array.from(document.querySelectorAll(".delete-button"));
    const addButtonPreview = Array.from(document.querySelectorAll(".add-button"));
    const substractButtonPreview = Array.from(document.querySelectorAll(".substract-button"))

    
    cart.forEach((item, i) => {
        productPricePreview[i].innerText = item.price.toFixed(2);
        productNamePreview[i].innerText = item.name;
        productQuantityPreview[i].innerText = item.quantity;
        productSubTotalPreview[i].innerText = (item.quantity * item.price).toFixed(2);
        productIlluPreview[i].src = item.illu;
    });

    addButtonPreview.forEach((button, i) => {
        button.replaceWith(button.cloneNode(true));
        addButtonPreview[i] = document.querySelectorAll(".add-button")[i];
        addButtonPreview[i].addEventListener("click", () => {
            cart[i].quantity += 1;
            localStorage.setItem("myCart", JSON.stringify(cart))
            updatePreview();
        });
    });

    substractButtonPreview.forEach((button, i) => {
        button.replaceWith(button.cloneNode(true));
        substractButtonPreview[i] = document.querySelectorAll(".substract-button")[i];
        substractButtonPreview[i].addEventListener("click", () => {
            if (cart[i].quantity > 1) {
                cart[i].quantity -= 1
            } else {
            
            };
            localStorage.setItem("myCart", JSON.stringify(cart))
            updatePreview()
        }); 
    });
    
    deleteButtonPreview.forEach((button, i) => {
        button.replaceWith(button.cloneNode(true));
        deleteButtonPreview[i] = document.querySelectorAll(".delete-button")[i];
        deleteButtonPreview[i].addEventListener("click", () => {
            cart[i].quantity = 0;
            cart.splice(i, 1)
            cartPreview.removeChild(document.querySelector(".preview"));
            localStorage.setItem("myCart", JSON.stringify(cart))
            updatePreview()
        });
    });

    itemCounterMessage.innerText = `${cart.length}`;
    if (cart.length == 0) {
        cartPreview.style.display = "none";
        itemCounterTarget.style.display = "none";
    };
};


// ______SUBTOTALS______ //

quantityInputs.forEach((input, i) => {
    input.addEventListener("input", () => {
        const calcSubTotal =  Number(productDatas[i].price) * Number(quantityInputs[i].value);
        productSubTotal[i].innerText = calcSubTotal.toFixed(2);
    })
});



//________________Laisse l'icone du panier et le met en forme__________________//

if (cartInStorage) {
    itemCounterTarget.style.display = "";
    updatePreview()
}

localStorage.setItem("myCart", JSON.stringify(cart))


