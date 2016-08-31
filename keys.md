{{# display }}

## Keys

You should take care when merging files with duplicate keys,
especially when they have different values as this can lead to unexpected
results.

| Key | Value |
|-----|-------|
{{# errors }}
{{# values }}
| ```{{ key }}``` | {{ . }} |
{{/ values }}
| | |
{{/ errors }}

{{/ display }}
