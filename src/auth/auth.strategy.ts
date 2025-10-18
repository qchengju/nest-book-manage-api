import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';
import { getServerConfig } from '../config/server.config';
import { ConfigEnum } from '../enum/config.enum';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
 constructor() {
   super({
     jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
     ignoreExpiration: false,
     secretOrKey: getServerConfig()?.[ConfigEnum.JWT_SECRET] as string,
   });
 }

 async validate(payload: any) {
   return { userId: payload.sub, username: payload.username };
 }
}