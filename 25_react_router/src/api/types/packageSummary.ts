// keywords? - means it may or may not exist.
export interface PackageSummary {
  name: string;
  version: string;
  description: string;
  keywords?: string[];
}
