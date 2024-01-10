---
type: note
title: Markdown with a query
---

# Heading in dynamic markdown file

#testtag

```markdownquery
select file_path, value from files, json_each(files.metadata, '$.tags');
```