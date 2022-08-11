-- Use this file to define your SQL tables
-- The SQL in this file will be executed when you run `npm run setup-db`

DROP TABLE IF EXISTS posts_users;
DROP TABLE IF EXISTS gh_users;

CREATE TABLE gh_users (
  id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  username TEXT NOT NULL,
  email TEXT,
  avatar TEXT
);

CREATE TABLE posts_users (
  id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  user_id BIGINT NOT NULL,
  content VARCHAR NOT NULL,
  FOREIGN KEY (user_id) REFERENCES gh_users(id)
);

INSERT INTO gh_users 
(username, email, avatar)
VALUES
('superuser', 'super@user.com', 'http://placekitten.com/200/300'),
('another', 'user@use.com', 'http://placekitten.com/200/300'),
('shan', 'shan@shan.com', 'http://placekitten.com/200/300');

INSERT INTO posts_users
(user_id, content)
VALUES
('1', 'super post from super user'),
('2', 'another one from another'),
('3', 'shan here posting shan things'),
('1', 'another super post from super');
