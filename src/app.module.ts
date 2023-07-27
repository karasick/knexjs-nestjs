import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './domains/user/user.module';
import { KnexModule } from 'nest-knexjs';
import { DepartmentModule } from './domains/department/department.module';

@Module({
  imports: [
    KnexModule.forRoot({
      config: {
        debug: false,
        client: 'pg',
        connection: {
          host: '127.0.0.1',
          user: 'postgres',
          password: 'postgres',
          database: 'test',
          port: 5432,
        },
      },
    }),
    DepartmentModule,
    UserModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
