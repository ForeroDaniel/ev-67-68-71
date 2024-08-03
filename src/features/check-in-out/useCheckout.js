import { useMutation, useQueryClient } from '@tanstack/react-query';
import { updateBooking } from '../../services/apiBookings';
import { toast } from 'react-hot-toast';

export function useCheckout() {
  const queryClient = useQueryClient();

  const { mutate: checkout, isLoading: isCheckingOut } = useMutation({
    mutationFn: bookingId =>
      updateBooking(bookingId, {
        status: 'salida-registrada',
      }),

    onSuccess: data => {
      toast.success(`Salida de la reserva #${data.id} registrada exitosamente`);
      queryClient.invalidateQueries({ active: true });
    },

    onError: () => toast.error('Ocurrió un error registrando la salida'),
  });

  return { checkout, isCheckingOut };
}
