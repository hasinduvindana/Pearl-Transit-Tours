# Database Setup Instructions

## Prerequisites
- MySQL Server installed and running
- MySQL Client (MySQL Workbench, MySQL CLI, or DBeaver)

## Steps to Create the Database and Table

### Option 1: Using MySQL Workbench (GUI)

1. **Open MySQL Workbench**
2. **Connect to your MySQL Server** (localhost:3306)
3. **Open the SQL file**: `database/create-tour-request-table.sql`
4. **Execute the script**: Click the lightning bolt icon or press `Ctrl+Enter`
5. **Verify the table creation** by running:
   ```sql
   USE pearltransitdb;
   SHOW TABLES;
   DESC `tour-request`;
   ```

### Option 2: Using MySQL Command Line

1. **Open Command Prompt or PowerShell**
2. **Connect to MySQL**:
   ```bash
   mysql -h localhost -u root -p
   ```
3. **Enter your password**: `hasi`
4. **Run the SQL script**:
   ```sql
   source C:\NIBM\GitHub_Projects\Pearl-Transit-Tours\pearl-transit\database\create-tour-request-table.sql
   ```
   OR copy-paste the commands from the file directly

### Option 3: Using DBeaver (GUI)

1. **Open DBeaver**
2. **Connect to your MySQL Server**
3. **Right-click on the database** → **SQL Editor** → **New SQL Script**
4. **Copy the contents** from `database/create-tour-request-table.sql`
5. **Execute** (Ctrl+Enter)

## Verify Table Creation

After running the script, verify the table was created:

```sql
USE pearltransitdb;
SHOW TABLES;
DESCRIBE `tour-request`;
```

You should see output like:
```
+---------------------+
| Tables_in_pearltransitdb |
+---------------------+
| tour-request        |
+---------------------+
```

## Environment Variables

Make sure your `.env.local` file contains:
```
DB_SERVER=localhost:3306
DB_NAME=pearltransitdb
DB_USER=root
DB_PASSWORD=hasi
```

## Testing the API

1. **Start the development server**:
   ```bash
   npm run dev
   ```

2. **Visit the Plan Tour page**: http://localhost:3000/plantour

3. **Fill out the form and submit** - the data should now be saved to the database

4. **Verify data was inserted**:
   ```sql
   USE pearltransitdb;
   SELECT * FROM `tour-request`;
   ```

## Troubleshooting

### Error: Table doesn't exist
- Make sure you ran the SQL script
- Check that the database name in `.env.local` matches the one in your MySQL

### Error: Connection refused
- Verify MySQL server is running
- Check `DB_SERVER`, `DB_USER`, and `DB_PASSWORD` in `.env.local`

### Error: Access denied for user
- Verify your MySQL username and password
- Check if the user has the necessary privileges

