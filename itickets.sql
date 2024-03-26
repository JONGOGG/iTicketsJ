-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 26-03-2024 a las 05:37:30
-- Versión del servidor: 10.4.27-MariaDB
-- Versión de PHP: 7.4.33

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `itickets`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `tickets`
--

CREATE TABLE `tickets` (
  `id` int(11) NOT NULL,
  `usuario` varchar(15) NOT NULL,
  `email` varchar(60) NOT NULL,
  `asunto` varchar(120) NOT NULL,
  `descripcion` varchar(255) NOT NULL,
  `status` varchar(15) NOT NULL,
  `fecha_expedido` datetime NOT NULL DEFAULT current_timestamp(),
  `fecha_cierre` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `tickets`
--

INSERT INTO `tickets` (`id`, `usuario`, `email`, `asunto`, `descripcion`, `status`, `fecha_expedido`, `fecha_cierre`) VALUES
(1, 'alda', 'aldayrramos5@gmail.com', 'Mantenimiento a equipo', 'dfsafs', 'Pendiente', '2024-03-20 17:15:18', NULL),
(2, 'alda', 'aldayrramos5@gmail.com', 'Configuracion de impresora', 'asdasdasddad asda', 'Pendiente', '2024-03-20 22:30:05', NULL),
(3, 'alda', 'aldayrramos5@gmail.com', 'Mantenimiento preventivo', 'sdada', 'Pendiente', '2024-03-23 09:26:46', NULL),
(4, 'us', 'aldayrramos5@gmail.com', 'Mantenimiento preventivo', 'sdfs', 'Pendiente', '2024-03-23 09:31:32', NULL),
(5, 'us', 'aldayrramos5@gmail.com', 'Formateo de PC/Laptop', 'asda', 'Pendiente', '2024-03-23 09:35:39', NULL),
(6, 'us', 'aldayrramos5@gmail.com', 'Respaldo de información', 'vcxvx', 'Pendiente', '2024-03-23 09:48:41', NULL),
(7, 'aldayr', 'aldayrramos5@gmail.com', 'Mantenimiento preventivo', 'asda', 'Pendiente', '2024-03-23 09:53:21', NULL),
(8, 'aldayr', 'aldayrramos5@gmail.com', 'Respaldo de información', 'adasadadsa', 'Pendiente', '2024-03-25 14:22:24', NULL),
(9, 'us', 'aldayrramos5@gmail.com', 'Respaldo de información', 'akakakakakakakaaaaa\r\n', 'Pendiente', '2024-03-25 21:00:11', NULL);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `usuarios`
--

CREATE TABLE `usuarios` (
  `id` int(11) NOT NULL,
  `nombre` varchar(30) NOT NULL,
  `apellidos` varchar(50) NOT NULL,
  `email` varchar(60) NOT NULL,
  `telefono` varchar(20) NOT NULL,
  `tipo_usuario` varchar(15) NOT NULL,
  `user` varchar(15) NOT NULL,
  `pass` varchar(60) NOT NULL,
  `fecha_registro` datetime NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `usuarios`
--

INSERT INTO `usuarios` (`id`, `nombre`, `apellidos`, `email`, `telefono`, `tipo_usuario`, `user`, `pass`, `fecha_registro`) VALUES
(1, 'Aldayr', 'Ramos De La Riva', 'aldayrramos5@gmail.com', '4651096860', 'Admin', 'asa', '$2b$10$j94BJ4DUzoT33MWcMKvsKeSDiMA3si3frZereRExsHtpmhHUnrsby', '2024-03-22 04:31:03'),
(2, 'Aldayr', 'Ramos De La Riva', 'aldayrramos5@gmail.com', '4651096860', 'Admin', 'asa', '$2b$10$v/2pvvusbwizf1GHyFSJM.9Etw3N8NDhzlct3aZaSVUkUAxx6PrRq', '2024-03-22 04:34:33'),
(3, 'Aldayr', 'Ramos De La Riva', 'aldayrramos5@gmail.com', '4651096860', 'Admin', 'fhf', '$2b$10$U2FZAL3XcEa4fGd1wo6ZdOtYzlwWuqABXYhqQ7RGWavdXl8fbmgoq', '2024-03-22 04:45:02'),
(4, 'Aldayr', 'Ramos De La Riva', 'aldayrramos5@gmail.com', '4651096860', 'User', 'asa', '$2b$10$cxjr2mdhAHLT3kPsUVRF7.bTgwq9QhJn9xISAFvLjtXRcrrjCgpE6', '2024-03-22 04:47:31'),
(5, 'Aldayr', 'Ramos De La Riva', 'aldayrramos5@gmail.com', '4651096860', 'Admin', 'asa', '$2b$10$UK5kkTXVCmAqJQEyL2af5e61WKtseVtBosRiKOEN.FOlVILPgCUK.', '2024-03-22 04:51:25'),
(6, 'Aldayr', 'Ramos De La Riva', 'aldayrramos5@gmail.com', '4651096860', 'User', 'k', '$2b$10$l19Oa6R/wLEDb7c35J9mWu12ao.RPv7VwvZOR5D39JADo3qb14CyW', '2024-03-22 07:33:59'),
(7, 'Aldayr', 'Ramos De La Riva', 'aldayrramos5@gmail.com', '4651096860', 'User', 'asa', '$2b$10$ieHCQQy38l9qFAP7Gzf0PeHEn6Aay19.kVBjlbrrjZyi5gDFZUHmO', '2024-03-22 22:05:42'),
(8, 'Aldayr', 'Ramos De La Riva', 'aldayrramos5@gmail.com', '4651096860', 'Admin', 'asa', '$2b$10$oS7fedelKiq.R0qhP4nDyOhVZhipL1IFwbnsHZFBfIfks0CrOv5sW', '2024-03-22 22:07:16'),
(9, 'Aldayr', 'Ramos De La Riva', 'aldayrramos5@gmail.com', '4651096860', 'Admin', 'sd', '$2b$10$/TuOwHVsNVtvVEliX9lvJ.VztnNknhRtTr0PoY4tgMaWUSEoxi9uu', '2024-03-22 22:09:30'),
(10, 'Aldayr', 'Ramos De La Riva', 'aldayrramos5@gmail.com', '4651096860', 'User', 'sd', '$2b$10$lx6ki5g8DFbXXZ57gRgbq.LGOligt3rO/gPA3Ze6nOKgD7RLX0wX6', '2024-03-22 22:09:54'),
(11, 'Aldayr', 'Ramos De La Riva', 'aldayrramos5@gmail.com', '4651096860', 'User', 'aldayr12', 'alda', '2024-03-23 03:44:07'),
(13, 'Aldayr', 'Ramos De La Riva', 'aldayrramos5@gmail.com', '4651096860', 'Admin', 'ald', '$2b$10$k.Fvn74Hz94RZkLpibdfu.lzBNfto30.0VqcPO2v4kDObq9rw2V.6', '2024-03-23 04:27:57'),
(14, 'Aldayr', 'Ramos De La Riva', 'aldayrramos5@gmail.com', '4651096860', 'User', 'us', '$2b$10$N8DNN8VvtyxqvQ6UJ.BZgOAFYFI7TkaZjsHTQ6jxEVFJ2Q.6dgWiS', '2024-03-23 09:05:10');

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `tickets`
--
ALTER TABLE `tickets`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `usuarios`
--
ALTER TABLE `usuarios`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `tickets`
--
ALTER TABLE `tickets`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=10;

--
-- AUTO_INCREMENT de la tabla `usuarios`
--
ALTER TABLE `usuarios`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=15;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
