import { BadRequestException, NotFoundException } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { allPosts, onePost } from '../data/dummy';
import { AppService } from './app.service';
jest.mock('fs', () => {
  return {
    readFileSync: jest.fn().mockReturnValue(JSON.stringify(allPosts))
  }
});

describe('AppService', () => {
  let appService: AppService;
  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      providers: [AppService],
    }).compile();
    appService = app.get<AppService>(AppService);
  });
  
  describe('app controller', () => {
    it('should return "Hello World!"', () => {
      expect(appService.getHello()).toBe('Hello World!');
    });
    
    it('should return single post', async () => {
        const id = Number(allPosts[0].id);
        expect(await appService.getOnePost(id)).toEqual(allPosts[0]);
    });
      
    it('should return all posts', async () => {
      expect(await appService.getAllPosts()).toEqual(allPosts);
    });

    it('should return bad request error', async () => {
      try {
        const id = 'mock';
        await appService.getOnePost(id);
      } catch (error) {
        expect(error).toBeInstanceOf(BadRequestException);
      }
    });

    it('should return not found error', async () => {
      try {
        await appService.getOnePost(1251515);
      } catch (error) {
        expect(error).toBeInstanceOf(NotFoundException);
      }
    });

  });
});
