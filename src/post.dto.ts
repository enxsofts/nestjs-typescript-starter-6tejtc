import { ApiProperty } from '@nestjs/swagger';

export class Post {
    @ApiProperty()
    userId: number;

    @ApiProperty()
    id: number;

    @ApiProperty()
    title: string;

    @ApiProperty()
    body: string;
}