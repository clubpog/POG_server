import { Module, Provider } from '@nestjs/common';
import { EInfrastructureInjectionToken } from '@app/common-config/enum/InfrastructureInjectionToken';
import { EventStoreTestServiceImplement } from './EventStoreTestService';

const infrastructure: Provider[] = [
  {
    provide: EInfrastructureInjectionToken.EVENT_STORE.name,
    useClass: EventStoreTestServiceImplement,
  },
];

@Module({
  providers: [...infrastructure],
  exports: [...infrastructure],
})
export class EventStoreTestModule {}
