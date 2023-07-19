const fs = require ("fs");

class ProductManager {
  constructor() {
    this.products = [];
    this.path= "Products.json";
    this.createFile();
    this.productoIdCounter = 0;
    this.product = {
      id: this.productoIdCounter,
      title: "",
      description: "",
      price: 0,
      thumbnail: "",
      code: 0,
      stock: 0,
    };
  }

  createFile(){
    if(!fs.existsSync(this.path)){
        fs.writeFileSync(this.path, JSON.stringify(this.products));
    }

  }
  addProduct(product) {
    const productoExiste = this.products.find(
      (producto) => producto.code === product.code
    );
    if (productoExiste) {
      console.log(`El producto ${productoExiste.title}  ya existe`);
      return;
    }
    if (
      !product.title ||
      !product.description ||
      !product.price ||
      !product.thumbnail ||
      !product.code ||
      !product.stock
    ) {
      console.log(
        `Debes completar todos los campos para agregar un producto ${title}`
      );
    } else {
      this.productoIdCounter++;
    }
    product.id = this.productoIdCounter;
    this.products = JSON.parse(fs.readFileSync(this.path, "utf-8"));
    this.products.push(product);
    fs.writeFileSync(this.path, JSON.stringify(this.products));
  }

  updateProduct(id, product){
    this.products = JSON.parse(fs.readFileSync(this.path, "utf-8"));
    let pos = this.products.findIndex(item => item.id === id);

    if (pos > -1){
        this.products[pos].title = product.title;
        this.products[pos].description = product.description;
        this.products[pos].price = product.price;
        this.products[pos].thumbnail = product.thumbnail;
        this.products[pos].code = product.code;
        this.products[pos].stock = product.stock;
        fs.writeFileSync(this.path, JSON.stringify(this.products));
        console.log("Update Product")
    } else{
        console.log("Not found")
    }


  }

  deleteProduct(id){
    this.products = JSON.parse(fs.readFileSync(this.path, "utf-8"));
    let pos = this.products.findIndex(item => item.id === id);

    if (pos > -1){
        this.products.splice(pos, 1);
        fs.writeFileSync(this.path, JSON.stringify(this.products));
        console.log("Product N* " + id + " deleted!")
    } else{
        console.log("Not found")
    }
  }

  getProducts() {
    this.products = JSON.parse(fs.readFileSync(this.path, "utf-8"));

    return this.products;
  }

  getProductById(id) {    
    this.products = JSON.parse(fs.readFileSync(this.path, "utf-8"));

    const producto = this.products.find((producto) => producto.id === id);

    if (!producto) {
      throw new Error("El producto no se encuentra");
    }

    return producto;
  }
}

//Proceso de Testing 2

//const PM = new ProductManager();
//console.log(PM.getProducts());


/*PM.addProduct({
    title: "Producto prueba",
    description: "Este es un producto prueba",
    price: 200,
    thumbnail: "Sin imagen",
    code: "abc123",
    stock: 25,
  });

console.log(PM.getProducts());

PM.addProduct({
    title: "Producto prueba",
    description: "Este es un producto prueba",
    price: 200,
    thumbnail: "Sin imagen",
    code: "abc123",
    stock: 25,
  });

PM.addProduct({
    title: "Producto prueba 2",
    description: "Este es un producto prueba 2",
    price: 2002,
    thumbnail: "Sin imagen 2",
    code: "asdasd121115yhtyty!@#!@#",
    stock: 252,
});*/

//console.log(PM.getProductById(3));
//console.log(PM.getProductById(1));

//PM.deleteProduct(1);
/*PM.updateProduct(2,
    {
        title: "Producto prueba 3",
        description: "Este es un producto prueba 3",
        price: 2003,
        thumbnail: "Sin imagen 3",
        code: "3IKJOasdasd121115yhtyty!@#!@#",
        stock: 253,
    })*/
//console.log(PM.getProducts());