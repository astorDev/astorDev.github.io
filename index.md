---
layout: home

hero:
  text: "Articles about .NET and more..."
---

<script setup>
import { data as articleMonthes } from './articles.data.js'
</script>

<span v-for="(articles, month) in articleMonthes">
  <h2>{{ month }}</h2>
  <span v-for="article in articles">
    <span v-if="article.published">
      <a :href="article.url" >
        <h3>
          {{ article.frontmatter.title }}
        </h3>
      </a>
      <small>{{ article.formattedDate }}</small>
    </span>
  </span>
  <br/>
  <br/>
</span>