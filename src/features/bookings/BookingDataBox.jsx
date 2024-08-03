import styled from 'styled-components';
import { isToday } from 'date-fns';
import {
  HiOutlineChatBubbleBottomCenterText,
  HiOutlineCheckCircle,
  HiOutlineCurrencyDollar,
  HiOutlineHomeModern,
} from 'react-icons/hi2';

import DataItem from '../../ui/DataItem';
import { Flag } from '../../ui/Flag';

import { formatDistanceFromNow, formatCurrency } from '../../utils/helpers';

const StyledBookingDataBox = styled.section`
  /* Box */
  background-color: var(--color-grey-0);
  border: 1px solid var(--color-grey-100);
  border-radius: var(--border-radius-md);

  overflow: hidden;
`;

const Header = styled.header`
  background-color: var(--color-brand-500);
  padding: 2rem 4rem;
  color: #e0e7ff;
  font-size: 1.8rem;
  font-weight: 500;
  display: flex;
  align-items: center;
  justify-content: space-between;

  svg {
    height: 3.2rem;
    width: 3.2rem;
  }

  & div:first-child {
    display: flex;
    align-items: center;
    gap: 1.6rem;
    font-weight: 600;
    font-size: 1.8rem;
  }

  & span {
    font-family: 'Sono';
    font-size: 2rem;
    margin-left: 4px;
  }
`;

const Section = styled.section`
  padding: 3.2rem 4rem 1.2rem;
`;

const Guest = styled.div`
  display: flex;
  align-items: center;
  gap: 1.2rem;
  margin-bottom: 1.6rem;
  color: var(--color-grey-500);

  & p:first-of-type {
    font-weight: 500;
    color: var(--color-grey-700);
  }
`;

const Price = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 1.6rem 3.2rem;
  border-radius: var(--border-radius-sm);
  margin-top: 2.4rem;

  background-color: ${props =>
    props.isPaid ? 'var(--color-green-100)' : 'var(--color-yellow-100)'};
  color: ${props =>
    props.isPaid ? 'var(--color-green-700)' : 'var(--color-yellow-700)'};

  & p:last-child {
    text-transform: uppercase;
    font-size: 1.4rem;
    font-weight: 600;
  }

  svg {
    height: 2.4rem;
    width: 2.4rem;
    color: currentColor !important;
  }
`;

const Footer = styled.footer`
  padding: 1.6rem 4rem;
  font-size: 1.2rem;
  color: var(--color-grey-500);
  text-align: right;
`;

// A purely presentational component
function BookingDataBox({ booking }) {
  const {
    created_at,
    startDate,
    endDate,
    numNights,
    numGuests,
    cabinPrice,
    extrasPrice,
    totalPrice,
    hasBreakfast,
    observations,
    isPaid,
    guests: { fullName: guestName, email, country, countryFlag, nationalID },
    cabins: { name: cabinName },
  } = booking;

  return (
    <StyledBookingDataBox>
      <Header>
        <div>
          <HiOutlineHomeModern />
          <p>
            Estadía de {numNights} {numNights === 1 ? 'noche' : 'noches'} en la
            cabaña <span>{cabinName}</span>
          </p>
        </div>

        <p>
          {new Intl.DateTimeFormat('es-ES', {
            year: 'numeric', // año completo
            month: 'short', // nombre completo del mes
            day: 'numeric', // día del mes
          }).format(new Date(startDate))}{' '}
          (
          {isToday(new Date(startDate))
            ? 'Hoy'
            : `Hace ${formatDistanceFromNow(startDate)} ${
                parseInt(formatDistanceFromNow(startDate)) === 1
                  ? 'día'
                  : 'días'
              }`}
          ) &mdash;{' '}
          {new Intl.DateTimeFormat('es-ES', {
            year: 'numeric', // año completo
            month: 'short', // nombre completo del mes
            day: 'numeric', // día del mes
          }).format(new Date(endDate))}
        </p>
      </Header>

      <Section>
        <Guest>
          {countryFlag && <Flag src={countryFlag} alt={`Flag of ${country}`} />}
          <p>
            {guestName}{' '}
            {numGuests > 2
              ? `+ ${numGuests - 1} huéspedes`
              : numGuests > 1
              ? `+ ${numGuests - 1} huésped`
              : ''}
          </p>
          <span>&bull;</span>
          <p>{email}</p>
          <span>&bull;</span>
          <p>Número de identificación {nationalID}</p>
        </Guest>

        {observations && (
          <DataItem
            icon={<HiOutlineChatBubbleBottomCenterText />}
            label='Observaciones'
          >
            {observations}
          </DataItem>
        )}

        <DataItem icon={<HiOutlineCheckCircle />} label='Desayuno incluído?'>
          {hasBreakfast ? 'Sí' : 'No'}
        </DataItem>

        <Price isPaid={isPaid}>
          <DataItem icon={<HiOutlineCurrencyDollar />} label={`Precio Total`}>
            {formatCurrency(totalPrice)}

            {hasBreakfast &&
              ` (${formatCurrency(cabinPrice)} cabaña + ${formatCurrency(
                extrasPrice
              )} desayuno)`}
          </DataItem>

          <p>{isPaid ? 'Ya pagó' : 'Pagará al llegar'}</p>
        </Price>
      </Section>

      <Footer>
        <p>
          Reservado{' '}
          {new Intl.DateTimeFormat('es-ES', {
            year: 'numeric', // año completo
            month: 'short', // nombre completo del mes
            day: 'numeric', // día del mes
          }).format(new Date(created_at))}
        </p>
      </Footer>
    </StyledBookingDataBox>
  );
}

export default BookingDataBox;
