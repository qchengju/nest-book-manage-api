import { IsNotEmpty, IsOptional, IsString, Length, Matches } from 'class-validator';
export class CreateMenuDto {
    @IsNotEmpty()
    @IsString()
    @Length(3, 10)
    name: string;

    @IsNotEmpty()
    @IsString({ each: true })
    strategy: string[];
}
