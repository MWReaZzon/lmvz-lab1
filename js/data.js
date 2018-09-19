const res = "res/";

var products = [
    {
        id: 1,
        name: "Ассорти",
        ingridients: "сыр, ветчина, бекон, грибы, фарш говяжий, маслины, базилик",
        price: 45.00,
        img: res + "assorti.png"
    },
    {
        id: 2,
        name: "Сицилийская",
        ingridients: "сыр, анчоусы, моцарелла, помидоры, базилик, орегано, чеснок",
        price: 49.00,
        img: res + "sicylia.png"
    },
    {
        id: 3,
        name: "Греческая",
        ingridients: "помидоры, огурцы, оливки, сыр фета, маслины, моцарелла, листья салата",
        price: 43.00,
        img: res + "greek.png"
    },
    {
        id: 4,
        name: "Мясная",
        ingridients: "ветчина, бекон, пепперони, салями, кур. филе, болг. перец, моцарелла, пицца-соус",
        price: 52.00,
        img: res + "meat.png"
    },
    {
        id: 5,
        name: "Гавайская",
        ingridients: "ветчина, ананасы, сыр моцарелла, соус",
        price: 47.00,
        img: res + "hawaiian.png" 
    }
];

function getPizzaById(id) {
    return products[id - 1];
}

function getPizzaByName(name) {
    for (var i = 0; i < products.length; i++) {
        if (products[i].name === name)
            return products[i];
    }
    return null;
}
