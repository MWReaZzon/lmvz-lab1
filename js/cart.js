class Cart {
    constructor() {
        this.size = 0;
        this.cartItems = [];
        this.lastItem = -1;
    }

    getItems() {
        return copyCartItems(this.cartItems);
    }

    addPizza(pizza, number) {
        if (number < 0)
            return false;
        if (this.containsPizza(pizza))
            return false;
        var ol = this.cartItems;
        var i = firstIndexOf(ol, (oi) => oi.pizza.id > pizza.id);
        var cartItem = {
            pizza: pizza,
            number: number
        };
        if (i === -1) {
            ol.push(cartItem);
            this.size++;
            this.lastItem++;
        }
        else {
            ol.splice(i, 0, cartItem);
            this.size++;
            this.lastItem++;
        }
        return true;
    }

    removePizza(pizza) {
        var i = this.searchPizza(pizza);
        if (i === -1)
            return false;
        this.cartItems.splice(i, 1);
        this.size--;
        this.lastItem--;
        return true;
    }

    searchPizza(pizza) {
        var l = 0, 
            r = this.cartItems.length - 1, 
            m = 0;
        while (l <= r) {
            m = Math.floor(l + (r - l) / 2);
            if (this.cartItems[m].pizza.id === pizza.id)
                return m;
            if (this.cartItems[m].pizza.id > pizza.id)
                r = m - 1;
            else
                l = m + 1;
        }
        return -1;
    }

    getSize() {
        return this.size;
    }

    setNumber(pizza, newNumber) {
        if (newNumber < -1) 
            return false;
        var i;
        if ((i = searchForPizza(pizza)) === -1)
            return false;
        this.orderItems[i] = {
            pizza: pizza,
            number: newNumber
        };
        return true;
    }

    containsPizza(pizza) {
        return this.searchPizza(pizza) !== -1;
    }

    totalPrice() {
        return this.cartItems.reduce((a, v) => a + (v.number * v.pizza.price), 0);
    }
}

function firstIndexOf(array, test) {
    for (var i = 0; i < array.length; i++) {
        if (test(array[i]))
            return i;
    }
    return -1;
}

function copyCartItems(source) {
    var res = [];
    for (var i = 0; i < source.length; i++) {
        res.push(copyCartItem(source[i]));
    }
    return res;
}

function copyCartItem(cartItem) {
    return {
        pizza: copyPizza(cartItem.pizza),
        number: cartItem.number
    };
}

function copyPizza(pizza) {
    return {
        id: pizza.id,
        name: pizza.name,
        price: pizza.price,
        ingridients: pizza.ingridients,
        img: pizza.img
    };
}

function getRootNode(rootClass, node) {
    var tNode = node;
    while (!tNode.classList.contains(rootClass))
        tNode = tNode.parentNode;
    return tNode;
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
