import { IsDate, IsNotEmpty, IsOptional, IsString } from "class-validator";

export class CreateBookDto {
    @IsNotEmpty()
    @IsString()
    author: string;

    @IsNotEmpty()
    @IsString()
    bookName: string;

    @IsOptional()
    @IsString()
    description: string;

    @IsOptional()
    @IsString()
    imageCover: string;

    @IsNotEmpty()
    @IsDate()
    publishTime: Date;
}
