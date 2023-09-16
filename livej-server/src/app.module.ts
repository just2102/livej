import { Module } from '@nestjs/common';
import { AppService } from './app.service';
import { PostService } from './post/post.service';
import { PostModule } from './post/post.module';
import { PrismaModule } from './prisma/prisma.module';

@Module({
  imports: [PostModule, PrismaModule],
  controllers: [],
  providers: [AppService, PostService],
})
export class AppModule {}
