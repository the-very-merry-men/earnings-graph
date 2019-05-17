DROP DATABASE IF EXISTS front_end;

CREATE DATABASE front_end;

USE front_end;

CREATE TABLE stocks (
  `id` INT NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(255) NOT NULL,
  `ticker` VARCHAR(255) NOT NULL,
  `buy rating` INT NOT NULL,
  `rh_owners` INT NOT NULL,
  `ceo` VARCHAR(255) NOT NULL,
  `market_cap` INT NOT NULL,
  `employees` INT NOT NULL,
  `pe_ratio` INT NOT NULL,
  `hq` VARCHAR(255) NOT NULL,
  `div_yield` INT NOT NULL,
  `founded` INT NOT NULL,
  `avg_vol` INT NOT NULL,
  PRIMARY KEY (`id`)
);

-- ---
-- Table 'eps_ratio'
-- 
-- ---
		
CREATE TABLE eps_ratio (
  `id` INT NOT NULL AUTO_INCREMENT,
  `id_stocks` INT NOT NULL,
  `year` INT NOT NULL,
  `quarter` INT NOT NULL,
  `actual_eps` INT NOT NULL,
  `expected_eps` INT NOT NULL,
  PRIMARY KEY (`id`)
);

-- ---
-- Foreign Keys 
-- ---

ALTER TABLE `eps_ratio` ADD FOREIGN KEY (id_stocks) REFERENCES `stocks` (`id`);