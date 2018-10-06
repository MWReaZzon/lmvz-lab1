function initCartFunctions() {
    cartItemRemoveHandling();
    countInputHandling();
}

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

function countInputHandling() {
    $('.input-count').keypress(function(e) {
        var originalEvent = e.originalEvent;
        if (!/[0-9]/.test(originalEvent.key)) {
            return false;
        }
        var value = parseInt(this.value + originalEvent.key);
        if (value > 20)
            return false;
        var cartItem = getRootNode("cart-item", this);
        var pizzaId  = parseInt(cartItem.getAttribute("data-pizza-id"));
        var pizza    = getPizzaById(pizzaId);
        cart.setNumber(pizza, value);
    });
}

function updatePrice(cartItem, count) {
    
}
