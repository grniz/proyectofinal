import productsModel from "../models/products.model.js";

export default class Products{
    // Metodos de la clase ProductManger
    async findProducts(){
        let response = await productsModel.find().lean();
        return response;
    }
    async findProductById(id){
        let response = await productsModel.find(id);
        return response;
    }

    async createProduct(product){
        let response = await productsModel.create(product);
        return response;
    }

    async update(id, product){
        let response = await productsModel.findByIdAndUpdate(id,product);
        return response;
    }
    async delete(id){
        let response = await productsModel.findByIdAndDelete(id);
        return response;
    }

}