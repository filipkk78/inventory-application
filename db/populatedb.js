#! /usr/bin/env node
require("dotenv").config();

const { Client } = require("pg");

const SQL = `

CREATE TABLE IF NOT EXISTS games (
    id SERIAL PRIMARY KEY,
    title VARCHAR,
    release_date DATE,
    description TEXT
);

CREATE TABLE IF NOT EXISTS genres (
    id SERIAL PRIMARY KEY,
    name VARCHAR UNIQUE
);

CREATE TABLE IF NOT EXISTS devs (
    id SERIAL PRIMARY KEY,
    name VARCHAR
);

CREATE TABLE IF NOT EXISTS game_genre (
    game_id INT REFERENCES games(id),
    genre_id INT REFERENCES genres(id)
);

CREATE TABLE IF NOT EXISTS game_dev (
    game_id INT REFERENCES games(id),
    dev_id INT REFERENCES devs(id)
);



INSERT INTO genres (name) 
VALUES
  ('Action'),
  ('Adventure'),
  ('RPG'),
  ('Open World'),
  ('Souls-like'),
  ('Shooter'),
  ('Beat em up'),
  ('Battle Royale'),
  ('Stealth'),
  ('Character Action'),
  ('Hack and slash'),
  ('Horror'),
  ('Survival');

INSERT INTO games (title, release_date, description)
VALUES
  ('FINAL FANTASY XVI', '2023-06-23', 'An epic dark fantasy where fates are decided by mighty Eikons and the Dominants who wield them. This is the tale of Clive Rosfield, a tragic warrior who swears revenge on the Dark Eikon Ifrit, a mysterious entity that leaves naught but calamity in its wake.'), 
  ('FINAL FANTASY VII REMAKE INTERGRADE', '2020-04-10', 'Cloud Strife, an ex-SOLDIER operative, descends on the mako-powered city of Midgar. The world of the timeless classic FINAL FANTASY VII is reborn, using cutting-edge graphics technology, a new battle system and an additional adventure featuring Yuffie Kisaragi.'),
  ('FINAL FANTASY VII REBIRTH', '2024-02-29', 'The Unknown Journey Continues... After escaping from the dystopian city of Midgar, Cloud and his friends set out on a journey across the planet. New adventures await in a vibrant and vast world in this standalone entry to the FFVII remake trilogy!'),
  ('NINJA GAIDEN 2 BLACK', '2025-01-23', 'Using Unreal Engine 5 to significantly enhance graphic expression, this is the definitive version of "NINJA GAIDEN 2," featuring additional playable characters and enhanced battle support functions.'), 
  ('NINJA GAIDEN 4', '2025-09-17', 'The definitive ninja action-adventure franchise returns with NINJA GAIDEN 4! Embark on a cutting-edge adventure where legacy meets innovation in a high-octane blend of style and no-holds-barred combat.'), 
  ('Fortnite', '2017-09-26', 'Be the last player standing in Battle Royale and Zero Build, explore and survive in LEGO Fortnite, blast to the finish with Rocket Racing or headline a concert with Fortnite Festival.'),
  ('Counter-Strike 2', '2023-09-27', 'For over two decades, Counter-Strike has offered an elite competitive experience, one shaped by millions of players from across the globe. And now the next chapter in the CS story is about to begin. This is Counter-Strike 2.'),
  ('Resident Evil 4', '2023-03-24', 'Survival is just the beginning. Six years have passed since the biological disaster in Raccoon City. Leon S. Kennedy, one of the survivors, tracks the presidents kidnapped daughter to a secluded European village, where there is something terribly wrong with the locals.'), 
  ('Cyberpunk 2077', '2020-12-10', 'Cyberpunk 2077 is an open-world, action-adventure RPG set in the dark future of Night City — a dangerous megalopolis obsessed with power, glamor, and ceaseless body modification.'),
  ('Witcher 3: The Wild Hunt', '2015-05-18', 'You are Geralt of Rivia, mercenary monster slayer. Before you stands a war-torn, monster-infested continent you can explore at will. Your current contract? Tracking down Ciri — the Child of Prophecy, a living weapon that can alter the shape of the world.'), 
  ('Demons Souls', '2009-02-05', 'Deep beneath the Nexus, the Old One has awakened. A mighty demon horde pours into Boletaria, devouring the souls of men. Called upon by a maiden in black, you go forth to lift the curse…'), 
  ('DARK SOULS REMASTERED', '2018-05-24', 'Then, there was fire. Re-experience the critically acclaimed, genre-defining game that started it all. Beautifully remastered, return to Lordran in stunning high-definition detail running at 60fps.'),
  ('Sekiro: Shadows Die Twice', '2019-03-21', 'Game of the Year - The Game Awards 2019 Best Action Game of 2019 - IGN Carve your own clever path to vengeance in the award winning adventure from developer FromSoftware, creators of Bloodborne and the Dark Souls series. Take Revenge. Restore Your Honor. Kill Ingeniously.'), 
  ('Lost Judgment', '2021-09-24', 'When a police officer discloses the murder of the student teacher who bullied his son to suicide, the twisted secrets of a Yokohama, high school bleed out. Nothing, in this case, is black and white.'), 
  ('Yakuza 0', '2015-03-12', 'Fight like hell through Tokyo and Osaka as junior yakuza Kiryu and Majima. Take a front row seat to 1980s life in Japan in an experience unlike anything else in video gaming'), 
  ('Devil May Cry 5', '2019-03-08', 'The ultimate Devil Hunter is back in style, in the game action fans have been waiting for.'), 
  ('Metal Gear Solid', '1998-09-03', 'The first 3D title in the METAL GEAR series pioneering a new level of stealth action with live action footage, cinematic cut scenes, and innovative gameplay.'), 
  ('METAL GEAR RISING: REVENGEANCE', '2013-02-19', 'METAL GEAR RISING: REVENGEANCE takes the renowned METAL GEAR franchise into exciting new territory with an all-new action experience.'),  
  ('Terraria', '2011-05-16', 'Dig, fight, explore, build! Nothing is impossible in this action-packed adventure game. Four Pack also available!'), 
  ('Sifu', '2022-03-28', 'Sifu is a realistic third-person brawler with tight Kung Fu combat mechanics and cinematic martial arts action embarking you on a path for revenge.');

INSERT INTO devs (name) 
VALUES 
  ('Square Enix'),
  ('Team Ninja'),
  ('Capcom'),
  ('Fromsoftware'),
  ('Re-Logic'),
  ('Konami'),
  ('Sloclap'),
  ('Valve'),
  ('Ryu Ga Gotoku Studio'),
  ('CD Projekt Red'),
  ('Epic Games'),
  ('Platinum Games');

INSERT INTO game_dev (game_id, dev_id) 
VALUES
  (1, 1),
  (2, 1),
  (3, 1),
  (4, 2),
  (5, 2),
  (5, 12),
  (6, 11),
  (7, 8),
  (8, 3),
  (9, 10),
  (10, 10),
  (11, 4),
  (12, 4),
  (13, 4),
  (14, 9),
  (15, 9),
  (16, 3),
  (17, 6),
  (18, 6),
  (18, 12),
  (19, 5),
  (20, 7);

INSERT INTO game_genre (game_id, genre_id) 
VALUES 
  (1, 1),
  (1, 2),
  (1, 3),
  (2, 1),
  (2, 2),
  (2, 3),
  (3, 1),
  (3, 2),
  (3, 3),
  (3, 4),
  (4, 10),
  (4, 1),
  (4, 11),
  (5, 10),
  (5, 1),
  (5, 11),
  (6, 6),
  (6, 8),
  (7, 6),
  (8, 12),
  (8, 1),
  (8, 6),
  (9, 1),
  (9, 2),
  (9, 6),
  (10, 1),
  (10, 2),
  (10, 3),
  (10, 4),
  (11, 1),
  (11, 3),
  (11, 5),
  (12, 1),
  (12, 3),
  (12, 5),
  (13, 1),
  (13, 3),
  (13, 5),
  (14, 4),
  (14, 7),
  (15, 4),
  (15, 7),
  (16, 10),
  (16, 1),
  (16, 11),
  (17, 1),
  (17, 9),
  (18, 10),
  (18, 1),
  (18, 11),
  (19, 13),
  (19, 1),
  (20, 10),
  (20, 1),
  (20, 7);
`;

async function main() {
  console.log("seeding...");
  try {
    const client = new Client({
      connectionString: `postgresql://${process.env.DB_USER}:${process.env.DB_PWD}@${process.env.DB_HOST}:${process.env.DB_PORT}/${process.env.DB_NAME}`,
    });
    await client.connect();
    await client.query(SQL);
    await client.end();
    console.log("done");
  } catch (err) {
    console.error(err);
  }
}

main();
