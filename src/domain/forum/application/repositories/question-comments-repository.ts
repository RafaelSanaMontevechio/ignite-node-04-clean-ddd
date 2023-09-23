import { QuestionComment } from '../../enterprise/entities/question-comment';

export interface QuestionsCommentsRepository {
  create(comment: QuestionComment): Promise<void>;
}
