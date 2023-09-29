import { QuestionAttachment } from '../../enterprise/entities/question-attachment';

export interface QuestionsAttachmentsRepository {
  findManyByQuestionId(questionId: string): Promise<QuestionAttachment[]>;
}
