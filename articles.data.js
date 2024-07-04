// posts.data.js
import { createContentLoader } from 'vitepress'

Array.prototype.groupBy = function(keyGetter) {
    return this.reduce((acc, item) => {
      const key = keyGetter(item);
      if (!acc[key]) {
        acc[key] = [];
      }
      acc[key].push(item);
      return acc;
    }, {});
  };
  

export default createArticlesLoader((post) => post.published);

function formatDate(date) {
    if (!date) return '';

    const getMonthName = (date) => new Intl.DateTimeFormat('en-US', { month: 'long' }).format(date);

    const day = String(date.getDate()).padStart(2, '0');
    const month = getMonthName(date);
    const year = String(date.getFullYear()).slice(-2);

    return `${day} ${month} '${year}`;
}

function monthYearFormatted(date) {
    const month = getFullMonthName(date);
    const year = String(date.getFullYear());

    return `${month} ${year}`;
}

function getFullMonthName(date) { 
    return new Intl.DateTimeFormat('en-US', { month: 'long' }).format(date); 
}

export function createArticlesLoader(predicate) {
    return createContentLoader(
        'articles/*/*.md', {
            transform(rawData) {
                return rawData
                    .map(
                        (post) => ({
                            url: post.url,
                            frontmatter: post.frontmatter,
                            title: post.frontmatter.title,
                            formattedDate: formatDate(post.frontmatter.date),
                            published: post.frontmatter.date < new Date(),
                        })
                    )
                    .filter(
                        predicate
                    )
                    .sort(
                        (a, b) => +new Date(b.frontmatter.date) - +new Date(a.frontmatter.date)
                    )
                    .groupBy(
                        (post) => monthYearFormatted(post.frontmatter.date)
                    )
            }
        }
    )
}