import { vi } from 'vitest';

import { AggregateRoot } from '../entities/aggregate-root';
import { UniqueEntityID } from '../entities/unique-entity-id';
import { DomainEvent } from './domain-event';
import { DomainEvents } from './domain-events';

class CustomAggregateCreated implements DomainEvent {
  public ocurredAt: Date;
  private aggregate: CustomAggregate;

  constructor(aggregate: CustomAggregate) {
    this.ocurredAt = new Date();
    this.aggregate = aggregate;
  }

  getAggregateId(): UniqueEntityID {
    return this.aggregate.id;
  }
}

class CustomAggregate extends AggregateRoot<null> {
  static create() {
    const aggregate = new CustomAggregate(null);

    aggregate.addDomainEvent(new CustomAggregateCreated(aggregate));

    return aggregate;
  }
}

describe('Domain event', () => {
  it('should be able to dispatch and listen to events', () => {
    const callbackSpy = vi.fn();

    //Subscribe cadastrado (ouvindo o evento)
    DomainEvents.register(callbackSpy, CustomAggregateCreated.name);

    //Estou criando uma resposta SEM salvar
    const aggregate = CustomAggregate.create();

    //Estou assegurando que o evento não foi disparado
    expect(aggregate.domainEvents).toHaveLength(1);

    //Estou salvando a resposta no banco e assim disparando o evento
    DomainEvents.dispatchEventsForAggregate(aggregate.id);

    // O subscribe ouve o evento e faz o que tem que ser feito
    expect(callbackSpy).toHaveBeenCalledTimes(1);
    expect(aggregate.domainEvents).toHaveLength(0);
  });
});
