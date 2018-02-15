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

    var aquarisu = new Smartphone("Aquaris U", "0003", "BQ Aquaris U", "180");
    var tvLG = new TV("LG Smart", "0004", "SmartTV LG", "550");
    var aquarisx = new Smartphone("Aquaris X", "0005", "BQ Aquaris X", "350");

    var lgOptimus = new Smartphone("LG Movil", "0006", "LG Optimus", "50");
    var iphonex = new Smartphone("Iphone", "0007", "Iphone X", "950");


    titanic.images = "images/productos/titanic.jpg";
    fast.images = "images/productos/fastfurious.jpg";
    aquarisu.images = "images/productos/aquaris-u.jpg";
    aquarisx.images = "images/productos/aquaris-x.jpg";
    tvLG.images = "images/productos/smart-tv-lg.jpg";
    lgOptimus.images = "images/productos/lg-optimus.jpg";
    iphonex.images = "images/productos/iphone-x.jpg";

    titanic.description = "Relata la relación de Jack Dawson y Rose DeWitt Bukater, dos jóvenes que se conocen y se enamoran a bordo del transatlántico RMS Titanic en su viaje inaugural desde Southampton, Inglaterra, a Nueva York, EE. UU., en abril de 1912. Pertenecientes a diferentes clases sociales, intentan salir adelante pese a las adversidades que los separarían de forma definitiva, entre ellas el prometido de Rose, Caledon «Cal» Hockley (un adinerado del cual ella no está enamorada, pero su madre la ha obligado a permanecer con él para garantizar un futuro económico próspero) y el hundimiento del lujoso barco tras chocar con un iceberg.";
    fast.description = "Película de acción estadounidense de 2015 dirigida por James Wan y protagonizada por Vin Diesel, Paul Walker, Dwayne Johnson, Michelle Rodríguez, Jordana Brewster, Tyrese Gibson, Ludacris y Jason Statham. Es el séptimo film de la saga The Fast and the Furious y también la secuela paralela de la película Fast & Furious 6 y de su spin-off The Fast and the Furious: Tokyo Drift.";
    aquarisu.description = "Disfruta en tu BQ de lo mejor de Android Nougat. Con la opción multiventana podrás tener dos apps abiertas simultáneamente, el modo luz nocturna reduce la luz azul de la pantalla para ayudarte a descansar y las notificaciones ahora están agrupadas, son más interactivas y puedes responder directamente desde ellas.";
    aquarisx.description = "Una pantalla con más de 16,5 millones de colores que abraza sutilmente el marco metálico. Líneas limpias y bordes ovalados gracias al cristal 2,5D. Cámaras que redefinen la fotografía con baja luz. Máxima potencia con el mínimo consumo. Podemos contártelo, pero nunca será como verlo.";
    tvLG.description = "Televisor con conexión a internet, de manera que puede acceder a través de aplicaciones a la infinita oferta de deportes, series, películas y dibujos animados disponibles en la red, de manera rápida y sencilla.";
    lgOptimus.description = "Smartphone compacto, Android 4.1.2 Jelly Bean, pantalla táctil de 4,7'', procesador de cuatro núcleos y diseño cuidado al detalle.";
    iphonex.description = "Siempre hemos querido crear un iPhone que sea todo pantalla. Un iPhone capaz de sumergirte por completo en lo que ves. Y tan inteligente que responda a un toque, a tu voz, incluso a tu mirada. Ahora el iPhone X hace realidad esa visión. Dile hola al futuro.";


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
    store.addProduct(lgOptimus, categoriaMoviles);
    store.addProduct(iphonex, categoriaMoviles);

    store.addProduct(tvLG, categoriaTelevisores);


    store.addProductInShop(titanic, eroski, 30);
    store.addProductInShop(fast, eroski, 45);
    store.addProductInShop(iphonex, eroski, 5);
    store.addProductInShop(lgOptimus, eroski, 2);

    store.addProductInShop(aquarisx, carrefour, 30);
    store.addProductInShop(aquarisu, carrefour, 45);

    store.addProductInShop(tvLG, cex, 15);

    initPopulate(store);
    shopMenusPopulate(store);
    console.log(showProductCategoryShop(store, "Eroski", "Peliculas"));

    var home = document.getElementById("home");

    function homeEvent(store) {
        return function () {
            var principal = document.getElementById("principal");
            principal.remove();
            initPopulate(store);
            if (document.getElementById("categorias")) {
                document.getElementById("categorias").remove();
            }
            if (document.getElementById("title")) {
                document.getElementById("title").remove();
            }
        }
    }

    document.getElementById("home").addEventListener("click", homeEvent(store));


    function initPopulate(store) {

        var main = document.getElementById("main");


        //Recorremos las tiendas

        //Creamos el div principal dentro del main

        var divPrincipal = document.createElement("div");
        divPrincipal.setAttribute("class", "principal row");
        divPrincipal.setAttribute("id", "principal");
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

            if (document.getElementById("title")) {
                document.getElementById("title").remove();
            }

            console.log(tiendaParam);

            var principal = document.getElementById("principal");
            principal.remove();

            var divPrincipal = document.createElement("div");
            divPrincipal.setAttribute("class", "principal row");
            divPrincipal.setAttribute("id", "principal");
            main.appendChild(divPrincipal);


            var tiendas = store.tiendas;
            var shop = tiendas.next();

            var count = 0;
            while (shop.done !== true) {

                if (shop.value.name == tiendaParam) {
                    var nameShop = shop.value.name;
                    var tienda = store.getShopProducts(shop.value);
                    var shop = tienda.next();
                    while (shop.done !== true) {


                        var div1 = document.createElement("div");
                        div1.setAttribute("class", "div-Centro col-md-3");
                        divPrincipal.appendChild(div1);
                        var div1panel = document.createElement("div");
                        div1panel.setAttribute("class", "panel-body");
                        div1.appendChild(div1panel);
                        var imagen1 = document.createElement("img");
                        imagen1.setAttribute("src", shop.value.product.images);
                        imagen1.setAttribute("class", "img-responsive");
                        div1panel.appendChild(imagen1);
                        var div1panelf = document.createElement("div");
                        div1panelf.setAttribute("class", "panel-footer");
                        div1.appendChild(div1panelf);
                        var enlace1 = document.createElement("a");
                        enlace1.setAttribute("href", "#");

                        enlace1.setAttribute("id", shop.value.product.name);

                        var textoEnlace1 = document.createTextNode(shop.value.product.name + "(" + shop.value.stock + ")");
                        //  enlace1.setAttribute("name", shop.value.product.name);
                        enlace1.appendChild(textoEnlace1);
                        div1panelf.appendChild(enlace1);

                        document.getElementById(shop.value.product.name).addEventListener("click", productShopPopulate(store, shop.value.product.name, nameShop));

                        shop = tienda.next();


                        // console.log("Producto: " + shop.value.product.name + ", stock: " + shop.value.stock);
                        // shop = tienda.next();
                    }
                }
                shop = tiendas.next();
            }
            if (!document.getElementById("categorias")) {
                menuCategoryShopPopulate(store);
            }

        }
    }


    function menuCategoryShopPopulate(store) {

        var myNavbar = document.getElementById("myNavbar");

        var divBoton = document.createElement("div");
        divBoton.setAttribute("class", "btn-group pull right");

        myNavbar.appendChild(divBoton);

        var boton = document.createElement("button");
        boton.setAttribute("id", "categorias");
        boton.setAttribute("type", "button");
        boton.setAttribute("id", "categorias");
        boton.setAttribute("class", "btn btn-danger");
        boton.setAttribute("data-toggle", "dropdown");
        divBoton.appendChild(boton);

        var span = document.createElement("span");
        var text = document.createTextNode("Categorias");
        span.appendChild(text);
        boton.appendChild(span);

        var dropDown = document.createElement("div");
        dropDown.setAttribute("class", "dropdown-menu");

        divBoton.appendChild(dropDown);

        var categories = store.categorias;
        var category = categories.next();


        while (category.done !== true) {

            var a = document.createElement("a");
            a.setAttribute("class", "dropdown-item");
            a.setAttribute("href", "#");
            a.setAttribute("id", category.value.title);

            var textNode = document.createTextNode(category.value.title);
            a.appendChild(textNode);

            dropDown.appendChild(a);

            category = categories.next();
        }

    }


    function productsCategoryShopPopulate() {

        var productosCat = showProductCategoryShop(store, tienda, categoria);


    }


    function showProductCategoryShop(store, tienda, categoria) {


        var categories = store.categorias;
        var category = categories.next();


        while (category.done !== true) {
            if (category.value.title == categoria) {
                var cat = category.value;
            }
            category = categories.next();
        }


        var producto = store.getCategoryProducts(cat);

        var product = producto.next();

        var categoryProducts = [];

        while (product.done !== true) {
            categoryProducts.push(product.value);
            product = producto.next();
        }


        var tiendas = store.tiendas;
        var shop = tiendas.next();
        while (shop.done !== true) {

            if (shop.value.name == tienda) {
                var tiendaF = shop.value;
            }

            shop = tiendas.next();
        }


        var tiendaP = store.getShopProducts(tiendaF);
        var shop = tiendaP.next();

        var shopProduct = [];

        while (shop.done !== true) {
            shopProduct.push(shop.value);
            shop = tiendaP.next();
        }

        var finalArray = [];

        for (var i = 0; i < shopProduct.length; i++) {
            for (var j = 0; j < categoryProducts.length; j++) {
                if (categoryProducts[j].serial == shopProduct[i].product.serial) {
                    finalArray.push(shopProduct[i]);
                }
            }
        }

        return finalArray;


    }


    function productShopPopulate(store, product, shopParam) {
        return function () {
            // console.log(product);

            var main = document.getElementById("main");
            var principal = document.getElementById("principal");
            principal.remove();

            if (document.getElementById("title")) {
                document.getElementById("title").remove();
            }

            //Creamos el div principal dentro del main

            var divTitle = document.createElement("div");
            divTitle.setAttribute("id", "title");
            var titulo = document.createTextNode("DESCRIPCION PRODUCTO");
            var tit = document.createElement("h3");
            divTitle.appendChild(tit);
            tit.appendChild(titulo);
            main.appendChild(divTitle);

            var divPrincipal = document.createElement("div");
            divPrincipal.setAttribute("class", "producto row");
            divPrincipal.setAttribute("id", "principal");
            main.appendChild(divPrincipal);


            var tiendas = store.tiendas;
            var shop = tiendas.next();

            var count = 0;
            while (shop.done !== true) {

                if (shop.value.name == shopParam) {
                    var tienda = store.getShopProducts(shop.value);
                    shop = tienda.next();
                    while (shop.done !== true) {

                        if (shop.value.product.name == product) {


                            var divTitulo = document.createElement("div");
                            divTitulo.setAttribute("class", "col-md-2");
                            divPrincipal.appendChild(divTitulo);

                            var h4 = document.createElement("h4");
                            var texth4 = document.createTextNode(shop.value.product.name);
                            h4.appendChild(texth4);

                            var img = document.createElement("img");
                            img.setAttribute("src", shop.value.product.images);
                            img.setAttribute("class", "img-responsive");

                            divTitulo.appendChild(h4);
                            divTitulo.appendChild(img);


                            var divDescripcion = document.createElement("div");
                            divDescripcion.setAttribute("class", "descripcion col-md-10");
                            divPrincipal.appendChild(divDescripcion);

                            var p = document.createElement("p");
                            var textP = document.createTextNode(shop.value.product.description);
                            p.appendChild(textP);

                            var stock = document.createElement("p");
                            stock.setAttribute("id", "stock");
                            stock.setAttribute("class", "pull-right");
                            var textStock = document.createTextNode("Stock: " + shop.value.stock);
                            stock.appendChild(textStock);

                            divDescripcion.appendChild(p);
                            divDescripcion.appendChild(stock);


                        }
                        console.log(shop.value.product.description);

                        shop = tienda.next();
                    }
                }
                shop = tiendas.next();
            }
        }
    }

}

window.onload = init;