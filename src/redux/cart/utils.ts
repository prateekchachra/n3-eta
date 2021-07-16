import { ProductModel } from './CartReducer'

export function getProductIndex(productItems: ProductModel[], productId: number) {
    return productItems.map(product => product.id).indexOf(productId);
}