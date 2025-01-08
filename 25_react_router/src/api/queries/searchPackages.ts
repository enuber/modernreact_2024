import type { PackageSummary } from '../types/packageSummary';

interface SearchResponse {
  objects: {
    package: {
      name: string;
      description: string;
      version: string;
      keywords: string[];
    };
  }[];
}

export async function searchPackages(term: string): Promise<PackageSummary[]> {
  const res = await fetch(
    `https://registry.npmjs.org/-/v1/search?text=${term}`
  );
  const data: SearchResponse = await res.json();

  //note destructing off from item.package.name to just {package} and then from there further grabbing just what we need so instead of package.name, package.version...etc doing package: {name, version...} and because then we have an object being returned that is {name:name, description:description...} we can use a single term since key and value are the same.
  return data.objects.map(
    ({ package: { name, description, version, keywords } }) => {
      return {
        name,
        description,
        version,
        keywords,
      };
    }
  );
}
