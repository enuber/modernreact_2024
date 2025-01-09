import type { PackageDetails } from '../types/packageDetails';

// using caps just suggests that this shouldn't be changed. Can change the packages if want to change the features
const FEATURED_PACKAGES = ['react', 'typescript', 'esbuild', 'vite'];

export async function getFeaturedPackages() {
  const promises = FEATURED_PACKAGES.map(async (name) => {
    const res = await fetch(`https://registry.npmjs.org/${name}`);
    return res.json();
  });
  const data: PackageDetails[] = await Promise.all(promises);

  return data;
}
