// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

import { createDirectus, rest, readItems } from '@directus/sdk';
const client = createDirectus('http://http://localhost:8055/').with(rest());

const fetch = async () => {
  return await client.request(
    readItems('photos', {
      fields: ['id', 'awesome_image', 'date_created'],
    })
  );
};

const transform = (photos) => {
  return photos.map(({ id, awesome_image, date_created }) => ({
    id: id,
    awesome_image: awesome_image,
    date_created: new Date(date_created),
  }));
};

const getPhotos = async () => {
  const raw = await fetch();
  const data = transform(raw);

  return data;
};

export { getPhotos };
