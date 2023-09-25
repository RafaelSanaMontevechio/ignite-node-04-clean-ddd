import { QuestionComment } from '../../enterprise/entities/question-comment';

export interface QuestionsCommentsRepository {
  findById(id: string): Promise<QuestionComment | null>;
  create(comment: QuestionComment): Promise<void>;
  delete(comment: QuestionComment): Promise<void>;
}
