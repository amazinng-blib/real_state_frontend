import axios from 'axios';
import dayjs from 'dayjs';
import { toast } from 'react-toastify';

export const api = axios.create({
  baseURL: 'https://real-state-backend-phi.vercel.app/api',
});

export const getAllProperties = async () => {
  try {
    const response = await api.get('/residency/allresidencies', {
      timeout: 10 * 1000,
    });

    if (response.status === 400 || response.status === 500) {
      throw response.data;
    }

    return response.data;
  } catch (error) {
    toast.error('Something went wrong');
    throw error;
  }
};

export const getProperty = async (id) => {
  try {
    const response = await api.get(`/residency/${id}`, {
      timeout: 10 * 1000,
    });

    if (response.status === 400 || response.status === 500) {
      throw response.data;
    }

    return response.data;
  } catch (error) {
    toast.error('Something went wrong');
    throw error;
  }
};

export const createUser = async (email, token) => {
  try {
    const image = '';
    const res = await api.post(
      `/user/register`,
      { email, image },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    if (res.status === 200) {
      toast(res?.data?.message);
      throw res?.data;
    }
  } catch (error) {
    toast.error(error);
    throw error;
  }
};

export const bookVisit = async (date, propertyId, email, token) => {
  console.log({ date, propertyId, email, token });
  try {
    await api.post(
      `/user/bookVisit/${propertyId}`,
      {
        email,
        date: dayjs(date).format('DD/MM/YY'),
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
  } catch (error) {
    toast.error(error);
    throw error;
  }
};

export const removeBooking = async (id, email, token) => {
  try {
    await api.post(
      `/user/removeBooking/${id}`,
      { email },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
  } catch (error) {
    toast.error(error);
    throw error;
  }
};

export const toFav = async (id, email, token) => {
  try {
    await api.post(
      `/user/addRemoveFavoriteResidency/${id}`,
      { email },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
  } catch (error) {
    toast.error(error);
    throw error;
  }
};

export const getAllfav = async (email, token) => {
  if (!token) return;
  try {
    const res = await api.post(
      `/user/allFavorites`,
      { email },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    return res?.data['favResidenciesID'];
  } catch (error) {
    toast.error(error);
    throw error;
  }
};

export const getAllBookings = async (email, token) => {
  if (!token) return;
  try {
    const res = await api.post(
      `/user/allBookings`,
      { email },
      {
        headers: `Bearer ${token}`,
      }
    );

    return res?.data['bookedVisits'];
  } catch (error) {
    toast.error(error);
    throw error;
  }
};

export const createResidency = async (data, token) => {
  console.log({ data, token });
  try {
    const res = await api.post(
      '/residency/create',
      { data },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
  } catch (error) {
    toast.error(error);
    throw error;
  }
};
