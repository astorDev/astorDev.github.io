---
status: complete
title: PostgreSQL Hostings Prices (some are free)
date: 2024-05-08
---

# PostgreSQL Hostings Prices (some are free)

Recently, for my personal project, I've been looking for ways to move the burden of database management from my shoulders on an external provider. Since PostgreSQL is my main database of choice I was looking for Postgres hostings mostly.

My main objective was to find a cheap (or preferably free) solution. But, at the same time, I wanted to "grow" the solution in a few clicks in case I decided to.

> I also don't want a risk of accidentally burning tons of money like described in [this video](https://www.youtube.com/watch?v=N6lYcXjd4pg). So each time a service gives me a "flexible" price, I'll give it a 🤮 

I was studying various services and their prices. And it took a lot of time, since unfortunately, I couldn't find a comprehensive list on the internet. So I present you my own. 

![](thumb.webp)

## Dead ends 🛑

But first, a few services that appeared in the search but in reality are dead-ends:

💀 ElephantSQL - announced end of life.  
💀 compose.com - Site can not be reached.  
🤑 Kinsta.com - Starts with 0.25 CPU, 0.25 GB RAM, 1 GB Storage for 18$ 🤦  
😒 Supabase - BaaS over Postgres, not a Postgres Hosting.  
🤡 regxa.vercel.app - Under "PostgreSQL Hosting" sells regular VPS.  
🤡 inmotionhosting.com - Under "PostgreSQL Hosting" sells regular VPS.  

And here are the special mentions of web pages that have a page titled something like "Free PostgreSQL hosting" but deliver something completely different. Shame on you!

🤡 WebsitePlanet - Under "5 Best PostgreSQL Hosting Services in 2024" lists random VPS hostings.  
🤡 Bitcatcha - Under "6 Best Free PostgreSQL Hosting (24/7 Customer Support and Unlimited Domain)" lists mostly VPS hostings.  
🤡 alterwebhost .com - Under "12 Cheap PostgreSQL Hosting Providers and Platforms for 2024" lists mostly WordPress hostings.  
🐒 webhostingadvices .com - Under "Cheap PostgreSQL Hosting Providers" lists both valid hostings and just VPS. However, for VPS they mention that it's not Postgres hosting, so that doesn't really qualify for clown.  
🐒 hostingrevelations .com - same situation as with webhostingadvices .com.  
🤡 wphostinggeeks.com - Under "7 Cheapest PostgreSQL Hosting Providers of 2024" lists mostly VPS hostings.  

Unlike all the other list authors I've checked the free tier of each PostgreSQL hosting/cloud on that list and aggregated real and actual prices.

## Aiven 

[Pricing Page](https://aiven.io/pricing?product=pg) - for free select Cloud = DigitalOcean.

`Free tier`: 🏆 Champ!

✅ Full server  
✅ Unlimited Databases  
✅ Useful Dashboards: Logs, Metrics and more  
😿 Doesn't allow restore or fork on the free tier (so have sort of useless backups).

`Paid tier`: 😐

Prices for tier "Startup" via DigitalOcean:

```markdown
| CPU | RAM   | Storage | Monthly price |
|-----|-------|---------|---------------|
| 2   | 4GB   | 80GB    | $75           |
| 4   | 8GB   | 175GB   | $145          |
| 6   | 16GB  | 350GB   | $250          |
| 8   | 32GB  | 700GB   | $480          |
| 16  | 64GB  | 1000GB  | $850          |
| 24  | 128GB | 1400GB  | $1,580        |
| 32  | 192GB | 2200GB  | $2,400        |
```

## Heroku

[Pricing Page](https://elements.heroku.com/addons/heroku-postgresql)

`Free tier`: 🟡 Requires credit card, but provisions for free

😿 Minimal metrics: Only current size, connection, and tables.  
😿 Creates a single oddly named database, not a "server".

`Paid tier`: 🤔

"Standard" plans:

```markdown
| CPU | RAM   | Storage | Monthly price |
|-----|-------|---------|---------------|
| ??  | 4GB   | 64GB    | $50           |
| ??  | 8GB   | 256GB   | $200          |
```

## CleverCloud

[Pricing Page](https://www.clever-cloud.com/pricing/)

`Free tier`: 🟢 

✅ Downloadable Backups (but I wasn't able to open them - `.dump` files)  
😿 Doesn't show any metric on the free tier  
😿 Creates a single oddly named database, not a "server".  

`Paid tier`: 🤸‍♂️

```markdown
| vCPUs | RAM     | Storage   | Monthly Price |
|-------|---------|-----------|---------------|
| 1     | 512 MiB | 1 GiB     | €5.25         |
| 2     | 2 GiB   | 10 GiB    | €41.00        |
| 4     | 4 GiB   | 20 GiB    | €88.00        |
| 6     | 8 GiB   | 40 GiB    | €178.00       |
| 8     | 16 GiB  | 80 GiB    | €360.00       |
| 12    | 64 GiB  | 640 GiB   | €1,730.00     |
| 12    | 64 GiB  | 1,200 GiB | €2,010.00     |
```

## NeonTech

[Pricing Page](https://neon.tech/pricing)

`Free tier`: 🟢

✅ Full server  
✅ Unlimited Databases  
✅ Useful Dashboards: Logs, Metrics and more  
😰 Unclear compute allowance.

`Paid tier` 🤯

🤔 Has odd metrics of compute hours: Compute hrs = CPU size x active hrs.  
🤮 Extra at 15$ per 10 GiB  
🤮 Extra at 0.16$ per compute hour  

```markdown
| Compute        | RAM   | Storage    | Monthly Price |
|----------------|-------|------------|---------------|
| 300 ~ 0.4 CPU  | 16 GB | 10 GiB     | $19           |
| 750 ~ 1 CPU    | 32 GB | 50 GiB     | $69           |
```

## Kamatera

[Pricing Page](https://www.kamatera.com/services/postgresql/?tcampaign=36074_484302&bta=36074&nci=5692)

`Free tier`: 🟡 30 days trial

`Paid tier`:

🤮🤮 Additional traffic $0.01 per GB  
🤮 Additional storage $0.05 per GB per month  

Provides 

```markdown
| CPU | RAM | Storage | Traffic | Monthly Price |
|-----|-----|---------|---------|---------------|
| 2   | 4   | 20 GB   | 1000GB  | $16.00        |
```

## DigitalOcean

[Pricing Page](https://www.digitalocean.com/pricing/managed-databases#postgresql)

`Free tier`: 🟡 Provides 300$ credit

`Paid tier`:

Basic Regular CPU

```markdown
| vCPUs   | RAM    | Storage | Monthly Price |
|---------|--------|---------|---------------|
| 1 vCPU  | 1 GiB  | 10 GiB  | $15.00        |
| 1 vCPU  | 2 GiB  | 30 GiB  | $30.00        |
| 2 vCPUs | 4 GiB  | 60 GiB  | $60.00        |
| 4 vCPUs | 8 GiB  | 140 GiB | $120.00       |
| 6 vCPUs | 16 GiB | 290 GiB | $240.00       |
```

## Scalingo

[Pricing Page](https://scalingo.com/pricing)

`Free tier`: 🟡/🔴 - No direct access to the database

🤦‍♂️ "Direct internet access to your database is disabled. To access your database, you must use our CLI tool."  
😿 No backups  
✅ Useful Dashboards: Metrics and Logs  

`Paid tier`:

🤮 Extra €0.0008333/Gigabyte-hour for storage

```markdown
| CPU | RAM  | Storage | Monthly Price |
|-----|------|---------|---------------|
| ??  | 2 GB | 40 GB   | 28.80 €       |
| ??  | 4 GB | 80 GB   | 160.00 €      |
```

## Render

[Pricing Page](https://render.com/pricing#databases)

`Free tier`: 🔴 - Unconnectable database, that expires in 3 month

🔴 Wasn't able to connect to the created database  
🤦‍♂️ "Your database will expire on August 5, 2024. The database will be deleted unless you upgrade to a paid instance type."  
😿 No backups  
✅ Useful Dashboards: Metrics and Logs  

`Paid tier`: 😐

```markdown
| CPU | RAM    | Storage | Monthly Price |
|-----|--------|---------|---------------|
| 0.1 | 256 MB | 1 GB    | $7            |
| 1   | 1 GB   | 16 GB   | $20           |
| 2   | 4 GB   | 96 GB   | $95           |
| 4   | 8 GB   | 256 GB  | $185          |
```

## Database Labs

`Free tier`: 🔴 - not present

`Paid tier`: 😐

With DigitalOcean as a cloud

```markdown
| CPUs | RAM    | Storage | Monthly price |
|------|--------|---------|---------------|
| 1    | 512 MB | 9 GB    | 19$           |
| 2    | 2 GB   | 32 GB   | 99$           |
| 4    | 8 GB   | 72 GB   | 369$          |
| 12   | 32 GB  | 312 GB  | 1499$         |
```

## ScaleGrid

`Free tier` : 🟡 - Only 30 days trial

`Paid tier`: 😐

```markdown
| CPUs | RAM    | Storage | Monthly price |
|------|--------|---------|---------------|
| 1    | 1 GB   | 18 GB   | $13           |
| 1    | 2 GB   | 30 GB   | $38           |
| 2    | 4 GB   | 60 GB   | $75           |
| 4    | 8 GB   | 140 GB  | $139          |
| 6    | 16 GB  | 300 GB  | $278          |
| 32   | 192 GB | 3840    | $2016         |
```

## Linode a.k.a Akamain

`Free tier`: 🔴 - not present  
`Paid tier`: 🤮 Provides "Dedicated 4 GB" for $65 with no details whatsoever.

## Vultr

[Pricing Page](https://www.vultr.com/pricing/#postgresql)

`Free tier`: 🔴 - not present

`Paid tier`:

"Regular Performance" package

```markdown
| CPUs | RAM    | Storage | Monthly price |
|------|--------|---------|---------------|
| 1    | 1 GB   | 25 GB   | $15           |
| 2    | 4 GB   | 80 GB   | $60           |
```

> Special 🤮 for using `<div/>` instead of `<table>` for pricing table. 

## OVHCloud

[Pricing Page](https://www.ovhcloud.com/en/public-cloud/prices/#7261)

`Free tier`: 🔴 - not present

`Paid tier`: 

🤮 Price per GB of additional storage: $0.46 /month/node

"Essential" plan:

```markdown
| CPUs | RAM    | Storage | Monthly price |
|------|--------|---------|---------------|
| 2    | 4 GB   | 80 GB   | $51.87        |
| 4    | 15 GB  | 320 GB  | $206.46       |
```

## Cloud Clusters

[Pricing Page](https://www.pgsclusters.com/)

`Free tier`: 🔴 - wasn't able to get a trial.

`Paid tier`: 🍏 😈

🚨 The prices look extremely low and the site itself doesn't look trustworthy. Use to your own risk.

```markdown
| CPUs | RAM    | Storage | Monthly price |
|------|--------|---------|---------------|
| 2    | 2 GB   | 60 GB   | $6.99         |
| 4    | 8 GB   | 160 GB  | $23.99        |
```
