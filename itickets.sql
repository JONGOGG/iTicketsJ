-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 20-03-2024 a las 16:16:07
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
  `fecha_cierre` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

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
  `pass` varchar(15) NOT NULL,
  `fecha_registro` datetime NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `usuarios`
--

INSERT INTO `usuarios` (`id`, `nombre`, `apellidos`, `email`, `telefono`, `tipo_usuario`, `user`, `pass`, `fecha_registro`) VALUES
(1, 'Aldayr', 'Ramos De La Riva', 'aldayrramos5@gmail.com', '4651096860', 'User', 'asa', 'dfs', '2024-03-20 08:24:13'),
(2, 'alexandro Aldayr', 'Ramos De La Riva', 'aldayrramos5@gmail.com', '4651096860', 'Admin', 'asd', 'asda', '2024-03-20 08:26:48'),
(3, 'Aldayr alexandro', 'Ramos De La Riva', 'aldayrramos5@gmail.com', '4651096860', 'Admin', 'asa', 'asdad', '2024-03-20 08:29:43'),
(4, 'Aldayr', 'Ramos De La Riva', 'aldayrramos5@gmail.com', '4651096860', 'Admin', 'k', 'asd', '2024-03-20 08:31:12'),
(5, 'Aldayr', 'Ramos De La Riva', 'aldayrramos5@gmail.com', '4651096860', 'Admin', 'dasdsa', 'asda', '2024-03-20 08:33:52'),
(6, 'Aldayr', 'Ramos De La Riva', 'aldayrramos5@gmail.com', '4651096860', 'Admin', 'sd', 'asd', '2024-03-20 08:34:26');

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
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `usuarios`
--
ALTER TABLE `usuarios`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
