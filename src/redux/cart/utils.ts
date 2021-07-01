import { ProductModel } from './CartReducer'

export function getProductIndex(cartItems: ProductModel[], productId: number) {
    return cartItems.map(product => product.id).indexOf(productId);
}