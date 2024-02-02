const isEmpty = (fieldName: string, fieldValue: string): string =>
  !fieldValue ? `${fieldName} не указан` : '';

const minLength = (fieldName: string, fieldValue: string, min: number): string =>
  fieldValue.length < min ? `${fieldName} должен содержать не менее ${min} символов` : '';

export { isEmpty, minLength };
