import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { Post } from './post.dto';
import * as fs from 'fs';

@Injectable()
export class AppService {
  getHello(): string {
    return 'Hello World!';
  }

  async getOnePost(postId): Promise<Post> {
    if(isNaN(postId)){
      throw new BadRequestException(`Post is not valid.`);
    }
    const postsList = JSON.parse(fs.readFileSync('data/posts.json', 'utf8'));
    const post: Post = postsList.find(obj => Number(obj.id) === postId);
    if(!post){
      throw new NotFoundException(`No result found for post id "${postId}"`);
    }
    return post;
  }

  async getAllPosts(): Promise<Post[]> {
    const postsList = JSON.parse(fs.readFileSync('data/posts.json', 'utf8'));
    return postsList;
  }
}
