const jsonResponse = (status: number, data: any): Response => {
  return Response.json(data, { status });
};

export default jsonResponse;
