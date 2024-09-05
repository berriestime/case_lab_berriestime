import { createDirectus, rest, readItems, readAssetRaw } from '@directus/sdk';

const client = createDirectus('http://localhost:8055/').with(rest());

const fetchPhotos = async () => {
  return await client.request(
    readItems('photos', {
      fields: ['id', 'awesome_image', 'date_created'],
    })
  );
};

const transform = async (photos) => {
  return await Promise.all(
    photos.map(async ({ id, awesome_image, date_created }) => {
      try {
        const thumbnailUrl = new URL(
          `/assets/${awesome_image}`,
          'http://localhost:8055'
        );
        thumbnailUrl.searchParams.append('fit', 'cover');
        thumbnailUrl.searchParams.append('width', '300');
        thumbnailUrl.searchParams.append('height', '300');
        thumbnailUrl.searchParams.append('quality', '80');

        return {
          id: id,
          thumbnailUrl: thumbnailUrl.href,
          fullImageUrl: `http://localhost:8055/assets/${awesome_image}`,
          date_created: new Date(date_created),
        };
      } catch (error) {
        console.error('Error fetching thumbnail:', error);
        return {
          id: id,
          thumbnailUrl: '',
          fullImageUrl: '',
          date_created: new Date(date_created),
        };
      }
    })
  );
};

const getPhotosWithThumbnails = async () => {
  const rawPhotos = await fetchPhotos();
  const dataWithThumbnails = await transform(rawPhotos);

  return dataWithThumbnails;
};

export { getPhotosWithThumbnails };
