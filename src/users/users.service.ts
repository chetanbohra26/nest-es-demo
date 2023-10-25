import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { ElasticsearchService } from '@nestjs/elasticsearch';

@Injectable()
export class UsersService {
  constructor(
    private readonly esService: ElasticsearchService,
    private readonly configService: ConfigService,
  ) {}

  async get() {
    const value = await this.esService.search({
      index: this.configService.get('ES_INDEX_NAME'),
      query: { fuzzy: { name: 'Chetan' } },
    });

    return value;
  }

  async add() {
    await this.esService.index({
      index: this.configService.get('ES_INDEX_NAME'),
      document: {
        name: 'chetan',
        designation: 'newbie',
        technologies: ['aws', 'javascript', 'react'],
      },
    });
    return { success: true, message: 'Saved Successfully' };
  }
}
