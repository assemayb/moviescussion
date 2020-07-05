export const updateObject = (oldObj, updatedProberties) => {
  return {
    ...oldObj,
    ...updatedProberties,
  };
};
