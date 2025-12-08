class NotFoundError extends Error {
  constructor(modelName: string, id: number) {
    super('존재하지 않습니다');
    this.name = 'NotFoundError';
  }
}

export default NotFoundError;
