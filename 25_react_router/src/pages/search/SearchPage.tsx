// import type { PackageSummary } from '../../api/types/packageSummary';
import type { SearchLoaderResult } from './searchLoader';
import { useLoaderData } from 'react-router-dom';
import PackageListItem from '../../components/PackageListItem';

export default function SearchPage() {
  // const data = useLoaderData() as { searchResults: PackageSummary[] };
  const { searchResults } = useLoaderData() as SearchLoaderResult;

  const renderedResults = searchResults.map((result) => {
    return <PackageListItem pack={result} key={result.name} />;
  });

  return (
    <div>
      <h1 className="text-2xl font-bold my-6">Search Page</h1>
      <div className="space-y-4 mt-4">{renderedResults}</div>
    </div>
  );
}
