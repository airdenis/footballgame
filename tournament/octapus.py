import psycopg2, bleach

DBNAME = "tournament_db"

def add_country_post(ids,name,url,chance):
  """Add a post to the 'database' with the current timestamp."""
  db = psycopg2.connect(database=DBNAME)
  c = db.cursor()
  c.execute("insert into country_tb values (%s,%s,%s,%s)", (ids, name, url, chance))  # good
  db.commit()
  db.close()

def get_posts():
  """Return all posts from the 'database', most recent first."""
  db = psycopg2.connect(database=DBNAME)
  c = db.cursor()
  c.execute("select id, name, url, chance from country_tb order by name asc" )
  posts = c.fetchall()
  db.close()
  return posts

def get_country_info(names):
  db = psycopg2.connect(database=DBNAME)
  c = db.cursor()
  c.execute("select id, name, url, chance from country_tb where name=%s", (bleach.clean(names),))
  posts = c.fetchall()
  db.close()
  return posts

def update_post(col_rep,rep,col_ref,ref_val):
  db = psycopg2.connect(database=DBNAME)
  c = db.cursor()
  c.execute("update country_tb set "+ col_rep+"= %s where "+ col_ref+" =%s", (rep,ref_val))  # good
  db.commit()
  db.close()
