import { makeAnswer } from 'test/factories/make-answer';
import { InMemoryAnswersRepository } from 'test/repositories/in-memory-answers-repository';
import { InMemoryAnswerAttachmentsRepository } from 'test/repositories/in-memory-answer-attachments-repository';

import { OnAnswerCreated } from './on-answer-created';

let inMemoryAnswerAttachmentsRepository: InMemoryAnswerAttachmentsRepository;
let inMemoryAnswersRepository: InMemoryAnswersRepository;

describe('On answer created', () => {
  beforeEach(() => {
    inMemoryAnswerAttachmentsRepository =
      new InMemoryAnswerAttachmentsRepository();

    inMemoryAnswersRepository = new InMemoryAnswersRepository(
      inMemoryAnswerAttachmentsRepository,
    );
  });

  it('should be able to send a notification when an answer is created', async () => {
    const onAnswerCreated = new OnAnswerCreated();

    const answer = makeAnswer();

    await inMemoryAnswersRepository.save(answer);
  });
});
