import Button from '../../UI/Button';
import { useDispatch } from 'react-redux';
import { decreaseQuantity, increaseQuantity } from './cartSlice';

function UpdateItemQuantity({ pizzaId, currentQuantity }) {
  const dispatch = useDispatch();
  return (
    <div className="flex gap-1">
      <Button type="round" onClick={() => dispatch(decreaseQuantity(pizzaId))}>
        -
      </Button>
      <span>{currentQuantity}</span>
      <Button type="round" onClick={() => dispatch(increaseQuantity(pizzaId))}>
        +
      </Button>
    </div>
  );
}

export default UpdateItemQuantity;
