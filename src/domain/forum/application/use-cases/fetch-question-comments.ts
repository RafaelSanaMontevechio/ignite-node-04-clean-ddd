import { QuestionComment } from '../../enterprise/entities/question-comment';
import { QuestionsCommentsRepository } from '../repositories/question-comments-repository';

interface FetchQuestionCommentsUseCaseRequest {
  questionId: string;
  page: number;
}

interface FetchQuestionCommentsUseCaseResponse {
  questionComments: QuestionComment[];
}

export class FetchQuestionCommentsUseCase {
  constructor(
    private questionsCommentsRepositoryRepository: QuestionsCommentsRepository,
  ) {}

  async execute({
    questionId,
    page,
  }: FetchQuestionCommentsUseCaseRequest): Promise<FetchQuestionCommentsUseCaseResponse> {
    const questionComments =
      await this.questionsCommentsRepositoryRepository.findManyByQuestionId(
        questionId,
        { page },
      );

    return { questionComments };
  }
}
