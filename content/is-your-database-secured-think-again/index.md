---
title: "Is Your Database Secured? Think Again"
date: "2016-02-23"
coverImage: "database_secure-300x300.png"
author: "Kunal"
tags: ["Database", "Security"]
pinned: true
---

**1\. Secure your server**

Many known attacks are possible only once physically accessing a machine. For this reason, it is best to have the application server and the database server on different machines. If this is not possible, greater care must be taken, Otherwise, by executing remote commands via an application server, an attacker may be able to harm your database even without permissions. For this reason, any service running on the same machine as the database should be granted the lowest possible permission that still allows the service to operate.

![server-network-structure](server-network-structure.png?ver=1552286291)  
Do not forget to install the whole security package: Antivirus and Anti-spam, Firewall, and all of the security packages recommended by your operating system's vendor. Also, do not forget to spend 10 minutes thinking of your server's physical location - in the wrong location, your server can be stolen, flooded, harmed by wild animals or vagrants.

**2\. Localhost Security or Disable or restrict remote access**

Consider whether MySQL will be retrieved from the system or directly accessed from its own server. On the off chance that remote access is utilized, guarantee that just characterized hosts can get to the server. This is commonly done through TCP wrappers, IP tables, or some other firewall programming or hardware accessibility tools.  
To confine MySQL from opening a network socket, the accompanying parameter ought to be included in the \[mysqld\] area of my.cnf or my.ini:

skip-networking

The document is situated in the _"C:\\Program Files\\MySQL\\MySQL Server 5.1"_ catalog on the Windows operating system or _"/etc/my.cnf"_ or _"/etc/mysql/my.cnf"_ on Linux.  
This line cripples the start of systems administration in the middle of MySQL startup. It would be ideal if you bear in mind that a local connection can be used set up a connection to the MySQL server.

Another possible solution is to force MySQL to listen only to the localhost by adding the following line in the _\[mysqld\]_ section of _my.cnf_bind-address=127.0.0.1  
You may not be willing to incapacitate system access to your database server if clients in your organization interface with the server from their machines or the web server introduced on an alternate machine. In that case, the following restrictive grant syntax should be considered:

```
mysql> GRANT SELECT, INSERT ON mydb.\* TO 'someuser'@'somehost';  
```

**3\. Disable the use of LOCAL INFILE**

The next change is to disable the use of the _"LOAD DATA LOCAL INFILE"_ command, which will help to keep unapproved perusing from neighborhood records. This is particularly vital when new SQL Injection vulnerabilities in PHP applications are found.  
In addition, in certain cases, the _"LOCAL INFILE"_ command can be used to gain access to other files on the operating system, for instance _"/etc/passwd"_, using the following command:  

```
mysql> LOAD DATA LOCAL INFILE '/etc/passwd' INTO TABLE table1
```

Or even significantly less difficult:

```
mysql> SELECT load\_file("/etc/passwd")
```

To disable the usage of the _"LOCAL INFILE"_ command, the following parameter should be added in the _\[mysqld\]_ section of the MySQL configuration file.

```
set-variable=local-infile=0
```

**4\. Change root username and password, keep them strong.**

The default administrator username on the MySQL server is **"root"**. Hackers often attempt to gain access to its permissions. To make this task harder, rename **"root"** to something else and provide it with a long, complex alphanumeric password.

To rename the administrator’s username, use the rename command in the MySQL console:

```
mysql> RENAME USER root TO new\_user;
```

The MySQL _"RENAME USER"_ command first appeared in MySQL version 5.0.2. If you use an older version of MySQL, you can use other commands to rename a user:

```
mysql> use mysql;

mysql> update user set user="new\_user" where user="root";

mysql> flush privileges;
```

To change a user’s password, use the following command-line command:

```
mysql> SET PASSWORD FOR 'username'@'%hostname' = PASSWORD('newpass');
```

It is also possible to change the password using the _"mysqladmin"_ utility:

```
shell> mysqladmin -u username -p password newpass
```

**5\. Remove the "Test" database**

MySQL comes with a "test" database intended as a test space. It can be accessed by the anonymous user, and is therefore used by numerous attacks.  
To remove this database, use the drop command as follows:  

```
mysql> drop database test;  
```

Or use the _"mysqladmin"_ command:  

```
shell> mysqladmin -u username -p drop test  
```

**6\. Remove Anonymous and outdated accounts**

The MySQL database comes with some anonymous users with blank passwords. As a result, anyone can connect to the database to check whether this is the case, do the following:  

```
mysql> select \* from mysql.user where user="";  
```

In a secure system, no lines should be echoed back. Another way to do the same:

```
mysql> SHOW GRANTS FOR ''@'localhost';

mysql> SHOW GRANTS FOR ''@'myhost';
```

If the grants exist, then anybody can access the database and at least use the default database_"test"_. Check this with:

```
shell> mysql -u blablabla
```

To remove the account, execute the following command:

```
mysql> DROP USER "";
```

The MySQL _"DROP USER"_ command is supported starting with MySQL version 5.0. If you use an older version of MySQL, you can remove the account as follows:

```
mysql> use mysql;

mysql> DELETE FROM user WHERE user="";

mysql> flush privileges;  
```
  
**7\. Increase security with Role Based Access Control**

A very common database security recommendation is to lower the permissions given to various parties. MySQL is no different. Typically, when developers work, they use the system's maximum permission and give less consideration to permission principles than we might expect. This practice can expose the database to significant risk.  
\* Any new MySQL 5.x installation already installed using the correct security measures.  
To protect your database, make sure that the file directory in which the MySQL database is actually stored is owned by the user "mysql" and the group "mysql".

```
shell>ls -l /var/lib/mysql
```

In addition, ensure that only the user "mysql" and "root" have access to the directory `/var/lib/mysql`.  
The mysql binaries, which reside under the /usr/bin/ directory, should be owned by "root" or the specific system "mysql" user. Other users should not have write access to these files.

```
shell>ls -l /usr/bin/my\*  
```

**8\. Keep a check on database privileges**

Operating system permissions were fixed in the preceding section. Now let’s talk about database permissions. In most cases, there is an administrator user (the renamed "root") and one or more actual users who coexist in the database. Usually, the "root" has nothing to do with the data in the database; instead, it is used to maintain the server and its tables, to give and revoke permissions, etc.  
On the other hand, some user ids are used to access the data, such as the user id assigned to the web server to execute "select\\update\\insert\\delete" queries and to execute stored procedures. In most cases, no other users are necessary; however, only you, as a system administrator can really know your application’s needs.

Only administrator accounts needs to be granted the SUPER / PROCESS /FILE privileges and access to the mysql database. Usually, it is a good idea to lower the administrator’s permissions for accessing the data.

Review the privileges of the rest of the users and ensure that these are set appropriately. This can be done using the following steps.  
```
mysql> use mysql;  
```
\[Identify users\]  
```
mysql> select \* from users;  
```
\[List grants of all users\]  
```
mysql> show grants for ‘root’@’localhost’;
```

The above statement has to be executed for each user ! Note that only users who really need root privileges should be granted them.

Another interesting privilege is "SHOW DATABASES". By default, the command can be used by everyone having access to the MySQL prompt. They can use it to gather information (e.g., getting database names) before attacking the database by, for instance, stealing the data. To prevent this, it is recommended that you follow the procedures described below.

- Add " --skip-show-database" to the startup script of MySQL or add it to the MySQL configuration file
- Grant the SHOW DATABASES privilege only to the users you want to use this command

To disable the usage of the "SHOW DATABASES" command, the following parameter should be added in the \[mysqld\] section of the `/etc/my.cnf`:

\[mysqld\]
```
skip-show-database  
```
**9\. Enable Logging**

If your database server does not execute many queries, it is recommended that you enable transaction logging, by adding the following line to \[mysqld\] section of the `/etc/my.cnf` file:

\[mysqld\]
```
log =/var/log/mylogfile  
```
This is not recommended for heavy production MySQL servers because it causes high overhead on the server.  
In addition, verify that only the "root" and "mysql" ids have access to these logfiles (at least write access).

**Error log**Ensure only "root" and "mysql" have access to the log file "hostname.err". The file is stored in the mysql data directory. This file contains very sensitive information such as passwords, addresses, table names, stored procedure names and code parts. It can be used for information gathering, and in some cases, can provide the attacker with the information needed to exploit the database, the machine on which the database is installed, or the data inside it.

**MySQL log**Ensure only "root" and "mysql" have access to the logfile "logfile XY". The file is stored in the mysql data directory.

**10\. Change the root directory** 
 
A chroot on UNIX {operating system} operating systems is an operation that changes the apparent disk root directory for the present running method and its children. A program that's re-rooted to a different directory cannot access or name files outside that directory, and therefore the directory is named a "chroot jail" or (less commonly) a "chroot prison".

By using the chroot environment, the write access of the mySQL processes (and child processes) can be limited, increasing the security of the server.

Ensure that a dedicated directory exists for the chrooted environment. This should be something like: `/chroot/mysql` In addition, to make the use of the database administrative tools convenient, the following parameter should be changed in the \[client\] section of MySQL configuration file:

\[client\]
```
socket = /chroot/mysql/tmp/mysql.sock
```
Thanks to that line of code, there will be no need to supply the mysql, mysqladmin, mysqldump etc. commands with the `--socket=/chroot/mysql/tmp/mysql.sock` parameter every time these tools are run.

**11\. Delete old logs regularly**

During the installation procedures, there's plenty of sensitive data which will assist unwelcome users to assault a database. This data is kept within the server’s history and might be terribly useful if one thing goes wrong during the installation. By analyzing the history files, administrators can figure out what has gone wrong and probably fix things up. However, these files are not needed after installation is complete.  
We should remove the content of the MySQL history file (~/.mysql\_history), wherever all dead SQL commands are kept (especially passwords, that are kept as plain text):

```
cat /dev/null > ~/.mysql\_history
```

In conclusion,we should emphasize on database security. However it should be the first thing for any individual or a company.
