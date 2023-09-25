import { PaginationParams } from '@/core/repositories/Pagination-params';
import { QuestionsCommentsRepository } from '@/domain/forum/application/repositories/question-comments-repository';
import { QuestionComment } from '@/domain/forum/enterprise/entities/question-comment';

export class InMemoryQuestionCommentsRepository
  implements QuestionsCommentsRepository
{
  public items: QuestionComment[] = [];

  async findById(id: string) {
    const comment = this.items.find((item) => item.id.toString() === id);

    if (!comment) {
      return null;
    }

    return comment;
  }

  async findManyByQuestionId(questionId: string, { page }: PaginationParams) {
    const questionComments = this.items
      .filter((item) => item.questionId.toString() === questionId)
      .slice((page - 1) * 20, page * 20);

    return questionComments;
  }

  async create(questionComment: QuestionComment) {
    this.items.push(questionComment);
  }

  async delete(comment: QuestionComment) {
    const itemIndex = this.items.findIndex((item) => item.id === comment.id);

    this.items.splice(itemIndex, 1);
  }
}
