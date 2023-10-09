drop database vozzz;

create database vozzz;

create table users (
  id serial primary key,
  name text not null,
  email text not null unique,
  date_of_birth date not null,
  password text not null,
  actived boolean default(true),
  delete boolean default(false)
  );

  
CREATE table profiles (
  id serial primary key,
  user_id serial not null references users(id),
  name text not null,
  user_name text unique,
  bio text,
  photo text,
  interests text, 
  followers integer default(0) check(followers >= 0),
  following integer default(0) check(following >= 0),
  url_website text, 
  quizzes integer default(0),
  holding integer default(0),
  connection integer default(0),
  profile_checked boolean default(false)
  );

  
  create table publications (
    id integer primary key,
    id_profile serial not null references profiles(id),
    name text not null,
    user_name text unique,
    photo_profile text,
    profile_checked boolean default(false),
    date_tamp TIMESTAMP default(now()),
    file text,
    description text,
    public_likes integer default(0) check(public_likes >= 0),
	public_coments integer  default(0) check(public_coments >= 0)
  );