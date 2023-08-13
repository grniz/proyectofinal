import cartsModels from "../models/carts.model.js";

export default class Carts{
    //Metodos de la clase CartsManagers
    async findCarts(){
        let response = await cartsModels.find().lean();
        return response;
    }
    async findCartById(id){
        let response = await cartsModels.find(id).lean();
        return response;
    }

    async createCart(cart){
        let response = await cartsModels.create(cart);
        return response;
    }

    async updateCart(id, cart){
        let response = await cartsModels.findByIdAndUpdate(id,cart);
        return response;
    }
    async deleteCart(id){
        let response = await cartsModels.findByIdAndDelete(id);
        return response;
    }
}