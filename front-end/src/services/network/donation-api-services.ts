import { endpoints } from 'constants/endpoints';
import { get } from 'services/network/api-service';

export const getCategories = async (
  callback?: (data: string) => void
): Promise<string[]> => {
  try {
    const result = await get({
      url: endpoints.categories,
      callback,
    });
    return result.data;
  } catch (error) {
    console.error(error, '-----err in categories');
  }
};
