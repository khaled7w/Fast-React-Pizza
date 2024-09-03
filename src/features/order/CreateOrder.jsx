import Button from '../../UI/Button';
import EmptyCart from '../cart/EmptyCart';
import store from '../../store.js';
import {
  Form,
  redirect,
  useActionData,
  useNavigate,
  useNavigation,
} from 'react-router-dom';
import { createOrder } from '../../services/apiRestaurant';
import { useDispatch, useSelector } from 'react-redux';
import { clearItems, getCart, getTotalPrice } from '../cart/cartSlice';
import { useState } from 'react';
import { formatCurrency } from '../../utils/helpers';
import { fetchAddress } from '../user/userSlice.js';

// https://uibakery.io/regex-library/phone-number
const isValidPhone = (str) =>
  /^\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}$/.test(
    str,
  );

function CreateOrder() {
  const [withPriority, setWithPriority] = useState(false);
  const cart = useSelector(getCart);
  const navigation = useNavigation();
  const isLoading = navigation.state === 'loading';
  const formErrors = useActionData();
  const {
    userName,
    status: locationStatus,
    position,
    address,
    error: errorAddress,
  } = useSelector((state) => state.user);
  const loading = locationStatus === 'loading';

  const totalPrice = useSelector(getTotalPrice);
  const priority = withPriority ? totalPrice * 0.2 : 0;
  const totalPriceWithPriority = totalPrice + priority;
  const dispatch = useDispatch();

  if (!cart.length) return <EmptyCart />;

  return (
    <div className="px-4 py-6">
      <h2 className="mb-8 text-xl font-semibold">Ready to order? Let is go!</h2>

      <Form method="POST">
        <div className="mb-5 flex flex-col sm:flex-row sm:items-center sm:gap-2">
          <label className="sm:basis-40">First Name</label>
          <input
            type="text"
            name="customer"
            required
            className="input grow"
            defaultValue={userName}
          />
        </div>

        <div className="mb-5 flex flex-col sm:flex-row sm:items-center sm:gap-2">
          <label className="sm:basis-40">Phone number</label>
          <div className="grow">
            <input type="tel" name="phone" required className="input w-full" />
            {formErrors?.phone && (
              <p className="mt-2 rounded-md bg-red-100 p-2 text-xs text-red-700">
                {formErrors.phone}
              </p>
            )}
          </div>
        </div>

        <div className="relative mb-5 flex flex-col sm:flex-row sm:items-center sm:gap-2">
          <label className="sm:basis-40">Address</label>
          <div className="grow">
            <input
              type="text"
              name="address"
              required
              className="input w-full"
              defaultValue={address}
              disabled={loading}
            />
            {locationStatus === 'error' && (
              <p className="mt-2 rounded-md bg-red-100 p-2 text-xs text-red-700">
                {errorAddress}
              </p>
            )}
          </div>
          <span className="absolute right-[3px] top-[5px] md:right-[5px] md:top-[5px]">
            {!position.latitude && !position.longitude && (
              <Button
                type="small"
                onClick={(event) => {
                  event.preventDefault();
                  dispatch(fetchAddress());
                }}
              >
                Get Position
              </Button>
            )}
          </span>
        </div>

        <div className="mb-12 flex items-center gap-5">
          <input
            type="checkbox"
            name="priority"
            id="priority"
            className="h-6 w-6 accent-yellow-500 focus:outline-none focus:ring focus:ring-yellow-500 focus:ring-offset-2"
            value={withPriority}
            onChange={(e) => setWithPriority(e.target.checked)}
          />
          <label htmlFor="priority" className="font-medium">
            Want to yo give your order priority?
          </label>
        </div>

        <div>
          <input type="hidden" name="cart" value={JSON.stringify(cart)} />
          <input
            type="hidden"
            name="position"
            value={
              position.latitude && position.longitude
                ? `latitude:${position.latitude} , longitude:${position.longitude}`
                : ''
            }
          />
          <Button disabled={isLoading} type="primary">
            {isLoading
              ? 'Place Ordering...'
              : `Order now for ${formatCurrency(totalPriceWithPriority)} `}
          </Button>
        </div>
      </Form>
    </div>
  );
}

export async function action({ request }) {
  const formatData = await request.formData();
  const data = Object.fromEntries(formatData);

  const order = {
    ...data,
    cart: JSON.parse(data.cart),
    priority: data.priority === 'true',
  };
  console.log(order);
  const errors = {};

  if (!isValidPhone(order.phone))
    errors.phone =
      'Please give us yur correct phone nmber. We might need it to contact you.';

  if (Object.keys(errors).length > 0) return errors;

  // //If everything is Okeay
  const newOrder = await createOrder(order);
  store.dispatch(clearItems());
  return redirect(`/order/${newOrder.id}`);
}

export default CreateOrder;
