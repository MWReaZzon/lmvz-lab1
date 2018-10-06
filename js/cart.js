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
        if ((i = this.searchPizza(pizza)) === -1)
            return false;
        this.cartItems[i] = {
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