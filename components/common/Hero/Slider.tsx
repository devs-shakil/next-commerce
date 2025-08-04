'use client';

import React from 'react';
//ts
// @ts-ignore
import { Splide, SplideSlide } from '@splidejs/react-splide';
import '@splidejs/splide/dist/css/splide.min.css';
import Image from 'next/image';
import Link from 'next/link';
import {imageBaseUrl} from '@/config/apiConfig'
export const Slider = ({ sliders }: { sliders: any[] }) => {

  return (
    <div>
      <Splide
        options={{
          type: 'loop',
          autoplay: false,
          interval: 3000,
          pauseOnHover: true,
          arrows: true,
          pagination: true,
          speed: 500,
        }}
        aria-label="Hero Slider"
        className="w-full"
      >
        {sliders?.map((slide, index) => (
          <SplideSlide key={index}>
            {/* Desktop */}
            <div className="hidden md:block">
              <Link href={slide.url ? slide.url : '/'} className="block">
                <Image
                  priority={index === 0}
                  alt="Slider image"
                  src={`${imageBaseUrl}/${slide.photo_web}`}
                  width={1930}
                  height={600}
                  quality={90}
                  style={{
                    maxWidth: '100%',
                    height: 'auto',
                    objectFit: 'cover',
                    maxHeight: '600px',
                  }}
                  className="w-full"
                //   placeholder="blur"
                //   blurDataURL={base64Image}
                //   onError={addDefaultSrc}
                />
              </Link>
            </div>
            {/* Mobile */}
            <div className="block md:hidden">
              <Link href={slide.url ? slide.url : '/'} className="block">
                <Image
                  priority={index === 0}
                  alt="Slider image"
                  src={`${imageBaseUrl}/${slide.photo ? slide.photo : slide.photo_web}`}
                  width={400}
                  height={500}
                  quality={100}
                  className="w-full"
                //   placeholder="blur"
                //   blurDataURL={base64Image}
                //   onError={addDefaultSrc}
                />
              </Link>
            </div>
          </SplideSlide>
        ))}
      </Splide>
    </div>
  );
};
