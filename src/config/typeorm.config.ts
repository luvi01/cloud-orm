import { TypeOrmModuleOptions } from '@nestjs/typeorm';


export const typeOrmConfig: TypeOrmModuleOptions = {
    type: 'postgres',
    host: 'PLACE_HOST',
    port: 'PLACE_PORT',
    username: 'PLACE_USER',
    password: 'PLACE_PASSWORD',
    database: 'PLACE_NAME',
    entities: [__dirname + '/../**/*.entity.{js,ts}'],
    synchronize: true
};

