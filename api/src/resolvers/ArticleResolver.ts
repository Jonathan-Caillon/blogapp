import { Ctx, Arg, Mutation, Resolver, Query } from "type-graphql";
import { Article } from "../models/Article";

@Resolver()
export class ArticleResolver {
  @Query(() => [Article])
  async getUserArticles(@Ctx() context: any): Promise<Article[]> {
    const user = context.user;

    if (user === null) throw new Error(`The user is not connected`);

    const articles = Article.find({
      relations: {
        creator: true,
      },
      where: {
        creator: {
          id: user.id,
        },
      },
    });

    return articles;
  }

  @Mutation(() => Article)
  async createArticle(
    @Arg("title") title: string,
    @Arg("description") description: string,
    @Arg("content") content: string,
    @Ctx() context: any
  ): Promise<Article> {
    if (title === null || description === null || content === null) {
      throw new Error("All fields are required");
    }

    const user = context.user;

    if (user === null) throw new Error(`The user is not connected`);

    const newArticle = await Article.create({
      title,
      description,
      content,
      creator: user.id,
    }).save();

    return newArticle;
  }
}
