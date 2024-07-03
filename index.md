---
layout: home

hero:
  text: "Articles about .NET and more..."
---

<script setup>
import { data as articles } from './articles.data.js'
</script>

<span v-for="article of articles">
  <a :href="article.url">
    <h2>
      {{ article.frontmatter.title }}
    </h2>
  </a>
  <p>
    {{ article.formattedDate }}
  </p>
</span>