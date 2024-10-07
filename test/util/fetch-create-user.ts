// @params user type any for tests

interface fetchCreaateUserParams {
  user: any;
  URL?: string;
}

export async function fetchCreateUser({
  user,
  URL = 'http://localhost:6969/accounts',
}: fetchCreaateUserParams) {
  const response = await fetch(URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(user),
  });

  return response;
}
