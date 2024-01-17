DROP TABLE IF EXISTS users;
CREATE TABLE IF NOT EXISTS users (
  _id SERIAL PRIMARY KEY,
  name VARCHAR(30) NOT NULL,
  email VARCHAR(300) NOT NULL UNIQUE,
  password VARCHAR(200) NOT NULL,
  created_at DATE DEFAULT NOW(),

  CONSTRAINT validName CHECK(name != '')
);


DROP TABLE IF EXISTS tasks;
CREATE TABLE IF NOT EXISTS tasks (
  _id SERIAL PRIMARY KEY,
  title VARCHAR(200) NOT NULL,
  description TEXT,
  due_date TIMESTAMP WITHOUT TIME ZONE,
  done BOOLEAN NOT NULL DEFAULT false,
  priority VARCHAR(15) DEFAULT 'low',
  user_id INTEGER,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),

  FOREIGN KEY (user_id) REFERENCES users(_id)
    ON DELETE CASCADE ON UPDATE CASCADE,

  CONSTRAINT validPriority CHECK( priority IN('low', 'medium', 'high') )
);


-- VIEWS
CREATE VIEW user_emails AS
  SELECT email FROM users;



-- example data
INSERT INTO users (name, email, password) VALUES
  ('Example', 'example@mail.com', 'example');

INSERT INTO tasks VALUES
  (DEFAULT, 'Buy grocery', DEFAULT, DEFAULT, DEFAULT, 'medium', 1),
  (DEFAULT, 'Cook mac and cheeze for lunch', DEFAULT, DEFAULT, DEFAULT, 'medium', 1),
  (DEFAULT, 'Do blood test in nearby hospital', DEFAULT, DEFAULT, true, 'high', 1),
  (DEFAULT, 'study for physics exam', DEFAULT, '2023-12-08 8:00:00+02', DEFAULT, 'high', 1),
  (DEFAULT, 'Do maths homework', 'book page 122 no. 1->4', '2023-12-16 23:59:59+02', DEFAULT, 'low', 1),
  (DEFAULT, 'Do biology revision', 'chapter 5 page 120->130', DEFAULT, true, DEFAULT, 1);