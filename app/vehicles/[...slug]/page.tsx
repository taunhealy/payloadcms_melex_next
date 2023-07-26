import React from 'react';
import { RenderBlocks } from '@/components/RenderBlocks';
import Image from 'next/image';

type VehiclesT = {
  title: string;
  featuredImage: string;
  introContent: string;
  layout: string;
  url: string;
};

export const Vehicles: React.FC<VehiclesT> = (props) => {
    const { title, featuredImage, introContent, layout, url } = props;
  
    return (
      <div>
        <h1>{title}</h1>
        <Image src={featuredImage} alt="Featured Vehicle" width={500} height={300} />
        <p>{introContent}</p>
        <RenderBlocks layout={layout} />
        <a href={url}>Learn more</a>
      </div>
    );
  };
  