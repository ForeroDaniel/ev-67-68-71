import styled from 'styled-components';
import { isToday } from 'date-fns';
import {
  HiArrowDownOnSquare,
  HiArrowUpOnSquare,
  HiEye,
  HiTrash,
} from 'react-icons/hi2';
import { useNavigate } from 'react-router-dom';

import Tag from '../../ui/Tag';
import Table from '../../ui/Table';
import Modal from '../../ui/Modal';
import Menus from '../../ui/Menus';
import ConfirmDelete from '../../ui/ConfirmDelete';

import { formatCurrency } from '../../utils/helpers';
import { formatDistanceFromNow } from '../../utils/helpers';
import { useCheckout } from '../check-in-out/useCheckout';
import { useDeleteBooking } from './useDeleteBooking';

const Cabin = styled.div`
  font-size: 1.6rem;
  font-weight: 600;
  color: var(--color-grey-600);
  font-family: 'Sono';
`;

const Stacked = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.2rem;

  & span:first-child {
    font-weight: 500;
  }

  & span:last-child {
    color: var(--color-grey-500);
    font-size: 1.2rem;
  }
`;

const Amount = styled.div`
  font-family: 'Sono';
  font-weight: 500;
`;

function BookingRow({
  booking: {
    id: bookingId,
    created_at,
    startDate,
    endDate,
    numNights,
    numGuests,
    totalPrice,
    status,
    guests: { fullName: guestName, email },
    cabins: { name: cabinName },
  },
}) {
  const navigate = useNavigate();
  const { checkout, isCheckingOut } = useCheckout();
  const { deleteBooking, isDeleting } = useDeleteBooking();

  const statusToTagName = {
    'sin-confirmar': 'blue',
    'entrada-registrada': 'green',
    'salida-registrada': 'silver',
  };

  return (
    <Table.Row>
      <Cabin>{cabinName}</Cabin>

      <Stacked>
        <span>{guestName}</span>
        <span>{email}</span>
      </Stacked>

      <Stacked>
        <span>
          {isToday(new Date(startDate))
            ? 'Hoy'
            : `${
                new Date(startDate) < new Date() ? 'Hace' : 'En'
              } ${formatDistanceFromNow(startDate)} ${
                parseInt(formatDistanceFromNow(startDate)) === 1
                  ? 'día'
                  : 'días'
              }`}{' '}
          &rarr; Estadía de {numNights} {numNights === 1 ? 'noche' : 'noches'}
        </span>
        <span>
          {new Intl.DateTimeFormat('es-ES', {
            year: 'numeric', // año completo
            month: 'short', // nombre completo del mes
            day: 'numeric', // día del mes
          }).format(new Date(startDate))}
          &mdash;{' '}
          {new Intl.DateTimeFormat('es-ES', {
            year: 'numeric', // año completo
            month: 'short', // nombre completo del mes
            day: 'numeric', // día del mes
          }).format(new Date(endDate))}
        </span>
      </Stacked>

      <Tag type={statusToTagName[status]}>{status.replace('-', ' ')}</Tag>

      <Amount>{formatCurrency(totalPrice)}</Amount>

      <Modal>
        <Menus.Menu>
          <Menus.Toggle id={bookingId} />
          <Menus.List id={bookingId}>
            <Menus.Button
              icon={<HiEye />}
              onClick={() => navigate(`/bookings/${bookingId}`)}
            >
              Ver detalles
            </Menus.Button>

            {status === 'sin-confirmar' && (
              <Menus.Button
                icon={<HiArrowDownOnSquare />}
                onClick={() => navigate(`/checkin/${bookingId}`)}
              >
                Registro de entrada
              </Menus.Button>
            )}

            {status === 'entrada-registrada' && (
              <Menus.Button
                icon={<HiArrowUpOnSquare />}
                onClick={() => checkout(bookingId)}
                disabled={isCheckingOut}
              >
                Registro de salida
              </Menus.Button>
            )}

            <Modal.Open opens='delete'>
              <Menus.Button icon={<HiTrash />}>Eliminar reserva</Menus.Button>
            </Modal.Open>
          </Menus.List>
        </Menus.Menu>

        <Modal.Window name='delete'>
          <ConfirmDelete
            resourceName='reserva'
            disabled={isDeleting}
            onConfirm={() => deleteBooking(bookingId)}
          />
        </Modal.Window>
      </Modal>
    </Table.Row>
  );
}

export default BookingRow;
