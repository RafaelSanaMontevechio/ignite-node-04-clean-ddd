import { Either, left, right } from '@/core/either';

import { QuestionsCommentsRepository } from './../repositories/question-comments-repository';

import { NotAllowedError } from '@/core/errors/errors/not-allowed-error';
import { ResourceNotFoundError } from '@/core/errors/errors/resource-not-found-error';

interface DeleteQuestionCommentUseCaseRequest {
  authorId: string;
  questionCommentId: string;
}

type DeleteQuestionCommentUseCaseResponse = Either<
  ResourceNotFoundError | NotAllowedError,
  {}
>;

export class DeleteQuestionCommentUseCase {
  constructor(
    private questionsCommentsRepository: QuestionsCommentsRepository,
  ) {}

  async execute({
    authorId,
    questionCommentId,
  }: DeleteQuestionCommentUseCaseRequest): Promise<DeleteQuestionCommentUseCaseResponse> {
    const questionComment =
      await this.questionsCommentsRepository.findById(questionCommentId);

    if (!questionComment) {
      return left(new ResourceNotFoundError());
    }

    if (questionComment.authorId.toString() !== authorId) {
      return left(new NotAllowedError());
    }

    await this.questionsCommentsRepository.delete(questionComment);

    return right({});
  }
}
