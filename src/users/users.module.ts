import { Module } from '@nestjs/common';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { ElasticsearchModule } from '@nestjs/elasticsearch';
import { ConfigModule, ConfigService } from '@nestjs/config';

@Module({
  imports: [
    ElasticsearchModule.registerAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => {
        return {
          node: configService.get('ES_URL'),
        };
      },
      inject: [ConfigService],
    }),
  ],
  controllers: [UsersController],
  providers: [UsersService],
})
export class UsersModule {}
