# Food Ordering App - README

## Overview

This project is a simple food ordering application built with HTML, CSS, and JavaScript. It allows users to browse food items, add them to a cart, calculate totals, and "place" an order (with Razorpay payment integration or cash option).

## Features

*   **Browse Food Items:** Displays a catalog of food items with images, names, ratings, and prices.
*   **Category Filtering:** Allows users to filter food items by category (Pizza, Burger, Salad, Drinks, Dessert).
*   **Add to Cart:** Users can add items to a cart, which is dynamically updated.
*   **Quantity Control:** Allows users to increase or decrease the quantity of items in the cart.  Items can also be removed entirely.
*   **Order Summary:** Displays a summary of the order, including subtotal, tax, discount, and total amount.
*   **Payment Options:** Provides options for payment via Cash, Debit, or E-Wallet (Razorpay Integration).
*   **Order History:** Displays a list of past orders.
*   **Printable Bill:** Generates a bill for printing with order details and GST (if applicable).
*   **Responsive Design:** The layout adapts to different screen sizes.

## Technologies Used

*   HTML
*   CSS
*   JavaScript
*   Razorpay Checkout Library

## Setup Instructions

1.  **Download the Files:** Download or clone the repository containing `index.html`, `style.css`, and `script.js`.
2.  **Razorpay Setup (Important for Online Payments):**

    *   Sign up for a Razorpay account at [https://razorpay.com/](https://razorpay.com/).
    *   Generate API keys from the Razorpay dashboard (Settings -> API Keys). *Use TEST keys for development/testing.*
    *   **Replace `"rzp_test_1DP5mmOlF5G5ag"` in `script.js` with your Razorpay Test Key ID.**
    *   For a *live* (production) environment, switch to your *live* API keys.
3.  **Open `index.html` in a Web Browser:** Simply double-click the `index.html` file to open it in your web browser.

## Code Structure

*   `index.html`: Contains the main HTML structure, including links to CSS and JavaScript files.
*   `style.css`: Contains all the CSS styling for the application.
*   `script.js`: Contains all the JavaScript logic for the application, including:

    *   Food item data
    *   Functions to generate the product grid, update the cart, calculate totals, generate the bill, and handle Razorpay payments.

## How to Use

1.  **Browse the Menu:** Use the category navigation to filter the food items.
2.  **Add Items to Cart:** Click the "Add to Cart" button on each food item to add it to your order.
3.  **View Order Summary:** The order summary on the right side of the screen will dynamically update as you add items to the cart.
4.  **Adjust Quantities:** Use the "+" and "-" buttons in the order summary to adjust the quantity of each item.
5.  **Remove Items:** Click the "Remove" button to remove an item from the cart.
6.  **Choose Payment Method:** Select either "Cash", "Debit", or "E-Wallet" to choose your payment method.
7.  **Place Order:** Click the "Place Order" button.
    *   If you choose "Cash", a printable bill will be generated.
    *   If you choose "Debit" or "E-Wallet", the Razorpay payment gateway will open.

## Important Notes

*   **Security:**
    *   This is a simplified example for demonstration purposes. For production environments, you should implement proper security measures, including:
        *   Server-side validation of data
        *   HTTPS to encrypt data in transit
        *   Secure storage of API keys and other sensitive information.
    *   *Never* store credit card details or other sensitive information on the client-side.
*   **Backend Integration:**
    *   This application primarily focuses on the front-end (user interface). To create a fully functional food ordering system, you'll need to integrate it with a backend server (using Node.js, Python/Django, PHP, etc.) to handle:
        *   Storing product data in a database.
        *   Processing orders and payments.
        *   User authentication (if needed).
*   **Razorpay Testing:**
    *   Always use Razorpay test keys and test mode for development and testing.
    *   Refer to the Razorpay documentation for details on testing payments and handling different scenarios: [https://razorpay.com/docs/](https://razorpay.com/docs/)

## License

This project is open-source and available under the [MIT License](LICENSE).
