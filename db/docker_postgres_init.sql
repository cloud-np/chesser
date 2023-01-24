-------------------------------------------------------------------
-- NOTE: This script is not meant to be run in production.
-- I use this script to initialize the database for the first time.
-- And also to reset the database to its initial state.
-- Some of these commands should never run in production. This is just 
-- for development purposes and because we use docker
-- so we can reset the state of the application entirely.
CREATE USER common_user WITH PASSWORD 'common_password';
CREATE DATABASE api;
GRANT ALL PRIVILEGES ON DATABASE api TO common_user;
-------------------------------------------------------------------

-- Use the api database
\c api

-- Drop all tables if they exist
DROP TABLE IF EXISTS accounts;
DROP TABLE IF EXISTS players;
DROP TABLE IF EXISTS games;

-------------------------------------------------------------------
-- Create the tables
CREATE TABLE players (
    p_id SERIAL PRIMARY KEY,
    p_name VARCHAR(255) UNIQUE NOT NULL,
    p_elo INTEGER NOT NULL,
    p_games INTEGER NOT NULL DEFAULT 0,
    p_games_won INTEGER NOT NULL DEFAULT 0,
    p_games_lost INTEGER NOT NULL DEFAULT 0,
    p_games_tied INTEGER NOT NULL DEFAULT 0
);

CREATE TABLE accounts (
    a_id SERIAL PRIMARY KEY,
    a_email VARCHAR(255) UNIQUE NOT NULL,
    a_password CHAR(60) NOT NULL,
    a_player_id INTEGER REFERENCES players(p_id),
    a_created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW(),
    a_updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW()
);

CREATE TABLE games(
    g_id SERIAL PRIMARY KEY,
    g_pgn TEXT NOT NULL,
    g_white_player_id INTEGER REFERENCES players(p_id),
    g_black_player_id INTEGER REFERENCES players(p_id)
);
CREATE INDEX games_pgn_idx ON games USING gin(to_tsvector('english', g_pgn));

-- SELECT pgn FROM games WHERE to_tsvector('english', pgn) @@ to_tsquery('english', 'Fischer')

-------------------------------------------------------------------
-- TRIGGERS
CREATE OR REPLACE FUNCTION update_players_scores() RETURNS TRIGGER AS $$
DECLARE result TEXT;
BEGIN
    SELECT substring(NEW.g_pgn FROM '1-0|0-1|1/2-1/2') INTO result FROM games WHERE g_id = NEW.g_id;
    IF result = '1-0' THEN
        IF NEW.g_white_player_id = NEW.g_black_player_id THEN
            UPDATE players SET p_games_won = p_games_won + 1 WHERE p_id = NEW.g_white_player_id;
        ELSE
            UPDATE players SET p_games_won = p_games_won + 1 WHERE p_id = NEW.g_white_player_id;
            UPDATE players SET p_games_lost = p_games_lost + 1 WHERE p_id = NEW.g_black_player_id;
        END IF;
    ELSIF result = '0-1' THEN
        IF NEW.g_white_player_id = NEW.g_black_player_id THEN
            UPDATE players SET p_games_lost = p_games_lost + 1 WHERE p_id = NEW.g_white_player_id;
        ELSE
            UPDATE players SET p_games_won = p_games_won + 1 WHERE p_id = NEW.g_black_player_id;
            UPDATE players SET p_games_lost = p_games_lost + 1 WHERE p_id = NEW.g_white_player_id;
        END IF;
    ELSIF result = '1/2-1/2' THEN
        UPDATE players SET p_games_tied = p_games_tied + 1 WHERE p_id = NEW.g_white_player_id OR p_id = NEW.g_black_player_id;
    END IF;
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER update_players_scores_trigger
AFTER INSERT OR UPDATE ON games
FOR EACH ROW
EXECUTE FUNCTION update_players_scores();


INSERT INTO players (p_name, p_elo) VALUES ('Fischer', 1000);
INSERT INTO players (p_name, p_elo) VALUES ('Spassky', 1200);
INSERT INTO accounts (a_email, a_password, a_player_id) VALUES ('cd@mail.com', '122', 1);
INSERT INTO accounts (a_email, a_password, a_player_id) VALUES ('cdok@mail.com', '123', 2);
INSERT INTO games (g_pgn, g_white_player_id, g_black_player_id) VALUES ('[Event "F/S Return Match"]
[Site "Belgrade, Serbia JUG"]
[Date "1992.11.04"]
[Round "29"]
[White "Fischer, Robert J."]
[Black "Spassky, Boris V."]
[Result "1/2-1/2"]

1. e4 e5 2. Nf3 Nc6 3. Bb5 a6 {This opening is called the Ruy Lopez.}
4. Ba4 Nf6 5. O-O Be7 6. Re1 b5 7. Bb3 d6 8. c3 O-O 9. h3 Nb8 10. d4 Nbd7
11. c4 c6 12. cxb5 axb5 13. Nc3 Bb7 14. Bg5 b4 15. Nb1 h6 16. Bh4 c5 17. dxe5
Nxe4 18. Bxe7 Qxe7 19. exd6 Qf6 20. Nbd2 Nxd6 21. Nc4 Nxc4 22. Bxc4 Nb6
23. Ne5 Rae8 24. Bxf7+ Rxf7 25. Nxf7 Rxe1+ 26. Qxe1 Kxf7 27. Qe3 Qg5 28. Qxg5
hxg5 29. b3 Ke6 30. a3 Kd6 31. axb4 cxb4 32. Ra5 Nd5 33. f3 Bc8 34. Kf2 Bf5
35. Ra7 g6 36. Ra6+ Kc5 37. Ke1 Nf4 38. g3 Nxh3 39. Kd2 Kb5 40. Rd6 Kc5 41. Ra6
Nf2 42. g4 Bd3 43. Re6 1/2-1/2', 1, 2);
select * from players;
select * from accounts;
select * from games;
----------------------------------------------------------------------------
-- Cursor-based pagination to retrieve the packages since they can be many.
-- Declare the function to get the packages
-- Ended up using LIMIT/OFFSET for simplicity reasons.