import { Client } from "@notionhq/client";

const notion = new Client({ auth: process.env.NOTION_TOKEN, }); 

const  simplifyPage = (page)=>{
  page.page_title = null
  let properties = Object.keys(page?.properties)
  properties.forEach((property) => {

    switch (page.properties[property].type) {
      case "number":
        if (page.properties[property][page.properties[property].type] === null) break
        page[property] = page.properties[property][page.properties[property].type]
        break;

      case "relation":
        page[property] = page.properties[property][page.properties[property].type].map((el) => el.id)
        break

      case "select":
        if (page.properties[property][page.properties[property].type] === null) break
        page[property] = page.properties[property][page.properties[property].type].name
        break
      case "multi_select":
        page[property] = page.properties[property][page.properties[property].type].map(el => el.name)
        break

      case "checkbox":
        page[property] = page.properties[property][page.properties[property].type]
        break

      case "date":
        let formatted = null
        if (page.properties[property][page.properties[property].type] === null){
          page[property] = {start : null, end : null, formatted}
          break  
        }
        page[property] = page.properties[property][page.properties[property].type]
        formatted = new Date(page[property].start).toLocaleString("fr-FR", { year: "numeric" });
        if (!!page[property].end) formatted = `${formatted} → ${new Date(page[property].end).toLocaleString("fr-FR", { year: "numeric" })}`;
        page[property].formatted = formatted;
        delete page[property].time_zone
        break

      case "rich_text":
        page[property] = page.properties[property][page.properties[property].type].map(el => el.plain_text).join("")
        break

      case "title":
        page[property] = page.properties[property][page.properties[property].type].map(el => el.plain_text).join("")
        page.page_title = page[property]
        break

      default:
        console.log(property, page.properties[property]);

        break;
    }
  })
  delete page.properties;
  delete page.object;
  delete page.created_time;
  delete page.created_by;
  delete page.last_edited_by;
  delete page.last_edited_time;
  page.cover = page.cover ? page.cover[page.cover.type].url : null;
  page.icon = page.icon ? page.icon.emoji : null;
  page.parent = page.parent ? page.parent[page.parent.type] : null
  
  return page
}



export const getDatabase = async (databaseId, filter, sort) => {
  const response = await notion.databases.query({
    database_id: databaseId,
    filter : filter,
    sorts: sort
  });

  return response.results.map(page => simplifyPage(page));
};

export const getPage = async (pageId) => {
  const response = await notion.pages.retrieve({ page_id: pageId });
  return simplifyPage(response)
};

export const getBlocks = async (blockId) => {
  const response = await notion.blocks.children.list({
    block_id: blockId,
    page_size: 50,
  });
  return response.results;
};

export const getContent = async (blockId) => {

  const blocks = await getBlocks(blockId);
  // Retrieve block children for nested blocks (one level deep), for example toggle blocks
  // https://developers.notion.com/docs/working-with-page-content#reading-nested-blocks
  const childBlocks = await Promise.all(
    blocks
      .filter((block) => block.has_children)
      .map(async (block) => {
        return {
          id: block.id,
          children: await getBlocks(block.id),
        };
      })
  );

  const blocksWithChildren = await Promise.all(
    blocks.map(async (block) => {
      // Add child blocks if the block should contain children but none exists
      if (block.has_children && !block[block.type].children) {
        block[block.type]["children"] = childBlocks.find(
          (x) => x.id === block.id
        )?.children;
      }
      // if (block.type === "child_database") {
      //   const database = databases.filter((database) => (database.name === block[block.type].title))[0]
      //   if (!database) return ({})
      //   block[block.type].blocks = await getDatabase(database.id, database.filter, database.sort);
      // }
      return block;
    })
  );
  return blocksWithChildren;
};
