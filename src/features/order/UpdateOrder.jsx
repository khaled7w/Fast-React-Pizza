import { useFetcher } from 'react-router-dom';
import Button from '../../UI/Button';
import { updateOrder } from '../../services/apiRestaurant';

function UpdateOrder({ order }) {
  const fetcher = useFetcher();
  return (
    <fetcher.Form method="PATCH">
      <div className="text-right">
        <Button type="primary">Make Priority</Button>
      </div>
    </fetcher.Form>
  );
}

export default UpdateOrder;

export async function action({ request, params }) {
  const data = { priority: true };
  await updateOrder(params.orderId, data);
  return null;
}
