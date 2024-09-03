import { Link } from 'react-router-dom';
import Button from '../../UI/Button';
import CartItem from './CartItem';
import { useSelector, useDispatch } from 'react-redux';
import { clearItems, getCart } from './cartSlice';
import EmptyCart from './EmptyCart';

function Cart() {
  const cart = useSelector(getCart);

  const userName = useSelector((state) => state.user.userName);
  const dispatch = useDispatch();

  if (!cart.length) return <EmptyCart />;

  return (
    <div className="px-4 py-3">
      <Link
        to="/menu"
        className="text-blue-500 hover:text-blue-600 hover:underline"
      >
        &larr; Back to menu
      </Link>

      <h2 className="mt-7 text-xl font-semibold">Your cart, {userName}</h2>
      <ul className="divide-y divide-stone-200 border-b">
        {cart.map((item) => (
          <CartItem item={item} key={item.pizzaId} />
        ))}
      </ul>
      <div className="mt-6 space-x-2">
        <Button to="/order/new" type="primary">
          Other Pizzas
        </Button>
        {/* <Link to="/order/new">Order pizzas</Link> */}
        <Button type="secondary" onClick={() => dispatch(clearItems())}>
          Clear cart
        </Button>
      </div>
    </div>
  );
}

export default Cart;
