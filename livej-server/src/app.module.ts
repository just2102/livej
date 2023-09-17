import { Module } from '@nestjs/common';
import { AppService } from './app.service';
import { ArticlesModule } from './articles/articles.module';
import { PrismaModule } from './prisma/prisma.module';

@Module({
  imports: [ArticlesModule, PrismaModule],
  controllers: [],
  providers: [AppService],
})
export class AppModule {}
