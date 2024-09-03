import { deleteItem } from '../features/cart/cartSlice';
import Button from './Button';
import { useDispatch } from 'react-redux';

function DeleteItem({ pizzaId }) {
  const dispatch = useDispatch();
  return (
    <Button type="small" onClick={() => dispatch(deleteItem(pizzaId))}>
      Delete
    </Button>
  );
}

export default DeleteItem;
