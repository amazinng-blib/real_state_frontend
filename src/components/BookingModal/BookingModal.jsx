import React, { useContext, useState } from 'react';
import './BookingModal.css';
import { Button, DatePicker, Modal } from 'antd';
import { useMutation } from 'react-query';
import UserDetailsContext from '../../context/UserDetailsContext';
import { bookVisit } from '../../utils/api';
import { toast } from 'react-toastify';
import dayjs from 'dayjs';
// import { Button, Modal } from '@mantine/core';
// import { DatePicker } from '@mantine/dates';

const BookingModal = ({ opened, setOpened, propertyId, email }) => {
  const [value, setValue] = useState(null);

  const {
    userDetails: { token },
    setUserDetails,
  } = useContext(UserDetailsContext);

  const handleBookingSuccess = () => {
    toast.success('Your Visit is Booked', {
      position: 'bottom-right',
    });
    setUserDetails((prev) => ({
      ...prev,
      bookings: [
        ...prev.bookings,
        {
          id: propertyId,
          date: dayjs(value).format('DD/MM/YY'),
        },
      ],
    }));
  };

  const { mutate, isLoading } = useMutation({
    mutationFn: () => bookVisit(value, propertyId, email, token),
    onSuccess: () => handleBookingSuccess(),
    onError: ({ response }) => toast.error(response?.data?.message),
    onSettled: () => setOpened(false),
  });

  return (
    <Modal
      open={opened}
      onCancel={() => setOpened(false)}
      title="Select Your Date of visit"
      onOk={() => setOpened(false)}
      centered
      style={{ textAlign: 'center', textTransform: 'uppercase' }}
    >
      <div className="flexColCenter" style={{ gap: '1rem' }}>
        <DatePicker
          value={value}
          onChange={setValue}
          style={{
            margin: '1rem 0',
          }}
        />
        <Button
          type="button"
          style={{
            margin: '2rem 0',
            border: `${!value ? '1px solid black' : '1px solid green'}`,
            borderRadius: '5px',
            cursor: `${!value || isLoading ? 'not-allowed' : 'pointer'}`,
          }}
          disabled={!value || isLoading}
          onClick={() => mutate()}
        >
          Book Visit
        </Button>
      </div>
    </Modal>
  );
};

export default BookingModal;
