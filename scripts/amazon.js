/* Logic and steps 
1) Main idea of JavaScript
  a) Save the data
  b) Generate the HTML
  c) Make it interactive

2) Save the data
  a) In this project we have three products already on the page which means we already have HTML of one entire product which includes image, rating, name and price. In real life we need to write this HTML and CSS.
  -- How to find the code?s
        You can find the code by clicking on "inspect element"
  -- How to add multiple products on page?
        We can copy paste the HTML for each product but that is not feasible at all. We a code that will generate on it's own eveytime when product gets added to our page. Which means we need to generate our HTML in JS.
  -- How to generate HTML is JS?
        To generate HTML for each product, we need to loop through our database. In this project we have saved our data in "products.js" file and varibale is "products". 
        Now "products" is array and in that array we have save all the products in object form. N Because "products" is array we can use "forEach" method to do that. We did excatly that. We used "forEach" and created a function and gave parameter as "product". So basically, it will loop through "products" array and then save each object in "product" in each iteration.
        Now we have copied all HTML of a single product div in that function using " `` " as below. Now we want multiple product with different images, different name, different rating and different price to get add on page and that's why we used "${product.image}, {product.name}" etc and not {products.name} because we are looping array and storing every object in "product" that's why. We used "toFixed(2)" to show price upto 2 decimal places.
        Now we need show all this HTML of differnet products on webpage and that's why we need to use DOM. We used "document.querySelector()" and targeted grid container of all products. Now we need to change HTML of that grid class using ".innerHTML". To change all this HTML, we need to save it in one variable and then we can use that variable to change HTML of grid class. 
*/




let productsHTML = '';

products.forEach((product) => {
  productsHTML += `
    <div class="product-container">
      <div class="product-image-container">
        <img class="product-image"
          src="${product.image}">
      </div>

      <div class="product-name limit-text-to-2-lines">
        ${product.name}
      </div>

      <div class="product-rating-container">
        <img class="product-rating-stars"
          src="images/ratings/rating-${product.rating.stars * 10}.png">
        <div class="product-rating-count link-primary">
          ${product.rating.count}
        </div>
      </div>

      <div class="product-price">
        ${(product.priceCents / 100).toFixed(2)}
      </div>

      <div class="product-quantity-container">
        <select>
          <option selected value="1">1</option>
          <option value="2">2</option>
          <option value="3">3</option>
          <option value="4">4</option>
          <option value="5">5</option>
          <option value="6">6</option>
          <option value="7">7</option>
          <option value="8">8</option>
          <option value="9">9</option>
          <option value="10">10</option>
        </select>
      </div>

      <div class="product-spacer"></div>

      <div class="added-to-cart">
        <img src="images/icons/checkmark.png">
        Added
      </div>

      <button class="add-to-cart-button button-primary js-add-to-cart"
      data-product-Id="${product.id}">
        Add to Cart
      </button>
    </div>
  `;
});


document.querySelector('.js-products-grid')
  .innerHTML = productsHTML;

document.querySelectorAll('.js-add-to-cart')
  .forEach((button) => {
    button.addEventListener('click',() => {
      const productId = button.dataset.productId; // productId is from "Add to cart" button where we gave "data-product-id" after class.

      let matchingItem;

      cart.forEach((item) => {
        if (productId === item.productId) {
          matchingItem = item;
        }
      });

      if (matchingItem) {
        matchingItem.quantity += 1;
      } else {
        cart.push({
          productId: productId,
          quantity: 1
        });
      }

      let cartQuantity = 0; 
      
      cart.forEach((item) => {
        cartQuantity += item.quantity;
      })

      document.querySelector('.js-cart-quantity')
        .innerHTML = cartQuantity;

    });
});
