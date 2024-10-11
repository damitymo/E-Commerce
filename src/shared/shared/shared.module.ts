import { Module, Global } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';

@Module({imports: [ConfigModule, JwtModule.registerAsync({
    imports: [ConfigModule],
    inject: [ConfigService],
    useFactory: async (configService: ConfigService) => {
       const secret = configService.get<string>('JWT_SECRET');
       if (!secret) {
            throw new Error('JWT_SECRET is not defined');
        }
        return {
            secret,
            signOptions: { expiresIn: '60m' },
      };
    },
}),
],
exports: [JwtModule],
})
export class SharedModule {}
