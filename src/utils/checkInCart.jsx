export function checkInCart(LikeProduct, product) {
    return LikeProduct.find((l) => l.id === product.id);
}