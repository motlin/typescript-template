export interface User {
	id: string;
	name: string;
	email: string;
	createdAt: Date;
	updatedAt: Date;
}

export function createUser(data: Omit<User, 'id' | 'createdAt' | 'updatedAt'>): User {
	return {
		...data,
		id: crypto.randomUUID(),
		createdAt: new Date(),
		updatedAt: new Date(),
	};
}

export function validateEmail(email: string): boolean {
	const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
	return emailRegex.test(email);
}

export function updateUser(user: User, updates: Partial<Omit<User, 'id' | 'createdAt'>>): User {
	return {
		...user,
		...updates,
		updatedAt: new Date(),
	};
}
