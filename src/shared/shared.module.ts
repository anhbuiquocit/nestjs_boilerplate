import { Module, Global } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { GeneratorService } from './services/generator.service';
import { ValidatorService } from './services/validator.service';

const providers = [
    ValidatorService,
    GeneratorService,
];

@Global()
@Module({
    providers,
    imports: [
        JwtModule.registerAsync({
            imports: [SharedModule],
        }),
    ],
    exports: [...providers, JwtModule],
})
export class SharedModule {}