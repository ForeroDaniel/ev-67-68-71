import { useMutation, useQueryClient } from '@tanstack/react-query';
import { updateBooking } from '../../services/apiBookings';
import { toast } from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

export function useCheckin() {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const { mutate: checkin, isLoading: isCheckingIn } = useMutation({
    mutationFn: ({ bookingId, breakfast }) =>
      updateBooking(bookingId, {
        status: 'entrada-registrada',
        isPaid: true,
        ...breakfast,
      }),

    onSuccess: data => {
      toast.success(`Entrada de la reserva #${data.id} registrada exitosamente`);
      queryClient.invalidateQueries({ active: true });
      navigate('/');
    },

    onError: () => toast.error('Ocurrió un error registrando la entrada'),
  });

  return { checkin, isCheckingIn };
}
