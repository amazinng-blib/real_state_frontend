import React, { useEffect, useRef, useState } from 'react';
import { AiOutlineCloudUpload } from 'react-icons/ai';
import './UploadImage.css';
import { result } from 'lodash';
import { Button, Group } from '@mantine/core';

const UploadImage = ({
  propertyDetails,
  setPropertyDetails,
  nextStep,
  prevStep,
}) => {
  const [imageURL, setImageURL] = useState(propertyDetails?.image);

  const cloudinaryRef = useRef();
  const widgetRef = useRef();

  const handleNext = (e) => {
    e.preventDefault();
    setPropertyDetails((prev) => ({ ...prev, image: imageURL }));
    nextStep();
  };

  useEffect(() => {
    cloudinaryRef.current = window.cloudinary;
    widgetRef.current = cloudinaryRef.current?.createUploadWidget(
      {
        cloudName: 'ernest-predict',
        uploadPreset: 'ia1wnqyo',
        maxFIles: 1,
      },
      (err, result) => {
        if (result?.event === 'success') {
          setImageURL(result?.info?.secure_url);
        }
      }
    );
  }, []);

  return (
    <div className="flexColCenter uploadWrapper">
      {!imageURL ? (
        <div
          className="flexColCenter uploadZone"
          onClick={() => widgetRef.current?.open()}
        >
          <AiOutlineCloudUpload size={50} color="grey" />
          <span>Upload Image</span>
        </div>
      ) : (
        <div
          className="uploadedImage"
          onClick={() => widgetRef.current?.open()}
        >
          <img src={imageURL} alt="" />
        </div>
      )}

      <Group flex justify="center" mt={'xl'}>
        <Button type="button" onClick={prevStep}>
          {' '}
          Back
        </Button>
        <Button type="button" disabled={!imageURL} onClick={handleNext}>
          Next
        </Button>
      </Group>
    </div>
  );
};

export default UploadImage;
