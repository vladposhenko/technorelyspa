import {forwardRef, Module} from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import {JwtModule} from "@nestjs/jwt";
import {UserModule} from "../users/user.module";

@Module({
  providers: [AuthService],
  controllers: [AuthController],
  imports:[
      forwardRef(() => UserModule),
      JwtModule.register({
          secret: process.env.PRIVATE_KEY || 'SECRET',
          signOptions: {
              expiresIn:'24h'
          }
      })
  ],
    exports:[
        AuthService,
        JwtModule
    ]
})
export class AuthModule {

}
