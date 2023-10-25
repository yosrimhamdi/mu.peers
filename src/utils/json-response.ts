const jsonResponse = ({
  message,
  status = 200,
}: {
  message: string;
  status?: number;
}): Response => {
  return Response.json({ message }, { status });
};

export default jsonResponse;
