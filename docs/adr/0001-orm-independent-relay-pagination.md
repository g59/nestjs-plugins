# Keep Relay pagination independent of the ORM

**Status** Proposed

The public pagination helper currently takes a TypeORM repository even though its Relay logic only needs the page of rows and the total number of matches. In the next major release, callers supply a function that receives the offset and limit and returns those two results. The helper keeps the existing Relay connection shape and offset cursor encoding, and applications choose how to query their data.

The example uses Node.js's built-in SQLite API to show the page loader with a real database and avoid an ORM and a native npm add-on. It continues to open the existing SQLite file and read the existing recipe table. Local development and tests require Node.js 22.13 or later so SQLite is available without a flag.
