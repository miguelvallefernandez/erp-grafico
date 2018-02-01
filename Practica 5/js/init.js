function init() {

    var store = StoreHouse.getInstance();

    var eroski = new Shop("1234", "Eroski");
    var carrefour = new Shop("1235", "Carrefour");
    var cex = new Shop("1236", "Cex");

    //Le añadimos las imagenes
    eroski.images = "images/eroski.png";
    carrefour.images = "images/carrefour.png";
    cex.images = "images/cex.png";

    store.addShop(eroski);
    store.addShop(carrefour);
    store.addShop(cex);


    var titanic = new DVD("Titanc", "James Cameron", "0001", "DVD-Titanic", "20");
    var fast = new DVD("Fast and Furious 7", "Vin Diesel", "0002", "DVD-A Todo Gas 7", "35");

    var aquarisu = new Smartphone("Aquaris U Lite", "0003", "BQ Aquaris", "180");
    var tvLG = new TV("LG Smart", "0004", "SmartTV", "550");
    var aquarisx = new Smartphone("Aquaris X", "0005", "BQ Aquaris", "350");

    var categoriaMoviles = new Category("Moviles");
    var categoriaPeliculas = new Category("Peliculas");
    var categoriaTelevisores = new Category("Televisores");

    store.addCategory(categoriaPeliculas);
    store.addCategory(categoriaMoviles);
    store.addCategory(categoriaTelevisores);

    store.addProduct(titanic, categoriaPeliculas);
    store.addProduct(fast, categoriaPeliculas);

    store.addProduct(aquarisu, categoriaMoviles);
    store.addProduct(aquarisx, categoriaMoviles);

    store.addProduct(tvLG, categoriaTelevisores);


    store.addProductInShop(titanic, eroski, 30);
    store.addProductInShop(fast, eroski, 45);

    store.addProductInShop(aquarisx, carrefour, 30);
    store.addProductInShop(aquarisu, carrefour, 45);

    store.addProductInShop(tvLG, cex, 15);

    initPopulate(store);
    shopMenusPopulate(store);


    function initPopulate(store) {

        var main = document.getElementById("main");


        //Recorremos las tiendas

        //Creamos el div principal dentro del main

        var divPrincipal = document.createElement("div");
        divPrincipal.setAttribute("class", "principal row");
        //idDiv.id = "opcion1";
        main.appendChild(divPrincipal);

        var tiendas = store.tiendas;
        var shop = tiendas.next();
        var count = 0;
        while (shop.done !== true) {


            var div1 = document.createElement("div");
            div1.setAttribute("class", "div-Centro col-md-3");
            divPrincipal.appendChild(div1);
            var div1panel = document.createElement("div");
            div1panel.setAttribute("class", "panel-body");
            div1.appendChild(div1panel);
            var imagen1 = document.createElement("img");
            if (shop.value.name !== "Anonymous shop") {
                imagen1.setAttribute("src", shop.value.images);
            }
            else {
                imagen1.setAttribute("src", "images/default.jpg");
            }
            imagen1.setAttribute("class", "img-responsive");
            div1panel.appendChild(imagen1);
            var div1panelf = document.createElement("div");
            div1panelf.setAttribute("class", "panel-footer");
            div1.appendChild(div1panelf);
            var enlace1 = document.createElement("a");
            enlace1.setAttribute("href", "#");

            enlace1.setAttribute("id", "btnTiendaPrincipal" + count++);

            var textoEnlace1 = document.createTextNode(shop.value.name);
            enlace1.appendChild(textoEnlace1);
            div1panelf.appendChild(enlace1);


            shop = tiendas.next();


        }

        for (var i = 0; i < count; i++) {
            document.getElementById("btnTiendaPrincipal" + i).addEventListener("click", shopPopulate(store, document.getElementById("btnTiendaPrincipal" + i).textContent));
        }

    }


    function shopMenusPopulate(store) {

        var myNavbar = document.getElementById("myNavbar");

        var ul = document.createElement("ul");
        ul.setAttribute("class", "nav navbar-nav navbar-left");
        myNavbar.appendChild(ul);


        var tiendas = store.tiendas;
        var shop = tiendas.next();

        var count = 0;
        while (shop.done !== true) {

            var li = document.createElement("li");
            ul.appendChild(li);
            var a = document.createElement("a");
            a.setAttribute("href", "#");
            a.setAttribute("id", "btnTienda" + count++);
            var textoEnlace1 = document.createTextNode(shop.value.name);
            a.appendChild(textoEnlace1);
            li.appendChild(a);
            shop = tiendas.next();

        }

        for (var i = 0; i < count; i++) {
            document.getElementById("btnTienda" + i).addEventListener("click", shopPopulate(store, document.getElementById("btnTienda" + i).textContent));
        }

    }

    function shopPopulate(store, tiendaParam) {
        return function () {
            console.log(tiendaParam);


            var tiendas = store.tiendas;
            var shop = tiendas.next();

            var count = 0;
            while (shop.done !== true) {

                if (shop.value.name == tiendaParam) {
                    var tienda = store.getShopProducts(shop.value);
                    var shop = tienda.next();
                    while (shop.done !== true) {
                        console.log("Producto: " + shop.value.product.name + ", stock: " + shop.value.stock);
                        shop = tienda.next();
                    }
                }
                shop = tiendas.next();
            }

        }

    }
}

window.onload = init;