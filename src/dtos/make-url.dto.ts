import { IsString } from "class-validator";

export class MakeUrlDto{
    @IsString()
    url: string
}