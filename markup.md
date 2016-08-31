{{# display }}

## Markup

Markup inside locale files is considered a code
smell and should be addressed in another way
for example by using placeholders

| Key | Value |
|-----|-------|
{{# errors }}
| ```{{ key }}``` | {{ value }} |
{{/ errors }}

{{/ display }}
