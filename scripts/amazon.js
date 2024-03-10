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
        Now we need show all this HTML of differnet products on webpage and that's why we need to use DOM. We used "document.querySelector()" and targeted grid container of all products. Now we need to change HTML of that grid class using ".innerHTML". To change all this HTML, we need to save it in one variable and then we can use that variable to change HTML of grid class. After generating HTML for each product we can delete it from ".html" file.

3) Now let's make it interactive by adding products in cart.
    So bascially we need to add our product once we clicked on "Add to cart" button. Which basically means we need to add "Event listner" to it. 
    An event listener is a function in JavaScript that waits for an event to occur then responds to it.
  -- Here is an IMP question though, when we clicked "Add to cart"  
      button, how do we know which product to add?
      To solve this problem we have HTML attribute called "Data Attribute"
  -- DATA ATTRIBUTE
        It is just another HTML attribute and it allows us to attach any information to an element. By doing this we will know which product are we adding in the cart. We are using ID as data attribute here. Each product have different ID.
    After attaching DATA ATTRIBUTE we crated a new "cart.js" file and decleared "cart" as array. Now we are looping through each button using "forEach()" and then adding "event listner" to each button. We we click it, we storig the "productId" in a variable because we want to check it that product already exist in the cart or not. If it exis in the cart then we are adding quantity of it by 1 and if it doesn't exist then we are using "push" method to add it into the array called "cart".

Now we have completed all 3 steps and lastly we need to make "cart quantity" interactive. How can we do that?
    steps: 
    1) Calculate the quantity
    2) Put the quantity on the page

  -- How to calculate the quantity?
    "cart" variable is array and we can loop through it using "forEach()" and we can add all quantity in an variable
  -- How to put on the page?
      We can use DOM and ".innerHTML" = quantity to put all quantity on the page and before all this we need to make quantity 0 so that eveytime we open page it will get reset to 0.
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
      // "dataset" property give all the data attribute that attached to "product.id" button.
      // So to access the "productId" we just need to write "button.dataset.productId".

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
