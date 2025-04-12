import { ImageResponse } from 'next/og';
import { createElement } from 'react';
import sharp from 'sharp';

class Watermark {
  static async getImageSize(imageUrl) {
    try {
      const res = await fetch(imageUrl, {
        headers: {
          'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/58.0.3029.110 Safari/537.3'
        }
      });

      if (!res.ok) {
        throw new Error(`Failed to fetch image: ${res.statusText}`);
      }

      const contentType = res.headers.get('content-type');

      if (!contentType || !contentType.startsWith('image/')) {
        throw new Error('Fetched content is not an image');
      }

      if (contentType === 'image/webp') {
        throw new Error('WebP format is not supported');
      }

      const arrayBuffer = await res.arrayBuffer();
      const buffer = Buffer.from(arrayBuffer);
      const metadata = await sharp(buffer).metadata();

      if (!metadata.width || !metadata.height) {
        throw new Error('Image size not found');
      }

      return { width: metadata.width, height: metadata.height };
    } catch (error) {
      throw new Error(`Error getting image size: ${
        error instanceof Error ? error.message : 'Unknown error'
      }`);
    }
  }

  static async generateReactComponent(imageUrl, size, watermarkText) {
    return createElement('div', {
      style: {
        width: `${size.width}px`,
        height: `${size.height}px`,
        position: 'relative',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
      },
    }, [
      createElement(
        'img',
        {
          src: imageUrl,
          style: { width: '100%', height: '100%', objectFit: 'cover' },
        },
      ),
      createElement(
        'span',
        {
          style: {
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%) rotate(-15deg)',
            padding: '0.5rem 1rem',
            borderRadius: '0.5rem',
            backgroundColor: 'rgba(0, 0, 0, 0.5)',
            color: 'white',
            fontSize: '2rem',
            fontWeight: 'bold',
            opacity: 0.5,
          },
        },
        watermarkText,
      ),
    ]);
  }

  static async generateImageResponse(imageUrl, watermarkText) {
    const size = await this.getImageSize(imageUrl);
    const component = await this.generateReactComponent(
      imageUrl,
      size,
      watermarkText,
    );

    return new ImageResponse(component, {
      width: size.width,
      height: size.height,
    });
  }
}

export default Watermark;