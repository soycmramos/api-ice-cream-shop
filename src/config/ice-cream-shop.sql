CREATE TABLE `products` (
    `id` VARCHAR(36) UNIQUE NOT NULL,
    `name` VARCHAR(100) NOT NULL,
    `code` VARCHAR(5) NOT NULL,
    `price` INT UNSIGNED NOT NULL,
    `description` VARCHAR(500),
    `createdAt` TIMESTAMP DEFAULT CURRENT_TIMESTAMP NOT NULL,
    CONSTRAINT pk_products PRIMARY KEY (`id`)
);

CREATE TABLE `tables` (
    `id` VARCHAR(36) UNIQUE NOT NULL,
    `number` INT UNSIGNED UNIQUE NOT NULL,
    `status` ENUM('LIBRE', 'OCUPADA') DEFAULT 'LIBRE' NOT NULL,
    `createdAt` TIMESTAMP DEFAULT CURRENT_TIMESTAMP NOT NULL,
    CONSTRAINT pk_tables PRIMARY KEY (`id`)
);

CREATE TABLE `orders` (
    `id` VARCHAR(36) UNIQUE NOT NULL,
    `number` VARCHAR(5) UNIQUE NOT NULL,
    `status` ENUM(
        'PENDIENTE',
        'PAGADA',
        'CANCELADA'
    ) DEFAULT 'PENDIENTE' NOT NULL,
    `tableId` VARCHAR(36) NOT NULL,
    `createdAt` TIMESTAMP DEFAULT CURRENT_TIMESTAMP NOT NULL,
    CONSTRAINT pk_orders PRIMARY KEY (`id`)
);

CREATE TABLE `orders_products` (
    `id` VARCHAR(36) UNIQUE NOT NULL,
    `orderId` VARCHAR(36) NOT NULL,
    `productId` VARCHAR(36) NOT NULL,
    `amount` INT NOT NULL,
    `createdAt` TIMESTAMP DEFAULT CURRENT_TIMESTAMP NOT NULL,
    CONSTRAINT pk_orders_products PRIMARY KEY (`id`)
);

CREATE UNIQUE INDEX `orders_products_index_0` ON `orders_products` (`orderId`, `productId`);

ALTER TABLE `orders`
ADD CONSTRAINT fk_orders_tables FOREIGN KEY (`tableId`) REFERENCES `tables` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

ALTER TABLE `orders_products`
ADD CONSTRAINT fk_orders_products__orderId FOREIGN KEY (`orderId`) REFERENCES `orders` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

ALTER TABLE `orders_products`
ADD CONSTRAINT fk_orders_products__productId FOREIGN KEY (`productId`) REFERENCES `products` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;