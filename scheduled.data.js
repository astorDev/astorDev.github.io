import { createArticlesLoader } from "./articles.data";

export default createArticlesLoader((post) => !post.published);