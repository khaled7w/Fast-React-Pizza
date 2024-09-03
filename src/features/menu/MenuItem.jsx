import Button from '../../UI/Button';
import { formatCurrency } from '../../utils/helpers';
import { useSelector, useDispatch } from 'react-redux';
import { addItem, getQuantityById } from '../cart/cartSlice';
import DeleteItem from '../../UI/DeleteItem';
import UpdateItemQuantity from '../cart/UpdateItemQuantity';

function MenuItem({ pizza }) {
  const { id, name, unitPrice, ingredients, soldOut, imageUrl } = pizza;
  const dispatch = useDispatch();

  const quantity = useSelector(getQuantityById(id));
  const isQuantity = quantity > 0;

  function handleAddItem() {
    const newItem = {
      pizzaId: id,
      name,
      quantity: 1,
      unitPrice,
      ingredients,
      totalPrice: unitPrice * 1,
      imageUrl,
    };
    dispatch(addItem(newItem));
  }

  return (
    <li className="flex gap-4 py-2 pt-0.5">
      <img
        src={imageUrl}
        alt={name}
        className={`h-24 ${soldOut ? 'opacity-70 grayscale ' : ''}`}
      />
      <div className="flex grow flex-col">
        <p className="font-meduim">{name}</p>
        <p className="font-meduim text-sm capitalize italic text-stone-500">
          {ingredients.join(', ')}
        </p>
        <div className="mt-auto flex items-center justify-between">
          {!soldOut ? (
            <p className=" text-sm">{formatCurrency(unitPrice)}</p>
          ) : (
            <p className="text-sm font-medium uppercase text-stone-500">
              Sold out
            </p>
          )}

          {isQuantity && (
            <div className="flex items-center gap-3 sm:gap-8">
              <UpdateItemQuantity pizzaId={id} currentQuantity={quantity} />
              <DeleteItem pizzaId={id} />{' '}
            </div>
          )}

          {!soldOut && !isQuantity && (
            <Button type="small" onClick={handleAddItem}>
              Add to Cart
            </Button>
          )}
        </div>
      </div>
    </li>
  );
}

export default MenuItem;
