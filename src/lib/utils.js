//최신순 정렬
export const getOrderBy = (order) => {
  switch (order) {
    case 'oldest':
      return { createdAt: 'asc' };
    case 'recent':
    default:
      return { createdAt: 'desc' };
  }
};
