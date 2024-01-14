import { useAuth0 } from '@auth0/auth0-react';
import { Box, Button, Group, NumberInput } from '@mantine/core';
import { useForm } from '@mantine/form';
import UserDetailContext from '../../context/UserDetailsContext';
import React, { useContext } from 'react';
import useProperties from '../../hooks/useProperties';
import { useMutation } from 'react-query';
import { toast } from 'react-toastify';
import { createResidency } from '../../utils/api';

const Facilities = ({
  prevStep,
  propertyDetails,
  setPropertyDetails,
  setOpened,
  setActiveStep,
}) => {
  const form = useForm({
    initialValues: {
      bedrooms: propertyDetails?.facilities?.bedrooms,
      parkings: propertyDetails?.facilities?.parkings,
      bathrooms: propertyDetails?.facilities?.bathrooms,
    },
    validate: {
      bedrooms: (value) =>
        value < 1 ? 'Must have at least  one bedroom' : null,
      bathrooms: (value) =>
        value < 1 ? 'Must have at least  one bathroom' : null,
    },
  });

  const { bathrooms, bedrooms, parkings } = form.values;
  //   console.log({bathrooms, bedrooms, parkings})

  const handleSubmit = () => {
    console.log({ propertyDetails, bathrooms, bedrooms, parkings });

    const { hasErrors } = form.validate();
    if (!hasErrors) {
      setPropertyDetails((prev) => ({
        ...prev,
        facilities: {
          bedrooms,
          parkings,
          bathrooms,
        },
      }));
      mutate();
    }
  };

  //   ******************************* UPLOAD LOGIC

  const { user } = useAuth0();
  const {
    userDetails: { token },
  } = useContext(UserDetailContext);

  const { refetch: refetchProperties } = useProperties();

  const { mutate, isLoading } = useMutation({
    mutationFn: () =>
      createResidency(
        {
          ...propertyDetails,
          facilities: { bedrooms, parkings, bathrooms },
          userEmail: user?.email,
        },
        token
      ),

    onError: ({ response }) =>
      toast.error(response?.data?.message, { position: 'bottom-right' }),
    onSettled: () => {
      toast.success('Added Successfully', { position: 'bottom-right' });
      setPropertyDetails({
        title: '',
        description: '',
        price: 0,
        country: '',
        city: '',
        address: '',
        image: '',
        facilities: {
          bedrooms: 0,
          parkings: 0,
          bathrooms: 0,
        },
        userEmail: user?.email,
      });
      setOpened(false);
      setActiveStep(0);
      refetchProperties();
    },
  });

  return (
    <Box maw={'30%'} mx={'auto'} my={'sm'}>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleSubmit();
        }}
      >
        <NumberInput
          withAsterisk
          label="No of BedRooms"
          min={0}
          {...form.getInputProps('bedrooms', { type: 'input' })}
        />
        <NumberInput
          withAsterisk
          label="No of Parkings"
          min={0}
          {...form.getInputProps('parkings', { type: 'input' })}
        />

        <NumberInput
          withAsterisk
          label="No of BathRooms"
          min={0}
          {...form.getInputProps('bathrooms', { type: 'input' })}
        />

        <Group flex justify="center" mt={'xl'}>
          <Button type="button" onClick={prevStep}>
            {' '}
            Back
          </Button>
          <Button type="submit" color="green" disabled={isLoading}>
            {isLoading ? 'Submitting' : 'Add Property'}
          </Button>
        </Group>
      </form>
    </Box>
  );
};

export default Facilities;
