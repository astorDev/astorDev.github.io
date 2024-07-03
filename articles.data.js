// posts.data.js
import { createContentLoader } from 'vitepress'

export default createContentLoader(
    'articles/*/*.md', {
        transform(rawData) {
          return rawData
            .sort((a, b) => {
                return +new Date(b.frontmatter.date) - +new Date(a.frontmatter.date)
            }).map((post) => {
                return {
                    url: post.url,
                    frontmatter: post.frontmatter,
                    title: post.frontmatter.title,
                    formattedDate: formatDate(post.frontmatter.date),
                }
            });
        }
    }
);

function formatDate(date) {
    const getMonthName = (date) => new Intl.DateTimeFormat('en-US', { month: 'long' }).format(date);

    const day = String(date.getDate()).padStart(2, '0');
    const month = getMonthName(date);
    const year = String(date.getFullYear()).slice(-2);

    return `${day} ${month} '${year}`;
}