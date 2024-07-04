---
layout: home

hero:
    name: "Pss.."
    text: "This is our secret plans"
---

<script setup>
import { data as articleMonthes } from './scheduled.data.js'
</script>

<span v-for="(articles, month) in articleMonthes">
  <h2>{{ month }}</h2>
  <span v-for="article in articles">
      <a :href="article.url" >
        <h3>
          {{ article.frontmatter.title }}
        </h3>
      </a>
      <small>{{ article.formattedDate }}</small>
  </span>
  <br/>
  <br/>
</span>