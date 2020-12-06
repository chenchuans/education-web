export const isPhone = (value: string) => /^[1][0-9]{10}$/.test(value.trim());

export const isSixNumber = (value: string) => /^[0-9]{6}$/.test(value.trim());
