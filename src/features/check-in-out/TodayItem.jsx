import styled from 'styled-components';
import { Link } from 'react-router-dom';

import Tag from '../../ui/Tag';
import { Flag } from '../../ui/Flag';
import Button from '../../ui/Button';
import CheckoutButton from './CheckoutButton';

const StyledTodayItem = styled.li`
  display: grid;
  grid-template-columns: 9rem 2rem 1fr 7rem 9rem;
  gap: 1.2rem;
  align-items: center;

  font-size: 1.4rem;
  padding: 0.8rem 0;
  border-bottom: 1px solid var(--color-grey-100);

  &:first-child {
    border-top: 1px solid var(--color-grey-100);
  }
`;

const Guest = styled.div`
  font-weight: 500;
`;

function TodayItem({ activity }) {
  const { id, status, guests, numNights } = activity;

  return (
    <StyledTodayItem>
      {status === 'sin-confirmar' && <Tag type='green'>Llegando</Tag>}
      {status === 'entrada-registrada' && <Tag type='blue'>Saliendo</Tag>}

      <Flag src={guests.countryFlag} alt={`Flag of ${guests.country}`} />
      <Guest>{guests.fullName}</Guest>
      <div>
        {numNights} {numNights === 1 ? 'noche' : 'noches'}
      </div>

      {status === 'sin-confirmar' && (
        <Button
          size='small'
          variation='primary'
          as={Link}
          to={`/checkin/${id}`}
        >
          Registrar entrada
        </Button>
      )}
      {status === 'entrada-registrada' && <CheckoutButton bookingId={id} />}
    </StyledTodayItem>
  );
}

export default TodayItem;
