import * as s from "superstruct";
import isUuid from "is-uuid";


export const CreateProduct = s.object({
    name: s.size(s.string(), 1, 100),
    description: s.string(),
    price: s.min(s.number(), 0),
    tags: s.array(s.string()),
});


export const CreateArticle = s.object({
    title: s.size(s.string(), 1, 100),
    content: s.string(),
});

export const CreateComment = s.refine(s.object({
    content: s.string(),
    productId: s.optional(s.define('Uuid', (value) => isUuid.v4(value))),
    articleId: s.optional(s.define('Uuid', (value) => isUuid.v4(value))),
}),
    'EitherProductIdOrArticleId',//검증 규칙 이름
    (value) => {
        const { productId, articleId } = value;
        // 실패 케이스: (둘 다 있거나) OR (둘 다 없거나)
        if ((productId && articleId) || (!productId && !articleId)) {
            return 'Comment must have *either* a productId *or* an articleId, but not both.';
        }

        // 성공 케이스: 둘 중 하나만 존재함
        return true;
    });

export const PatchProduct = s.partial(CreateProduct);
export const PatchArticle = s.partial(CreateArticle);
export const PatchComment = s.object({ content: s.optional(s.string()), });