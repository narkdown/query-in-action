# @narkdown/query-in-action

[![GitHub Action: View on Marketplace](https://img.shields.io/badge/GitHub%20Action-View_on_Marketplace-blue?logo=github)](https://github.com/marketplace/actions/narkdown-query-in-action)
[![narkdown](https://github.com/younho9/awesome-reading-list/actions/workflows/narkdown.yml/badge.svg?branch=main&event=schedule)](https://github.com/younho9/awesome-reading-list/actions/workflows/narkdown.yml)
[![GitHub version](https://badge.fury.io/gh/narkdown%2Fquery-in-action.svg)](https://badge.fury.io/gh/narkdown%2Fquery-in-action)
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

## Related

- [@narkdown/client](https://github.com/narkdown/client)
- [@narkdown/notion-parser](https://github.com/narkdown/notion-parser)
- [@narkdown/render-with-ejs](https://github.com/narkdown/render-with-ejs)

## License

[MIT](LICENSE)
