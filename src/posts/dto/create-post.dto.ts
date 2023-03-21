import { CreateCategoryDto } from './../../categories/dto/create-category.dto';
import { IsString, IsNotEmpty, IsArray } from 'class-validator';
import { Type } from 'class-transformer';
export class CreatePostDto {
  @IsString({ each: true })
  @IsNotEmpty()
  @IsArray()
  paragraphs: string[];

  @IsString()
  @IsNotEmpty()
  title: string;

  @IsArray()
  @IsNotEmpty()
  @Type(() => CreateCategoryDto)
  categories: CreateCategoryDto[];
}
