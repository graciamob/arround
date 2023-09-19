--ALTER SERVER ROLE  [dbcreator]  ADD MEMBER [yolande];GO
Create Database projet3
go
use projet3

CREATE TABLE [dbo].[Utilisateurs](
	[id_Utilisateur] int primary key identity NOT NULL,
	[nom] [varchar](50) NOT NULL,
	[motDePasse] [varchar](50) NOT NULL,
	[photoprofil] [varchar](50) NULL
)
GO
CREATE TABLE [dbo].[Categories](
	[id_categories] [int] primary key identity not NULL,
	[nom_categories] [varchar](50) NULL
) 
GO

create Table Utilisateurs_Categories(
[id_categories] int foreign key(id_categories) references Categories(id_categories) ,
[id_utilisateur] int foreign key(id_utilisateur) references Utilisateurs(id_utilisateur)
	)
GO


CREATE TABLE [dbo].[Photos](
	[id_photo]  int primary key identity NOT NULL,
	[id_Utilisateur] int foreign key(id_utilisateur) references Utilisateurs(id_utilisateur),
	[date] [date] NOT NULL,
	[id_lieu] varchar(50) not null,
) ON [PRIMARY]
GO
CREATE TABLE [dbo].[Reviews](
	[id_reviews] int primary key identity NOT NULL,
	[date] [date] NOT NULL,
	[id_Utilisateur] int foreign key(id_Utilisateur) References Utilisateurs(id_utilisateur) NOT NULL,
	[id_lieu] varchar(50) not null,
	[commentaire] [varchar](50) NOT NULL,
	[note] int not null,-- SET note = FLOOR(RAND() * 5) + 1;
	[photo] [varchar](50) NULL,
	)
GO


