const core = require("@actions/core");
const {NarkdownClient} = require("@narkdown/client");
const {NotionParser} = require("@narkdown/notion-parser");

try {
  const notionAPIKey = core.getInput("notion-api-key");
  const databaseId = core.getInput("database-id");

  const propertyOptions = {
    date: {
      timeZone: core.getInput("date-option-timezone"),
      format: core.getInput("date-option-format"),
    },
  };
  const sortOptions = [
    {
      timestamp: core.getInput("sort-option-timestamp"),
      direction: core.getInput("sort-option-direction"),
    },
  ];

  (async () => {
    const narkdown = new NarkdownClient({ auth: notionAPIKey });
    const notionParser = new NotionParser({ propertyOptions });
    const { results } = await narkdown.unlimited.databases.queryAll({
      database_id: databaseId,
      sorts: sortOptions,
    });

    core.setOutput("rows", notionParser.database.getRows(results));
  })();
} catch (error) {
  core.setFailed(error.message);
}
