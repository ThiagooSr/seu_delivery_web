import { Product } from "../types/Product";
import { Tenant } from "../types/Tenant";

const TEMPORARYoneProduct: Product = {
    id: 1, 
    image: '/temp/burger.png', 
    categoryName: 'Tradicional', 
    name: 'Texas Burger', 
    price: 25.50,
    description: '2 Blends de carne de 150g, Queijo Cheddar,Bacon Caramelizado, Salada, Molho da casa, Pão brioche artesanal,' 
}

export const UseApi = (tenantSlug: string) => ({

    getTenant: async() => {
        switch (tenantSlug) {
            case 'b7burger':
                return {
                    slug: 'b7burger',
                    name: 'B7burger',
                    mainColor: '#FF0000',
                    secondColor: '#00FFF0'
                }

                break;
            case 'b7pizza':
                return {
                    slug: 'b7pizza',
                    name: 'B7Pizza',
                    mainColor: '#0000FF',
                    secondColor: '#0000FF'
                }

            break;
            default: return false;
        }

        
    },
    getAllProducts: async () => {
        let products = [];
        for (let q = 0; q < 10; q++) {
            products.push(TEMPORARYoneProduct)
        }
        return products;
    },
    getProduct: async (id: string) => {
        return TEMPORARYoneProduct;
    }

});