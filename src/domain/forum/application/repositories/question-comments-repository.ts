import { PaginationParams } from '@/core/repositories/Pagination-params';
import { QuestionComment } from '../../enterprise/entities/question-comment';

export interface QuestionsCommentsRepository {
  findById(id: string): Promise<QuestionComment | null>;
  findManyByQuestionId(
    questionId: string,
    params: PaginationParams,
  ): Promise<QuestionComment[]>;
  create(comment: QuestionComment): Promise<void>;
  delete(comment: QuestionComment): Promise<void>;
}
