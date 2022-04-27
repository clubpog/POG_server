import { EventStoreServiceImplement } from './EventStoreService';
import { Module, Provider } from '@nestjs/common';
import { EInfrastructureInjectionToken } from '@app/common-config/enum/InfrastructureInjectionToken';

const infrastructure: Provider[] = [
  {
    provide: EInfrastructureInjectionToken.EVENT_STORE.name,
    useClass: EventStoreServiceImplement,
  },
];

@Module({
  providers: [...infrastructure],
  exports: [...infrastructure],
})
export class EventStoreModule {}
