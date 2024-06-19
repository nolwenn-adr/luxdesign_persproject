const addQuantityButton = Array.from(document.querySelectorAll(".add-quantity-button"));
const substractQuantityButton = Array.from(document.querySelectorAll(".substract-quantity-button"));
const inputQuantityCart = Array.from(document.querySelectorAll(".cart-input"));
const totalMessage = document.querySelector(".target-total-message");
const totalItemsMessage = document.querySelector(".target-total-item-message");

let total = 0;
let totalItem = 0;

const cartInitial = () => {
    productDatas[0].quantity = 1;
    productDatas[1].quantity = 1;
    productDatas[2].quantity = 1;
    inputQuantityCart[0].value = 1;
    inputQuantityCart[1].value = 1;
    inputQuantityCart[2].value = 1;
    productSubTotal.forEach((span, i) => {
        const calcSubTotal =  Number(productDatas[i].price) * Number(quantityInputs[i].value);
            productDatas[i].subtotal = calcSubTotal;
            span.innerText = productDatas[i].subtotal.toFixed(2);
    })
    calcTotalItem()
    totalItemsMessage.innerText = totalItem;
    calcTotal();
    totalMessage.innerText = total.toFixed(2);
}
cartInitial();


function calcTotal() {
    total = (Number(productDatas[0].subtotal) + Number(productDatas[1].subtotal) + Number(productDatas[2].subtotal));
}

function calcTotalItem() {
    totalItem = (Number(productDatas[0].quantity) + Number(productDatas[1].quantity) + Number(productDatas[2].quantity))
}


addQuantityButton.forEach((button, i) => {
    button.addEventListener("click", () => {
        if (productDatas[i].quantity < 99) {
            inputQuantityCart[i].value ++;
            productDatas[i].quantity = inputQuantityCart[i].value;
            const calcSubTotal =  Number(productDatas[i].price) * Number(quantityInputs[i].value);
            productDatas[i].subtotal = calcSubTotal;
            productSubTotal[i].innerText = productDatas[i].subtotal.toFixed(2);
            calcTotal();
            totalMessage.innerText = total.toFixed(2);
            calcTotalItem();
            totalItemsMessage.innerText = totalItem;
        } else {
            alert(`Vous ne pouvez commander plus de 99 fois le même produit`)
        }
        
    })
});

substractQuantityButton.forEach((button, i) => {
    button.addEventListener("click", () => {
        if (productDatas[i].quantity > 0) {
            inputQuantityCart[i].value --;
            productDatas[i].quantity = inputQuantityCart[i].value;
            const calcSubTotal =  Number(productDatas[i].price) * Number(quantityInputs[i].value);
            productDatas[i].subtotal = calcSubTotal
            productSubTotal[i].innerText = productDatas[i].subtotal.toFixed(2);
            calcTotal();
            totalMessage.innerText = total.toFixed(2);
            calcTotalItem();
            totalItemsMessage.innerText = totalItem;
        }
    })
});