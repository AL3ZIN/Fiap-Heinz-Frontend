create table feedbacks ( 

    id integer not null auto_increment,
    nome varchar(30) not null,
    canal varchar(30) not null,
    tipo VARCHAR(30) not null,
    descricao VARCHAR(500) not null,
    rating VARCHAR(30) not null,
    data_feed integer not null,
    data_cadastro timestamp not null,
    primary key (id) 
    
);