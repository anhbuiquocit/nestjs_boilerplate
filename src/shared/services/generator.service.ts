import * as uuid from 'uuid';
import { Injectable } from '@nestjs/common';

@Injectable()
export class GeneratorService {
    public uuid(): string {
        return uuid();
    }
    public fileName(ext: string) {
        return this.uuid() + '.' + ext;
    }
}