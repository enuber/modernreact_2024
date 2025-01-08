import type { PackageSummary } from '../../api/types/packageSummary';
import { searchPackages } from '../../api/queries/searchPackages';

export interface SearchLoaderResult {
  searchResults: PackageSummary[];
}

export async function searchLoader({
  request,
}: {
  request: Request;
}): Promise<SearchLoaderResult> {
  const { searchParams } = new URL(request.url);
  const term = searchParams.get('term');
  if (!term) {
    throw new Error('Search term must be provided');
  }
  const results = await searchPackages(term);

  // good habit to return as an object but not necessary. Just makes it easier to add more queries and results to the return if several requests were being made or, multiple things needed to be passed.
  return {
    searchResults: results,
  };
}
