use [5D1gr01e03]

CREATE TABLE [dbo].[Utilisateurs](
	[idUtilisateur] int primary key identity NOT NULL,
	[username] [varchar](50) NOT NULL,
	[email] [varchar](50) NOT NULL unique,
	[nom] [varchar](50) NOT NULL,
	[motDePasse] [varchar](90) NOT NULL,
	[photoProfil] [varchar](90) NULL
)
GO

CREATE TABLE [dbo].[Categories](
	[idCategorie] [int] primary key identity not NULL,
	[nomCategorie] [varchar](50) not NULL,
	[description] [varchar](150) not NULL,
	[img] [varchar](500) NULL,
	[nom] [varchar](50) NOT NULL
) 
GO

create Table UtilisateurCategorie(
[idCategorie] int foreign key(idCategorie) references Categories(idCategorie) ,
[idUtilisateur] int foreign key(idUtilisateur) references Utilisateurs(idUtilisateur)
	)
GO

CREATE TABLE [dbo].[Photos](
	[idPhoto]  int primary key identity NOT NULL,
	[idUtilisateur] int foreign key(idUtilisateur) references Utilisateurs(idUtilisateur),
	[date] [date] NOT NULL,
	[idLieu] varchar(50) not null,
	[photoURL] varchar(90) NOT NULL,
) ON [PRIMARY]
GO

CREATE TABLE [dbo].[Reviews](
	[idReviews] int primary key identity NOT NULL,
	[date] [date] NOT NULL,
	[idUtilisateur] int foreign key(idUtilisateur) References Utilisateurs(idUtilisateur) NOT NULL,
	[idLieu] varchar(50) not null,
	[commentaire] [varchar](150) NOT NULL,
	[note] int check (note in (1, 2, 3, 4, 5)) not null,
	[photo] [varchar](50) NULL,
	)
GO

insert into Categories values ('restaurant')
insert into Categories values ('cafe')
insert into Categories values ('bar')
