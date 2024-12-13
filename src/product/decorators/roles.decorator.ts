import { SetMetadata } from '@nestjs/common';

console.log('hello from decorator');
export const Roles = (...roles: string[]) => SetMetadata('roles', roles);
