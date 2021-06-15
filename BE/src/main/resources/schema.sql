create table user
(
    id        bigint primary key auto_increment,
    login_id  varchar(500) not null,
    name      varchar(45),
    image_url varchar(500),
    password  varchar(45)
);

create table milestone
(
    id          bigint primary key auto_increment,
    title       varchar(45),
    description varchar(1000),
    due_date    datetime
);

create table issue
(
    id           bigint primary key auto_increment,
    title        varchar(45),
    description  varchar(1000),
    status       tinyint(1),
    created_date datetime,
    updated_date datetime,
    user_id      bigint,
    milestone_id bigint,
    foreign key (user_id) references user (id),
    foreign key (milestone_id) references milestone (id)
);

create table label
(
    id         bigint primary key auto_increment,
    name       varchar(45),
    color_code varchar(45),
    content    varchar(500)
);

create table issue_has_label
(
    issue_id bigint,
    label_id bigint,
    foreign key (issue_id) references issue (id),
    foreign key (label_id) references label (id)
);

create table issue_assignee
(
    issue_id bigint,
    user_id bigint,
    foreign key (issue_id) references issue (id),
    foreign key (user_id) references user (id)
);

create table coment (
    id bigint primary key auto_increment,
    description varchar(1000),
    created_date datetime,
    updated_date datetime,
    issue_id bigint,
    user_id bigint,
    foreign key (issue_id) references issue (id),
    foreign key (user_id) references user (id)
)
