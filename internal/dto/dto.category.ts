export interface CategoryDTO {
  id: number;
  name: string;
  slug: string;
  image: string;
  miniature: string;
}

export interface CreateCategoryDTO {
  name: string;
  slug: string;
  image: string;
  miniature: string;
}

export interface CreateCategoryDTOWithoutFiles
  extends Omit<CreateCategoryDTO, "image" | "miniature"> {}
