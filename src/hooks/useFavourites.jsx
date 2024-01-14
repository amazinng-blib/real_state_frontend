import React, { useContext, useEffect, useRef } from 'react';
import UserDetailsContext from '../context/UserDetailsContext';
import { useQuery } from 'react-query';
import { useAuth0 } from '@auth0/auth0-react';
import { getAllfav } from '../utils/api';

const useFavourites = () => {
  const {
    userDetails: { token },
    setUserDetails,
  } = useContext(UserDetailsContext);

  const queryRef = useRef();
  const { user } = useAuth0();

  const { isLoading, isError, data, refetch } = useQuery({
    queryKey: 'allFavourites',
    queryFn: () => getAllfav(user?.email, token),
    onSuccess: (data) =>
      setUserDetails((prev) => ({ ...prev, favourites: data })),
    enabled: user !== undefined,
    staleTime: 30000,
  });

  queryRef.current = refetch;

  useEffect(() => {
    queryRef.current && queryRef.current();
  }, [token]);

  return { data, isError, isLoading, refetch };
};

export default useFavourites;
