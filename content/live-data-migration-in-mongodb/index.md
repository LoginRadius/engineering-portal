---
title: "Live Data Migration In MongoDB"
date: "2020-12-10"
coverImage: "index.png"
author: "Chinmaya Pati"
tags: ["data-migration", "mongo", "database", "atlas", "livedata"]
description: "This article covers the guide to migrate data from offline or live MongoDB instance using oplog replay alongside mitigate connection switch latency with existing utilities."
---

If you’re coming here for the first time, please take a look at the prequel [Self-Hosted MongoDB](./self-hosted-mongo/).

Alright then, picking from where we left off, let’s get started with the data migration.
Now, the basic steps to migrate data from one MongoDB to another would be:

1. Create a zipped backup of the existing data
2. Dump the data in a new DB

This is very straight forward when the source database is not online. Because we know for sure that there won’t be any new documents created/updated during the migration process.
Let’s look at simple migration first before diving into the live scenario.

<hr />

# Migrating from an offline database

## Creating a backup

We’re going to use an existing utility program [mongodump](https://docs.mongodb.com/database-tools/mongodump/) for creating the database backup.

Run this command in the source database server

```
mongodump --host="hostname:port" \
  --username="username" --password="password" \
  --authenticationDatabase "admin" \
  --db="db name" --collection="collection name" --query='json' \
  --forceTableScan -v --gzip --out ./dump
```

**`--host`**: The source MongoDB hostname along with the port. It defaults to `localhost:27017`. If it is a connection string you can use this option `—-uri="mongodb://username:password@host1[:port1]..."`

**`--username`** : Specifies a username with which to authenticate to a MongoDB database that uses authentication.

**`--password`** : Specifies a password with which to authenticate to a MongoDB database that uses authentication.

**`--authenticationDatabase`** : Specifies the authentication database where the specified `--username` has been created.

> If you do not specify an authentication database or a database to export, mongodump assumes the admin database holds the user’s credentials.

**`--db`** : Specifies the database to take a backup from. If you do not specify a database, mongodump collects from all databases in this instance.

> Alternatively, you can also specify the database directly in the [URI connection string](https://docs.mongodb.com/database-tools/mongodump/#cmdoption-mongodump-uri) i.e. `mongodb://username:password@uri/dbname`. <br /> Providing a connection string while also using `--db` and specifying conflicting information **will result in an error**.

**`--collection`** : Specifies a collection to backup. If you do not specify a collection, this option copies all collections in the specified database or instance to the dump files.

**`--query`** : Provides a [JSON document](https://docs.mongodb.com/manual/reference/glossary/#term-json-document) as a query that optionally limits the documents included in the output of mongodump. <br />
You must enclose the query document in single quotes `('{ ... }')` to ensure that it does not interact with your  environment.<br />
The query must be in [Extended JSON v2 format (either relaxed or canonical/strict mode)](https://docs.mongodb.com/manual/reference/mongodb-extended-json), including enclosing the field names and operators in quotes e.g. `'{ "created_at": { "\$gte": ISODate(...) } }'`.

> To use the `--query` option, you must also specify the [`--collection`](https://docs.mongodb.com/database-tools/mongodump/#cmdoption-mongodump-collection) option.

**`--forceTableScan`** : Forces mongodump to scan the data store directly. Typically, mongodump saves entries as they appear in the index of the `_id` field. <br />

> If you specify a query `--query`, mongodump will use the most appropriate index to support that query. <br />**Hence , you cannot use [`--forceTableScan`](https://docs.mongodb.com/database-tools/mongodump/#cmdoption-mongodump-forcetablescan) with the [`--query`](https://docs.mongodb.com/database-tools/mongodump/#cmdoption-mongodump-query) option**.

**`--gzip`** : Compresses the output. If mongodump outputs to the dump directory, the new feature compresses the individual files. The files have the suffix `.gz`.

**`--out`** : Specifies the directory where mongodump will write [`BSON`](https://docs.mongodb.com/manual/reference/glossary/#term-bson) files for the dumped databases. By default, mongodump saves output files in a directory named dump in the current working directory.

## Restoring the backup

We will use a utility program called [`mongorestore`](https://docs.mongodb.com/database-tools/mongorestore/) for restoring the database backup.

Copy the backup directory dump to the new Database instance and run the following command:

```

mongorestore --uri="mongodb://user:password@host:port/?authSource=admin" \
  --drop --noIndexRestore --gzip -v ./dump
```

Replace the credentials with the new database credentials. Unline in the previous step, the `--authenticationDatabase` option is specified in the URI string.

Also, use `--gzip` if used while creating the backup.

**`--drop`**: Before restoring the collections from the dumped backup, drops the collections from the target database. It does not drop collections that are not in the backup.
**`--noIndexRestore`**: Prevents mongorestore from restoring and building indexes as specified in the corresponding mongodump output.

> If you want to change name of the database while restoring, you can do so using <br />`--nsFrom="old_name.*" --nsTo="new_name.*"` options.<br /><br />However, it won’t work if you were to migrate with `oplogs` which is a requirement in migration from an online instance.

<hr />

# Migrating from an online database

The only challenge with migrating from an online database is not able to pause the updates during migration. So here is the overview of the steps,

1. Run an initial bulk migration with `oplogs` capture
2. Run a sync job to mitigate the database connection switch latency

> Now in order to capture `oplogs`, a replica set must be initialized in the source and destination databases. This is because the `oplogs` are captured from **`local.oplog.rs`** namespace which is created after initializing a replica set. <br /><br />You can follow [this guide](https://medium.com/swlh/self-hosted-mongodb-deployment-7f1b6fb4973f#1cdf) to configure a replica set.

## Initial Migration with Oplog Capture

Oplogs in simple words are the operation logs created per operation in the database. They represent a partial document state or in other words the database state. So we are going to capture any updates in our old database during the migration process using these `oplogs`.

Run the mongodump program with the following options,
```
mongodump --uri=".../?authSource=admin" \
  --forceTableScan --oplog \
  --gzip -v --out ./dump
```
**`--oplog`**: Creates a file named `oplog.bson` as part of the `mongodump` output. The `oplog.bson` file, located in the top level of the output directory, contains `oplog` entries that occur during the mongodump operation. This file provides an effective point-in-time snapshot of the state of our database instance.

## Restore the data with oplog replay

In order to replay the oplogs, a special role is required. Let’s create and assign the role to the database user being used for migration.

### Create the role
```
db.createRole({
  role: "interalUseOnlyOplogRestore",
  privileges: [
    {
      resource: { anyResource: true },
      actions: [ "anyAction" ] 
    }
  ],
  roles: []
})
```

### Assign the role

```
db.grantRolesToUser(
  "admin",
  [{ role:"interalUseOnlyOplogRestore", db:"admin" }]
);
```

Now you can restore using the mongorestore program with the following options,
```
mongorestore --uri="mongodb://admin:.../?authSource=admin" \
  --oplogReplay 
  --gzip -v ./dump
```

In the above command, using the same user **`admin`** with whom the role was associated.

**`--oplogReplay`**: After restoring the database dump, replays the oplog entries from a bson file and restores the database to the point-in-time backup captured with the mongodump `--oplog` command.

## Mitigating database connection switch latency

Alright, so far we are done with most of the heavy lifting. The only thing that remains is maintaining consistency between the databases during the connection switch in our application servers.

> If you’re running MongoDB version 3.6+ then its better to go for the Change Stream approach which is a event based mechanism introduced to capture changes in your database in an optimized way. Here is an article that covers it https://www.mongodb.com/blog/post/an-introduction-to-change-streams

Check out the [generic sync script](https://gist.github.com/cnp96/7be1756f7eb76ea78c9b832966e84dbf#file-delta-sync-sh) that I've written which you can run as a CRON job every minute.

Update the variables in this script and run as
```
$ ./delta-sync.sh from_epoch_in_milliseconds

# from_epoch_in_milliseconds is automatically picked with every iteration if not supplied
```

Or you can set up a cron job to run this every minute.
```
* * * * * ~/delta-sync.sh
```

The output can be monitored with the following command (I’m running RHEL 8, refer to your OS guide for cron output)

```
$ tail -f /var/log/cron | grep CRON
```

This is a sample sync log

```
CMD (~/cron/dsync.sh)
CMDOUT (INFO: Updated log registry to use new timestamp on next run.)
CMDOUT (INFO: Created sync directory: /home/ec2-user/cron/dump/2020-11-03T19:01:01Z)
CMDOUT (Fetching oplog in range [2020-11-03T19:00:01Z - 2020-11-03T19:01:01Z])
CMDOUT (2020-11-03T19:01:02.319+0000#011dumping up to 1 collections in parallel)
CMDOUT (2020-11-03T19:01:02.334+0000#011writing local.oplog.rs to /home/ec2-user/cron/dump/2020-11-03T19:01:01Z/local/oplog.rs.bson.gz)
CMDOUT (2020-11-03T19:01:04.943+0000#011local.oplog.rs  0)
CMDOUT (2020-11-03T19:01:04.964+0000#011local.oplog.rs  0)
CMDOUT (2020-11-03T19:01:04.964+0000#011done dumping local.oplog.rs (0 documents))
CMDOUT (INFO: Dump success!)
CMDOUT (INFO: Replaying oplogs...)
CMDOUT (2020-11-03T19:01:05.030+0000#011using write concern: &{majority false 0})
CMDOUT (2020-11-03T19:01:05.054+0000#011will listen for SIGTERM, SIGINT, and SIGKILL)
CMDOUT (2020-11-03T19:01:05.055+0000#011connected to node type: standalone)
CMDOUT (2020-11-03T19:01:05.055+0000#011mongorestore target is a directory, not a file)
CMDOUT (2020-11-03T19:01:05.055+0000#011preparing collections to restore from)
CMDOUT (2020-11-03T19:01:05.055+0000#011found collection local.oplog.rs bson to restore to local.oplog.rs)
CMDOUT (2020-11-03T19:01:05.055+0000#011found collection metadata from local.oplog.rs to restore to local.oplog.rs)
CMDOUT (2020-11-03T19:01:05.055+0000#011restoring up to 4 collections in parallel)
CMDOUT (2020-11-03T19:01:05.055+0000#011replaying oplog)
CMDOUT (2020-11-03T19:01:05.055+0000#011applied 0 oplog entries)
CMDOUT (2020-11-03T19:01:05.055+0000#0110 document(s) restored successfully. 0 document(s) failed to restore.)
CMDOUT (INFO: Restore success!)
```

You can stop this script after verifying that no more **oplogs** are being created i.e. the when source DB went offline.

This concludes the complete self-hosted MongoDB guide. Please let me know your feedback in the comments 😃

<br /><br /><br />