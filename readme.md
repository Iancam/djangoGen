# Read Me

DjangoGen is a django crud generator for JavaScript. Generate a CRUD backend for your SPA front-end without the hassle of switching languages.

`djangoGen gen <appName> <schema.json>`

DjangoGen takes a schema like the one below.

```json
{
  "Book": {
    "title": "string",
    "url": "url",
    "author": "string",
    "category": "mtm 'Category' through:'BookCategory'"
  },
  "Category": {
    "name": "string"
  },
  "User": {
    "name": "string",
    "email": "email",
    "password_digest": "string",
    "intro": "text"
  },
  "BookCategory": {
    "book": "references",
    "category": "references"
  },
  "UserHistory": {
    "progress": "integer",
    "book": "references",
    "user": "references"
  }
}
```

Thanks go to (Django Builder)[https://djangobuilder.io/#/] for reference code and inspiration.

# Other commands

## gen directory modelsFile

`gen <appName> <modelsFile.json>`

This generates a Django RestFramework CRUD app. It will be populated with classes and views from the modelsFile.

## example

logs the above example file:

## types

logs the many types available in Django

```js
[
  "ManyToMany",
  "Auto",
  "BigAuto",
  "BigInteger",
  "Binary",
  "Boolean",
  "Char",
  "Date",
  "DateTime",
  "Decimal",
  "Duration",
  "Email",
  "File",
  "FilePath",
  "Float",
  "Image",
  "Integer",
  "GenericIPAddress",
  "JSON",
  "NullBoolean",
  "PositiveBigInteger",
  "PositiveInteger",
  "PositiveSmallInteger",
  "Slug",
  "SmallAuto",
  "SmallInteger",
  "Text",
  "Time",
  "URL",
  "UUID",
  "ForeignKey",
];
```
