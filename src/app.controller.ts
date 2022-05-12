import { Controller, Get, Param } from '@nestjs/common';
import { AppService } from './app.service';
import { ApiOperation, ApiOkResponse, ApiNotFoundResponse } from '@nestjs/swagger';
import { Post } from './post.dto';
@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Get('posts/:id')
  @ApiOperation({
    summary: 'Get One Post'
  })
  @ApiOkResponse({ type: Post })
  @ApiNotFoundResponse({ 'description': 'No result found' })
  getOnePost(
    @Param('id')
    id: number
  ): Promise<any> {
    return this.appService.getOnePost(Number(id));
  }

  @Get('posts')
  @ApiOperation({
    summary: 'Get All Posts'
  })
  @ApiOkResponse({ type: Post, isArray: true })
  @ApiNotFoundResponse({ 'description': 'No result found' })
  getAllPosts(): Promise<Post[]> {
    return this.appService.getAllPosts();
  }
}
