function loadData() {
    var grid = $(".main-wrapper");
    for (var i = 0; i < products.length; i++) {
        var pizza = products[i];
        grid.append(
            "<div class='pizza-thumbnail' data-pizza-id='"+pizza.id+"'>" +
                "<div class='pizza-image'>" + 
                    "<img src='" + pizza.img + "' alt='" + pizza.img + "' " + " width='100%'/>" +  
                "</div>" +
                "<div class='pizza-info'>" +
                    "<div class='pizza-name'>" +
                        pizza.name + 
                    "</div>" +
                    "<div class='controls-and-info'>" +
                        "<div class='controls'>" +
                            "<div class='pizza-price-label'>" + 
                                pizza.price + " грн" + 
                            "</div>" + 
                            "<div class='to-cart-button' data-pizza-id='"+pizza.id+"'>В Корзину</div>" +
                        "</div>" +
                        "<div class='pizza-ingridients'>" +
                            "<span class='ingridients-start'>Ингридиенты: </span>" +
                            "<span class='ingridients-list'>" +
                                pizza.ingridients +
                            "</span>" + 
                        "</div>" +
                    "</div>" + 
                "</div>" +
            "</div>"
        )
    }
}