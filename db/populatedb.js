#! /usr/bin/env node
require("dotenv").config();

const { Client } = require("pg");

const SQL = `

CREATE TABLE IF NOT EXISTS games (
    id SERIAL PRIMARY KEY,
    title VARCHAR,
    release_date DATE,
    image_url VARCHAR,
    description TEXT
);

CREATE TABLE IF NOT EXISTS genres (
    id SERIAL PRIMARY KEY,
    name VARCHAR UNIQUE,
    image_url VARCHAR
);

CREATE TABLE IF NOT EXISTS devs (
    id SERIAL PRIMARY KEY,
    name VARCHAR
);

CREATE TABLE IF NOT EXISTS game_genre (
    game_id INT REFERENCES games(id) ON DELETE CASCADE,
    genre_id INT REFERENCES genres(id) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS game_dev (
    game_id INT REFERENCES games(id) ON DELETE CASCADE,
    dev_id INT REFERENCES devs(id) ON DELETE CASCADE
);



INSERT INTO genres (name, image_url) 
VALUES
  ('Action', 'https://cdn2.steamgriddb.com/thumb/ddf4c9fc8b1476c13ecc2cfa023537fc.jpg'),
  ('Adventure', 'https://cdn2.steamgriddb.com/thumb/73c7bfc2644df42ab5626610cd9fa168.jpg'),
  ('RPG', 'https://cdn2.steamgriddb.com/thumb/db3eefcd127c547aeec02bb2568b9c08.jpg'),
  ('Open World', 'https://cdn2.steamgriddb.com/thumb/5cbbfd256450bf80576fbfb267e78735.jpg'),
  ('Souls-like', 'https://cdn2.steamgriddb.com/thumb/93c249dc5348d2c0c86dc6f717101db7.jpg'),
  ('Shooter', 'https://cdn2.steamgriddb.com/thumb/ee0c0655c7fc3aeaba6d2f5a73beecde.jpg'),
  ('Beat em up', 'https://cdn2.steamgriddb.com/thumb/b58b9d4519f1b935354de4fcf362e363.jpg'),
  ('Battle Royale', 'https://cdn2.steamgriddb.com/thumb/845c4d9ac12d4ed2327259419ad14302.jpg'),
  ('Stealth', 'https://cdn2.steamgriddb.com/thumb/893fb7ac39b26ccc803f3b2b720f2898.jpg'),
  ('Character Action', 'https://cdn2.steamgriddb.com/thumb/031f40fb740989f693252fd6110eb7ad.jpg'),
  ('Hack and slash', 'https://cdn2.steamgriddb.com/thumb/eb596ee53bc2bcb76e44b8f985360c59.jpg'),
  ('Horror', 'https://cdn2.steamgriddb.com/thumb/4930377a4ade3b1e7b9e19d1ae9f87dc.jpg'),
  ('Survival', 'https://cdn2.steamgriddb.com/thumb/0ce2616f3f9252750be158d56841f541.jpg');

INSERT INTO games (title, release_date, image_url, description)
VALUES
  ('FINAL FANTASY XVI', '2023-06-23', 'https://cdn2.steamgriddb.com/thumb/818efb7d312c7baa2a0af45c3c959837.jpg', 'An epic dark fantasy where fates are decided by mighty Eikons and the Dominants who wield them. This is the tale of Clive Rosfield, a tragic warrior who swears revenge on the Dark Eikon Ifrit, a mysterious entity that leaves naught but calamity in its wake.'), 
  ('FINAL FANTASY VII REMAKE INTERGRADE', '2020-04-10', 'https://cdn2.steamgriddb.com/thumb/fb05fbe709c05ebb8e166293e4c91ec9.jpg', 'Cloud Strife, an ex-SOLDIER operative, descends on the mako-powered city of Midgar. The world of the timeless classic FINAL FANTASY VII is reborn, using cutting-edge graphics technology, a new battle system and an additional adventure featuring Yuffie Kisaragi.'),
  ('FINAL FANTASY VII REBIRTH', '2024-02-29', 'https://cdn2.steamgriddb.com/thumb/01639920c81fcc08b5b7a8db3d55723a.jpg', 'The Unknown Journey Continues... After escaping from the dystopian city of Midgar, Cloud and his friends set out on a journey across the planet. New adventures await in a vibrant and vast world in this standalone entry to the FFVII remake trilogy!'),
  ('NINJA GAIDEN 2 BLACK', '2025-01-23', 'https://cdn2.steamgriddb.com/thumb/3514c7a214f8d366e1f350c2ed655969.jpg', 'Using Unreal Engine 5 to significantly enhance graphic expression, this is the definitive version of "NINJA GAIDEN 2," featuring additional playable characters and enhanced battle support functions.'), 
  ('NINJA GAIDEN 4', '2025-09-17', 'https://cdn2.steamgriddb.com/thumb/0579028e0d156661947aa8a848f065b7.jpg', 'The definitive ninja action-adventure franchise returns with NINJA GAIDEN 4! Embark on a cutting-edge adventure where legacy meets innovation in a high-octane blend of style and no-holds-barred combat.'), 
  ('Fortnite', '2017-09-26', 'https://cdn2.steamgriddb.com/thumb/2d02816a12f4a68673ce0670ff0c3ddb.jpg', 'Be the last player standing in Battle Royale and Zero Build, explore and survive in LEGO Fortnite, blast to the finish with Rocket Racing or headline a concert with Fortnite Festival.'),
  ('Counter-Strike 2', '2023-09-27', 'https://cdn2.steamgriddb.com/thumb/0662aa1719017e0efa5fa8daf0880c6e.jpg', 'For over two decades, Counter-Strike has offered an elite competitive experience, one shaped by millions of players from across the globe. And now the next chapter in the CS story is about to begin. This is Counter-Strike 2.'),
  ('Resident Evil 4', '2023-03-24', 'https://cdn2.steamgriddb.com/thumb/1b1a8e1c60962dc3f07dd77229f36d5f.jpg', 'Survival is just the beginning. Six years have passed since the biological disaster in Raccoon City. Leon S. Kennedy, one of the survivors, tracks the presidents kidnapped daughter to a secluded European village, where there is something terribly wrong with the locals.'), 
  ('Cyberpunk 2077', '2020-12-10', 'https://cdn2.steamgriddb.com/thumb/f39b781760a403dedaa05587e8889c1a.jpg', 'Cyberpunk 2077 is an open-world, action-adventure RPG set in the dark future of Night City — a dangerous megalopolis obsessed with power, glamor, and ceaseless body modification.'),
  ('Witcher 3: The Wild Hunt', '2015-05-18', 'https://cdn2.steamgriddb.com/thumb/2f87d717bf556321774d1b4975d2e1c1.jpg', 'You are Geralt of Rivia, mercenary monster slayer. Before yu stands a war-torn, monster-infested continent you can explore at will. Your current contract? Tracking down Ciri — the Child of Prophecy, a living weapon that can alter the shape of the world.'), 
  ('Demons Souls', '2009-02-05', 'https://cdn2.steamgriddb.com/thumb/9815b648fb13d661e3f844764c5af87b.jpg', 'Deep beneath the Nexus, the Old One has awakened. A mighty demon horde pours into Boletaria, devouring the souls of men. Called upon by a maiden in black, you go forth to lift the curse…'), 
  ('DARK SOULS REMASTERED', '2018-05-24', 'https://cdn2.steamgriddb.com/thumb/fa09649961c5c38096ee815c1084b2f0.jpg', 'Then, there was fire. Re-experience the critically acclaimed, genre-defining game that started it all. Beautifully remastered, return to Lordran in stunning high-definition detail running at 60fps.'),
  ('Sekiro: Shadows Die Twice', '2019-03-21', 'https://cdn2.steamgriddb.com/thumb/e626e6c269451eb8d66f7a5f49473d3d.jpg', 'Game of the Year - The Game Awards 2019 Best Action Game of 2019 - IGN Carve your own clever path to vengeance in the award winning adventure from developer FromSoftware, creators of Bloodborne and the Dark Souls series. Take Revenge. Restore Your Honor. Kill Ingeniously.'), 
  ('Lost Judgment', '2021-09-24', 'https://cdn2.steamgriddb.com/thumb/8e8ca8aec50e37e936a3ce8dbe03b787.jpg', 'When a police officer discloses the murder of the student teacher who bullied his son to suicide, the twisted secrets of a Yokohama, high school bleed out. Nothing, in this case, is black and white.'), 
  ('Yakuza 0', '2015-03-12', 'https://cdn2.steamgriddb.com/thumb/03435e70b2d275b16191f12f3b41df2f.jpg', 'Fight like hell through Tokyo and Osaka as junior yakuza Kiryu and Majima. Take a front row seat to 1980s life in Japan in an experience unlike anything else in video gaming'), 
  ('Devil May Cry 5', '2019-03-08', 'https://cdn2.steamgriddb.com/thumb/48f80b634fc8d3d9ec00cb9f04956a6d.jpg', 'The ultimate Devil Hunter is back in style, in the game action fans have been waiting for.'), 
  ('Metal Gear Solid', '1998-09-03', 'https://cdn2.steamgriddb.com/thumb/3ac4511ba0302570efea191ea1a2d0b4.jpg', 'The first 3D title in the METAL GEAR series pioneering a new level of stealth action with live action footage, cinematic cut scenes, and innovative gameplay.'), 
  ('METAL GEAR RISING: REVENGEANCE', '2013-02-19', 'https://cdn2.steamgriddb.com/thumb/e1f321a3bb511f3a25587df4ce020532.jpg', 'METAL GEAR RISING: REVENGEANCE takes the renowned METAL GEAR franchise into exciting new territory with an all-new action experience.'),  
  ('Terraria', '2011-05-16', 'https://cdn2.steamgriddb.com/thumb/9bc661e8362657d8cbbe4bb41d17c7f3.jpg', 'Dig, fight, explore, build! Nothing is impossible in this action-packed adventure game. Four Pack also available!'), 
  ('Sifu', '2022-03-28', 'https://cdn2.steamgriddb.com/thumb/0513c935d0ee28b9e7e2ea87d1ecff28.jpg', 'Sifu is a realistic third-person brawler with tight Kung Fu combat mechanics and cinematic martial arts action embarking you on a path for revenge.');

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
