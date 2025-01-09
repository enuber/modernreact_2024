//note that react-router-dom has a Params type that can be used as below to indicate we are grabbing just that from the "properties"
import type { Params } from 'react-router-dom';
import type { PackageDetails } from '../../api/types/packageDetails';
import { getPackage } from '../../api/queries/getPackage';

export interface DetailsLoaderResult {
  details: PackageDetails;
}

//could do this instead of below params:Params as easier to read but, this is the exact same thing.
// interface LoaderArgs {
//   params: Params;
// }

//this is an inline type annotation it is saying the first argument to this function is going to be an object that has a params property and it is of type Params.
export async function detailsLoader({
  params,
}: {
  params: Params;
}): Promise<DetailsLoaderResult> {
  const { name } = params;

  if (!name) {
    throw new Error('Package name must be provided in the route');
  }

  const details = await getPackage(name);

  // again creating an object just to be consistent and for better practice in case need to have multiple calls or bits of data to go to the details page.
  return { details };
}
