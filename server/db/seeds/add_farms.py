#!/usr/bin/env python3
import pandas as pd
from sqlalchemy import create_engine

# CSV file path and database connection string
csv_file_path1 = "/app/data/Soil_data.csv"
csv_file_path2 = "/app/data/wholesale_price_indices.csv"
db_connection_string = "postgresql://username:password@db:5432/username"

# Read CSV file into a Pandas DataFrame
data1 = pd.read_csv(csv_file_path1)
data2 = pd.read_csv(csv_file_path2)

# Connect to the database using SQLAlchemy
engine = create_engine(db_connection_string)

# Insert data into the database table (replace 'table_name' with your table name)
data1.to_sql("farms", engine, if_exists="append", index=False)
data2.to_sql("wholesale_price_indices", engine, if_exists="append", index=False)

print("Data successfully seeded into the database.")
