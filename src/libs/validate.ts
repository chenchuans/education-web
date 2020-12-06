export const isPhone = (value: string) => /^[1][0-9]{10}$/.test(value.trim());

export const isPhoneCode = (value: string) => /^[0-9]{4}$/.test(value.trim());
