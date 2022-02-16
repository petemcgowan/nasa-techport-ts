export interface ImageType {
  imageUrl: string;
  imageTitle: string;
  imageDescription: string;
}

export interface ProjectType {
  id: string;
  title: string;
  startDate: string;
  endDate: string;
  status: string;
  website: string;
  allImages: ImageType[];
  primaryImageUrl: string;
  definition: string;
  exampleTechnologies: string;
  benefits: string;
  hasTaxonomy: boolean;
  hasImages: boolean;
}
