export const renderPrice = (price) => {
  return Number(price).toLocaleString("id-ID") || 0;
};
