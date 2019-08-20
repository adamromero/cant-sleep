CREATE DATABASE IF NOT EXISTS cant_sleep_db;

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;

CREATE TABLE IF NOT EXISTS `legends_table` (
  `legend_id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
  `title` varchar(65) NOT NULL,
  `image` varchar(100),
  `content` text(20000) NOT NULL
);

CREATE TABLE IF NOT EXISTS `mysteries_table` (
  `mystery_id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
  `title` varchar(65) NOT NULL,
  `image` varchar(100),
  `content` text(20000) NOT NULL
);

CREATE TABLE IF NOT EXISTS `videos_table` (
  `video_id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
  `title` varchar(65) NOT NULL,
  `url_video_id` varchar(11) NOT NULL
);

--
-- Dumping data for tables
--

INSERT INTO `mysteries_table` (`mystery_id`, `title`, `image`, `content`) VALUES (NULL, 'The Kelly-Hopkinsville Encounter', 'kelly-hopkinsville.jpg', '');
INSERT INTO `mysteries_table` (`mystery_id`, `title`, `image`, `content`) VALUES (NULL, 'The Flatwoods Monster', 'flatwoods-monster.jpg', '');

INSERT INTO `legends_table` (`legend_id`, `title`, `image`, `content`) VALUES (NULL, 'Robert the Doll', 'robert-the-doll.jpg', '');

INSERT INTO `videos_table` (`video_id`, `title`, `url_video_id`) VALUES (NULL, 'Hand Thing', 'DGodkjpM-IU');
INSERT INTO `videos_table` (`video_id`, `title`, `url_video_id`) VALUES (NULL, 'Rubber Johnny', 'eRvfxWRi6qQ');
INSERT INTO `videos_table` (`video_id`, `title`, `url_video_id`) VALUES (NULL, 'Ensemble of Christ the Saviour and Crude Mother Earth', 'gMApJESZhB4');
INSERT INTO `videos_table` (`video_id`, `title`, `url_video_id`) VALUES (NULL, 'Obey the Walrus', 'FHviwdECNjU');
INSERT INTO `videos_table` (`video_id`, `title`, `url_video_id`) VALUES (NULL, 'Little Baby''s Ice Cream', 'erh2ngRZxs0');
INSERT INTO `videos_table` (`video_id`, `title`, `url_video_id`) VALUES (NULL, 'Dining Room or There is Nothing', 'PdKOC3m3a1A');
INSERT INTO `videos_table` (`video_id`, `title`, `url_video_id`) VALUES (NULL, 'I Feel Fantastic', 'rLy-AwdCOmI');
INSERT INTO `videos_table` (`video_id`, `title`, `url_video_id`) VALUES (NULL, 'Max Headroom Incident', 'cycVTXtm0U0');
INSERT INTO `videos_table` (`video_id`, `title`, `url_video_id`) VALUES (NULL, 'Kuyang Dayak', 'iOAoPpdaJUw');
INSERT INTO `videos_table` (`video_id`, `title`, `url_video_id`) VALUES (NULL, 'MOM.avi', 'FZbwgJRgaLw');
INSERT INTO `videos_table` (`video_id`, `title`, `url_video_id`) VALUES (NULL, 'SON.avi', 'J5t0FfA1zgg');

/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;



