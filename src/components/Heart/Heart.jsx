import React, { useContext, useEffect, useState } from 'react';
import './Heart.css';
import { AiFillHeart } from 'react-icons/ai';
import useAuthCheck from '../../hooks/useAuthCheck';
import { useMutation } from 'react-query';
import { useAuth0 } from '@auth0/auth0-react';
import UserDetailsContext from '../../context/UserDetailsContext';
import { toFav } from '../../utils/api';
import { checkFavourites, updateFavorites } from '../../utils/common';
import { useFavicon } from '@mantine/hooks';

const Heart = ({ id }) => {
  const [heartColor, setHeartColor] = useState('white');

  const { validateLogin } = useAuthCheck();
  const { user } = useAuth0();
  const {
    userDetails: { token, favourites },
    setUserDetails,
  } = useContext(UserDetailsContext);

  const { mutate } = useMutation({
    mutationFn: () => toFav(id, user?.email, token),
    onSuccess: () => {
      setUserDetails((prev) => ({
        ...prev,
        favourites: updateFavorites(id, prev.favourites),
      }));
    },
  });

  const handleLike = () => {
    if (validateLogin) {
      mutate();
      setHeartColor((prev) => (prev === '#fa3e5f' ? 'white' : '#fa3e5f'));
    }
  };

  useEffect(() => {
    setHeartColor(() => checkFavourites(id, favourites));
  }, []);

  useEffect(() => {
    setHeartColor(() => checkFavourites(id, favourites));
  }, [favourites]);

  return (
    <AiFillHeart
      size={24}
      color={heartColor}
      onClick={(e) => {
        e.stopPropagation();
        handleLike();
      }}
    />
  );
};

export default Heart;
