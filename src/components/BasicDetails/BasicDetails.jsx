import { useForm } from '@mantine/form';
import React from 'react';
import { validateString } from '../../utils/common';
import { Box, Button, Group, NumberInput, TextInput } from '@mantine/core';

const BasicDetails = ({
  prevStep,
  nextStep,
  propertyDetails,
  setPropertyDetails,
}) => {
  const form = useForm({
    initialValues: {
      title: propertyDetails?.title,
      description: propertyDetails?.description,
      price: propertyDetails?.price,
    },
    validate: {
      title: (value) => validateString(value),
      description: (value) => validateString(value),
      price: (value) =>
        value < 1000 ? 'Must be Greater than 9999  dollars' : null,
    },
  });

  const { title, description, price } = form.values;

  const handleSubmit = () => {
    const { hasErrors } = form.validate();
    if (!hasErrors) {
      setPropertyDetails((prev) => ({ ...prev, title, description, price }));
      nextStep();
    }
  };
  return (
    <Box maw={'50%'} mx={'auto'} my={'md'}>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleSubmit();
        }}
      >
        <TextInput
          withAsterisk
          label="Title"
          placeholder="Property Name"
          {...form.getInputProps('title')}
        />
        <TextInput
          withAsterisk
          label="Description"
          placeholder="Description"
          {...form.getInputProps('description')}
        />
        <NumberInput
          withAsterisk
          label="Price"
          placeholder="100,000"
          {...form.getInputProps('price')}
        />

        <Group flex justify="center" mt={'xl'}>
          <Button type="button" onClick={prevStep}>
            {' '}
            Back
          </Button>
          <Button type="submit">Next</Button>
        </Group>
      </form>
    </Box>
  );
};

export default BasicDetails;
