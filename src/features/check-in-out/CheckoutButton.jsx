import Button from '../../ui/Button';
import { useCheckout } from './useCheckout';

function CheckoutButton({ bookingId }) {
  const { checkout, isCheckingOut } = useCheckout();

  return (
    <Button
      variation='primary'
      size='small'
      onClick={() => checkout(bookingId)}
      disabled={isCheckingOut}
    >
      Registrar salida
    </Button>
  );
}

export default CheckoutButton;
