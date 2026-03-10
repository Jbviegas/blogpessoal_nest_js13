import { Module } from "@nestjs/common";
import { Bcrypt } from "./bcrypt/bcrypt";
import { PassportModule } from "@nestjs/passport";
import { jwtConstants } from "./constants/constats";
import { JwtModule } from "@nestjs/jwt";    
import { UsuarioModule } from "../usuario/usuario.module";
import { AuthService } from "./services/auth.service";
import { JwtStrategy } from "./strategy/jwt.strategy";
import { LocalStrategy } from "./strategy/local.strategy";
import { forwardRef } from "@nestjs/common";
import { AuthController } from "./controllers/auth.controllers";
 
@Module({
    imports: [ 
         forwardRef(() => UsuarioModule),
         PassportModule, 
         JwtModule.register({
        secret: jwtConstants.secret,
        signOptions: { expiresIn: '1h' },
    })],
    providers: [Bcrypt,
         AuthService,
          LocalStrategy, 
          JwtStrategy],
    controllers: [AuthController],
    exports: [Bcrypt],
})
export class AuthModule {};