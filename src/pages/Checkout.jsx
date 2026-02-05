
import { useCart } from '../context/CartContext';
const Checkout = () => {
  const { getCartItemsWithProducts, updateQty, removefromCart, getCartTotal , clearCart} = useCart()
  const cartItems = getCartItemsWithProducts();
  const total = getCartTotal()
  function placeOrder(){
    alert("successful order")
    clearCart()
  }
  return (
    <div className='page'>
      <div className="container">
        <h1 className="page-title">
          Check Out
        </h1>
        <div className="checkout-container">
          <div className="checkout-items">
            <h2 className='checkout-section-title'>Order Summary</h2>
            {
              cartItems.map((item , key) => (
                <div className='checkout-item' key={key}>
                  <img src={item.product.image} alt={item.product.name}
                    className='checkout-item-image' />

                  <div className="checkout-item-details">
                    <h3 className="checkout-item-name">{item.product.name}</h3>
                    <p className="checkout-item-price">${parseFloat(item.product.price).toFixed(2)} each</p>
                  </div>
                  <div className="checkout-item-controls">
                    <div className="quantity-controls">
                      <button className='quantity-btn' onClick={() => updateQty(item.id, item.quantity - 1)}>-</button>
                      <span className='quantity-value'>{item.quantity}</span>
                      <button className='quantity-btn' onClick={() => updateQty(item.id, item.quantity + 1)}>+</button>
                    </div>
                    <p className='checkout-item-total'>
                      ${item.product.price * item.quantity}
                    </p>
                    <button className='btn btn-secondary btn-small' onClick={() => removefromCart(item.id)}>Remove</button>
                  </div>
                </div>

              ))
            }
          </div>
          <div className="checkout-summary">
            <h2 className="checkout-section-title">Total</h2>
            <div className="checkout-total">
              <p className="checkout-total-label">Subtotal:</p>
              <p className="checkout-total-value">${total.toFixed(2)}</p>
            </div>
            <div className="checkout-total">
              <p className="checkout-total-label">Total:</p>
              <p className="checkout-total-value checkout-total-final">
                ${total.toFixed(2)}
              </p>
            </div>
            <button className="btn btn-primary btn-block btn-large" onClick={()=>placeOrder()}>Place Order</button>
            
          </div>
        </div>
      </div>
    </div>
  )
}

export default Checkout