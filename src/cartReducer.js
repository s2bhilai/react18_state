export default function cartReducer(cart, action) {
  switch (action.type) {
    case "empty":
      return [];
    case "updateQuantity": {
      const { sku, quantity } = action;
      if (quantity === 0) {
        return cart.filter((i) => i.sku !== sku);
      }
      return cart.map((i) => (i.sku === sku ? { ...i, quantity } : i));
    }
    case "add":
      const { id, sku } = action;
      const itemInCart = cart.find((i) => i.sku === sku);
      if (itemInCart) {
        //Return the new array with matching item replaced
        return cart.map((i) =>
          i.sku === sku ? { ...i, quantity: i.quantity + 1 } : i
        );
      } else {
        //Return new array with new item appended
        return [...cart, { id, sku, quantity: 1 }];
      }
    default:
      throw new Error("Unhandled action " + action.type);
  }
}
