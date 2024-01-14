import React, { useContext, useEffect, useRef } from 'react';
import UserDetailsContext from '../context/UserDetailsContext';
import { useQuery } from 'react-query';
import { useAuth0 } from '@auth0/auth0-react';
import { getAllBookings } from '../utils/api';

const useBookings = () => {
  const {
    userDetails: { token },
    setUserDetails,
  } = useContext(UserDetailsContext);

  const queryRef = useRef();
  const { user } = useAuth0();

  const { isLoading, isError, data, refetch } = useQuery({
    queryKey: 'allBookings',
    queryFn: () => getAllBookings(user?.email, token),
    onSuccess: (data) =>
      setUserDetails((prev) => ({ ...prev, bookings: data })),
    enabled: user !== undefined,
    staleTime: 30000,
  });

  queryRef.current = refetch;

  useEffect(() => {
    queryRef.current && queryRef.current();
  }, [token]);

  return { data, isError, isLoading, refetch };
};

export default useBookings;
