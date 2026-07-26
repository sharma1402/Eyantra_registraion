CREATE DATABASE IF NOT EXISTS eyantra_registration
    CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

USE eyantra_registration;

CREATE TABLE IF NOT EXISTS countries (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL UNIQUE
);

CREATE TABLE IF NOT EXISTS colleges (
  id   INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(150) NOT NULL UNIQUE
);

CREATE TABLE IF NOT EXISTS registrations (
  id            CHAR(36)      NOT NULL PRIMARY KEY,
  name          VARCHAR(60)   NOT NULL,
  contact       VARCHAR(10)   NOT NULL,
  gender        VARCHAR(10)   NOT NULL,
  email         VARCHAR(120)  NOT NULL UNIQUE,
  year          VARCHAR(20)   NOT NULL,
  domain        VARCHAR(60)   NOT NULL,
  country       VARCHAR(100)  NOT NULL,
  college       VARCHAR(150)  NOT NULL,
  registered_at DATETIME      NOT NULL DEFAULT CURRENT_TIMESTAMP,
  CONSTRAINT fk_reg_country FOREIGN KEY (country) REFERENCES countries(name),
  CONSTRAINT fk_reg_college FOREIGN KEY (college) REFERENCES colleges(name),
  INDEX idx_country (country),
  INDEX idx_college (college)
);

INSERT IGNORE INTO countries (name) VALUES
('India'), ('United States'), ('United Kingdom'), ('Canada'), ('Australia'),
('Germany'), ('France'), ('Japan'), ('China'), ('Singapore'),
('United Arab Emirates'), ('South Africa'), ('Brazil'), ('Russia'), ('South Korea'),
('Italy'), ('Spain'), ('Netherlands'), ('New Zealand'), ('Nepal');

INSERT IGNORE INTO colleges (name) VALUES
('Indian Institute of Technology Bombay'), ('Indian Institute of Technology Delhi'),
('Indian Institute of Technology Madras'), ('Indian Institute of Technology Kanpur'),
('Indian Institute of Technology Kharagpur'), ('Indian Institute of Technology Roorkee'),
('Indian Institute of Technology Guwahati'), ('National Institute of Technology Trichy'),
('National Institute of Technology Surathkal'), ('National Institute of Technology Warangal'),
('Birla Institute of Technology and Science, Pilani'), ('Delhi Technological University'),
('Netaji Subhas University of Technology'), ('Vellore Institute of Technology'),
('SRM Institute of Science and Technology'), ('Manipal Institute of Technology'),
('College of Engineering Pune'), ('Jadavpur University'),
('PSG College of Technology'), ('Anna University'), ('Vidyalankar Institute of Technology');