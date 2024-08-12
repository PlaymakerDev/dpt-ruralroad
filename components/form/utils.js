export const getErrorWithLocalKey = (formContext, name, error) => {
  if (error) {
    return error;
  }

  return formContext?.errors?.[name] || null;
};

