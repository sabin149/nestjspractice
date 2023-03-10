import { CreateCategoryDto } from './../../categories/dto/create-category.dto';
import { IsString, IsNotEmpty, IsArray } from 'class-validator';
import { Type } from 'class-transformer';
export class CreatePostDto {
  @IsString()
  @IsNotEmpty()
  content: string;

  @IsString()
  @IsNotEmpty()
  title: string;

  @IsArray()
  @IsNotEmpty()
  @Type(() => CreateCategoryDto)
  categories: CreateCategoryDto[];
}
