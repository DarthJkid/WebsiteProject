/*
if (document.readyState == 'loading') {
    document.addEventListener('DOMContentLoaded', ready);
}
else {
    ready();
}
*/

let cart = loadCartFromSessionStorage() || []; // Load existing cart or initialize empty cart

document.querySelectorAll('.menu-item__order').forEach(button => {
  button.addEventListener('click', function() {
    const itemElement = this.closest('.menu-item');
    const name = itemElement.querySelector('.menu-item__name').textContent;
    const price = parseFloat(itemElement.querySelector('.menu-item__price').textContent.replace('£', ''));
    
    const existingItem = cart.find(item => item.name === name);
        if (existingItem) {
          existingItem.quantity++;
        } else {
          cart.push({ name, price, quantity: 1 });
        }
        
        updateCart();
      });
    });

    function updateCart() {
      const listCart = document.querySelector('.listCart');
      listCart.innerHTML = ''; // Clear current cart contents
      
      let total = 0;
      cart.forEach((item, index) => { // Fix: Add 'index' as an argument
        const itemElement = document.createElement('div');
        itemElement.classList.add('cart-item'); //Add class to style item

        // Create and append the name span
        const nameSpan = document.createElement('span');
        nameSpan.textContent = item.name;
        nameSpan.classList.add('item-name');
        itemElement.appendChild(nameSpan);

         // Remove button
         const removeBtn = document.createElement('button');
         removeBtn.textContent = 'X';
         removeBtn.classList.add('remove-item');
         removeBtn.onclick = () => removeFromCart(index);
         itemElement.appendChild(removeBtn);

         // Minus button
         const minusBtn = document.createElement('button');
         minusBtn.textContent = '-';
         minusBtn.classList.add('change-quantity');
         minusBtn.onclick = () => updateItemQuantity(index, -1);
         itemElement.appendChild(minusBtn);

         // Quantity
         const quantitySpan = document.createElement('span');
         quantitySpan.textContent = `x ${item.quantity}`;
         quantitySpan.classList.add('item-quantity');
         itemElement.appendChild(quantitySpan);

         // Plus button
         const plusBtn = document.createElement('button');
         plusBtn.textContent = '+';
         plusBtn.classList.add('change-quantity');
         plusBtn.onclick = () => updateItemQuantity(index, 1);
         itemElement.appendChild(plusBtn);

        // Create and append the price span
        const priceSpan = document.createElement('span');
        priceSpan.textContent = ` - £${(item.price * item.quantity).toFixed(2)}`;
        priceSpan.classList.add('item-price');
        itemElement.appendChild(priceSpan);

        itemElement.textContent = `${item.name} - £${item.price} x ${item.quantity}`;
        listCart.appendChild(itemElement);
        
        total += item.price * item.quantity;

        document.querySelectorAll('.item-quantity').forEach(input => {
            input.addEventListener('change', function() {
              const itemIndex = this.getAttribute('data-index');
              const newQuantity = parseInt(this.value);
              if (newQuantity > 0) {
                cart[itemIndex].quantity = newQuantity;
              } else {
                cart.splice(itemIndex, 1); // Remove the item if quantity is less than 1
              }
              updateCart();
            });
          });
        
          document.querySelectorAll('.remove-item').forEach(button => {
            button.addEventListener('click', function() {
              const itemIndex = this.getAttribute('data-index');
              cart.splice(itemIndex, 1); // Remove the item from the cart
              updateCart();
            });
          });
      });
      
      const totalElement = document.createElement('div');
      totalElement.classList.add('cart-total'); // Add class for styling
      totalElement.textContent = `Total: £${total.toFixed(2)}`;
      listCart.appendChild(totalElement);
      
      // Show cart if not already visible
      document.querySelector('.cartTab').style.display = 'block';
    }

    document.querySelector('.clear-cart').addEventListener('click', function() {
        cart = []; // Clear the cart array
        updateCart(); // Update the cart display
      });


    document.querySelector('.checkout').addEventListener('click', () => {
        // Example form structure, add more fields as needed
        const formHtml = `
          <form id="checkoutForm">
            <input type="text" name="firstname" placeholder="First Name" required />
            <input type="text" name="address" placeholder="Address" required />
            <!-- Add additional fields for payment -->
            <button type="submit">Submit Order</button>
          </form>
        `;
        
        document.querySelector('.cartTab').innerHTML = formHtml;
        
        document.querySelector('#checkoutForm').addEventListener('submit', function(e) {
          e.preventDefault(); // Prevent form from submitting traditionally
          
          const firstname = this.firstname.value;
          alert(`Thank you ${firstname}, your order is successful.`);
          
          // Here you would typically send the order to your server
          // For demonstration, we'll just clear the cart and hide it
          cart = [];
          document.querySelector('.cartTab').style.display = 'none';
        });
      });

    function removeFromCart(index) {
        cart.splice(index, 1); // Remove the item at the specified index
        updateCart(); // Update the cart display
        saveCartToSessionStorage(cart); // Save updated cart to Session Storage
    }

    function updateItemQuantity(index, change) {
        const newQuantity = cart[index].quantity + change;
        if (newQuantity > 0) {
            cart[index].quantity = newQuantity; // Update quantity if it's more than 0
        } else {
            cart.splice(index, 1); // Remove the item if the new quantity would be 0 or less
        }
        updateCart(); // Update the cart display
        saveCartToSessionStorage(cart); // Save updated cart to Session Storage
    }

    function saveCartToSessionStorage(cart) {
      sessionStorage.setItem('cart', JSON.stringify(cart));
    }

function loadCartFromSessionStorage() {
  const storedCart = sessionStorage.getItem('cart');
  return storedCart ? JSON.parse(storedCart) : [];
}
// Load existing cart

function addToCart(item) {
    // Check if item already exists in cart
    const existingItem = cart.find(cartItem => cartItem.name === item.name);
    if (existingItem) {
        existingItem.quantity += 1; // Update quantity
    } else {
        item.quantity = 1; // Set initial quantity
        cart.push(item); // Add new item to cart
    }
    saveCartToSessionStorage(cart); // Save updated cart to Session Storage
}

document.addEventListener('DOMContentLoaded', () => {
  const checkoutCart = loadCartFromSessionStorage();
  // Display the cart items on the checkout page
  displayCheckoutCart(checkoutCart);
});

function clearCart() {
  cart = []; // Clear the cart array
  saveCartToSessionStorage(cart); // Save the empty cart to Session Storage
}
