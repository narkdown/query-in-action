const core = require("@actions/core");
const NarkdownClient = require("@narkdown/client").default;
const NotionParser = require("@narkdown/notion-parser").default;

try {
  const notionAPIKey = core.getInput("notion-api-key");
  const databaseId = core.getInput("database-id");

  const propertyOptions = {
    date: {
      locales: "ko-KR",
    },
  };
  const sortOptions = [
    {
      timestamp: "created_time",
      direction: "descending",
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
