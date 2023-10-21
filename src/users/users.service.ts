import { Injectable } from '@nestjs/common';
import { ElasticsearchService } from '@nestjs/elasticsearch';

@Injectable()
export class UsersService {
  constructor(private readonly esService: ElasticsearchService) {}

  async get() {
    const value = await this.esService.search({
      index: 'cartoons',
      query: { fuzzy: { author: 'Chetan' } },
    });

    return value;
  }

  async add() {
    await this.esService.index({
      index: 'cartoons',
      document: {
        title: 'Title',
        description: 'Desc',
        author: 'chetan',
      },
    });
    return { success: true, message: 'Saved Successfully' };
  }
}
