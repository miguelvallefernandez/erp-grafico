"use strict";

function testStoreHouse() {

    var store = StoreHouse.getInstance();

    console.log(store.nombre);


    console.log("Creamos 3 tiendas:");
    var tienda1 = new Shop("1234", "Tienda1");
    var tienda2 = new Shop("1235", "Tienda2");
    var tienda3 = new Shop("1236", "Tienda3");

    console.log(tienda1);
    console.log(tienda2);
    console.log(tienda3);


    console.log("Y las añadimos: ");
    store.addShop(tienda1);
    store.addShop(tienda2);
    store.addShop(tienda3);

    showShops(store);


    console.log("--------------------------------");

    console.log("Creamos 5 productos: ");
    var dvd1 = new DVD("Titanc", "James Cameron", "0001", "DVD-Titanic", "20");
    var dvd2 = new DVD("Fast and Furious 7", "Vin Diesel", "0002", "DVD-A Todo Gas 7", "35");
    var smartphone1 = new Smartphone("Aquaris U Lite", "0003", "BQ Aquaris", "180");
    var tv1 = new TV("LG Smart", "0004", "SmartTV", "550");
    var smartphone2 = new Smartphone("Aquaris X", "0005", "BQ Aquaris", "350");


    console.log(dvd1);
    console.log(dvd2);
    console.log(smartphone1);
    console.log(tv1);
    console.log(smartphone2);


    console.log("------------------------------------");
    console.log("Creamos las categorias: ");

    var categoriaTecnologia = new Category("Tecnologías");
    var categoriaPeliculas = new Category("Peliculas");


    console.log(categoriaTecnologia);
    console.log(categoriaPeliculas);

    console.log("Y las añadimos: ");

    store.addCategory(categoriaPeliculas);
    store.addCategory(categoriaTecnologia);

    showCategories(store);
    console.log("------------------------------------");

    console.log("Ahora añadiremos los productos en las categorias:");

    store.addProduct(dvd1, categoriaPeliculas);
    store.addProduct(dvd2, categoriaPeliculas);

    showProductsInCategory(store, categoriaPeliculas);

    console.log("-------------------------------------");
    console.log("Y lo añadimos a la tienda");

    store.addProductInShop(dvd1, tienda1, 3);
    store.addProductInShop(dvd2, tienda1, 4);
    store.addProductInShop(smartphone1, tienda1, 4);

    showProductsInShop(store, tienda1);


    showProductCategoryShop(store, tienda1, categoriaPeliculas);
}


function showCategories(store) {
    //Recorremos las categorías.
    console.log("Recorremos las categorías.");
    var categories = store.categorias;
    var category = categories.next();
    while (category.done !== true) {
        //Category: title
        console.log("Category: " + category.value.title);
        category = categories.next();
    }
}

function showProductsInCategory(store, categoria) {
    console.log("Mostramos los productos que hay en la categoría: " + categoria.title);
    showProducts(store, store.getCategoryProducts(categoria));
}

function showShops(store) {
    console.log("Recorremos las tiendas.");
    var tiendas = store.tiendas;
    var shop = tiendas.next();
    while (shop.done !== true) {
        //Category: title
        console.log("Tienda: " + shop.value.name);
        shop = tiendas.next();
    }
}

function showProducts(store, productos) {
    var product = productos.next();
    while (product.done !== true) {
        console.log("Producto: " + product.value.name + " (" + product.value.serial + ")");
        product = productos.next();
    }
}

function showProductsInShop(store, tiendaParam) {
    console.log("Recorremos los productos de la tienda " + tiendaParam.name + ": ");
    var tienda = store.getShopProducts(tiendaParam);
    var shop = tienda.next();
    while (shop.done !== true) {
        console.log("Producto: " + shop.value.product.name + ", stock: " + shop.value.stock);
        shop = tienda.next();
    }
}

function showProductCategoryShop(store, tienda, categoria) {

    var producto = store.getCategoryProducts(categoria);

    var product = producto.next();

    var categoryProducts = [];

    while (product.done !== true) {
        categoryProducts.push(product.value);
        product = producto.next();
    }

    var tienda = store.getShopProducts(tienda);
    var shop = tienda.next();

    var shopProduct = [];

    while (shop.done !== true) {
        shopProduct.push(shop.value);
        shop = tienda.next();
    }

    var finalArray = [];

    for (var i = 0; i < shopProduct.length; i++) {
        for (var j = 0; j < categoryProducts.length; j++) {
            if (categoryProducts[j].serial == shopProduct[i].product.serial){
                finalArray.push(shopProduct[i]);
            }
        }
    }

    return finalArray;


}


console.log(testStoreHouse());