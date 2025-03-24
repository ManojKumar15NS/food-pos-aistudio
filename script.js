const foodItems = [
    { id: 1, name: "Margherita Pizza", category: "pizza", price: 250, imageUrl: "image/pi1.jpg", rating: 4.5 },
    { id: 2, name: "Veggie Burger", category: "burger", price: 180, imageUrl: "image/bu1.jpg", rating: 4.2 },
    { id: 3, name: "Caesar Salad", category: "salad", price: 200, imageUrl: "image/sa1.jpg", rating: 4.0 },
    { id: 4, name: "Coca-Cola", category: "drinks", price: 50, imageUrl: "image/j1.jpg", rating: 4.8 },
    { id: 5, name: "Pepperoni Pizza", category: "pizza", price: 300, imageUrl: "image/pi3.jpg", rating: 4.7 },
    { id: 6, name: "Chicken Burger", category: "burger", price: 220, imageUrl: "image/bu3.jpg", rating: 4.3 },
    { id: 7, name: "Greek Salad", category: "salad", price: 230, imageUrl: "image/sa1.jpg", rating: 4.1 },
    { id: 8, name: "Orange Juice", category: "drinks", price: 60, imageUrl: "image/j2.jpg", rating: 4.6 },
    { id: 9, name: "Chocolate Cake", category: "dessert", price: 280, imageUrl: "image/de1.jpg", rating: 4.9 },
    { id: 10, name: "Vanilla Ice Cream", category: "dessert", price: 120, imageUrl: "image/de1.jpg", rating: 4.4 },
    { id: 11, name: "BBQ Chicken Pizza", category: "pizza", price: 320, imageUrl: "image/pi3.jpg", rating: 4.6 },
    { id: 12, name: "Fish Burger", category: "burger", price: 250, imageUrl: "image/bu6.jpg", rating: 4.5 },
    { id: 13, name: "Pasta Salad", category: "salad", price: 240, imageUrl: "image/sa2.jpg", rating: 4.3 },
    { id: 14, name: "Lemonade", category: "drinks", price: 40, imageUrl: "image/de1.jpg", rating: 4.7 },
    { id: 15, name: "Strawberry Ice Cream", category: "dessert", price: 130, imageUrl: "image/de1.jpg", rating: 4.2 }
];

let cart = [];
let orderHistory = [];
let selectedPaymentMethod = "cash";

function generateProductGrid(productsToDisplay) {
    const productGrid = document.querySelector(".product-grid");
    productGrid.innerHTML = "";

    productsToDisplay.forEach(product => {
        if (!cart.find(item => item.id === product.id)) {
            const productCard = document.createElement("div");
            productCard.classList.add("product-card");
            productCard.innerHTML = `
                <img src="${product.imageUrl}" alt="${product.name}">
                <h3>${product.name}</h3>
                <div class="rating">${getStarRating(product.rating)}</div>
                <div class="price">₹ ${product.price}</div>
                <button data-product-id="${product.id}">Add to Cart</button>
            `;
            productGrid.appendChild(productCard);
        }
    });

    const addToCartButtons = document.querySelectorAll(".product-card button");
    addToCartButtons.forEach(button => {
        button.addEventListener("click", addToCart);
    });
}

function getStarRating(rating) {
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;
    let starHTML = "";

    for (let i = 0; i < fullStars; i++) {
        starHTML += '<i class="fas fa-star"></i>';
    }

    if (hasHalfStar) {
        starHTML += '<i class="fas fa-star-half-alt"></i>';
    }

    const emptyStars = 5 - Math.ceil(rating);
    for (let i = 0; i < emptyStars; i++) {
        starHTML += '<i class="far fa-star"></i>';
    }

    return starHTML;
}

function addToCart(event) {
    const productId = parseInt(event.target.dataset.productId);
    const product = foodItems.find(p => p.id === productId);

    if (product) {
        const existingCartItem = cart.find(item => item.id === productId);

        if (existingCartItem) {
            existingCartItem.quantity++;
        } else {
            cart.push({ ...product, quantity: 1 });
        }

        updateCart();
        generateProductGrid(getFilteredProducts());
    }
}

function updateCart() {
    const orderItemsContainer = document.querySelector(".order-items");
    orderItemsContainer.innerHTML = "";

    cart.forEach(item => {
        const orderItem = document.createElement("div");
        orderItem.classList.add("order-item");
        orderItem.innerHTML = `
            <img src="${item.imageUrl}" alt="${item.name}">
            <div class="order-item-details">
                <h4>${item.name}</h4>
                <p>₹ ${item.price}</p>
            </div>
            <div class="quantity-controls">
                <button class="decrease" data-product-id="${item.id}">-</button>
                <input type="number" value="${item.quantity}" min="1" data-product-id="${item.id}" readonly>
                <button class="increase" data-product-id="${item.id}">+</button>
                <button class="remove" data-product-id="${item.id}">Remove</button>
                 <p>₹ ${item.price * item.quantity}</p>
            </div>
        `;
        orderItemsContainer.appendChild(orderItem);
    });

    const quantityControls = document.querySelectorAll(".quantity-controls button");
    quantityControls.forEach(button => {
        button.addEventListener("click", updateQuantity);
    });

    calculateTotals();
}

function updateQuantity(event) {
    const productId = parseInt(event.target.dataset.productId);
    const cartItem = cart.find(item => item.id === productId);

    if (cartItem) {
        if (event.target.classList.contains("increase")) {
            cartItem.quantity++;
        } else if (event.target.classList.contains("decrease") && cartItem.quantity > 1) {
            cartItem.quantity--;
        } else if (event.target.classList.contains("remove")) {
            removeFromCart(productId);
            return;
        }

        updateCart();
    }
}

function removeFromCart(productId) {
    cart = cart.filter(item => item.id !== productId);
    updateCart();
    generateProductGrid(getFilteredProducts());
}

function calculateTotals() {
    let subtotal = 0;
    cart.forEach(item => {
        subtotal += item.price * item.quantity;
    });

    const taxRate = 0.1; // GST at 10%
    const tax = subtotal * taxRate;
    const discount = 0;
    const total = subtotal + tax - discount;

    document.querySelector(".subtotal").textContent = `₹ ${subtotal.toFixed(2)}`;
    document.querySelector(".tax").textContent = `₹ ${tax.toFixed(2)}`;
    document.querySelector(".discount").textContent = `₹ ${discount.toFixed(2)}`;
    document.querySelector(".total").textContent = `₹ ${total.toFixed(2)}`;
}
 // Function for "Place Order" button
document.querySelector(".place-order-button").addEventListener("click", handlePlaceOrder);

 // Add event listeners to payment options
const paymentOptions = document.querySelectorAll(".payment-options button");
paymentOptions.forEach(button => {
    button.addEventListener("click", function () {
        paymentOptions.forEach(btn => btn.classList.remove("active"));
        this.classList.add("active");
        selectedPaymentMethod = this.dataset.payment;
    });
});

 //Listen to order tabs
const categoryButtons = document.querySelectorAll(".category-nav button");
categoryButtons.forEach(button => {
    button.addEventListener("click", function () {
        categoryButtons.forEach(btn => btn.classList.remove("active"));
        this.classList.add("active");
         generateProductGrid(getFilteredProducts());
    });
});

 // Listen to order tabs
const orderTabs = document.querySelectorAll(".order-tabs button");
orderTabs.forEach(tab => {
    tab.addEventListener("click", function () {
        orderTabs.forEach(btn => btn.classList.remove("active"));
        this.classList.add("active");

        const tab = this.dataset.tab;
         if (tab === "order-history") {
            showOrderHistory();
        } else {
            updateCart(); // Or any default behavior needed
            document.querySelector(".order-items").innerHTML = "";
        }
    });
});
//Function to show order history
function showOrderHistory() {
    const orderItemsContainer = document.querySelector(".order-items");
    orderItemsContainer.innerHTML = "";

    if (orderHistory.length === 0) {
        orderItemsContainer.innerHTML = "<p>No order history available.</p>";
        return;
    }

    orderHistory.forEach(order => {
        const orderDiv = document.createElement("div");
        orderDiv.classList.add("order-item");
        orderDiv.innerHTML = `
            <h4>Order ID: ${order.orderId}</h4>
            <p>Date: ${order.date}</p>
            <ul>${order.items.map(item => `<li>${item.name} (Qty: ${item.quantity}) - ₹${item.price * item.quantity}</li>`).join("")}</ul>
            <p>Total: ₹${order.total}</p>
        `;
        orderItemsContainer.appendChild(orderDiv);
    });
}

// Function to generate the bill content (returns HTML string)
function generateBillHTML(orderId) {
    let billSubtotal = 0;
    let billItemsHTML = "";

    cart.forEach(item => {
        billItemsHTML += `
            <li class="bill-item">
                <span>${item.name} (x${item.quantity})</span>
                <span>₹ ${(item.price * item.quantity).toFixed(2)}</span>
            </li>
        `;
        billSubtotal += item.price * item.quantity;
    });

    const taxRate = 0.1; // GST at 10%
    const billTax = billSubtotal * taxRate;
    const billDiscount = 0;
    const billTotal = billSubtotal + billTax - billDiscount;

    return `
        <div class="bill">
            <h2>Order Bill</h2>
            <ul class="bill-items">
                ${billItemsHTML}
            </ul>
            <div class="bill-totals">
                <p>Subtotal: ₹ <span class="bill-subtotal">${billSubtotal.toFixed(2)}</span></p>
                <p>GST: ₹ <span class="bill-tax">${billTax.toFixed(2)}</span></p>
                <p>Discount: ₹ <span class="bill-discount">${billDiscount.toFixed(2)}</span></p>
                <p>Total: ₹ <span class="bill-total">${billTotal.toFixed(2)}</span></p>
            </div>
        </div>
    `;
}

// Function to print the bill
function printBill() {
    const billHTML = generateBillHTML(); //Get HTML for printing
    const printWindow = window.open('', '_blank'); // Open new printing window
    printWindow.document.write(`
        <html>
        <head>
            <title>Order Bill</title>
             <link rel="preconnect" href="https://fonts.googleapis.com">
            <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
            <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700&display=swap"
                rel="stylesheet">
            <style>
            body {
              font-family: 'Poppins', sans-serif;
            }
            .bill{
              font-family: 'Poppins', sans-serif;
              width: 300px;
              margin: 20px auto;
              border: 1px solid #ccc;
              padding: 20px;
            }
            .bill h2{
              text-align: center;
              margin-bottom: 20px;
            }
            .bill-item{
              display: flex;
              justify-content: space-between;
              padding: 5px 0;
              border-bottom: 1px solid #eee;
            }

            .bill-item:last-child {
                border-bottom: none;
            }
            .bill-totals{
              text-align: right;
            }
            </style>
        </head>
        <body>
          ${billHTML}
        </body>
        </html>
    `);

    printWindow.document.close();
    printWindow.focus();
    printWindow.print();
    printWindow.close();
}

//Generate random orderID
function generateOrderId() {
    return Math.random().toString(36).substring(2, 15).toUpperCase();
}

// Function to get filtered food items
function getFilteredProducts() {
     const activeCategory = document.querySelector(".category-nav button.active").dataset.category;
     if (activeCategory === "all") {
        return foodItems;
    } else {
        return foodItems.filter(product => product.category === activeCategory);
    }
}
//Function clear cart data
function clearCart() {
    cart = [];
    updateCart();
    generateProductGrid(getFilteredProducts());
    calculateTotals();
}

 // Handle place order and update
function handlePlaceOrder() {
    if (cart.length === 0) {
        alert("Your cart is empty. Please add items before placing an order.");
        return;
    }

    const totalAmount = parseFloat(document.querySelector(".total").textContent.replace("₹ ", ""));
    const orderId = generateOrderId();
    const orderDate = new Date().toLocaleDateString();

    orderHistory.push({
        orderId: orderId,
        date: orderDate,
        items: cart.map(item => ({ id: item.id, name: item.name, quantity: item.quantity, price: item.price })),
        total: totalAmount
    });
    //Show Bill and payment methods
    if (selectedPaymentMethod === "cash") {
        alert(`Your order (ID: ${orderId}) has been placed successfully. You can pay cash on delivery.`);
         printBill(); // Print function

        clearCart();
        showOrderHistory();
        return;
    }
    initiatePayment(totalAmount * 100, orderId); // Call Razorpay payment
}
//Initilize Razorpay
function initiatePayment(amount, orderId) {
    // Razorpay Payment
    var options = {
        "key": "rzp_test_1DP5mmOlF5G5ag", // Replace with your Razorpay Key ID
        "amount": amount, // Amount in paise
        "currency": "INR",
        "name": "Food Ordering App",
        "description": "Payment for your order",
        "image": "https://example.com/your_logo.png", // Replace with your logo URL
        "order_id": orderId, //Replace with your order ID
        "handler": function (response) {
            alert("Payment Successful. Payment ID: " + response.razorpay_payment_id);
             printBill(); //Print function
            clearCart();
            showOrderHistory();
        },
        "prefill": {
            "name": "Test User",
            "email": "test@example.com",
            "contact": "9999999999"
        },
        "notes": {
            "address": "Test Address"
        },
        "theme": {
            "color": "#28a745"
        }
    };
    var rzp = new Razorpay(options);
    rzp.on('payment.failed', function (response) {
        alert("Payment Failed");
        console.log(response.error);
    });
    rzp.open();
}

generateProductGrid(foodItems);
updateCart();
calculateTotals();