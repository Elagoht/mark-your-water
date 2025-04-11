# Watermark Generator With Next.js

Generate watermarked images. Nothing more, nothing less.

> Disclaimer: Source images must be available publicly on cross-origin. Webp is not supported.

## Usage

```bash
npm install
npm run build
npm run start
```

Original image:

<https://avatars.githubusercontent.com/u/48291303>

Watermarked image:

<http://localhost:3000/?source=https://avatars.githubusercontent.com/u/48291303&text=marked>

Let's break it down:

```text
http://localhost:3000/
  ?source=[SOURCE_IMAGE_URL]
  &text=[WATERMARK_TEXT]
```

## Deployment

Just don't.

## License

[MIT](LICENSE)
