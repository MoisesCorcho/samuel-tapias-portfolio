<?php

namespace App\DTOs;

class ContactData
{
    public function __construct(
        public readonly string $name,
        public readonly string $email,
        public readonly string $body,
    ) {}

    public static function fromRequest(array $validated): self
    {
        return new self(
            name: $validated['name'],
            email: $validated['email'],
            body: $validated['body'],
        );
    }
}
