
create table users (
	userid serial PRIMARY key,
	username varchar (50) unique not null,
	password varchar (50) not null,
	email varchar (255) unique null
);

create table state(
	state_id int primary KEY,
	state_name varchar(25) not null
);

create table locations (
	locid integer primary KEY,
	locname varchar (50) not null
	state int not null
	foreign key (state) REFERENCES state(state_id)
);

create table event_catergory(
	event_id int primary KEY,
	event_name varchar(10) not null
)


create table events(
	eventid serial PRIMARY key,
	eventcreator integer not null,
	loccity integer not null,
	address varchar(25) not null ,
	eventtitle varchar(35) not null,
	eventdesc varchar(256) not null,
	eventcatergory int not null,
	startdate timestamptz not null,
	images text[],
	foreign key (eventcreator) REFERENCES users(userid),
	foreign key (loccity) REFERENCES locations(locid),
	foreign key (eventcatergory) references event_catergory(event_id)
);

insert into users (username, password, email) values ('mreidy97', 'MMAnala104', 'matthewreidy5@gmail.com');

insert into locations (locid, locname) values (0001, 'San Francisco', 1);
insert into locations (locid, locname) values (0002, 'Los Angeles', 1);

insert into state (state_id, state_name) values (01, 'California');


insert into event_catergory (event_id, event_name) values (0001, 'Music');
insert into event_catergory (event_id, event_name) values (0002, 'Sports');
insert into event_catergory (event_id, event_name) values (0003, 'Comedy');
insert into event_catergory (event_id, event_name) values (0004, 'Fitness');
insert into event_catergory (event_id, event_name) values (0005, 'Theater');
insert into event_catergory (event_id, event_name) values (0006, 'Gardening');

insert into events (eventcreator, loccity, address, eventtitle, eventdesc, eventcatergory, startdate) values (1, 1, '123 main street', 'this is sample event', 'sample description', 1, '2023-12-01 14:30:00' );
insert into events (eventcreator, loccity, address, eventtitle, eventdesc, eventcatergory, startdate) values (1, 1, '321 main street', 'event sample is this', 'sample description', 6, '2024-01-01 14:30:00' );
insert into events (eventcreator, loccity, address, eventtitle, eventdesc, eventcatergory, startdate) values (1, 1, '321 main street', 'football match', 'sample description', 2, '2024-01-01 14:30:00' );
insert into events (eventcreator, loccity, address, eventtitle, eventdesc, eventcatergory, startdate) values (1, 1, '321 main street', 'baseball game', 'sample description', 2, '2024-01-01 14:30:00' );
insert into events (eventcreator, loccity, address, eventtitle, eventdesc, eventcatergory, startdate) values (1, 1, '321 main street', 'football match',  'sample description', 2, '2024-01-01 14:30:00' );
insert into events (eventcreator, loccity, address, eventtitle, eventdesc, eventcatergory, startdate) values (1, 2, '222 West Addison st', 'greenthumb gardening club meeting', 'sample description', 6, '2024-01-01 14:30:00');
insert into events (eventcreator, loccity, address, eventtitle, eventdesc, eventcatergory, startdate) values (1, 2, '789 Market St', 'Bay to breakers marathon', 'sample description', 4, '2024-01-01 14:30:00');