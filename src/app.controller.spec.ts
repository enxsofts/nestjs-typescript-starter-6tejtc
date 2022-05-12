import { Test, TestingModule } from '@nestjs/testing';
import { allPosts, onePost } from '../data/dummy';
import { AppController } from './app.controller';
import { AppService } from './app.service';

describe('AppController', () => {
  let appController: AppController;
  const mockService = {
    getHello: jest.fn().mockImplementation(()=> {
      return 'Hello World!';
    }),
    getOnePost: jest.fn().mockImplementation(()=>{
      return onePost;
    }),
    getAllPosts: jest.fn().mockImplementation(()=>{
      return allPosts;
    }),
  }
  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [AppController],
      providers: [AppService],
    })
    .overrideProvider(AppService)
    .useValue(mockService)
    .compile();

    appController = app.get<AppController>(AppController);
  });

  describe('app controller', () => {
    it('should return "Hello World!"', () => {
      expect(appController.getHello()).toBe('Hello World!');
    });

    it('should return single post', () => {
      const id = Number(onePost.id);
      expect(appController.getOnePost(id)).toEqual(onePost);
    });

    it('should return all posts', () => {
      expect(appController.getAllPosts()).toEqual(allPosts);
    });
  });
});
