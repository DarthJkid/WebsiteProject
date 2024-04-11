document.querySelector('.shopping-cart').addEventListener('click', () => {
  const cartTab = document.querySelector('.cartTab');
  if (cartTab.style.display === 'block') {
      cartTab.style.display = 'none'; // Close cart
  } else {
      cartTab.style.display = 'block'; // Show cart
  }
});

document.querySelector('.close-cart').addEventListener('click', () => {
  document.querySelector('.cartTab').style.display = 'none'; // Hide cart
});

let cart = loadCartFromSessionStorage(); // Load existing cart

// Function to add items to cart
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

// Update cart display
function updateCart() {
const listCart = document.querySelector('.listCart');
listCart.innerHTML = ''; // Clear current cart contents

let total = 0;
cart.forEach((item, index) => {
  const itemElement = document.createElement('div');
  itemElement.classList.add('cart-item');

  // Item name
  const nameSpan = document.createElement('span');
  nameSpan.textContent = item.name;
  nameSpan.classList.add('item-name');
  itemElement.appendChild(nameSpan);

  // Plus button
  const plusBtn = document.createElement('button');
  plusBtn.textContent = '+';
  plusBtn.addEventListener('click', () => updateItemQuantity(index, 1));
  itemElement.appendChild(plusBtn);

  // Quantity display
  const quantitySpan = document.createElement('span');
  quantitySpan.textContent = ` x ${item.quantity} `;
  itemElement.appendChild(quantitySpan);

  // Minus button
  const minusBtn = document.createElement('button');
  minusBtn.textContent = '-';
  minusBtn.addEventListener('click', () => updateItemQuantity(index, -1));
  itemElement.appendChild(minusBtn);

  // Price
  const priceSpan = document.createElement('span');
  priceSpan.textContent = ` = £${(item.price * item.quantity).toFixed(2)}`;
  itemElement.appendChild(priceSpan);

  // Remove button
  const removeBtn = document.createElement('button');
  removeBtn.textContent = 'X';
  removeBtn.addEventListener('click', () => removeFromCart(index));
  itemElement.appendChild(removeBtn);

  listCart.appendChild(itemElement);

  total += item.price * item.quantity;
});

const totalElement = document.createElement('div');
totalElement.textContent = `Total: £${total.toFixed(2)}`;
listCart.appendChild(totalElement);

// Optionally show cart
document.querySelector('.cartTab').style.display = 'block';
}

document.querySelector('.clear-cart').addEventListener('click', () => {
cart = []; // Clear the cart array
updateCart(); // Update the cart display
});

// Checkout button functionality
document.querySelector('.checkout').addEventListener('click', () => {
saveCartToSessionStorage(); // Ensure latest cart is saved before navigating
window.location.href = 'checkout.html'; // Redirect to checkout page
});

function removeFromCart(index) {
  cart.splice(index, 1); // Remove the item
  updateCart(); // Update the cart display
  saveCartToSessionStorage(); // Save updated cart
}

function updateItemQuantity(index, change) {
  cart[index].quantity += change;
  if (cart[index].quantity <= 0) {
    cart.splice(index, 1); // Remove item if quantity is 0 or less
  }
  updateCart(); // Update the cart display
  saveCartToSessionStorage(); // Save updated cart
}

function saveCartToSessionStorage() {
sessionStorage.setItem('cart', JSON.stringify(cart));
}

function loadCartFromSessionStorage() {
const storedCart = sessionStorage.getItem('cart');
return storedCart ? JSON.parse(storedCart) : [];
}

// Ensure the checkout page correctly loads and displays cart data
// (The `displayCheckoutCart` functionality should be defined in your checkout page's script)
