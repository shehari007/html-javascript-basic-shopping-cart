
$.getJSON("./db.JSON", function (db) {

    document.getElementById("main-prod").innerHTML =
        db.map((data) => {
            let link = "./images/" + data.id + ".jpg";

            return '<div class="col">' +
                '<div class="card product" style="width: 18rem;">' +
                '<img src=' + link + ' alt="..." class="card-img-top product-img" >' +
                '<div class="card-body">' +
                '<h5 class="card-title product-name">' + data.title + '</h5>' +
                '<span id="p-span"><p class="card-text product-price">' + data.price + '</p><strong id="tl">TL</strong></span>' + '</br>' +
                '<button class="btn btn-primary" type="button" data-action="add-to-cart">Add to cart</button>' +
                '</div>' +
                '</div>' +
                '</div>'
        })
})


function test() {
    "use strict";
    let cart = [];
    let cartTotal = 0;
    const cartDom = document.querySelector(".cart");
    const addtocartbtnDom = document.querySelectorAll('[data-action="add-to-cart"]');

    addtocartbtnDom.forEach(addtocartbtnDom => {
        addtocartbtnDom.addEventListener("click", () => {
            const productDom = addtocartbtnDom.parentNode.parentNode;
            const product = {
                img: productDom.querySelector(".product-img").getAttribute("src"),
                name: productDom.querySelector(".product-name").innerText,
                price: productDom.querySelector(".product-price").innerText,
                quantity: 1
            };

            const IsinCart = cart.filter(cartItem => cartItem.name === product.name).length > 0;
            if (IsinCart === false) {
                cartDom.insertAdjacentHTML("beforeend", `
  <div class="d-flex flex-row shadow-sm cart-items mt-2 mb-3">
    <div class="p-2">
        <img src="${product.img}" alt="${product.name}" style="max-width: 50px;max-height:50px;"/>
    </div>
    <div class="p-2 mt-3">
        <p class="text-dark cart_item_name">${product.name}</p>
    </div>
    <div class="p-2 mt-3">
        <p class="text-success cart_item_price">${product.price}</p>
    </div>
    <div class="p-2 mt-3 ml-auto">
        <button class="btn badge text-bg-secondary" type="button" data-action="increase-item">&plus;
    </div>
    <div class="p-2 mt-3">
      <p class="text-success cart_item_quantity">${product.quantity}</p>
    </div>
    <div class="p-2 mt-3">
      <button class="btn badge text-bg-primary" type="button" data-action="decrease-item">&minus;
    </div>
    <div class="p-2 mt-3">
      <button class="btn badge text-bg-danger" type="button" data-action="remove-item">&times;
    </div>
  </div> `);

                if (document.querySelector('.cart-footer') === null) {
                    cartDom.insertAdjacentHTML("afterend", `
      <div class="d-flex flex-row shadow-sm cart-footer mt-2 mb-3">
        <div class="p-2">
          <button class="btn btn-danger" type="button" data-action="clear-cart">Clear Cart
        </div>
        <div class="p-2 ml-auto">
          <button class="btn btn-success" type="button" data-action="check-out">Pay <span class="pay"></span>
        </div>
      </div>`);
                }

                addtocartbtnDom.innerText = "In cart";
                addtocartbtnDom.disabled = true;
                cart.push(product);

                const cartItemsDom = cartDom.querySelectorAll(".cart-items");
                cartItemsDom.forEach(cartItemDom => {

                    if (cartItemDom.querySelector(".cart_item_name").innerText === product.name) {

                        cartTotal += parseInt(cartItemDom.querySelector(".cart_item_quantity").innerText)
                            * parseInt(cartItemDom.querySelector(".cart_item_price").innerText);
                        document.querySelector('.pay').innerText = cartTotal + " TL.";

                        // increase item in cart
                        cartItemDom.querySelector('[data-action="increase-item"]').addEventListener("click", () => {
                            cart.forEach(cartItem => {
                                if (cartItem.name === product.name) {
                                    cartItemDom.querySelector(".cart_item_quantity").innerText = ++cartItem.quantity;
                                    cartItemDom.querySelector(".cart_item_price").innerText = parseInt(cartItem.quantity) *
                                        parseInt(cartItem.price) + " TL.";
                                    cartTotal += parseInt(cartItem.price)
                                    document.querySelector('.pay').innerText = cartTotal + " TL.";
                                }
                            });
                        });

                        // decrease item in cart
                        cartItemDom.querySelector('[data-action="decrease-item"]').addEventListener("click", () => {
                            cart.forEach(cartItem => {
                                if (cartItem.name === product.name) {
                                    if (cartItem.quantity > 1) {
                                        cartItemDom.querySelector(".cart_item_quantity").innerText = --cartItem.quantity;
                                        cartItemDom.querySelector(".cart_item_price").innerText = parseInt(cartItem.quantity) *
                                            parseInt(cartItem.price) + " TL.";
                                        cartTotal -= parseInt(cartItem.price)
                                        document.querySelector('.pay').innerText = cartTotal + " TL.";
                                    }
                                }
                            });
                        });

                        //remove item from cart
                        cartItemDom.querySelector('[data-action="remove-item"]').addEventListener("click", () => {
                            cart.forEach(cartItem => {
                                if (cartItem.name === product.name) {
                                    cartTotal -= parseInt(cartItemDom.querySelector(".cart_item_price").innerText);
                                    document.querySelector('.pay').innerText = cartTotal + " TL.";
                                    cartItemDom.remove();
                                    cart = cart.filter(cartItem => cartItem.name !== product.name);
                                    addtocartbtnDom.innerText = "Add to cart";
                                    addtocartbtnDom.disabled = false;
                                }
                                if (cart.length < 1) {
                                    document.querySelector('.cart-footer').remove();
                                }
                            });
                        });

                        //clear cart
                        document.querySelector('[data-action="clear-cart"]').addEventListener("click", () => {
                            cartItemDom.remove();
                            cart = [];
                            cartTotal = 0;
                            if (document.querySelector('.cart-footer') !== null) {
                                document.querySelector('.cart-footer').remove();
                            }
                            addtocartbtnDom.innerText = "Add to cart";
                            addtocartbtnDom.disabled = false;
                        });

                        document.querySelector('[data-action="check-out"]').addEventListener("click", () => {
                            if (document.getElementById('paypal-form') === null) {
                                checkOut();
                            }
                        });
                    }
                });
            }
        });
    });

}


