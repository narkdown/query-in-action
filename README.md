# @narkdown/query-in-action

[![GitHub Action: View on Marketplace](https://img.shields.io/badge/GitHub%20Action-View_on_Marketplace-blue?logo=github)](https://github.com/marketplace/actions/narkdown-query-in-action)
[![narkdown](https://github.com/younho9/awesome-reading-list/actions/workflows/narkdown.yml/badge.svg?branch=main&event=schedule)](https://github.com/younho9/awesome-reading-list/actions/workflows/narkdown.yml)
[![Version: v0.3.2](https://img.shields.io/badge/Version-v0.3.2-green)](https://github.com/younho9/notion2github/releases/tag/v0.3.2)
[![license: MIT](https://img.shields.io/badge/license-MIT-green.svg)](./LICENSE)

This action returns the result of querying and parsing the Notion database.

## Inputs

### `notion-api-key`

**Required** Notion API Key. [How to get Notion API Key](https://developers.notion.com/docs)

### `database-id`

**Required** Notion Database ID.

```
https://www.notion.so/myworkspace/a8aec43384f447ed84390e8e42c2e089?v=...
                                  |--------- Database ID --------|
```

<details>
  <summary>Show advanced input options</summary>

### `date-option-timezone`

Timezone ID used to parse date properties.

_Default_ `Asia/Seoul`

### `date-option-format`

Date formatting rules used to parse data properties.

_Default_ `yyyy-MM-dd HH:mm:ss`

### `sort-option-timestamp`

Database query sorting criteria. `created_time` | `last_edited_time`

_Default_ `created_time`

### `sort-option-direction`

Database query sorting direction. `ascending` | `descending`

_Default_ `descending`

</details>

## Outputs

### `rows`

Parsed result of Notion database rows.

## Example usage

- [younho9/awesome-reading-list](https://github.com/younho9/awesome-reading-list/blob/main/.github/workflows/narkdown.yml)

<details>
  <summary>Show example workflow</summary>

```yaml
name: narkdown

on:
  schedule:
    - cron: 0 0 * * * # KST 9:00 AM on everyday
  push:
    branches:
      - ci/**
  workflow_dispatch: {}

jobs:
  narkdown:
    name: narkdown
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2
      - uses: actions/setup-node@v2

      - id: narkdown-query
        uses: narkdown/query-in-action@v0.3.2
        with:
          database-id: ${{ secrets.DATABASE_ID }}
          notion-api-key: ${{ secrets.NOTION_KEY }}

      - id: create-ejs-data
        uses: actions/github-script@v5
        env:
          rows: ${{ steps.narkdown-query.outputs.rows }}
        with:
          script: |
            const today = new Date();
            const rows = JSON.parse(process.env.rows);
            const categories = [...new Set(rows.map((content) => content.Category))];
            const categorizedLists = categories.map((category) =>
              rows.filter((article) => category === article.Category),
            )

            return {
              date: `${today.getFullYear()}--${today.getMonth() + 1}--${today.getDate()}`,
              count: Object.keys(rows).length,
              categories,
              categorizedLists
            }

      - uses: narkdown/render-with-ejs@v0.1.1
        with:
          template-file-path: template.md
          target-file-path: README.md
          data: ${{ steps.create-ejs-data.outputs.result }}

      - uses: EndBug/add-and-commit@v7
        with:
          message: 'docs: updated by narkdown'
          default_author: github_actions

```

</details>

## Related

- [@narkdown/client](https://github.com/narkdown/client)
- [@narkdown/notion-parser](https://github.com/narkdown/notion-parser)
- [@narkdown/render-with-ejs](https://github.com/narkdown/render-with-ejs)

## License

[MIT](LICENSE)
