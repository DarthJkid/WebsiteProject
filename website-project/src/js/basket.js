/*
if (document.readyState == 'loading') {
    document.addEventListener('DOMContentLoaded', ready);
}
else {
    ready();
}
*/

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

/*let products = [
    {
        id: 1,
        name: 'Nigiri Sushi',
        tag: 'nigirisushi',
        price: 11.99,
        images: '../assets/nigiri-image (1).jpg',
    },
    {
        id: 2,
        name: 'Spicy Tuna Rolls',
        tag: 'spicytunarolls',
        price: 12.99,
        images: '../assets/spicy-red-tuna.jpg',
    },
    {
        id: 3,
        name: 'Ikura Sushi',
        tag: 'ikurasushi',
        price: 9.99,
        images: '../assets/ikura-sushi (1).jpg',
    },
    {
        id: 4,
        name: 'Ebi Tempura',
        tag: 'ebitempura',
        price: 10.99,
        images: '../assets/tempura-img.jpg',
    },
    {
        id: 5,
        name: 'Battered Veggies',
        tag: 'batteredveggies',
        price: 10.99,
        images: '../assets/tempura-veg.jpg',
    },
    {
        id: 6,
        name: 'Shokudō Tempura Platter',
        tag: 'shokudotempuraplatter',
        price: 18.99,
        images: '../assets/tempura-platter (1).jpg',
    },
    {
        id: 7,
        name: 'Katsudon',
        tag: 'katsudon',
        price: 11.99,
        images: '../assets/katsudon (1).jpg',
    },
    {
        id: 8,
        name: 'Unadon',
        tag: 'unadon',
        price: 10.99,
        images: '../assets/unadon.jpg',
    },
    {
        id: 9,
        name: 'Spicy Gyudon',
        tag: 'spicygyudon',
        price: 10.99,
        images: '../assets/spicy-gyudon (1).jpg',
    }
]; */

let cart = [];

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
  cart.forEach(item => {
    const itemElement = document.createElement('div');
    itemElement.classList.add('cart-item'); //Add class to style item

    // Create and append the name span
    const nameSpan = document.createElement('span');
    nameSpan.textContent = item.name;
    nameSpan.classList.add('item-name');
    itemElement.appendChild(nameSpan);

    // Create and append the quantity span
    const quantitySpan = document.createElement('span');
    quantitySpan.textContent = `x ${item.quantity}`;
    quantitySpan.classList.add('item-quantity');
    itemElement.appendChild(quantitySpan);

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

  function printReceipt() {
    let receiptContent = `Receipt\n\n`;
    cart.forEach(item => {
      receiptContent += `${item.name} x ${item.quantity} = £${(item.price * item.quantity).toFixed(2)}\n`;
    });
    receiptContent += `\nTotal: £${cart.reduce((acc, curr) => acc + (curr.price * curr.quantity), 0).toFixed(2)}`;
    
    const blob = new Blob([receiptContent], { type: 'text/plain' });
    const href = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = href;
    link.download = 'Receipt.txt';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }
/*
function ready() {
    var removeCartItemButtons = document.getElementsByClassName('btn-danger')[0].addEventListener('click', function() {});
    console.log(removeCartItemButtons)

    for (var i = 0; i < removeCartItemButtons.length; i++) {
    var button = removeCartItemButtons[i];
    button.addEventListener('click', removeCartItem);
    }

    var quantityInputs = document.getElementsByClassName('cart-quantity-input')
    for (var i = 0; i < quantityInputs.length; i++) {
        var input = quantityInputs[i];
        input.addEventListener('change', quantityChanged);
    }

    var addToCartButtons = document.getElementsByClassName('menu-item__order')
    for (var i = 0; i < addToCartButtons.length; i++) {
        var button = addToCartButtons[i];
        button.addEventListener('click', addToCartClicked);
    }
}

function removeCartItem(event) {
    var buttonClicked = event.target;
    buttonClicked.parentElement.parentElement.remove();
    updateCartTotal();
}

function quantityChanged(event) {
    var input = event.target;
    if (isNaN(input.value) || input.value <= 0) {
        input.value = 1;
    }
    updateCartTotal();

}


function addToCartClicked(event) {
    var button = event.target;
    var shopItem = button.parentElement.parentElement;
    var title = shopItem.getElementsByClassName('menu-item__name')[0].innerText;
    var price = shopItem.getElementsByClassName('menu-item__price')[0].innerText;
    var imageSrc = shopItem.getElementsByClassName('menu-item__image')[0].src;
    addItemToCart(title, price, imageSrc);
    updateCartTotal();

}

function addItemToCart(title, price, imageSrc) {
    var cartRow = document.createElement('div');
    cartRow.classList.add('cart-row');
    var cartItems = document.getElementsByClassName('cart-items')[0];
    var cartItemNames = cartItems.getElementsByClassName('cart-item__title');
    for (var i = 0; i < cartItemNames.length; i++) {
        if (cartItemNames[i].innerText == title) {
            alert('This item is already added to the cart');
            return;
        }
    }
    var cartRowContents = `
    <div class="cart-item cart-column">
        <img class="cart-item__image" src="${imageSrc}" width="100" height="100">
        <span class="cart-item__title">${title}</span>
    </div>
    <span class="cart-price cart-column">${price}</span>
    <div class="cart-quantity cart-column">
        <input class="cart-quantity-input" type="number" value="1">
        <button class="btn btn-danger" type="button">REMOVE</button>
    </div>`;
    cartRow.innerHTML = cartRowContents;
    cartItems.append(cartRow);
    cartRow.getElementsByClassName('btn-danger')[0].addEventListener('click', removeCartItem);
    cartRow.getElementsByClassName('cart-quantity-input')[0].addEventListener('change', quantityChanged);
    updateCartTotal();
}
function updateCartTotal() {
    var cartItemContainer = document.getElementsByClassName('cart-items')[0];
    var cartRows = cartItemContainer.getElementsByClassName('cart-row');
    var total = 0;
    for (var i = 0; i < cartRows.length; i++) {
        var cartRow = cartRows[i];
        var priceElement = cartRow.getElementsByClassName('cart-price')[0];
        var quantityElement = cartRow.getElementsByClassName('cart-quantity-input')[0];
        var price = parseFloat(priceElement.innerText.replace('£', ''));
        var quantity = quantityElement.value;
        total = total + (price * quantity);
    }
    total = Math.round(total * 100) / 100;
    document.getElementsByClassName('cart-total-price')[0].innerText = '£' + total;
}
*/
