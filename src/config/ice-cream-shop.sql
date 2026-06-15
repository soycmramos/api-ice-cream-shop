CREATE TABLE `tables` (
  `id` varchar(36) UNIQUE PRIMARY KEY NOT NULL,
  `number` int UNIQUE NOT NULL,
  `status` ENUM('LIBRE', 'OCUPADA') NOT NULL DEFAULT 'LIBRE',
  `createdAt` timestamp DEFAULT CURRENT_TIMESTAMP NOT NULL
);

CREATE TABLE `products` (
  `id` varchar(36) UNIQUE PRIMARY KEY NOT NULL,
  `name` varchar(100) NOT NULL,
	`code` varchar(5) NOT NULL,
  `price` int NOT NULL,
  `description` varchar(500),
  `createdAt` timestamp DEFAULT CURRENT_TIMESTAMP NOT NULL
);

CREATE TABLE `orders` (
  `id` varchar(36) UNIQUE PRIMARY KEY NOT NULL,
  `tableId` varchar(36) NOT NULL,
  `status` ENUM ('ABIERTA', 'CERRADA'),
  `createdAt` timestamp DEFAULT CURRENT_TIMESTAMP NOT NULL
);

CREATE TABLE `orders_products` (
  `orderId` varchar(36) NOT NULL,
  `productId` varchar(36) NOT NULL,
  `amount` int NOT NULL,
  `createdAt` timestamp DEFAULT CURRENT_TIMESTAMP NOT NULL
);

CREATE UNIQUE INDEX `orders_products_index_0` ON `orders_products` (`orderId`, `productId`);

ALTER TABLE `orders` ADD FOREIGN KEY (`tableId`) REFERENCES `tables` (`id`);

ALTER TABLE `orders_products` ADD FOREIGN KEY (`orderId`) REFERENCES `orders` (`id`);

ALTER TABLE `orders_products` ADD FOREIGN KEY (`productId`) REFERENCES `products` (`id`);
