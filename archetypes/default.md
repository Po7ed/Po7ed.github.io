---
title: '{{ replace .File.ContentBaseName `-` ` ` | title }}'
date: {{ (time.AsTime .Date).Format "2006-01-02" }}
draft: true
---