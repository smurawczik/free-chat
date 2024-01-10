import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DatabaseModule } from './modules/database/database.module';
import { ContactModule } from './modules/contact/contact.module';
import { PasswordModule } from './modules/password/password.module';
import { PeopleModule } from './modules/people/people.module';
import { UserModule } from './modules/user/user.module';

@Module({
  imports: [
    UserModule,
    ConfigModule.forRoot({
      isGlobal: true,
      cache: true,
    }),
    DatabaseModule,
    PasswordModule,
    ContactModule,
    PeopleModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
