import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './typeorm/entities/User';
import { UsersModule } from './users/users.module';

const dbConfig = TypeOrmModule.forRoot({
  type: 'mysql',
  host: 'localhost',
  port: 3306,
  username: 'root',
  password: 'admin@80',
  database: 'nestjs_first',
  entities: [User],
  synchronize: true, // important when CRUD
});

@Module({
  imports: [dbConfig, UsersModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
