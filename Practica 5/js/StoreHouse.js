"use strict";


function StoreHouseException() {
    this.name = "StoreHouseException";
    this.message = "Error: StoreHouse Generic Exception.";
}

StoreHouseException.prototype = new BaseException(); //Heredamos de BaseException
StoreHouseException.prototype.constructor = StoreHouseException;


function CategoryException() {
    this.name = "CategoryException";
    this.message = "Error: The method needs a Category parameter.";
}

CategoryException.prototype = new StoreHouseException();
CategoryException.prototype.constructor = CategoryException;


function DefaultCategoryException() {
    this.name = "DefaultCategoryException";
    this.message = "Error: The deafult category can't be removed.";
}

DefaultCategoryException.prototype = new StoreHouseException();
DefaultCategoryException.prototype.constructor = new DefaultCategoryException();


function CategoryNotExistsException() {
    this.name = "CategoryNotExistsException";
    this.message = "Error: The category doesn't exist.";
}

CategoryNotExistsException.prototype = new StoreHouseException();
CategoryNotExistsException.prototype.constructor = CategoryNotExistsException;

function CategoryExistsException() {
    this.name = "CategoryExistsException";
    this.message = "Error: The category exists.";
}

CategoryExistsException.prototype = new StoreHouseException();
CategoryExistsException.prototype.constructor = CategoryExistsException;

function ProductStoreHouseException() {
    this.name = "ProductStoreHouseException";
    this.message = "Error: The method needs a Product parameter.";
}

ProductStoreHouseException.prototype = new StoreHouseException();
ProductStoreHouseException.prototype.constructor = ProductStoreHouseException;


function ProductExistException() {
    this.name = "ProductExistException";
    this.message = "Error: The product exists";
}

ProductExistException.prototype = new StoreHouseException();
ProductExistException.prototype.constructor = ProductExistException;

function ProductNotExistsException() {
    this.name = "ProductNotExistsException";
    this.message = "Error: The product doesn't exist";
}

ProductNotExistsException.prototype = new StoreHouseException();
ProductNotExistsException.prototype.constructor = ProductNotExistsException;


function ShopStoreHouseException() {
    this.name = "ShopStoreHouseException";
    this.message = "Error: The method needs a Shop parameter.";
}

ShopStoreHouseException.prototype = new StoreHouseException();
ShopStoreHouseException.prototype.constructor = ShopStoreHouseException;

function ShopExistsException() {
    this.name = "ShopExistsException";
    this.message = "Error: The shop exists.";
}

ShopExistsException.prototype = new StoreHouseException();
ShopExistsException.prototype.constructor = ShopExistsException;

function DefaultShopException() {
    this.name = "DefaultShopException";
    this.message = "Error: The deafult shop can't be removed.";
}

DefaultShopException.prototype = new StoreHouseException();
DefaultShopException.prototype.constructor = new DefaultShopException();

function ShopNotExistsException() {
    this.name = "ShopNotExistsException";
    this.message = "Error: The shop doesn't exist.";
}

ShopNotExistsException.prototype = new StoreHouseException();
ShopNotExistsException.prototype.constructor = ShopNotExistsException;

function StockStoreHouseException() {
    this.name = "StockStoreHouseException";
    this.message = "Error: The stock can't be negative.";
}

StockStoreHouseException.prototype = new StoreHouseException();
StockStoreHouseException.prototype.constructor = StockStoreHouseException;


var StoreHouse = (function () { //La función anónima devuelve un método getInstance que permite obtener el objeto único
    var instantiated; //Atributo privado que permite guardar la única instancia creada.

    function init() { //Este método se ejecuta una única vez y es el utilizado para crear la única instancia del objeto.
        // singleton here

        // Private methods and variables. Elementos que son privados al objeto, solo accesibles a través de clousure
        function StoreHouse() {


            if (!(this instanceof StoreHouse))
                throw new InvalidAccessConstructorException();

            var _nombre = "Nombre almacen";

            Object.defineProperty(this, 'nombre', {
                get: function () {
                    return _nombre;
                },
                set: function (nombre) {
                    nombre = nombre.trim();
                    if (nombre === 'undefined') throw new EmptyValueException("nombre");
                    _nombre = nombre;
                }
            });

            var _productos = [];


            Object.defineProperty(this, 'productos', {
                get: function () {
                    var nextIndex = 0;
                    return {
                        next: function () {
                            return nextIndex < _productos.length ?
                                {value: _productos[nextIndex++], done: false} :
                                {done: true};
                        }
                    }
                }
            });

            var _categorias = [];

            Object.defineProperty(this, 'categorias', {   //Getter categories
                get: function () {
                    var nextIndex = 0;
                    return {
                        next: function () {
                            return nextIndex < _categorias.length ?
                                {value: _categorias[nextIndex++].category, done: false} :
                                {done: true};
                        }
                    }
                }
            });

            var _tiendas = [];

            Object.defineProperty(this, 'tiendas', {  //Getter shops
                get: function () {
                    var nextIndex = 0;
                    return {
                        next: function () {
                            return nextIndex < _tiendas.length ?
                                {value: _tiendas[nextIndex++].shop, done: false} :
                                {done: true};
                        }
                    }
                }
            });


            this.addCategory = function (categoria) {

                if (!(categoria instanceof Category)) {
                    throw new CategoryException();
                }

                var position = getCategoryPosition(categoria);
                if (position === -1) {
                    _categorias.push(
                        {
                            category: categoria,
                            product: []
                        }
                    );
                } else {
                    throw new CategoryExistsException();
                }

                return _categorias.length;

            }

            this.removeCategory = function (categoria) {
                if (!(categoria instanceof Category)) {
                    throw new CategoryException();
                }
                var position = getCategoryPosition(categoria);
                if (position !== -1) {
                    if (categoria.title !== _defaultCategory.title) {
                        _categorias.splice(position, 1);
                    } else {
                        throw new DefaultCategoryException();
                    }
                } else {
                    throw new CategoryNotExistsException();
                }
                return _categorias.length;
            }


            function getCategoryPosition(categoria) {
                if (!(categoria instanceof Category)) {
                    throw new CategoryException();
                }

                function compareElements(element) {
                    return (element.category.title === categoria.title)
                }

                return _categorias.findIndex(compareElements);
            }

            //Categoría por defecto.
            var _defaultCategory = new Category("Anonymous category"); //Categoría por defecto
            this.addCategory(_defaultCategory);


            this.addProduct = function (producto, categoria) {

                if (!producto instanceof Product) {
                    throw new ProductStoreHouseException();
                }

                if (categoria == null || categoria == '') {
                    categoria = _defaultCategory;
                }

                var categoryPosition = getCategoryPosition(categoria);
                if (categoryPosition === -1) {
                    categoryPosition = this.addCategory(categoria) - 1;
                }

                var productPosition = getProductPosition(producto, _categorias[categoryPosition].product);
                if (productPosition == -1) {
                    _categorias[categoryPosition].product.push(
                        {
                            productos: producto
                        }
                    )
                }
                else {
                    throw ProductExistException();
                }

                return _categorias[categoryPosition].length;

            }


            function getProductPosition(producto, categoriaProductos) {
                if (!(producto instanceof Product)) {
                    throw new ProductStoreHouseException();
                }

                function compareElements(element) {
                    return (element.productos.serial === producto.serial)
                }

                return categoriaProductos.findIndex(compareElements);
            }


            this.removeProduct = function (producto) {
                if (!producto instanceof Product) {
                    throw new ProductStoreHouseException();
                }

                var i = _categorias.length - 1;
                var position = -1;
                while (i >= 0 && position === -1) {
                    position = getProductPosition(producto, _categorias[i].product);
                    i--;
                }

                if (position !== -1) {
                    _categorias[i + 1].product.splice(position, 1);
                } else {
                    throw new ProductNotExistsException();
                }

            }


            this.addShop = function (tienda) {
                if (!tienda instanceof Shop) {
                    throw new ShopStoreHouseException();
                }

                var position = getShopPosition(tienda);
                if (position === -1) {
                    _tiendas.push(
                        {
                            shop: tienda,
                            products: []
                        }
                    );
                } else {
                    throw new ShopExistsException();
                }

                return _tiendas.length;

            }

            this.removeShop = function (tienda) {
                if (!tienda instanceof Shop) {
                    throw new ShopStoreHouseException();
                }

                var position = getShopPosition(tienda);
                if (position !== -1) {
                    if (tienda.cif != _defaultShop.cif) {
                        _tiendas.splice(position, 1);
                    }
                    else {
                        throw new DefaultShopException();
                    }
                } else {
                    throw new ShopNotExistsException();
                }
                return _tiendas.length;
            }

            function getShopPosition(tienda) {
                if (!tienda instanceof Shop) {
                    throw new ShopStoreHouseException();
                }

                function compareElements(element) {
                    return (element.shop.cif === tienda.cif)
                }

                return _tiendas.findIndex(compareElements);
            }

            //Tienda por defecto.
            var _defaultShop = new Shop("1111", "Anonymous shop"); //Categoría por defecto
            this.addShop(_defaultShop);

            this.addProductInShop = function (producto, tienda, unidades) {
                if (!producto instanceof Product) {
                    throw new ProductStoreHouseException();
                }

                if (!tienda instanceof Shop) {
                    throw new ShopStoreHouseException();
                }

                if (unidades < 0) {
                    throw new StockStoreHouseException();
                }
                var position = -1;
                position = getShopPosition(tienda);
                if (position !== -1) {
                    _tiendas[position].products.push(
                        {
                            producto: producto,
                            stock: unidades
                        }
                    )
                } else {
                    throw ShopNotExistsException();
                }

                return _tiendas.length;
            }

            function getProductPositionInShop(producto, productosTienda) {
                if (!(producto instanceof Product)) {
                    throw new ProductStoreHouseException();
                }

                function compareElements(element) {
                    return (element.productos.serial === producto.serial)
                }

                return productosTienda.findIndex(compareElements);

            }

            this.addQuantityProductInShop = function (producto, tienda, unidades) {
                if (!producto instanceof Product) {
                    throw new ProductStoreHouseException();
                }

                if (!tienda instanceof Shop) {
                    throw new ShopStoreHouseException();
                }

                if (unidades < 0) {
                    throw new StockStoreHouseException();
                }

                var position = -1;
                position = getProductPositionInShop(producto, tienda);

                if (position !== -1) {
                    _tiendas[position].products.stock = _tiendas[position].products.stock + unidades;
                } else {
                    throw new ProductNotExistsException();
                }

            }

            this.getCategoryProducts = function (categoria) {

                var categoryPosition = getCategoryPosition(categoria);
                var nextIndex = 0;

                return {
                    next: function () {
                        var producto = null;
                        while (nextIndex < _categorias[categoryPosition].product.length && producto === null) {
                            producto = _categorias[categoryPosition].product[nextIndex].productos;
                            nextIndex++;
                        }
                        if (producto !== null) {
                            return {value: producto, done: false}
                        }
                        if (nextIndex >= _categorias[categoryPosition].product.length) return {done: true};
                    }
                }

            }

            this.getShopProducts = function (shop, product) {

                if (!shop instanceof Shop) {
                    throw new ShopStoreHouseException();
                }


                var index = getShopPosition(shop);
                if (index === -1) throw new ShopNotExistsException();

                var nextIndex = 0;
                return {
                    next: function () {
                        var value = null;
                        if (product !== undefined) {
                            while (nextIndex < _tiendas[index].products.length && value == null) {
                                value = {
                                    product: getProductPositionInShop(product, _tiendas[index].products[nextIndex]),
                                    stock: _tiendas[index].products[nextIndex].stock
                                }
                                nextIndex++;
                            }
                            if (value !== null) {
                                return {value: value, done: false};
                            }
                            if (nextIndex >= _tiendas[index].products.length) {
                                return {done: true};
                            }
                        }
                        else {
                            return (nextIndex < _tiendas[index].products.length) ?
                                {
                                    value: {
                                        product: _tiendas[index].products[nextIndex].producto,
                                        stock: _tiendas[index].products[nextIndex++].stock
                                    }, done: false
                                } :
                                {done: true};
                        }
                    }
                }

            }

        }

        StoreHouse.prototype = {};
        StoreHouse.prototype.constructor = StoreHouse;

        var instance = new StoreHouse();//Devolvemos el objeto StoreHouse para que sea una instancia única.
        Object.freeze(instance);
        return instance;

    }

    return {
        // Devuelve un objeto con el método getInstance
        getInstance: function () {
            if (!instantiated) { //Si la variable instantiated es undefined, priemera ejecución, ejecuta init.
                instantiated = init(); //instantiated contiene el objeto único
            }
            return instantiated; //Si ya está asignado devuelve la asignación.
        }
    };
})();