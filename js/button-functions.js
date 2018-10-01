var CartButton = $(".cart-icon-container");
var CartButtonImage = $(".basket-icon")[0];
var CartPage = $(".cart-window-background");
var AddtoCartButtons = $(".to-cart-button");

function openCart(){
    CartButton[0].onclick = closeCart;
    CartButtonImage.src = "res/return-arrow.png";
    CartPage.fadeIn();
    appendCart(CartPage);
    cartItemRemoveHandling();
    return false;
}

function closeCart(){
    CartButton[0].onclick = openCart;
    CartButtonImage.src = "res/basket.png";
    removeCart(CartPage);
    CartPage.fadeOut();
    return false;
}

function cartNotify() {
    CartButton.animate({ backgroundColor: "rgba(200, 200, 200, 1)" }, 300);
    setTimeout( 'CartButton.animate({ backgroundColor: "rgba(200, 200, 200, 0)"}, 100)', 300);
    setTimeout( 'CartButton.animate({ backgroundColor: "rgba(200, 200, 200, 1)" }, 300)', 400);
    setTimeout( 'CartButton.animate({ backgroundColor: "rgba(200, 200, 200, 0)"}, 100)', 700);
}

AddtoCartButtons.click(function() {
    var root = getRootNode("pizza-thumbnail", this);
    var pizzaId = parseInt(root.getAttribute("data-pizza-id"));
    var pizza = getPizzaById(pizzaId);
    if (!cart.addPizza(pizza, 1))
        return;
    cartNotify();
});

function cartItemRemoveHandling() {
    $('.cart-item-remove').click(function() {
        var root = getRootNode("cart-item", this);
        var pizzaId = parseInt(root.getAttribute("data-pizza-id"));
        var pizza = getPizzaById(pizzaId);
        cart.removePizza(pizza);
        // remove thumbnail
        root.parentNode.remove();
    });
}

function removeCart(parentNode) {
    var f = parentNode
    parentNode = parentNode[0];
    var length = parentNode.childNodes.length;
    if (length == 0)
        return;
    var t = parentNode.childNodes[0];
    var i = 0;
    while (i < length) {
        t = parentNode.childNodes[i];
        if (t.nodeName !== "#text" && t.classList.contains("cart"))
            break;
        i++;
    }
    // remove cart from CartPage
    parentNode.removeChild(t);
}

function appendCart(parentNode) {
    var cartStart = 
    "<div class='cart'>" + 
        "<div class='cart-header'>" +
            "<div class='cart-header-text'>ВАШ ЗАКАЗ</div>"+
        "</div>";
    var cartMenuStart = 
    "<div class='cart-menu'>";
    var cartItems = cart.getItems();
    for (var i = 0; i < cartItems.length; i++) {
        var cartItem = cartItems[i];
        var pizza = cartItem.pizza;
        var thumbnailClass = i % 2 == 1 ? "odd-menu-thumbnail" : "even-menu-thumbnail";
        cartMenuStart +=
        "<div class='"+thumbnailClass+"'>"+
            "<div class='cart-item' data-pizza-id='"+pizza.id+"'>"+
                "<div class='cart-pizza-image'>"+
                    "<img src='"+pizza.img+"' alt='Pizza' width='100%'/>"+
                "</div>"+
                "<div class='cart-item-body'>"+
                    "<div class='cart-item-header'>"+
                        pizza.name+
                    "</div>"+
                    "<div class='cart-item-contents'>"+
                        "<div class='cart-item-price'>"+
                            "Цена за шт.: <span class='price'>"+pizza.price+"</span><br/>"+
                            "Цена:        <span class='price'>"+pizza.price * cartItem.number+"</span><br/>"+
                        "</div>"+
                        "<div class='cart-item-count'>"+
                            "<div class='cart-item-decrement-count'>"+
                                "<img src='res/minus.png' alt='' width='100%'/>"+
                            "</div>"+
                            "<div class='cart-item-count-input'>"+
                                "<input class='input-count' type='text'/>"+
                            "</div>"+
                            "<div class='cart-item-increment-count'>"+
                                "<img src='res/plus.png' alt='' width='100%'/>"+
                            "</div>"+
                        "</div>"+
                    "</div>"+
                "</div>"+
                "<div class='cart-item-remove'>"+
                    "<img src='res/remove-icon.png' alt='' width='100%'/>"+
                "</div>"+
            "</div>"+
        "</div>";
    }
    var cartMenuEnd = "</div>";
    var cartEnd = cartMenuEnd;
    var cartFooter = 
    '<div class="cart-footer">'+
        '<div class="to-payment-button">'+
            '<div class="to-payment-button-text">'+
                'ПЕРЕЙТИ К ОПЛАТЕ'+
            '</div>'+
        '</div>'+
    '</div>';
    parentNode.append(cartStart+cartMenuStart+cartMenuEnd+cartFooter+cartEnd);
}

CartButton[0].onclick = openCart;